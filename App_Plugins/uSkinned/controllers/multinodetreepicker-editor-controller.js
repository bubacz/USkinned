﻿// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

function usnNodePickerController($scope, entityResource, editorState, iconHelper, $routeParams, angularHelper, userService, navigationService, $location, localizationService, editorService, $q, notificationsService, $http) {

    var vm = {
        labels: {
            general_recycleBin: ""
        }
    };

    var startNodeID = -1;
    var unsubscribe;

    function subscribe() {
        unsubscribe = $scope.$on("formSubmitting", function (ev, args) {
            var currIds = _.map($scope.renderModel, function (i) {
                return i.udi;
            });
            $scope.model.value = trim(currIds.join(), ",");
        });
    }

    function trim(str, chr) {
        var rgxtrim = (!chr) ? new RegExp('^\\s+|\\s+$', 'g') : new RegExp('^' + chr + '+|' + chr + '+$', 'g');
        return str.replace(rgxtrim, '');
    }

    /** Performs validation based on the renderModel data */
    function validate() {
        if ($scope.contentPickerForm) {
            //Validate!
            if ($scope.model.config && $scope.model.config.minNumber && parseInt($scope.model.config.minNumber) > $scope.renderModel.length) {
                $scope.contentPickerForm.minCount.$setValidity("minCount", false);
            }
            else {
                $scope.contentPickerForm.minCount.$setValidity("minCount", true);
            }

            if ($scope.model.config && $scope.model.config.maxNumber && parseInt($scope.model.config.maxNumber) < $scope.renderModel.length) {
                $scope.contentPickerForm.maxCount.$setValidity("maxCount", false);
            }
            else {
                $scope.contentPickerForm.maxCount.$setValidity("maxCount", true);
            }
        }
    }


    function startWatch() {

        //due to the way angular-sortable works, it needs to update a model, we don't want it to update renderModel since renderModel
        //is updated based on changes to model.value so if we bound angular-sortable to that and put a watch on it we'd end up in a
        //infinite loop. Instead we have a custom array model for angular-sortable and we'll watch that which we'll use to sync the model.value
        //which in turn will sync the renderModel.
        $scope.$watchCollection("sortableModel", function (newVal, oldVal) {
            $scope.model.value = newVal.join();
        });

        //if the underlying model changes, update the view model, this ensures that the view is always consistent with the underlying
        //model if it changes (i.e. based on server updates, or if used in split view, etc...)
        $scope.$watch("model.value", function (newVal, oldVal) {
            if (newVal !== oldVal) {
                syncRenderModel(true);
            }
        });
    }

    $scope.renderModel = [];
    $scope.sortableModel = [];

    $scope.labels = vm.labels;

    $scope.dialogEditor = editorState && editorState.current && editorState.current.isDialogEditor === true;

    //the default pre-values
    var defaultConfig = {
        multiPicker: true,
        showOpenButton: false,
        showEditButton: false,
        showPathOnHover: false,
        dataTypeKey: null,
        maxNumber: 1,
        minNumber: 0,
        startNode: {
            query: "",
            type: "content",
            id: startNodeID
        }
    };

    // sortable options
    $scope.sortableOptions = {
        axis: "y",
        containment: "parent",
        distance: 10,
        opacity: 0.7,
        tolerance: "pointer",
        scroll: true,
        zIndex: 6000,
        update: function (e, ui) {
            angularHelper.getCurrentForm($scope).$setDirty();
        }
    };

    var removeAllEntriesAction = {
        labelKey: 'clipboard_labelForRemoveAllEntries',
        labelTokens: [],
        icon: 'trash',
        method: removeAllEntries,
        isDisabled: true
    };

    if ($scope.model.config) {
        //special case, if the `startNode` is falsy on the server config delete it entirely so the default value is merged in
        if (!$scope.model.config.startNode) {
            delete $scope.model.config.startNode;
        }
        //merge the server config on top of the default config, then set the server config to use the result
        $scope.model.config = angular.extend(defaultConfig, $scope.model.config);

        // if the property is mandatory, set the minCount config to 1 (unless of course it is set to something already),
        // that way the minCount/maxCount validation handles the mandatory as well
        if ($scope.model.validation && $scope.model.validation.mandatory && !$scope.model.config.minNumber) {
            $scope.model.config.minNumber = 1;
        }

        if ($scope.model.config.multiPicker === true && $scope.umbProperty) {
            var propertyActions = [
                removeAllEntriesAction
            ];

            $scope.umbProperty.setPropertyActions(propertyActions);
        }


    }

    //Umbraco persists boolean for prevalues as "0" or "1" so we need to convert that!
    $scope.model.config.multiPicker = Object.toBoolean($scope.model.config.multiPicker);
    $scope.model.config.showOpenButton = Object.toBoolean($scope.model.config.showOpenButton);
    $scope.model.config.showEditButton = Object.toBoolean($scope.model.config.showEditButton);
    $scope.model.config.showPathOnHover = Object.toBoolean($scope.model.config.showPathOnHover);

    var entityType = $scope.model.config.startNode.type === "member"
        ? "Member"
        : $scope.model.config.startNode.type === "media"
            ? "Media"
            : "Document";
    $scope.allowOpenButton = entityType === "Document";
    $scope.allowEditButton = entityType === "Document";
    $scope.allowRemoveButton = true;

    //the dialog options for the picker
    var dialogOptions = {
        multiPicker: $scope.model.config.multiPicker,
        entityType: entityType,
        filterCssClass: "not-allowed not-published",
        startNodeId: null,
        dataTypeKey: $scope.model.dataTypeKey,
        currentNode: editorState ? editorState.current : null,
        callback: function (data) {
            if (angular.isArray(data)) {
                _.each(data, function (item, i) {
                    $scope.add(item);
                });
            } else {
                $scope.clear();
                $scope.add(data);
            }
            angularHelper.getCurrentForm($scope).$setDirty();
        },
        treeAlias: $scope.model.config.startNode.type,
        section: $scope.model.config.startNode.type,
        idType: "udi"
    };

    //since most of the pre-value config's are used in the dialog options (i.e. maxNumber, minNumber, etc...) we'll merge the
    // pre-value config on to the dialog options
    Utilities.extend(dialogOptions, $scope.model.config);

    dialogOptions.dataTypeKey = $scope.model.dataTypeKey;

    // if we can't pick more than one item, explicitly disable multiPicker in the dialog options
    if ($scope.model.config.maxNumber && parseInt($scope.model.config.maxNumber) === 1) {
        dialogOptions.multiPicker = false;
    }

    // add the current filter (if any) as title for the filtered out nodes
    if ($scope.model.config.filter) {
        localizationService.localize("contentPicker_allowedItemTypes", [$scope.model.config.filter]).then(function (data) {
            dialogOptions.filterTitle = data;
        });
    }


    if ($routeParams.section === "settings" && $routeParams.tree === "documenttypes") {
        //if the content-picker is being rendered inside the document-type editor, we don't need to process the startnode query
        dialogOptions.startNodeId = -1;
    }
    else {

        if (!$scope.preview) {
            var promise = $http.get('backoffice/api/USNMultiNodeTreePicker/GetStartNode',
                {
                    params: {
                        currentNodeID: $routeParams.id,
                        docTypeAlias: $scope.model.config.pickerStartNodeName
                    }
                }
            );

            promise.then(

                function (payload) {
                    $scope.vm = payload.data;
                    dialogOptions.startNodeId = $scope.vm;
                    $scope.isLoaded = true;
                },
                function (errorPayLoad) {
                    notificationsService.error("Error", "Issue getting picker start node");
                    dialogOptions.startNodeId = -1;
                    $scope.isLoaded = true;
                }
            );
        }
    }

   

    //dialog
    $scope.openCurrentPicker = function () {
        $scope.currentPicker = dialogOptions;

        $scope.currentPicker.submit = function (model) {
            if (Utilities.isArray(model.selection)) {
                _.each(model.selection, function (item, i) {
                    $scope.add(item);
                });
                setDirty();
            }
            setDirty();
            editorService.close();
        }

        $scope.currentPicker.close = function () {
            editorService.close();
        }

        //open the correct editor based on the entity type
        switch (entityType) {
            case "Document":
                editorService.contentPicker($scope.currentPicker);
                break;
            case "Media":
                editorService.mediaPicker($scope.currentPicker);
                break;
            case "Member":
                editorService.memberPicker($scope.currentPicker);
                break;

            default:
        }

    };

    $scope.remove = function (index) {
        var currIds = $scope.model.value ? $scope.model.value.split(',') : [];
        if (currIds.length > 0) {
            currIds.splice(index, 1);
            setDirty();
            $scope.model.value = currIds.join();
        }

        removeAllEntriesAction.isDisabled = currIds.length === 0;
    };

    $scope.showNode = function (index) {
        var item = $scope.renderModel[index];
        var id = item.id;
        var section = $scope.model.config.startNode.type.toLowerCase();

        entityResource.getPath(id, entityType).then(function (path) {
            navigationService.changeSection(section);
            navigationService.showTree(section, {
                tree: section, path: path, forceReload: false, activate: true
            });
            var routePath = section + "/" + section + "/edit/" + id.toString();
            $location.path(routePath).search("");
        });
    }

    $scope.add = function (item) {
        var currIds = $scope.model.value ? $scope.model.value.split(',') : [];

        var itemId = (item.udi).toString();

        if (currIds.indexOf(itemId) < 0) {
            currIds.push(itemId);
            $scope.model.value = currIds.join();
        }

        removeAllEntriesAction.isDisabled = false;
    };

    $scope.clear = function () {
        $scope.model.value = null;
        removeAllEntriesAction.isDisabled = true;
    };

    $scope.openEditor = function (node) {
        var editor = {
            id: entityType === "Member" ? item.key : item.id,
            submit: function (model) {

                var node = entityType === "Member" ? model.memberNode :
                    entityType === "Media" ? model.mediaNode :
                        model.contentNode;

                // update the node
                item.name = node.name;

                if (entityType !== "Member") {
                    if (entityType === "Document") {
                        item.published = node.hasPublishedVersion;
                    }
                    entityResource.getUrl(node.id, entityType).then(function (data) {
                        item.url = data;
                    });
                }
                editorService.close();
            },
            close: function () {
                editorService.close();
            }
        };

        switch (entityType) {
            case "Document":
                editorService.contentEditor(editor);
                break;
            case "Media":
                editorService.mediaEditor(editor);
                break;
            case "Member":
                editorService.memberEditor(editor);
                break;
        }
    };

    //when the scope is destroyed we need to unsubscribe
    $scope.$on('$destroy', function () {
        if (unsubscribe) {
            unsubscribe();
        }
    });

    function setDirty() {
        if ($scope.contentPickerForm && $scope.contentPickerForm.modelValue) {
            $scope.contentPickerForm.modelValue.$setDirty();
        }
    }

    /** Syncs the renderModel based on the actual model.value and returns a promise */
    function syncRenderModel(doValidation) {

        var valueIds = $scope.model.value ? $scope.model.value.split(',') : [];

        //sync the sortable model
        $scope.sortableModel = valueIds;

        removeAllEntriesAction.isDisabled = valueIds.length === 0;

        //load current data if anything selected
        if (valueIds.length > 0) {

            //need to determine which items we already have loaded
            var renderModelIds = _.map($scope.renderModel, function (d) {
                return (d.udi).toString();
            });

            //get the ids that no longer exist
            var toRemove = _.difference(renderModelIds, valueIds);


            //remove the ones that no longer exist
            for (var j = 0; j < toRemove.length; j++) {
                var index = renderModelIds.indexOf(toRemove[j]);
                $scope.renderModel.splice(index, 1);
            }

            //get the ids that we need to lookup entities for
            var missingIds = _.difference(valueIds, renderModelIds);

            if (missingIds.length > 0) {
                return entityResource.getByIds(missingIds, entityType).then(function (data) {

                    _.each(valueIds,
                        function (id, i) {
                            var entity = _.find(data, function (d) {
                                return (d.udi == id);
                            });

                            if (entity) {
                                addSelectedItem(entity);
                            }

                        });

                    if (doValidation) {
                        validate();
                    }

                    setSortingState($scope.renderModel);
                    return $q.when(true);
                });
            }
            else {
                //if there's nothing missing, make sure it's sorted correctly

                var current = $scope.renderModel;
                $scope.renderModel = [];
                for (var k = 0; k < valueIds.length; k++) {
                    var id = valueIds[k];
                    var found = _.find(current, function (d) {
                        return (d.udi == id);
                    });
                    if (found) {
                        $scope.renderModel.push(found);
                    }
                }

                if (doValidation) {
                    validate();
                }

                setSortingState($scope.renderModel);
                return $q.when(true);
            }
        }
        else {
            $scope.renderModel = [];
            if (doValidation) {
                validate();
            }
            setSortingState($scope.renderModel);
            return $q.when(true);
        }

    }

    function setEntityUrl(entity) {

        // get url for content and media items
        if (entityType !== "Member") {
            entityResource.getUrl(entity.id, entityType).then(function (data) {
                // update url
                angular.forEach($scope.renderModel, function (item) {
                    if (item.id === entity.id) {
                        if (entity.trashed) {
                            item.url = vm.labels.general_recycleBin;
                        } else {
                            item.url = data;
                        }
                    }
                });
            });
        }

    }

    function addSelectedItem(item) {

        // set icon
        if (item.icon) {
            item.icon = iconHelper.convertFromLegacyIcon(item.icon);
        }

        // set default icon
        if (!item.icon) {
            switch (entityType) {
                case "Document":
                    item.icon = "icon-document";
                    break;
                case "Media":
                    item.icon = "icon-picture";
                    break;
                case "Member":
                    item.icon = "icon-user";
                    break;
            }
        }

        $scope.renderModel.push({
            "name": item.name,
            "id": item.id,
            "udi": item.udi,
            "icon": item.icon,
            "path": item.path,
            "url": item.url,
            "trashed": item.trashed,
            "published": (item.metaData && item.metaData.IsPublished === false && entityType === "Document") ? false : true
            // only content supports published/unpublished content so we set everything else to published so the UI looks correct
        });

        setEntityUrl(item);
    }

    function setSortingState(items) {
        // disable sorting if the list only consist of one item
        if (items.length > 1) {
            $scope.sortableOptions.disabled = false;
        } else {
            $scope.sortableOptions.disabled = true;
        }
    }

    function removeAllEntries() {
        localizationService.localizeMany(["content_nestedContentDeleteAllItems", "general_delete"]).then(function (data) {
            overlayService.confirmDelete({
                title: data[1],
                content: data[0],
                close: function () {
                    overlayService.close();
                },
                submit: function () {
                    $scope.clear();
                    overlayService.close();
                }
            });
        });
    }

    function init() {

        userService.getCurrentUser().then(function (user) {
            switch (entityType) {
                case "Document":
                    var hasAccessToContent = user.allowedSections.indexOf("content") !== -1;
                    $scope.allowOpenButton = hasAccessToContent;
                    break;
                case "Media":
                    var hasAccessToMedia = user.allowedSections.indexOf("media") !== -1;
                    $scope.allowOpenButton = hasAccessToMedia;
                    break;
                case "Member":
                    var hasAccessToMember = user.allowedSections.indexOf("member") !== -1;
                    $scope.allowOpenButton = hasAccessToMember;
                    break;

                default:
            }
        });

        localizationService.localizeMany(["general_recycleBin", "general_add"])
            .then(function (data) {
                vm.labels.general_recycleBin = data[0];
                vm.labels.general_add = data[1];

                syncRenderModel(false).then(function () {
                    //everything is loaded, start the watch on the model
                    startWatch();
                    subscribe();
                    validate();
                });
            });
    }

    init();
}

angular.module('umbraco').controller("USN.MultiNodeTreePicker.Controller", usnNodePickerController);