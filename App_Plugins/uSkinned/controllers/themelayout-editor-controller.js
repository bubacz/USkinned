// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ThemeLayout.Controller", function ($scope) {

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

    //True will close tab
    $scope.headerTabStyle = true;
    $scope.burgerTabStyle = true;
    $scope.arrowsTabStyle = true;
    $scope.headingTabStyle = true;
    $scope.linksTabStyle = true;
    $scope.miscTabStyle = true;

    $scope.headingStyles = [
    {
        Text: 'Above headings',
        Value: 'has-heading-seperator-above',
        Selected: false
    },
    {
        Text: 'Below headings',
        Value: 'has-heading-seperator-below',
        Selected: false
    },
    {
        Text: 'Above secondary headings',
        Value: 'has-secondary-heading-seperator-above',
        Selected: false
    },
    {
        Text: 'Below secondary headings',
        Value: 'has-secondary-heading-seperator-below',
        Selected: false
    }];

    $scope.selectedHeadingItems = [];

    $scope.headerLargePreview = "Initial";
    $scope.isLoaded = false;

    $scope.isLoaded = true;

    if (!$scope.model.value || Object.keys($scope.model.value).length == 0) {
        $scope.model.value = {
            headerSmall: "header-01-sm",
            headerLarge: "header-01-lg",
            showHeaderScrollSmall: true,
            showHeaderScrollLarge: true,
            transparentLargeHeader: false,
            transparentSmallHeader: false,
            burgerNavStyle: "expand-3-bars expand-uneven-lines",
            arrowStyle: "directional-icons-triangle",
            headingStyles: "",
            logoLinkUnderlineInitial: false,
            logoLinkUnderlineHover: false,
            mainNavLinkUnderlineInitial: false,
            mainNavLinkUnderlineHover: true,
            secondaryNavLinkUnderlineInitial: false,
            secondaryNavLinkUnderlineHover: true,
            contentLinkUnderlineInitial: false,
            contentLinkUnderlineHover: true,
            footerLinkUnderlineInitial: false,
            footerLinkUnderlineHover: true,
            buttonLinkUnderlineInitial: false,
            buttonLinkUnderlineHover: false,
            displayBackToTopOption: true,
            backToTopHorizontalPosition: "position-right",
            notificationHorizontalPosition: "position-left",
            headingOrder: "secondary-heading-first"
        };
    }

    var selectedHeadingItems = !$scope.model.value.headingStyles ? [] : $scope.model.value.headingStyles.split(',');

    for (var i = 0; i < $scope.headingStyles.length; i++) {

        var isSelected = false;

        for (var j = 0; j < selectedHeadingItems.length; j++) {
            isSelected = selectedHeadingItems[j] === $scope.headingStyles[i].Value;
            if (isSelected) { break; }
        }

        $scope.selectedHeadingItems.push({
            Selected: isSelected,
            Text: $scope.headingStyles[i].Text,
            Value: $scope.headingStyles[i].Value
        });
    }
        
 

    $scope.$on("formSubmitting",
        function (ev, args) {
            if ($scope.model.value.headingStyles === null || $scope.model.value.headingStyles === undefined) {
                $scope.model.value.headingStyles = [];
            }
            var selectedStyles = "";

            angular.forEach($scope.selectedHeadingItems,
                function (value, key) {
                    var itemSelected = value.Selected;
                    var item = value.Value;

                    selectedStyles = itemSelected === true
                        ? selectedStyles + item + ","
                        : selectedStyles + "";
                });
            $scope.model.value.headingStyles = selectedStyles.replace(/(^,)|(,$)/g, "");

        });
});
