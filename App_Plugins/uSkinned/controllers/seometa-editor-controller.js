// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.SEOMetaController", function ($scope, $routeParams, $http, notificationsService, entityResource, contentResource) {

    if ($scope.preview) {
        return;
    }

    //FIX from here to understand JSON valueType
    //https://our.umbraco.com/forum/umbraco-8/96478-custom-property-editor-with-valuetype-json
    var initModelValue = $scope.$watch('model.value', function (model) {
        if (typeof model === 'string' && model.length == 0)
            $scope.model.value = {};
        initModelValue(); //Deregisters the watch so we wont waste resources
    });

    var nodeId = $routeParams.id;

    $scope.model.titleFrom = $scope.model.config.titleLengthFrom ? $scope.model.config.titleLengthFrom : 50;
    $scope.model.titleTo = $scope.model.config.titleLength ? $scope.model.config.titleLength : 60;
    $scope.model.descriptionFrom = $scope.model.config.descriptionLengthFrom ? $scope.model.config.descriptionLengthFrom : 50;
    $scope.model.descriptionTo = $scope.model.config.descriptionLength ? $scope.model.config.descriptionLength : 60;

    if ($routeParams.tree != "contentBlueprints") {
        if ($routeParams.create == "true") {
            $scope.model.pageUrl = "This is a new page, URL will be displayed after saving for first time.";
        }
        else {

            contentResource.getNiceUrl(nodeId)
                .then(function (url) {
                    if (url == "#") {
                        $scope.model.pageUrl = "This page is not published, URL will be displayed after publishing."
                    }
                    else if (url.includes("http"))
                        $scope.model.pageUrl = url;
                    else
                        $scope.model.pageUrl = window.location.hostname + url;
                });
        }

        var promise = $http.get('backoffice/api/USNPageName/GetDefault',
            {
                params: {
                    currentNodeID: nodeId,
                    culture: $scope.model.culture
                }
            }
        );

        promise.then(

            function (payload) {
                $scope.vm = payload.data;

                entityResource.getById(nodeId, "Document")
                    .then(function (ent) {
                        var myDoc = ent;
                        if ($routeParams.create == "true" && $scope.vm == '') {
                            $scope.model.defaultTitle = "(Page Name)";
                        }
                        else if ($routeParams.create == "true" && $scope.vm != '') {
                            $scope.model.defaultTitle = "(Page Name)" + ' | ' + $scope.vm;
                        }
                        else if ($scope.vm == '') {
                            $scope.model.defaultTitle = myDoc.name;
                        }
                        else {
                            $scope.model.defaultTitle = myDoc.name + ' | ' + $scope.vm;
                        }

                        //Title is undefined or empty
                        if (!$scope.model.value.title || $scope.model.value.title == '') {
                            $scope.model.pageTitle = $scope.model.defaultTitle;
                        }
                        else if ($scope.model.value.title || $scope.model.value.title != '') {
                            $scope.model.pageTitle = $scope.model.value.title;
                        }
                        else {
                            $scope.model.value.title = '';
                        }
                    });



            },
            function (errorPayLoad) {
                notificationsService.error("Error", "Issue getting default page title.");
            }
        );

    }
    else {
        $scope.model.pageTitle = $scope.model.value.title;
    }
    

    

    if (!$scope.model.value || Object.keys($scope.model.value).length == 0) {
        $scope.model.value = {
            title : "",
            description : ""
        };
    }

    $scope.updatePageTitle = function () {
        if ($scope.model.value.title != '') {
            $scope.model.pageTitle = $scope.model.value.title;
        }
        else {
            $scope.model.pageTitle = $scope.model.defaultTitle;
        }
    };

});