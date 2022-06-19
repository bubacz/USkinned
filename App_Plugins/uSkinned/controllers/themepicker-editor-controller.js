// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ThemePicker.Controller", function ($scope, $http, notificationsService) {

    $scope.error = false;

    $http({
        method: 'GET',
        url: 'backoffice/api/USNSourceCodePicker/GetOptions'
    }).then(function (response) {
        $scope.themes = response.data;
        if ($scope.themes.length == 1) {
            $scope.model.label = "Frontend source";
            $scope.model.value = $scope.themes[0];
        }
        else if ($scope.themes.length == 0) {
            $scope.model.value = '';
            $scope.error = true;
        }
    }, function (error) {
            notificationsService.error("Error", "Issue getting frontend source files. Check the advanced tab for further information.");
            $scope.error = true;
    });

});