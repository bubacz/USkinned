// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ThemeSpacing.Controller", function ($scope, $timeout, angularHelper) {

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

    $scope.isLoaded = false;
    var alreadyDirty = false;

    //True will close tab
    $scope.siteTabStyle = true;
    $scope.headerTabStyle = true;
    $scope.logoTabStyle = true;
    $scope.generalTabStyle = true;
    $scope.componentsTabStyle = true;
    $scope.formsTabStyle = true;
    $scope.buttonsTabStyle = true;
    $scope.modalTabStyle = true;
    $scope.siteWidthTextRight = "No";
    $scope.headerWidthTextRight = "No";
    $scope.showSiteWidth = false;
    $scope.showHeaderWidth = false;

    $scope.isLoaded = true;

    // Initialize the model
    if (!$scope.model.value || Object.keys($scope.model.value).length == 0) {
        $scope.enabledSiteWidth = 0;
        $scope.enabledHeaderWidth = 0;
        $scope.model.value = {
            fixedWidth: false,
            siteWidth: 1600,
            headerFixedWidth: false,
            headerWidth: 1350,
            sitePaddingSmall: 0,
            sitePaddingLarge: 0,
            siteBoxShadowHorizontal: 0,
            siteBoxShadowVertical: 0,
            siteBoxShadowBlur: 100,
            siteBoxShadowOpacity: 10,
            notificationPaddingBottomSmall: 0,
            notificationPaddingSideSmall: 0,
            notificationPaddingBottomLarge: 0,
            notificationPaddingSideLarge: 0,
            backToTopSizeSmall: 45,
            backToTopSizeLarge: 60,
            backToTopPaddingBottomSmall: 0,
            backToTopPaddingSideSmall: 0,
            backToTopPaddingBottomLarge: 0,
            backToTopPaddingSideLarge: 0,
            headerLargeHeight: 90,
            headerBreakpoint: 992,
            headerSmallHeight: 60,
            mainNavSingleColumnWidth: 240,
            mainNavMultiColumnItems: 8,
            mainNavMultiColumnWidth: 480,
            headerBoxShadowHorizontal: 0,
            headerBoxShadowVertical: 2,
            headerBoxShadowBlur: 2,
            headerBoxShadowOpacity: 5,
            logoLargePaddingTop: 15,
            logoLargePaddingRight: 20,
            logoLargePaddingBottom: 15,
            logoLargePaddingLeft: 20,
            logoSmallPaddingTop: 10,
            logoSmallPaddingRight: 10,
            logoSmallPaddingBottom: 10,
            logoSmallPaddingLeft: 10,
            generalPaddingLargeItems: 30,
            generalPaddingSmallItems: 15,
            generalBorderWidth: 1,
            generalBorderRadius: 0,
            generalBoxShadowHorizontal: 0,
            generalBoxShadowVertical: 0,
            generalBoxShadowBlur: 0,
            generalBoxShadowOpacity: 0,
            componentPaddingFullLayout: 15,
            componentPaddingDesktop: 60,
            componentPaddingLaptop: 50,
            componentPaddingTablet: 40,
            componentPaddingLandscapeMobile: 30,
            componentPaddingPortraitMobile: 30,
            componentIntroWidthDesktop: 75,
            componentIntroWidthLaptop: 80,
            componentIntroWidthTablet: 90,
            componentIntroWidthLandscapeMobile: 100,
            componentIntroWidthPortraitMobile: 100,
            componentOutroWidthDesktop: 75,
            componentOutroWidthLaptop: 80,
            componentOutroWidthTablet: 90,
            componentOutroWidthLandscapeMobile: 100,
            componentOutroWidthPortraitMobile: 100,
            componentCenterWidthDesktop: 50,
            componentCenterWidthLaptop: 65,
            componentCenterWidthTablet: 90,
            componentCenterWidthLandscapeMobile: 100,
            componentCenterWidthPortraitMobile: 100,
            componentBannerWidthDesktop: 75,
            componentBannerWidthLaptop: 80,
            componentBannerWidthTablet: 90,
            componentBannerWidthLandscapeMobile: 100,
            componentBannerWidthPortraitMobile: 100,
            formBorderWidth: 1,
            formBorderRadius: 0,
            buttonBorderWidth: 1,
            buttonBorderRadius: 0,
            buttonBoxShadowHorizontal: 0,
            buttonBoxShadowVertical: 0,
            buttonBoxShadowBlur: 0,
            buttonBoxShadowOpacity: 0,
            buttonSmallPaddingTop: 6,
            buttonSmallPaddingRight: 10,
            buttonSmallPaddingBottom: 6,
            buttonSmallPaddingLeft: 10,
            buttonMediumPaddingTop: 8,
            buttonMediumPaddingRight: 12,
            buttonMediumPaddingBottom: 8,
            buttonMediumPaddingLeft: 12,
            buttonLargePaddingTop: 10,
            buttonLargePaddingRight: 14,
            buttonLargePaddingBottom: 10,
            buttonLargePaddingLeft: 14,
            modalOpacity: 75,
            modalComponentMaxWidth: 1800,
            modalPodMaxWidth: 645
        };
    }
    else {
        $scope.enabledSiteWidth = $scope.model.value.fixedWidth == 1;
        $scope.enabledHeaderWidth = $scope.model.value.headerFixedWidth == 1;

        //set defaults on new spacing values added in 1.1.0
        $scope.model.value.modalOpacity = !$scope.model.value.modalOpacity ? 75 : $scope.model.value.modalOpacity;
        $scope.model.value.modalComponentMaxWidth = !$scope.model.value.modalComponentMaxWidth ? 1800 : $scope.model.value.modalComponentMaxWidth;
        $scope.model.value.modalPodMaxWidth = !$scope.model.value.modalPodMaxWidth ? 645 : $scope.model.value.modalPodMaxWidth;
    }

    $scope.$watch('enabledSiteWidth', function (newval, oldval) {

        $scope.model.value.fixedWidth = newval === true ? true : false;

        if ($scope.model.value.fixedWidth == true) {
            $scope.siteWidthTextRight = "Yes";
            $scope.showSiteWidth = true;
        }
        else {
            $scope.siteWidthTextRight = "No";
            $scope.showSiteWidth = false;
        }

        if (newval !== oldval) {
            //run after DOM is loaded
            $timeout(function () {
                if (!alreadyDirty) {
                    var currForm = angularHelper.getCurrentForm($scope);
                    currForm.$setDirty();
                    alreadyDirty = true;
                }


            }, false);
        }

    }, true);

    $scope.$watch('enabledHeaderWidth', function (newval, oldval) {

        $scope.model.value.headerFixedWidth = newval === true ? true : false;

        if ($scope.model.value.headerFixedWidth == true) {
            $scope.headerWidthTextRight = "Yes";
            $scope.showHeaderWidth = true;
        }
        else {
            $scope.headerWidthTextRight = "No";
            $scope.showHeaderWidth = false;
        }

        if (newval !== oldval) {
            //run after DOM is loaded
            $timeout(function () {
                if (!alreadyDirty) {
                    var currForm = angularHelper.getCurrentForm($scope);
                    currForm.$setDirty();
                    alreadyDirty = true;
                }


            }, false);
        }

    }, true);
});
