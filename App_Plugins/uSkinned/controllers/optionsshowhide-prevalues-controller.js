// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco")
    .controller("USN.ShowHideTabs.prevaluesController",
        function ($scope, $timeout, assetsService, $sce) {

        // Initialize the model
        if (!$scope.model.value || Object.keys($scope.model.value).length == 0) {
            $scope.model.value = {
                items: []
            };
        }
        else
        {
            //loop through items and make svg safe
            angular.forEach($scope.model.value.items, function (value, key) {

                value.svgTrusted = $sce.trustAsHtml(value.svg);

            });
        }

        // Load the css file with the grid's styles
        assetsService.loadCss("/App_Plugins/uSkinned/css/optionsshowhide-prevalues.css");

        // Add a new item
        $scope.addItem = function () {
            $scope.model.value.items.push({
                svg: "",
                svgTrusted: "",
                css: "",
                text: "",
                key: "",
                tabs: "",
                fields: ""
            });
        }

        // Remove an item
        $scope.removeItem = function (index) {
            $scope.model.value.items.splice(index, 1);
        }

        // Makes the grid sortable
        $scope.sortableOptions = {
            axis: 'y',
            cursor: "move",
            handle: ".sortHandle",
            start: function (event, ui) {
                var curTH = ui.helper.closest("table").find("thead").find("tr");
                var itemTds = ui.item.children("td");
                curTH.find("th").each(function (ind, obj) {
                    itemTds.eq(ind).width($(obj).width());
                });
            },
            update: function (ev, ui) {
            }
         };



    });