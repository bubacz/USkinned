// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ThemeColors.Controller", function ($scope, overlayService) {

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

    //True will close tab
    $scope.bodyTabStyle = true;
    $scope.headerTabStyle = true;
    $scope.logoTabStyle = true;
    $scope.mainNavigationTabStyle = true;
    $scope.navigationDropdownTabStyle = true;
    $scope.secondaryNavigationTabStyle = true;
    $scope.footerTabStyle = true;
    $scope.contentTabStyle = true;
    $scope.buttonTabStyle = true;

    $scope.isLoaded = true;

    // Initialize the model
    if (!$scope.model.value || Object.keys($scope.model.value).length == 0) {
        $scope.model.value = {
            contentItems: [],
            buttonItems: [],
            bodyBackgroundStyle: "solid",
            bodyBackgroundClass: "body-bg body-bg-solid",
            bodyBackground: "#eeeeee",
            bodyBackground2: "#ffffff",
            bodyBackgroundGradientStyle: "linear",
            bodyBackgroundGradientDirection: "middleLeft",
            headerBackgroundStyle: "solid",
            headerBackgroundClass: "header-bg header-bg-solid",
            headerBackground: "#000000",
            headerBackground2: "#ffffff",
            headerBackgroundGradientStyle: "linear",
            headerBackgroundGradientDirection: "middleLeft",
            headerBorder: "#cccccc",
            headerHighlight: "#000000",
            headerText: "#000000",
            logoLink: "#ffffff",
            logoLinkHover: "#4e4e4e",
            mainNavigationLink: "#ffffff",
            mainNavigationLinkHover: "#6c6c6c",
            mainNavigationLinkActive: "#000000",
            secondaryNavLink: "#dfdfdf",
            secondaryNavLinkHover: "#6c6c6c",
            navDropdownBackgroundStyle: "solid",
            navDropdownBackgroundClass: "navigation-dropdown-bg navigation-dropdown-bg-solid",
            navDropdownBackground: "#d8d8d8",
            navDropdownBackground2: "#ffffff",
            navDropdownBackgroundGradientStyle: "linear",
            navDropdownBackgroundGradientDirection: "middleLeft",
            mainNavDropdownLink: "#000000",
            mainNavDropdownLinkHover: "#6c6c6c",
            mainNavDropdownLinkActive: "#6c6c6c",
            contentBackgroundStyle: "solid",
            contentBackgroundClass: "base-bg base-bg-solid",
            contentBackground: "#ffffff",
            contentBackground2: "#000000",
            contentBackgroundGradientStyle: "linear",
            contentBackgroundGradientDirection: "middleLeft",
            contentHeading: "#000000",
            contentSecondaryHeading: "#000000",
            contentText: "#000000",
            contentLink: "#000000",
            contentLinkHover: "#6c6c6c",
            contentBorder: "#000000",
            contentHighlightBackground: "#6c6c6c",
            contentHighlightText: "#ffffff",
            buttonBackgroundStyle: "solid",
            buttonBackgroundClass: "base-btn-bg base-btn-bg-solid",
            buttonBackground: "#ffffff",
            buttonBackground2: "#000000",
            buttonBackgroundGradientStyle: "linear",
            buttonBackgroundGradientDirection: "middleLeft",
            buttonText: "#000000",
            buttonBorder: "#000000",
            buttonBackgroundHoverStyle: "solid",
            buttonBackgroundHoverClass: "base-btn-bg-hover-solid",
            buttonBackgroundHover: "#000000",
            buttonBackgroundHover2: "#ffffff",
            buttonBackgroundHoverGradientStyle: "linear",
            buttonBackgroundHoverGradientDirection: "middleLeft",
            buttonTextHover: "#ffffff",
            buttonBorderHover: "#333333",
            footerBackgroundStyle: "solid",
            footerBackgroundClass: "footer-bg footer-bg-solid",
            footerBackground: "#d8d8d8",
            footerBackground2: "#ffffff",
            footerBackgroundGradientStyle: "linear",
            footerBackgroundGradientDirection: "middleLeft",
            footerBorder: "#acacac",
            footerHighlight: "#000000",
            footerText: "#333333",
            footerHeading: "#000000",
            footerSecondaryHeading: "#000000",
            footerLink: "#000000",
            footerLinkHover: "#6c6c6c"
        };
        $scope.model.value.contentItems.push({
            backgroundStyle: "solid",
            background: "#000000",
            background2: "#000000",
            backgroundGradientStyle: "linear",
            backgroundGradientDirection: "middleLeft",
            backgroundSwatch: getColor("solid","#000000","#000000","linear","middleLeft"),
            heading: "#ffffff",
            secondaryHeading: "#ffffff",
            text: "#eeeeee",
            link: "#ffffff",
            linkHover: "#cccccc",
            border: "#ffffff",
            highlightBackground: "#ffffff",
            highlightText: "#ffffff",
            tabStyle: true
        });

        var buttonBgSwatch = getColor("solid", "#000000", "#000000", "linear", "middleLeft");

        $scope.model.value.buttonItems.push({
            backgroundStyle: "solid",
            background: "#000000",
            background2: "#000000",
            backgroundGradientStyle: "linear",
            backgroundGradientDirection: "middleLeft",
            backgroundSwatch: buttonBgSwatch,
            backgroundValue: buttonBgSwatch.replace('background:', '').replace(';', ''),
            text: "#ffffff",
            border: "#ffffff",
            backgroundHoverStyle: "solid",
            backgroundHover: "#ffffff",
            backgroundHover2: "#ffffff",
            backgroundHoverGradientStyle: "linear",
            backgroundHoverGradientDirection: "middleLeft",
            backgroundHoverValue: getColor("solid", "#ffffff", "#ffffff", "linear", "middleLeft").replace('background:', '').replace(';', ''),
            textHover: "#000000",
            borderHover: "#000000",
            tabStyle: true
        });
    }
    else {

        if (!angular.isUndefined($scope.model.value.contentItems)) {
            //Loop contentItems and buttonItems to reset tabStyle to closed.
            $scope.model.value.contentItems.forEach(function (item, index) {
                item.tabStyle = true;
                //Load initial swatch colors and values
                item.backgroundSwatch = getColor(item.backgroundStyle,
                    item.background,
                    item.background2,
                    item.backgroundGradientStyle,
                    item.backgroundGradientDirection);
            });

        }

        if (!angular.isUndefined($scope.model.value.buttonItems)) {
            $scope.model.value.buttonItems.forEach(function (item, index) {
                item.tabStyle = true;
                //Load initial swatch colors and values
                item.backgroundSwatch = getColor(item.backgroundStyle,
                    item.background,
                    item.background2,
                    item.backgroundGradientStyle,
                    item.backgroundGradientDirection);
                item.backgroundValue = item.backgroundSwatch.replace('background:', '').replace(';', '');
                item.backgroundHoverValue = getColor(item.backgroundHoverStyle,
                    item.backgroundHover,
                    item.backgroundHover2,
                    item.backgroundHoverGradientStyle,
                    item.backgroundHoverGradientDirection).replace('background:', '').replace(';', '');
            });
        }
    }


    //Load initial swatch colors and values.
    $scope.bodyBackgroundSwatch = getColor($scope.model.value.bodyBackgroundStyle,
        $scope.model.value.bodyBackground,
        $scope.model.value.bodyBackground2,
        $scope.model.value.bodyBackgroundGradientStyle,
        $scope.model.value.bodyBackgroundGradientDirection);

    $scope.headerBackgroundSwatch = getColor($scope.model.value.headerBackgroundStyle,
        $scope.model.value.headerBackground,
        $scope.model.value.headerBackground2,
        $scope.model.value.headerBackgroundGradientStyle,
        $scope.model.value.headerBackgroundGradientDirection);

    $scope.navDropdownBackgroundSwatch = getColor($scope.model.value.navDropdownBackgroundStyle,
        $scope.model.value.navDropdownBackground,
        $scope.model.value.navDropdownBackground2,
        $scope.model.value.navDropdownBackgroundGradientStyle,
        $scope.model.value.navDropdownBackgroundGradientDirection);

    $scope.contentBackgroundSwatch = getColor($scope.model.value.contentBackgroundStyle,
        $scope.model.value.contentBackground,
        $scope.model.value.contentBackground2,
        $scope.model.value.contentBackgroundGradientStyle,
        $scope.model.value.contentBackgroundGradientDirection);

    $scope.buttonBackgroundSwatch = getColor($scope.model.value.buttonBackgroundStyle,
        $scope.model.value.buttonBackground,
        $scope.model.value.buttonBackground2,
        $scope.model.value.buttonBackgroundGradientStyle,
        $scope.model.value.buttonBackgroundGradientDirection);

    $scope.buttonBackgroundValue = $scope.buttonBackgroundSwatch.replace('background-color:', '').replace('background:', '').replace(';', '');

    $scope.buttonBackgroundHoverValue = getColor($scope.model.value.buttonBackgroundHoverStyle,
        $scope.model.value.buttonBackgroundHover,
        $scope.model.value.buttonBackgroundHover2,
        $scope.model.value.buttonBackgroundHoverGradientStyle,
        $scope.model.value.buttonBackgroundHoverGradientDirection).replace('background-color:', '').replace('background:', '').replace(';', '');

    $scope.footerBackgroundSwatch = getColor($scope.model.value.footerBackgroundStyle,
        $scope.model.value.footerBackground,
        $scope.model.value.footerBackground2,
        $scope.model.value.footerBackgroundGradientStyle,
        $scope.model.value.footerBackgroundGradientDirection);

    // Add a new content item
    $scope.addContentItem = function () {

        $scope.model.value.contentItems.push({
            backgroundStyle: "solid",
            background: "#ffffff",
            background2: "#000000",
            backgroundGradientStyle: "linear",
            backgroundGradientDirection: "middleLeft",
            backgroundSwatch: getColor("solid","#ffffff","#000000","linear","middleLeft"),
            heading: "#000000",
            secondaryHeading: "#000000",
            text: "#000000",
            link: "#000000",
            linkHover: "#6c6c6c",
            border: "#000000",
            highlightBackground: "#6c6c6c",
            highlightText: "#ffffff",
            tabStyle: false
        });
    }

    // Add a new button item
    $scope.addButtonItem = function () {

        var buttonBgSwatch = getColor("solid","#ffffff","#000000","linear","middleLeft");

        $scope.model.value.buttonItems.push({
            backgroundStyle: "solid",
            background: "#ffffff",
            background2: "#000000",
            backgroundGradientStyle: "linear",
            backgroundGradientDirection: "middleLeft",
            backgroundSwatch: buttonBgSwatch,
            backgroundValue: buttonBgSwatch.replace('background:', '').replace(';', ''),
            text: "#000000",
            border: "#000000",
            backgroundHoverStyle: "solid",
            backgroundHover: "#000000",
            backgroundHover2: "#ffffff",
            backgroundHoverGradientStyle: "linear",
            backgroundHoverGradientDirection: "middleLeft",
            backgroundHoverValue: getColor("solid", "#ffffff", "#000000", "linear", "middleLeft").replace('background:', '').replace(';', ''),
            textHover: "#ffffff",
            borderHover: "#333333",
            tabStyle: false
        });
    }

    // Remove content item
    $scope.removeContentItem = function (index) {
        const overlay = {
            title: "Delete",
            content: "Are you sure you want to delete this item?",
            closeButtonLabel: "cancel",
            submitButtonLabel: "Yes, delete",
            submitButtonStyle: "danger",
            close: function () {
                overlayService.close();
            },
            submit: function () {
                $scope.model.value.contentItems.splice(index, 1);
                overlayService.close();
            }
        };

        overlayService.open(overlay);
       
    }

    // Remove button item
    $scope.removeButtonItem = function (index) {

        const overlay = {
            title: "Delete",
            content: "Are you sure you want to delete this item?",
            closeButtonLabel: "cancel",
            submitButtonLabel: "Yes, delete",
            submitButtonStyle: "danger",
            close: function () {
                overlayService.close();
            },
            submit: function () {
                $scope.model.value.buttonItems.splice(index, 1);
                overlayService.close();
            }
        };

        overlayService.open(overlay);  
    }

    $scope.updateSwatchFromBackgroundStyle = function (event, cssClass, background1, background2, gradientStyle, gradientDirection, backgroundSwatch, index) {

        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.bodyBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.bodyBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "headerBackgroundSwatch":
                $scope.headerBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.headerBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.navDropdownBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.navDropdownBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "contentBackgroundSwatch":
                $scope.contentBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.contentBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "buttonBackgroundSwatch":
                $scope.buttonBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.buttonBackgroundValue = $scope.buttonBackgroundSwatch.replace('background:', '').replace(';', '');
                $scope.model.value.buttonBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "buttonBackgroundHoverSwatch":
                $scope.buttonBackgroundHoverValue = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection).replace('background:', '').replace(';', '');
                $scope.model.value.buttonBackgroundHoverClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "footerBackgroundSwatch":
                $scope.footerBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.footerBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "contentAdditionalBackground":
                $scope.model.value.contentItems[index].backgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonAdditionalBackground":
                $scope.model.value.buttonItems[index].backgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.buttonItems[index].backgroundValue = $scope.model.value.buttonItems[index].backgroundSwatch.replace('background:', '').replace(';', '');
                break;
            case "buttonAdditionalHoverBackground":
                $scope.model.value.buttonItems[index].backgroundHoverValue = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection).replace('background:', '').replace(';', '');
                break;
        }

    };

    $scope.updateSwatchFromGradientStyle = function (event, cssClass, backgroundStyle, background1, background2, gradientDirection, backgroundSwatch,index) {
        
        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.model.value.bodyBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.bodyBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.model.value.bodyBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "headerBackgroundSwatch":
                $scope.model.value.headerBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.headerBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.model.value.headerBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.model.value.navDropdownBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.navDropdownBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.model.value.navDropdownBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "contentBackgroundSwatch":
                $scope.model.value.contentBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.contentBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.model.value.contentBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "buttonBackgroundSwatch":
                $scope.model.value.buttonBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.buttonBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.buttonBackgroundValue = $scope.buttonBackgroundSwatch.replace('background:', '').replace(';', '');
                $scope.model.value.buttonBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "buttonBackgroundHoverSwatch":
                $scope.model.value.buttonBackgroundHoverGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.buttonBackgroundHoverValue = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection).replace('background:', '').replace(';', '');
                $scope.model.value.buttonBackgroundHoverClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "footerBackgroundSwatch":
                $scope.model.value.footerBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.footerBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.model.value.footerBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                break;
            case "contentAdditionalBackground":
                $scope.model.value.contentItems[index].backgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.model.value.contentItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                break;
            case "buttonAdditionalBackground":
                $scope.model.value.buttonItems[index].backgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.model.value.buttonItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.model.value.buttonItems[index].backgroundValue = $scope.model.value.buttonItems[index].backgroundSwatch.replace('background:', '').replace(';', '');
                break;
            case "buttonAdditionalHoverBackground":
                $scope.model.value.buttonItems[index].backgroundHoverGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.model.value.buttonItems[index].backgroundHoverValue = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection).replace('background:', '').replace(';', '');
                break;
        }

    };

    $scope.updateSwatchFromDirection = function (event, backgroundStyle, background1, background2, gradientStyle, backgroundSwatch, index) {

        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.bodyBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                break;
            case "headerBackgroundSwatch":
                $scope.headerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.navDropdownBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                break;
            case "contentBackgroundSwatch":
                $scope.contentBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                break;
            case "buttonBackgroundSwatch":
                $scope.buttonBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                $scope.buttonBackgroundValue = $scope.buttonBackgroundSwatch.replace('background:', '').replace(';', '');
                break;
            case "buttonBackgroundHoverSwatch":
                $scope.buttonBackgroundHoverValue = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value).replace('background:', '').replace(';', '');
                break;
            case "footerBackgroundSwatch":
                $scope.footerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                break;
            case "contentAdditionalBackground":
                $scope.model.value.contentItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                break;
            case "buttonAdditionalBackground":
                $scope.model.value.buttonItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                $scope.model.value.buttonItems[index].backgroundValue = $scope.model.value.buttonItems[index].backgroundSwatch.replace('background:', '').replace(';', '');
                break;
            case "buttonAdditionalHoverBackground":
                $scope.model.value.buttonItems[index].backgroundHoverValue = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value).replace('background:', '').replace(';', '');
                break;

        }
    };

    $scope.updateSwatchFromBackground = function (backgroundStyle, background1, background2, gradientStyle, gradientDirection, backgroundSwatch, index) {

        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.bodyBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "headerBackgroundSwatch":
                $scope.headerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.navDropdownBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "contentBackgroundSwatch":
                $scope.contentBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonBackgroundSwatch":
                $scope.buttonBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                $scope.buttonBackgroundValue = $scope.buttonBackgroundSwatch.replace('background:', '').replace(';', '');
                break;
            case "buttonBackgroundHoverSwatch":
                $scope.buttonBackgroundHoverValue = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection).replace('background:', '').replace(';', '');
                break;
            case "footerBackgroundSwatch":
                $scope.footerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "contentAdditionalBackground":
                $scope.model.value.contentItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonAdditionalBackground":
                $scope.model.value.buttonItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                $scope.model.value.buttonItems[index].backgroundValue = $scope.model.value.buttonItems[index].backgroundSwatch.replace('background:', '').replace(';', '');
                break;
            case "buttonAdditionalHoverBackground":
                $scope.model.value.buttonItems[index].backgroundHoverValue = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection).replace('background:', '').replace(';', '');
                break;
        }
    };


    function getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection) {
        var output = "";

        if (backgroundStyle == "gradient") {
            if (gradientStyle == "radial") {
                switch (gradientDirection) {
                    case "topLeft":
                        output = "radial-gradient(farthest-side at 0% 0%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "topCenter":
                        output = "radial-gradient(farthest-side at 50% 0%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "topRight":
                        output = "radial-gradient(farthest-side at 100% 0%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "middleLeft":
                        output = "radial-gradient(farthest-side at 0% 50%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "middleCenter":
                        output = "radial-gradient(" + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "middleRight":
                        output = "radial-gradient(farthest-side at 100% 50%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "bottomLeft":
                        output = "radial-gradient(farthest-side at 0% 100%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "bottomCenter":
                        output = "radial-gradient(farthest-side at 50% 100%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "bottomRight":
                        output = "radial-gradient(farthest-side at 100% 0%, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    default:
                        output = "radial-gradient(farthest-side at 0% 50%, " + background1 + " 0%, " + background2 + " 100%)";
                }

               
            }
            else {
                switch (gradientDirection) {
                    case "topLeft":
                        output = "linear-gradient(135deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "topCenter":
                        output = "linear-gradient(" + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "topRight":
                        output = "linear-gradient(225deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "middleLeft":
                        output = "linear-gradient(90deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "middleRight":
                        output = "linear-gradient(270deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "bottomLeft":
                        output = "linear-gradient(45deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "bottomCenter":
                        output = "linear-gradient(0deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    case "bottomRight":
                        output = "linear-gradient(315deg, " + background1 + " 0%, " + background2 + " 100%)";
                        break;
                    default:
                        output = "linear-gradient(90deg, " + background1 + " 0%, " + background2 + " 100%)";
                }
            }

            output = "background: " + output + ";";
        }
        else if (backgroundStyle == "solid") {
            output = "background:" + background1 + ";";
        }

        return output;
    }

    function getBackgroundClass(cssClass, backgroundStyle, gradientStyle) {
        var output = "";

        if (backgroundStyle == "gradient") {
            if (gradientStyle == "radial") {
                output = cssClass + "-radial";
            }
            else {
                output = cssClass + "-linear";
            }
        }
        else{
            output = cssClass + "-solid";
        }
        return output;
    }

    function resetIfMiddleCenter(gradientStyle, gradientDirection) {
        var output = "";

        if (gradientStyle == "linear" && gradientDirection == "middleCenter")
            output = "middleLeft";
        else
            output = gradientDirection;

        return output;
    }
});



angular.module('umbraco').directive('colorpicker', function () {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ngModel) {
            elem.spectrum();
            if (!ngModel) return;
            ngModel.$render = function () {

                var changeCalled;
                var originalColor;

                elem.spectrum({
                    showInput: true,
                    showInitial: true,
                    preferredFormat: "hex",
                    chooseText: "select",
                    color: ngModel.$viewValue,
                    show: function () {
                        changeCalled = false;
                        originalColor = ngModel.$viewValue;
                    },
                    move: function (c) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(c.toHexString());
                        });
                    },
                    hide: function (c) {
                        if (!changeCalled) {
                            ngModel.$setViewValue(originalColor);
                        }
                    },
                    change: function (c) {
                        scope.$apply(function () {
                            changeCalled = true;
                            ngModel.$setViewValue(c.toHexString());
                        });
                    }
                    
                });
            };
            
        }
    }
});