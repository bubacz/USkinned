// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.GlobalListViewController", function ($scope, listViewHelper) {

    "use strict";

    var vm = this;
    vm.clickItem = clickItem;

    // Init the controller
    function activate() {

        // Load background image for each item
        angular.forEach($scope.items, function (item) {

            item.documentImage = "/App_Plugins/uSkinned/resources/" + item.contentTypeAlias.toLowerCase() + ".png";

            switch (item.contentTypeAlias) {
                case "USNGlobalSettings":
                    item.description = "Manage the global settings that relate to your site.";
                    break;
                case "USNNavigation":
                    item.description = "Manage the global navigation menus of your site.";
                    break;
                case "USNFooter":
                    item.description = "Create and manage the content and layout within the footer section of your site.";
                    break;
                case "USNReusableComponents":
                    item.description = "Create and manage components that can be added to multiple areas of your site. Link directly to these components to open the content in a modal window.";
                    break;
                case "USNReusablePods":
                    item.description = "Create and manage pods that can be added to multiple areas of your site. Link directly to these pods to open the content in a modal window.";
                    break;
            }
            
        });

    }

    function clickItem(item) {
        listViewHelper.editItem(item, $scope);
    }

    activate();

});