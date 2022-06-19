// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ComponentListViewController", function ($scope, listViewHelper, entityResource) {

    // Init the controller
    function activate() {

        for (let i = 0; i < $scope.items.length; i++) {

            $scope.items[i].componentItems = [];

            if ($scope.items[i].components.contentData) {

                $scope.items[i].componentCount = $scope.items[i].components.contentData.length;

                for (let j = 0; j < $scope.items[i].components.contentData.length; j++) {
                    entityResource.getById($scope.items[i].components.contentData[j].contentTypeKey,"DocumentType")
                        .then(function (data) {
                            var itemName = !$scope.items[i].components.settingsData[j].itemName || $scope.items[i].components.settingsData[j].itemName == '' ? data.name : $scope.items[i].components.settingsData[j].itemName;
                            var imageName = data.name.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
                            $scope.items[i].componentItems[j] = [j, itemName, "/App_Plugins/uSkinned/backoffice/images/" + imageName + ".png"];     
                        });
                }
            }
        }
    }

    activate();

    $scope.viewItem = function (item) {

        listViewHelper.editItem(item, $scope);

    }
});