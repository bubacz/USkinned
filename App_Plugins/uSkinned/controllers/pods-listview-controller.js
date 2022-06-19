// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.PodsListViewController", function ($scope, listViewHelper, entityResource) {

    // Init the controller
    function activate() {

        for (let i = 0; i < $scope.items.length; i++) {

            $scope.items[i].podItems = [];

            if ($scope.items[i].pods.contentData) {

                $scope.items[i].podCount = $scope.items[i].pods.contentData.length;

                for (let j = 0; j < $scope.items[i].pods.contentData.length; j++) {
                    entityResource.getById($scope.items[i].pods.contentData[j].contentTypeKey,"DocumentType")
                        .then(function (data) {
                            var itemName = !$scope.items[i].pods.settingsData[j].itemName || $scope.items[i].pods.settingsData[j].itemName == '' ? data.name : $scope.items[i].pods.settingsData[j].itemName;
                            var imageName = data.name.toLowerCase().replaceAll("/", "-").replaceAll(" ", "-");
                            $scope.items[i].podItems[j] = [j, itemName, "/App_Plugins/uSkinned/backoffice/images/" + imageName + ".png"];
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