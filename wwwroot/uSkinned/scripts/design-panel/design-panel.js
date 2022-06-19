// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

$(document).ready(function () {

    $(window).bind('beforeunload', function () {
        //Message only displayed in older browsers, browser default message will be displayed otherwise
        return 'Are you sure you want to view a different page. Any changes you have made within the design panel will not be saved.';
    });

    //Open close design panel
    $(".usn-cms-manager.usn-cms-manager_editor_content .expand-usn-cms-manager-button").click(function () {
        $("html").toggleClass('open_usn-cms-manager_content');
        $("html").removeClass('open_usn-cms-manager_design');
    });
    $(".usn-cms-manager.usn-cms-manager_editor_design .expand-usn-cms-manager-button").click(function () {
        $("html").toggleClass('open_usn-cms-manager_design');
        $("html").removeClass('open_usn-cms-manager_content');
    });


    //Open close tabs on design panel
    $('.usn-cms-tabs-item').click(function (e) {
        //Toggle tab link
        $(this).addClass('usn-cms-tabs-item-grouping-open').siblings().removeClass('usn-cms-tabs-item-grouping-open');

        //Toggle target tab
        $($(this).attr('href')).addClass('usn-grouping-open').siblings().removeClass('usn-grouping-open');
    });

    $('.usn-cms-color-tabs-item').click(function (e) {
        //Toggle tab link
        $(this).addClass('usn-cms-color-tabs-item-open').siblings().removeClass('usn-cms-color-tabs-item-open');

        //Toggle target tab
        $($(this).attr('href')).addClass('usn-tab-pane-open').siblings().removeClass('usn-tab-pane-open');
    });

    // Modal focus
    $('.modal').on('shown.bs.modal', function (e) {
		$('.slides').slick('setPosition');
		lazyframe('.lazyframe-video');
		$(document).off('focusin.modal');
	})

});

var designApp = angular.module('designApp', ['ui.sortable']);

designApp.controller('DesignAppController', function ($scope, $http, $timeout) {

    $scope.stylesPromiseComplete = false;
    $scope.googleFontsPromiseComplete = false;
    $scope.getStylesError = false;
    $scope.getGoogleFontsError = false;
    $scope.savingStatus = 'Ready';
    $scope.buttonDisabled = false;
    $scope.saveButtonText = 'Save and publish';
    $scope.getLoggedOutError = false;
    $scope.getGeneralSaveError = false;

    const googleJson = '/uSkinned/resources/google-fonts.json';
    var googleFontItemsArray = [];

    //Note: True will close tab

    //Layout section
    $scope.headerLayoutTabStyle = true;
    $scope.burgerLayoutTabStyle = true;
    $scope.arrowsLayoutTabStyle = true;
    $scope.headingLayoutTabStyle = true;
    $scope.linksLayoutTabStyle = true;
    $scope.linksLayoutTabStyle = true;
    $scope.miscLayoutTabStyle = true;

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

    //Color section
    $scope.bodyColorTabStyle = true;
    $scope.headerColorTabStyle = true;
    $scope.logoColorTabStyle = true;
    $scope.mainNavigationColorTabStyle = true;
    $scope.navigationDropdownColorTabStyle = true;
    $scope.secondaryNavigationColorTabStyle = true;
    $scope.footerColorTabStyle = true;
    $scope.contentColorTabStyle = true;
    $scope.buttonColorTabStyle = true;

    //Spacing section
    $scope.siteSpacingTabStyle = true;
    $scope.headerSpacingTabStyle = true;
    $scope.logoSpacingTabStyle = true;
    $scope.generalSpacingTabStyle = true;
    $scope.componentsSpacingTabStyle = true;
    $scope.formsSpacingTabStyle = true;
    $scope.buttonsSpacingTabStyle = true;
    $scope.modalSpacingTabStyle = true;
    $scope.showSiteWidth = false;
    $scope.showHeaderWidth = false;

    //Font section
    $scope.bodyFontTabStyle = true;
    $scope.h1FontTabStyle = true;
    $scope.h2FontTabStyle = true;
    $scope.h3FontTabStyle = true;
    $scope.h4FontTabStyle = true;
    $scope.h5FontTabStyle = true;
    $scope.h6FontTabStyle = true;
    $scope.headingSmallFontTabStyle = true;
    $scope.headingMediumFontTabStyle = true;
    $scope.headingLargeFontTabStyle = true;
    $scope.secHeadingSmallFontTabStyle = true;
    $scope.secHeadingMediumFontTabStyle = true;
    $scope.secHeadingLargeFontTabStyle = true;
    $scope.introSmallFontTabStyle = true;
    $scope.introMediumFontTabStyle = true;
    $scope.introLargeFontTabStyle = true;
    $scope.blockquoteSmallFontTabStyle = true;
    $scope.blockquoteMediumFontTabStyle = true;
    $scope.blockquoteLargeFontTabStyle = true;
    $scope.buttonSmallFontTabStyle = true;
    $scope.buttonMediumFontTabStyle = true;
    $scope.buttonLargeFontTabStyle = true;
    $scope.mainNavFontTabStyle = true;
    $scope.mainNavDropdownFontTabStyle = true;
    $scope.secondaryNavFontTabStyle = true;
    $scope.subNavFontTabStyle = true;
    $scope.footerNavFontTabStyle = true;
    $scope.breadcrumbNavFontTabStyle = true;
    $scope.anchorNavFontTabStyle = true;
    $scope.accordionTabNavFontTabStyle = true;
    $scope.logoFontTabStyle = true;

    $scope.editText = false;

    $scope.systemFonts = [
        {
            fontType: "system",
            fontName: "Arial",
            fontCategory: "Helvetica, sans-serif",
            fontImport: "",
            fontFamily: "Arial, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Comic Sans",
            fontCategory: "Comic Sans MS, cursive",
            fontImport: "",
            fontFamily: "Comic Sans, cursive",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Courier New",
            fontCategory: "Courier, monospace",
            fontImport: "",
            fontFamily: "Courier New, monospace",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Georgia",
            fontCategory: "serif",
            fontImport: "",
            fontFamily: "Georgia, serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Helvetica",
            fontCategory: "Arial, sans-serif",
            fontImport: "",
            fontFamily: "Helvetica, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Impact",
            fontCategory: "Charcoal, san-serif",
            fontImport: "",
            fontFamily: "Impact, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400"]
            },
            {
                styleName: "italic",
                styleWeight: ["400"]
            }]
        },
        {
            fontType: "system",
            fontName: "Lucida Console",
            fontCategory: "Monaco, monospace",
            fontImport: "",
            fontFamily: "Lucida Console, monospace",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Lucida Sans Unicode",
            fontCategory: "Lucida Grande, san-serif",
            fontImport: "",
            fontFamily: "Lucida Sans Unicode, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Palatino Linotype",
            fontCategory: "Book Antiqua,Palatino, serif",
            fontImport: "",
            fontFamily: "Palatino Linotype, serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Tahoma",
            fontCategory: "Geneva, san-serif",
            fontImport: "",
            fontFamily: "Tahoma, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Times New Roman",
            fontCategory: "Times, serif",
            fontImport: "",
            fontFamily: "Times New Roman, serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Trebuchet MS",
            fontCategory: "Helvetica, san-serif",
            fontImport: "",
            fontFamily: "Trebuchet MS, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        },
        {
            fontType: "system",
            fontName: "Verdana",
            fontCategory: "Geneva, san-serif",
            fontImport: "",
            fontFamily: "Verdana, san-serif",
            fontStyle: [{
                styleName: "normal",
                styleWeight: ["400", "700"]
            },
            {
                styleName: "italic",
                styleWeight: ["400", "700"]
            }]
        }
    ];

    var getStylesPromise = $http.get('/umbraco/backoffice/api/USNDesignPanel/GetStyles',
        {
            params: {
                websiteStyleId: websiteStyleId
            }
        }
    );

    getStylesPromise.then(

        function (payload) {
            $scope.styles = payload.data;

            $scope.styles.themeColors.contentItems.forEach(function (item, index) {
                item.tabStyle = true;
                //Load initial swatch colors and values
                item.backgroundSwatch = getColor(item.backgroundStyle,
                    item.background,
                    item.background2,
                    item.backgroundGradientStyle,
                    item.backgroundGradientDirection);
            });

            $scope.styles.themeColors.buttonItems.forEach(function (item, index) {
                item.tabStyle = true;
                //Load initial swatch colors and values
                item.backgroundSwatch = getColor(item.backgroundStyle,
                    item.background,
                    item.background2,
                    item.backgroundGradientStyle,
                    item.backgroundGradientDirection);
            });

            $scope.styles.themeFonts.fontItems.forEach(function (item, index) {
                item.tabStyle = true;
                //Required for upgrades from 1.0.3. New properties added for adobe fonts
                if (!item.hasOwnProperty('adobeProjectId')) {
                    adobeFontImport = '';
                    adobeProjectId = '';
                    adobeFontFamily = '';
                    adobeFontStyle = '';
                    adobeFontWeight = '';
                    adobeConfirmationError = false;
                    adobeFontConfirmed = false;
                    adobeButtonDisabled = true;
                } 
            });

            var selectedHeadingItems = !$scope.styles.themeLayout.headingStyles ? "" : $scope.styles.themeLayout.headingStyles.split(',');

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

            //Load initial swatch colors.
            $scope.bodyBackgroundSwatch = getColor($scope.styles.themeColors.bodyBackgroundStyle,
                $scope.styles.themeColors.bodyBackground,
                $scope.styles.themeColors.bodyBackground2,
                $scope.styles.themeColors.bodyBackgroundGradientStyle,
                $scope.styles.themeColors.bodyBackgroundGradientDirection);

            $scope.headerBackgroundSwatch = getColor($scope.styles.themeColors.headerBackgroundStyle,
                $scope.styles.themeColors.headerBackground,
                $scope.styles.themeColors.headerBackground2,
                $scope.styles.themeColors.headerBackgroundGradientStyle,
                $scope.styles.themeColors.headerBackgroundGradientDirection);

            $scope.navDropdownBackgroundSwatch = getColor($scope.styles.themeColors.navDropdownBackgroundStyle,
                $scope.styles.themeColors.navDropdownBackground,
                $scope.styles.themeColors.navDropdownBackground2,
                $scope.styles.themeColors.navDropdownBackgroundGradientStyle,
                $scope.styles.themeColors.navDropdownBackgroundGradientDirection);

            $scope.contentBackgroundSwatch = getColor($scope.styles.themeColors.contentBackgroundStyle,
                $scope.styles.themeColors.contentBackground,
                $scope.styles.themeColors.contentBackground2,
                $scope.styles.themeColors.contentBackgroundGradientStyle,
                $scope.styles.themeColors.contentBackgroundGradientDirection);

            $scope.buttonBackgroundSwatch = getColor($scope.styles.themeColors.buttonBackgroundStyle,
                $scope.styles.themeColors.buttonBackground,
                $scope.styles.themeColors.buttonBackground2,
                $scope.styles.themeColors.buttonBackgroundGradientStyle,
                $scope.styles.themeColors.buttonBackgroundGradientDirection);

            $scope.buttonBackgroundHoverSwatch = getColor($scope.styles.themeColors.buttonBackgroundHoverStyle,
                $scope.styles.themeColors.buttonBackgroundHover,
                $scope.styles.themeColors.buttonBackgroundHover2,
                $scope.styles.themeColors.buttonBackgroundHoverGradientStyle,
                $scope.styles.themeColors.buttonBackgroundHoverGradientDirection);

            $scope.footerBackgroundSwatch = getColor($scope.styles.themeColors.footerBackgroundStyle,
                $scope.styles.themeColors.footerBackground,
                $scope.styles.themeColors.footerBackground2,
                $scope.styles.themeColors.footerBackgroundGradientStyle,
                $scope.styles.themeColors.footerBackgroundGradientDirection);



            $scope.stylesPromiseComplete = true;
        },
        function (errorPayLoad) {
            $scope.stylesPromiseComplete = true;
            $scope.getStylesError = true;

        }
    );

    var getGoogleFontsPromise = $http.get(googleJson,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    getGoogleFontsPromise.then(function (response) {
        if (response !== null && response !== undefined && response.data !== undefined) {

            angular.forEach(response.data,
                function (font, fontKey) {
                    var fontStyles = getGoogleFontStyles(font.variants);
                    var importOptions = getImportOptions(fontStyles);
                    var font = {
                        fontType: "google",
                        fontName: fontKey,
                        fontCategory: font.category,
                        fontImport: "@import url('https://fonts.googleapis.com/css?family=" + fontKey + importOptions + "&display=swap');",
                        fontFamily: fontKey + ", " + font.category,
                        fontStyle: fontStyles
                    };
                    googleFontItemsArray.push(font);
                });

            $scope.googleFonts = googleFontItemsArray;
            $scope.googleFontsPromiseComplete = true;
        }
        else {
            $scope.googleFontsPromiseComplete = true;
            $scope.getGoogleFontsError = true;
        }

    });

    $scope.updateCssVariable = function (cssVarName, value) {
        document.documentElement.style.setProperty(cssVarName, value);
    };

    $scope.updateFontVariables = function (cssVarName, value) {

        if (value.fontType == 'adobe' && value.adobeFontConfirmed) {
            document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-name", value.adobeFontFamily);
            document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-weight", value.adobeFontWeight);
            document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-style", value.adobeFontStyle);
        }
        else {
            document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-name", "'" + value.font.fontName + "', " + value.font.fontCategory);
            document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-weight", value.fontWeight);
            document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-style", value.fontStyle.styleName);
        }
    };

    $scope.resetCSSVariable = function (cssVarName, index) {
        document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-name", "'" + $scope.styles.themeFonts.fontItems[index].font.fontName + "', " + $scope.styles.themeFonts.fontItems[index].font.fontCategory);
        document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-weight", $scope.styles.themeFonts.fontItems[index].fontWeight);
        document.documentElement.style.setProperty("--" + cssVarName + "-typography_font-style", $scope.styles.themeFonts.fontItems[index].fontStyle.styleName);
    };

    // Add a new content item
    $scope.addContentItem = function () {

        $scope.styles.themeColors.contentItems.push({
            backgroundStyle: "solid",
            background: "#ffffff",
            background2: "#000000",
            backgroundGradientStyle: "linear",
            backgroundGradientDirection: "middleLeft",
            backgroundSwatch: getColor("solid", "#ffffff", "#000000", "linear", "middleLeft"),
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

        var buttonBgSwatch = getColor("solid", "#ffffff", "#000000", "linear", "middleLeft");

        $scope.styles.themeColors.buttonItems.push({
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

    // Add a new font item
    $scope.addFontItem = function () {
        $scope.styles.themeFonts.fontItems.push({
            fontType: "system",
            font: $scope.systemFonts[0],
            fontStyle: $scope.systemFonts[0].fontStyle[0],
            fontWeight: $scope.systemFonts[0].fontStyle[0].styleWeight[0],
            tabStyle: false,
            style: $scope.systemFonts[0].fontName + ", " + $scope.systemFonts[0].fontCategory + ", " + $scope.systemFonts[0].fontStyle[0].styleName + ", " + $scope.systemFonts[0].fontStyle[0].styleWeight[0],
            adobeFontImport: '',
            adobeProjectId: '',
            adobeFontFamily: '',
            adobeFontStyle: '',
            adobeFontWeight: '',
            adobeConfirmationError: false,
            adobeFontConfirmed: false,
            adobeButtonDisabled: true,
            guid: guid()
        });
    }

    // Remove font item
    $scope.removeFontItem = function (index) {

        if ($scope.styles.themeFonts.fontItems.length > 1) {
            if (confirm("Are you sure you want to delete this item?")) {
                setDefaultFonts(index);
            }
        }
        else
            alert("You cannot delete this font.\nA minimum of 1 font must be available.");
    }

    $scope.fontFamilyChange = function (index) {

        $scope.styles.themeFonts.fontItems[index].fontStyle = $scope.styles.themeFonts.fontItems[index].font.fontStyle[0];
        $scope.styles.themeFonts.fontItems[index].fontWeight = $scope.styles.themeFonts.fontItems[index].font.fontStyle[0].styleWeight[0];

    }

    $scope.fontStyleChange = function (index) {
        //need to update fontStyle object with correct values based on selected
        for (i = 0; i < $scope.styles.themeFonts.fontItems[index].font.fontStyle.length; i++) {
            if ($scope.styles.themeFonts.fontItems[index].font.fontStyle[i].styleName == $scope.styles.themeFonts.fontItems[index].fontStyle.styleName) {
                $scope.styles.themeFonts.fontItems[index].fontStyle = $scope.styles.themeFonts.fontItems[index].font.fontStyle[i];
                break;
            }
        }

        $scope.styles.themeFonts.fontItems[index].fontWeight = $scope.styles.themeFonts.fontItems[index].fontStyle.styleWeight[0];
    }

    //Update font dropdowns
    $scope.updateTypographyFontDropdowns = function (index, fontType) {
        if (fontType != 'adobe')
            $scope.styles.themeFonts.fontItems[index].style = $scope.styles.themeFonts.fontItems[index].font.fontFamily + ", " + $scope.styles.themeFonts.fontItems[index].fontStyle.styleName + ", " + $scope.styles.themeFonts.fontItems[index].fontWeight;
        else
            $scope.styles.themeFonts.fontItems[index].style = $scope.styles.themeFonts.fontItems[index].adobeFontConfirmed ? $scope.styles.themeFonts.fontItems[index].adobeFontFamily + ", " + $scope.styles.themeFonts.fontItems[index].adobeFontStyle + ", " + $scope.styles.themeFonts.fontItems[index].adobeFontWeight : "ADOBE FONT NOT CONFIRMED";

        //This is a fix regarding issue with watches (https://docs.angularjs.org/api/ng/directive/ngOptions)
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.bodyFont.guid) {
            $scope.styles.themeFonts.bodyFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.h1Font.guid) {
            $scope.styles.themeFonts.h1Font = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.h2Font.guid) {
            $scope.styles.themeFonts.h2Font = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.h3Font.guid) {
            $scope.styles.themeFonts.h3Font = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.h4Font.guid) {
            $scope.styles.themeFonts.h4Font = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.h5Font.guid) {
            $scope.styles.themeFonts.h5Font = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.h6Font.guid) {
            $scope.styles.themeFonts.h6Font = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.headingSmallFont.guid) {
            $scope.styles.themeFonts.headingSmallFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.headingMediumFont.guid) {
            $scope.styles.themeFonts.headingMediumFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.headingLargeFont.guid) {
            $scope.styles.themeFonts.headingLargeFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.secHeadingSmallFont.guid) {
            $scope.styles.themeFonts.secHeadingSmallFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.secHeadingMediumFont.guid) {
            $scope.styles.themeFonts.secHeadingMediumFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.secHeadingLargeFont.guid) {
            $scope.styles.themeFonts.secHeadingLargeFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.introSmallFont.guid) {
            $scope.styles.themeFonts.introSmallFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.introMediumFont.guid) {
            $scope.styles.themeFonts.introMediumFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.introLargeFont.guid) {
            $scope.styles.themeFonts.introLargeFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.blockquoteSmallFont.guid) {
            $scope.styles.themeFonts.blockquoteSmallFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.blockquoteMediumFont.guid) {
            $scope.styles.themeFonts.blockquoteMediumFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.blockquoteLargeFont.guid) {
            $scope.styles.themeFonts.blockquoteLargeFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.buttonSmallFont.guid) {
            $scope.styles.themeFonts.buttonSmallFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.buttonMediumFont.guid) {
            $scope.styles.themeFonts.buttonMediumFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.buttonLargeFont.guid) {
            $scope.styles.themeFonts.buttonLargeFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.mainNavFont.guid) {
            $scope.styles.themeFonts.mainNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.mainNavDropdownFont.guid) {
            $scope.styles.themeFonts.mainNavDropdownFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.secondaryNavFont.guid) {
            $scope.styles.themeFonts.secondaryNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.subNavFont.guid) {
            $scope.styles.themeFonts.subNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.footerNavFont.guid) {
            $scope.styles.themeFonts.footerNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.breadcrumbNavFont.guid) {
            $scope.styles.themeFonts.breadcrumbNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.anchorNavFont.guid) {
            $scope.styles.themeFonts.anchorNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.accordionTabNavFont.guid) {
            $scope.styles.themeFonts.accordionTabNavFont = $scope.styles.themeFonts.fontItems[index];
        }
        if ($scope.styles.themeFonts.fontItems[index].guid == $scope.styles.themeFonts.logoFont.guid) {
            $scope.styles.themeFonts.logoFont = $scope.styles.themeFonts.fontItems[index];
        }

    }

    $scope.updateFontFields = function (index, event) {

        if (event.target.value === "system" && $scope.styles.themeFonts.fontItems[index].fontType !== "system") {
            $scope.styles.themeFonts.fontItems[index].font = $scope.systemFonts[0];
            $scope.styles.themeFonts.fontItems[index].fontStyle = $scope.systemFonts[0].fontStyle[0];
            $scope.styles.themeFonts.fontItems[index].fontWeight = $scope.systemFonts[0].fontStyle[0].styleWeight[0];
        }
        else if (event.target.value === "google" && $scope.styles.themeFonts.fontItems[index].fontType !== "google") {
            $scope.styles.themeFonts.fontItems[index].font = $scope.googleFonts[0];
            $scope.styles.themeFonts.fontItems[index].fontStyle = $scope.googleFonts[0].fontStyle[0];
            $scope.styles.themeFonts.fontItems[index].fontWeight = $scope.googleFonts[0].fontStyle[0].styleWeight[0];
        }
        else if (event.target.value === "adobe" && $scope.styles.themeFonts.fontItems[index].fontType !== "adobe") {
            //reset font dropdowns to system
            $scope.styles.themeFonts.fontItems[index].font = $scope.systemFonts[0];
            $scope.styles.themeFonts.fontItems[index].fontStyle = $scope.systemFonts[0].fontStyle[0];
            $scope.styles.themeFonts.fontItems[index].fontWeight = $scope.systemFonts[0].fontStyle[0].styleWeight[0];
        }

        $scope.updateTypographyFontDropdowns(index, event.target.value);
    };

    $scope.confirmAdobeFontSettings = function (index, event) {
        
        var fontUrl = "https://use.typekit.net/" + ($scope.styles.themeFonts.fontItems[index].adobeProjectId).trim() + ".css"
        if (UrlExist(fontUrl)) {
            $scope.styles.themeFonts.fontItems[index].adobeFontConfirmed = true;
            $scope.styles.themeFonts.fontItems[index].adobeConfirmationError = false;
            $scope.styles.themeFonts.fontItems[index].adobeFontImport = "@import url('https://use.typekit.net/" + ($scope.styles.themeFonts.fontItems[index].adobeProjectId).trim() + ".css');";

            $scope.updateTypographyFontDropdowns(index, "adobe");
        }
        else {
            $scope.styles.themeFonts.fontItems[index].adobeConfirmationError = true;
            $scope.styles.themeFonts.fontItems[index].adobeFontConfirmed = false;

        }
    };

    $scope.resetAdobeFontSettings = function (index, event) {
        event.preventDefault();
        $scope.styles.themeFonts.fontItems[index].adobeFontImport = '';
        $scope.styles.themeFonts.fontItems[index].adobeProjectId = '';
        $scope.styles.themeFonts.fontItems[index].adobeFontFamily = '';
        $scope.styles.themeFonts.fontItems[index].adobeFontStyle = '';
        $scope.styles.themeFonts.fontItems[index].adobeFontWeight = '';
        $scope.styles.themeFonts.fontItems[index].adobeFontConfirmed = false;
        $scope.styles.themeFonts.fontItems[index].adobeConfirmationError = false;
        $scope.styles.themeFonts.fontItems[index].adobeButtonDisabled = true;
        $scope.updateTypographyFontDropdowns(index, "adobe");

        if ($scope.styles.themeFonts.bodyFont.fontType == 'adobe')
            $scope.resetCSSVariable('body', index);

        if ($scope.styles.themeFonts.h1Font.fontType == 'adobe')
            $scope.resetCSSVariable('h1', index);

        if ($scope.styles.themeFonts.h2Font.fontType == 'adobe')
            $scope.resetCSSVariable('h2', index);

        if ($scope.styles.themeFonts.h3Font.fontType == 'adobe')
            $scope.resetCSSVariable('h3', index);

        if ($scope.styles.themeFonts.h4Font.fontType == 'adobe')
            $scope.resetCSSVariable('h4', index);

        if ($scope.styles.themeFonts.h5Font.fontType == 'adobe')
            $scope.resetCSSVariable('h5', index);

        if ($scope.styles.themeFonts.h6Font.fontType == 'adobe')
            $scope.resetCSSVariable('h6', index);

        if ($scope.styles.themeFonts.headingSmallFont.fontType == 'adobe')
            $scope.resetCSSVariable('p-heading_small', index);

        if ($scope.styles.themeFonts.headingMediumFont.fontType == 'adobe')
            $scope.resetCSSVariable('p-heading', index);

        if ($scope.styles.themeFonts.headingLargeFont.fontType == 'adobe')
            $scope.resetCSSVariable('p-heading_large', index);

        if ($scope.styles.themeFonts.secHeadingSmallFont.fontType == 'adobe')
            $scope.resetCSSVariable('secondary-heading_small', index);

        if ($scope.styles.themeFonts.secHeadingMediumFont.fontType == 'adobe')
            $scope.resetCSSVariable('secondary-heading', index);

        if ($scope.styles.themeFonts.secHeadingLargeFont.fontType == 'adobe')
            $scope.resetCSSVariable('secondary-heading_large', index);

        if ($scope.styles.themeFonts.introSmallFont.fontType == 'adobe')
            $scope.resetCSSVariable('p-intro_small', index);

        if ($scope.styles.themeFonts.introMediumFont.fontType == 'adobe')
            $scope.resetCSSVariable('p-intro', index);

        if ($scope.styles.themeFonts.introLargeFont.fontType == 'adobe')
            $scope.resetCSSVariable('p-intro_large', index);
        
        if ($scope.styles.themeFonts.blockquoteSmallFont.fontType == 'adobe')
            $scope.resetCSSVariable('blockquote_small', index);

        if ($scope.styles.themeFonts.blockquoteMediumFont.fontType == 'adobe')
            $scope.resetCSSVariable('blockquote', index);

        if ($scope.styles.themeFonts.blockquoteLargeFont.fontType == 'adobe')
            $scope.resetCSSVariable('blockquote_large', index);

        if ($scope.styles.themeFonts.buttonSmallFont.fontType == 'adobe')
            $scope.resetCSSVariable('btn_small', index);

        if ($scope.styles.themeFonts.buttonMediumFont.fontType == 'adobe')
            $scope.resetCSSVariable('btn', index);

        if ($scope.styles.themeFonts.buttonLargeFont.fontType == 'adobe')
            $scope.resetCSSVariable('btn_large', index);

        if ($scope.styles.themeFonts.mainNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('main-navigation', index);

        if ($scope.styles.themeFonts.secondaryNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('secondary-navigation', index);

        if ($scope.styles.themeFonts.mainNavDropdownFont.fontType == 'adobe')
            $scope.resetCSSVariable('main-navigation_dropdowns', index);

        if ($scope.styles.themeFonts.subNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('sub-navigation', index);

        if ($scope.styles.themeFonts.footerNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('footer-navigation', index);

        if ($scope.styles.themeFonts.breadcrumbNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('breadcrumb-navigation', index);

        if ($scope.styles.themeFonts.anchorNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('anchor-navigation', index);

        if ($scope.styles.themeFonts.accordionTabNavFont.fontType == 'adobe')
            $scope.resetCSSVariable('acc-tab', index);

        if ($scope.styles.themeFonts.logoFont.fontType == 'adobe')
            $scope.resetCSSVariable('logo', index);
    };

    $scope.validateAdobeFields = function (index) {
        if ($scope.styles.themeFonts.fontItems[index].adobeProjectId != '' &&
            $scope.styles.themeFonts.fontItems[index].adobeFontFamily != '' &&
            $scope.styles.themeFonts.fontItems[index].adobeFontStyle != '' &&
            $scope.styles.themeFonts.fontItems[index].adobeFontWeight != '')
            $scope.styles.themeFonts.fontItems[index].adobeButtonDisabled = false;
        else
            $scope.styles.themeFonts.fontItems[index].adobeButtonDisabled = true;
    };


    $scope.getFonts = function (value) {
        if (value === 'google')
            return $scope.googleFonts;
        else if (value === 'system')
            return $scope.systemFonts;
        else if (value === 'adobe')
            return $scope.systemFonts;
    };

    $scope.updateDesign = function () {
        $scope.saveButtonText = 'Saving design changes';
        $scope.savingStatus = 'Saving';
        $scope.buttonDisabled = true;

        if ($scope.styles.themeLayout.headingStyles === null || $scope.styles.themeLayout.headingStyles === undefined) {
            $scope.styles.themeLayout.headingStyles = [];
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
        $scope.styles.themeLayout.headingStyles = selectedStyles.replace(/(^,)|(,$)/g, "");

        $http({
            method: 'POST',
            url: '/umbraco/backoffice/api/USNDesignPanel/UpdateStyles',
            data: $scope.styles,
            params: { websiteStyleId: websiteStyleId }
        }).then(

            function successCallback(response) {
                $scope.saveButtonText = 'Saved';
                $scope.savingStatus = 'Saved';
                $scope.buttonDisabled = true;

                $timeout(function () {
                    $scope.saveButtonText = 'Save and publish';
                    $scope.savingStatus = 'Ready'
                    $scope.buttonDisabled = false;
                }, 2000);
            },
            function errorCallback(response) {

                if (response.status === 401) {
                    getLoggedOutError = true;
                }
                else {
                    getGeneralSaveError = true;
                }
            });

        
    };

    $scope.updateSwatchFromBackgroundStyle = function (event, cssClass, background1, background2, gradientStyle, gradientDirection, backgroundSwatch, index) {

        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.bodyBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.styles.themeColors.bodyBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "headerBackgroundSwatch":
                $scope.headerBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.styles.themeColors.headerBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.navDropdownBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.styles.themeColors.navDropdownBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "contentBackgroundSwatch":
                $scope.contentBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.styles.themeColors.contentBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "buttonBackgroundSwatch":
                $scope.buttonBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.styles.themeColors.buttonBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "buttonBackgroundHoverSwatch":
                UpdateGradientStyleClass("baseButtonHover", event.target.value, gradientStyle);
                $scope.styles.themeColors.buttonBackgroundHoverClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "footerBackgroundSwatch":
                $scope.footerBackgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                $scope.styles.themeColors.footerBackgroundClass = getBackgroundClass(cssClass, event.target.value, gradientStyle);
                break;
            case "contentAdditionalBackground":
                UpdateGradientStyleClass("content", event.target.value, gradientStyle, index);
                $scope.styles.themeColors.contentItems[index].backgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonAdditionalBackground":
                UpdateGradientStyleClass("button", event.target.value, gradientStyle, index);
                $scope.styles.themeColors.buttonItems[index].backgroundSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonAdditionalHoverBackground":
                UpdateGradientStyleClass("buttonHover", event.target.value, gradientStyle, index);
                $scope.styles.themeColors.buttonItems[index].backgroundHoverSwatch = getColor(event.target.value, background1, background2, gradientStyle, gradientDirection);
                break;
        }

    };

    $scope.updateSwatchFromGradientStyle = function (event, cssClass, backgroundStyle, background1, background2, gradientDirection, backgroundSwatch, index) {

        var backgroundStyleVariables = getBackgroundStyleVariables(backgroundStyle, event.target.value, gradientDirection);

        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.styles.themeColors.bodyBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.bodyBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.styles.themeColors.bodyBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--body-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--body-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--body-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "headerBackgroundSwatch":
                $scope.styles.themeColors.headerBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.headerBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.styles.themeColors.headerBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--header-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--header-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--header-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.styles.themeColors.navDropdownBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.navDropdownBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.styles.themeColors.navDropdownBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--navigation-dropdown-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--navigation-dropdown-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--navigation-dropdown-angle", backgroundStyleVariables.Angle);
                break;
            case "contentBackgroundSwatch":
                $scope.styles.themeColors.contentBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.contentBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.styles.themeColors.contentBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--base-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--base-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--base-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonBackgroundSwatch":
                $scope.styles.themeColors.buttonBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.buttonBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.styles.themeColors.buttonBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--base-btn-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--base-btn-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--base-btn-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonBackgroundHoverSwatch":
                UpdateGradientStyleClass("baseButtonHover", backgroundStyle, event.target.value);
                $scope.styles.themeColors.buttonBackgroundHoverGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.styles.themeColors.buttonBackgroundHoverClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--base-btn-bg-hover-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--base-btn-bg-hover-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--base-btn-bg-hover-angle", backgroundStyleVariables.Angle);
                break;
            case "footerBackgroundSwatch":
                $scope.styles.themeColors.footerBackgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.footerBackgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                $scope.styles.themeColors.footerBackgroundClass = getBackgroundClass(cssClass, backgroundStyle, event.target.value);
                document.documentElement.style.setProperty("--footer-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--footer-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--footer-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "contentAdditionalBackground":
                UpdateGradientStyleClass("content", backgroundStyle, event.target.value, index);
                $scope.styles.themeColors.contentItems[index].backgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.styles.themeColors.contentItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonAdditionalBackground":
                UpdateGradientStyleClass("button", backgroundStyle, event.target.value, index);
                $scope.styles.themeColors.buttonItems[index].backgroundGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.styles.themeColors.buttonItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonAdditionalHoverBackground":
                UpdateGradientStyleClass("buttonHover", backgroundStyle, event.target.value, index);
                $scope.styles.themeColors.buttonItems[index].backgroundHoverGradientDirection = resetIfMiddleCenter(event.target.value, gradientDirection);
                $scope.styles.themeColors.buttonItems[index].backgroundHoverSwatch = getColor(backgroundStyle, background1, background2, event.target.value, gradientDirection);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-hover-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-hover-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-hover-angle", backgroundStyleVariables.Angle);
                break;
        }

    };

    $scope.updateSwatchFromDirection = function (event, backgroundStyle, background1, background2, gradientStyle, backgroundSwatch, index) {
        var backgroundStyleVariables = getBackgroundStyleVariables(backgroundStyle, gradientStyle, event.target.value);
        switch (backgroundSwatch) {
            case "bodyBackgroundSwatch":
                $scope.bodyBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--body-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--body-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--body-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "headerBackgroundSwatch":
                $scope.headerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--header-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--header-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--header-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "navDropdownBackgroundSwatch":
                $scope.navDropdownBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--navigation-dropdown-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--navigation-dropdown-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--navigation-dropdown-angle", backgroundStyleVariables.Angle);
                break;
            case "contentBackgroundSwatch":
                $scope.contentBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--base-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--base-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--base-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonBackgroundSwatch":
                $scope.buttonBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--base-btn-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--base-btn-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--base-btn-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonBackgroundHoverSwatch":
                document.documentElement.style.setProperty("--base-btn-bg-hover-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--base-btn-bg-hover-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--base-btn-bg-hover-angle", backgroundStyleVariables.Angle);
                break;
            case "footerBackgroundSwatch":
                $scope.footerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--footer-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--footer-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--footer-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "contentAdditionalBackground":
                $scope.styles.themeColors.contentItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonAdditionalBackground":
                $scope.styles.themeColors.buttonItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-angle", backgroundStyleVariables.Angle);
                break;
            case "buttonAdditionalHoverBackground":
                $scope.styles.themeColors.buttonItems[index].backgroundHoverSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, event.target.value);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-hover-start-perc", backgroundStyleVariables.StartPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-hover-stop-perc", backgroundStyleVariables.StopPerc);
                document.documentElement.style.setProperty("--c" + (index + 1) + "-btn-bg-hover-angle", backgroundStyleVariables.Angle);
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
                break;
            case "buttonBackgroundHoverSwatch":
                $scope.buttonBackgroundHoverSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "footerBackgroundSwatch":
                $scope.footerBackgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "contentAdditionalBackground":
                $scope.styles.themeColors.contentItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonAdditionalBackground":
                $scope.styles.themeColors.buttonItems[index].backgroundSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
            case "buttonAdditionalHoverBackground":
                $scope.styles.themeColors.buttonItems[index].backgroundHoverSwatch = getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection);
                break;
        }
    };


    //VALIDATION WATCH
    $scope.$watch('designPanelForm.$invalid', function (newval, oldval) {
        $scope.buttonDisabled = newval;
    });

    //START FONT WATCH
    
    $scope.$watch("styles.themeFonts.bodyFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("body", newVal);
        }
    }, true);

    $scope.$watch("selectedHeadingItems", function (newVal, oldVal) {

        for (var j = 0; j < newVal.length; j++) {
            if (newVal[j].Selected) {
                if (!$('body').hasClass(newVal[j].Value))
                    $('body').addClass(newVal[j].Value);
            }
            else {
                $('body').removeClass(newVal[j].Value);
            }
            
        }
    }, true);

    $scope.$watch("styles.themeFonts.h1Font", function (newVal,oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("h1", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.h2Font", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("h2", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.h3Font", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("h3", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.h4Font", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("h4", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.h5Font", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("h5", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.h6Font", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("h6", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.headingSmallFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("p-heading_small", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.headingMediumFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("p-heading", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.headingLargeFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("p-heading_large", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.secHeadingSmallFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("secondary-heading_small", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.secHeadingMediumFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("secondary-heading", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.secHeadingLargeFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("secondary-heading_large", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.introSmallFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("p-intro_small", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.introMediumFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("p-intro", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.introLargeFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("p-intro_large", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.blockquoteSmallFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("blockquote_small", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.blockquoteMediumFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("blockquote", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.blockquoteLargeFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("blockquote_large", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.buttonSmallFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("btn_small", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.buttonMediumFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("btn", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.buttonLargeFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("btn_large", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.mainNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("main-navigation", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.mainNavDropdownFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("main-navigation_dropdowns", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.secondaryNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("secondary-navigation", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.subNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("sub-navigation", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.footerNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("footer-navigation", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.breadcrumbNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("breadcrumb-navigation", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.anchorNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("anchor-navigation", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.accordionTabNavFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("acc-tab", newVal);
        }
    }, true);

    $scope.$watch("styles.themeFonts.logoFont", function (newVal, oldVal) {
        if (newVal != oldVal) {
            $scope.updateFontVariables("logo", newVal);
        }
    }, true);

    //START FONT WATCH

    $scope.$watch('styles.themeLayout.headerLarge', function (newval, oldval) {
        if (newval != oldval) {
            $('body').removeClass(oldval);
            $('body').addClass(newval);
        }
    });

    $scope.$watch('styles.themeLayout.headerSmall', function (newval, oldval) {
        if (newval != oldval) {
            $('body').removeClass(oldval);
            $('body').addClass(newval);
        }
    });

    $scope.$watch('styles.themeLayout.burgerNavStyle', function (newval, oldval) {
        if (newval != oldval) {
            $('#burgerNavStyle').removeClass(oldval);
            $('#burgerNavStyle').addClass(newval);
        }
    });

    $scope.$watch('styles.themeLayout.arrowStyle', function (newval, oldval) {
        if (newval != oldval) {
            $('body').removeClass(oldval);
            $('body').addClass(newval);
        }
    });

    $scope.$watch('styles.themeLayout.backToTopHorizontalPosition', function (newval, oldval) {
        if (newval != oldval) {
            $('#backToTop').removeClass(oldval);
            $('#backToTop').addClass(newval);
        }
    });

    $scope.$watch('styles.themeLayout.displayBackToTopOption', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('#backToTop').show();
            }
            else {
                $('#backToTop').hide()
            }
        }
    });

    $scope.$watch('styles.themeLayout.notificationHorizontalPosition', function (newval, oldval) {
        if (newval != oldval) {
            $('#NotificationPanel').removeClass(oldval);
            $('#NotificationPanel').addClass(newval);
        }
    });

    $scope.$watch('styles.themeColors.bodyBackgroundClass', function (newval, oldval) {
        if (newval != oldval) {
            $('body').removeClass(oldval);
            $('body').addClass(newval);
        }
    });

    $scope.$watch('styles.themeColors.headerBackgroundClass', function (newval, oldval) {
        if (newval != oldval) {
            $('#site-header').removeClass(oldval);
            $('#site-header').addClass(newval);
        }
    });

    $scope.$watch('styles.themeColors.navDropdownBackgroundClass', function (newval, oldval) {
        if (newval != oldval) {
            $('.nav-dropdown').removeClass(oldval);
            $('.nav-dropdown').addClass(newval);
        }
    });

    $scope.$watch('styles.themeColors.contentBackgroundClass', function (newval, oldval) {

        if (typeof newval !== 'undefined' && typeof oldval != 'undefined') {
            if (newval != oldval) {
                var oldStyles = oldval.split(" ");
                var newStyles = newval.split(" ");
                $('.' + oldStyles[0]).removeClass(oldStyles[1]);
                $('.' + oldStyles[0]).addClass(newStyles[1]);
            }
        }
    });

    $scope.$watch('styles.themeColors.buttonBackgroundClass', function (newval, oldval) {
        if (typeof newval !== 'undefined' && typeof oldval != 'undefined') {
            if (newval != oldval) {
                var oldStyles = oldval.split(" ");
                var newStyles = newval.split(" ");
                $('.' + oldStyles[0]).removeClass(oldStyles[1]);
                $('.' + oldStyles[0]).addClass(newStyles[1]);
            }
        }
    });

    $scope.$watch('styles.themeColors.buttonBackgroundHoverClass', function (newval, oldval) {
        if (typeof newval !== 'undefined' && typeof oldval != 'undefined') {
            if (newval != oldval) {
                var oldStyles = oldval.split(" ");
                var newStyles = newval.split(" ");
                $('.' + oldStyles[0]).removeClass(oldStyles[1]);
                $('.' + oldStyles[0]).addClass(newStyles[1]);
            }
        }
    });

    $scope.$watch('styles.themeColors.footerBackgroundClass', function (newval, oldval) {
        if (newval != oldval) {
            $('#site-footer').removeClass(oldval);
            $('#site-footer').addClass(newval);
        }
    });

    $scope.$watch('styles.themeLayout.showHeaderScrollLarge', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').removeClass('hide_header-on-scroll-lg');
                $('body').addClass('show_header-on-scroll-lg');
            }
            else {
                $('body').removeClass('show_header-on-scroll-lg');
                $('body').addClass('hide_header-on-scroll-lg');
            }
        }
    });

    $scope.$watch('styles.themeLayout.showHeaderScrollSmall', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').removeClass('hide_header-on-scroll-sm');
                $('body').addClass('show_header-on-scroll-sm');
            }
            else {
                $('body').removeClass('show_header-on-scroll-sm');
                $('body').addClass('hide_header-on-scroll-sm');
            }
        }
    });

    $scope.$watch('styles.themeLayout.transparentLargeHeader', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('transparent-header-lg');
            }
            else {
                $('body').removeClass('transparent-header-lg');
            }
        }
    });

    $scope.$watch('styles.themeLayout.transparentSmallHeader', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('transparent-header-sm');
            }
            else {
                $('body').removeClass('transparent-header-sm');
            }
        }
    });

    $scope.$watch('styles.themeSpacing.fixedWidth', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('max-width');
            }
            else {
                $('body').removeClass('max-width');
            }
        }
    });

    $scope.$watch('styles.themeSpacing.headerFixedWidth', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('#site-header > div').removeClass('container-fluid');
                $('#site-header > div').addClass('container');
            }
            else {
                $('#site-header > div').removeClass('container');
                $('#site-header > div').addClass('container-fluid');
            }
        }
    });

    $scope.$watch('styles.themeLayout.logoLinkUnderlineInitial', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('logo-underline-link');
            }
            else {
                $('body').removeClass('logo-underline-link');
            }
        }
    });

    $scope.$watch('styles.themeLayout.logoLinkUnderlineHover', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('logo-underline-link-hover');
            }
            else {
                $('body').removeClass('logo-underline-link-hover');
            }
        }
    });

    $scope.$watch('styles.themeLayout.mainNavLinkUnderlineInitial', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('main-navigation-underline-link');
            }
            else {
                $('body').removeClass('main-navigation-underline-link');
            }
        }
    });

    $scope.$watch('styles.themeLayout.mainNavLinkUnderlineHover', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('main-navigation-underline-link-hover');
            }
            else {
                $('body').removeClass('main-navigation-underline-link-hover');
            }
        }
    });

    $scope.$watch('styles.themeLayout.secondaryNavLinkUnderlineInitial', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('secondary-navigation-underline-link');
            }
            else {
                $('body').removeClass('secondary-navigation-underline-link');
            }
        }
    });

    $scope.$watch('styles.themeLayout.secondaryNavLinkUnderlineHover', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('secondary-navigation-underline-link-hover');
            }
            else {
                $('body').removeClass('secondary-navigation-underline-link-hover');
            }
        }
    });

    $scope.$watch('styles.themeLayout.contentLinkUnderlineInitial', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('content-underline-link');
            }
            else {
                $('body').removeClass('content-underline-link');
            }
        }
    });

    $scope.$watch('styles.themeLayout.contentLinkUnderlineHover', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('content-underline-link-hover');
            }
            else {
                $('body').removeClass('content-underline-link-hover');
            }
        }
    });

    $scope.$watch('styles.themeLayout.footerLinkUnderlineInitial', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('footer-underline-link');
            }
            else {
                $('body').removeClass('footer-underline-link');
            }
        }
    });

    $scope.$watch('styles.themeLayout.footerLinkUnderlineHover', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('footer-underline-link-hover');
            }
            else {
                $('body').removeClass('footer-underline-link-hover');
            }
        }
    });

    $scope.$watch('styles.themeLayout.buttonLinkUnderlineInitial', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('button-underline-link');
            }
            else {
                $('body').removeClass('button-underline-link');
            }
        }
    });

    $scope.$watch('styles.themeLayout.buttonLinkUnderlineHover', function (newval, oldval) {
        if (typeof newval !== 'undefined') {
            if (newval) {
                $('body').addClass('button-underline-link-hover');
            }
            else {
                $('body').removeClass('button-underline-link-hover');
            }
        }
    });

    $scope.$watch("editText", function (newVal, oldVal) {

        if (newVal == true)
            document.designMode = 'on';
        else
            document.designMode = 'off';
    });

    

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
        else {
            output = cssClass + "-solid";
        }
        return output;
    }

    function getBackgroundStyleVariables(backgroundStyle, gradientStyle, gradientDirection) {
        var output;

        if (backgroundStyle == "gradient") {
            if (gradientStyle == "radial") {
                switch (gradientDirection) {
                    case "topLeft":
                        output = {
                            StartPerc: "0%",
                            StopPerc: "0%",
                            Angle: "90deg"
                        };
                        break;
                    case "topCenter":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "0%",
                            Angle: "90deg"
                        };
                        break;
                    case "topRight":
                        output = {
                            StartPerc: "100%",
                            StopPerc: "0%",
                            Angle: "90deg"
                        };
                        break;
                    case "middleLeft":
                        output = {
                            StartPerc: "0%",
                            StopPerc: "50%",
                            Angle: "90deg"
                            };
                        break;
                    case "middleCenter":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "90deg"
                            };
                        break;
                    case "middleRight":
                        output = {
                            StartPerc: "100%",
                            StopPerc: "50%",
                            Angle: "90deg"
                            };
                        break;
                    case "bottomLeft":
                        output = {
                            StartPerc: "0%",
                            StopPerc: "100%",
                            Angle: "90deg"
                            };
                        break;
                    case "bottomCenter":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "100%",
                            Angle: "90deg"
                            };
                        break;
                    case "bottomRight":
                        output = {
                            StartPerc: "100%",
                            StopPerc: "0%",
                            Angle: "90deg"
                            };
                        break;
                    default:
                        output = {
                            StartPerc: "0%",
                            StopPerc: "50%",
                            Angle: "90deg"
                        };
                        break;
                }
            }
            else {
                switch (gradientDirection) {
                    case "topLeft":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "135deg"
                            };
                        break;
                    case "topCenter":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "-180deg"
                            };
                        break;
                    case "topRight":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "225deg"
                            };
                        break;
                    case "middleLeft":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "90deg"
                            };
                        break;
                    case "middleRight":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "270deg"
                            };
                        break;
                    case "bottomLeft":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "45deg"
                            };
                        break;
                    case "bottomCenter":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "0deg"
                            };
                        break;
                    case "bottomRight":
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "315deg"
                            };
                        break;
                    default:
                        output = {
                            StartPerc: "50%",
                            StopPerc: "50%",
                            Angle: "90deg"
                        };
                        break;
                }
            }
        }
        else if (backgroundStyle == "solid") {
            output = {
                StartPerc: "50%",
                StopPerc: "50%",
                Angle: "90deg"
                };
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

    function UpdateGradientStyleClass(type, newBackgroundStyle, newGradientStyle, index) {

        if (type == "content") {
            var targetClass = "c" + (index + 1) + "-bg";
            var currentBackgroundStyle = $scope.styles.themeColors.contentItems[index].backgroundStyle;
            var currentGradientStyle = $scope.styles.themeColors.contentItems[index].backgroundGradientStyle;
            var classToRemove = getBackgroundClass(targetClass, currentBackgroundStyle, currentGradientStyle);
            var classToAdd = getBackgroundClass(targetClass, newBackgroundStyle, newGradientStyle);
            $('.' + targetClass).removeClass(classToRemove);
            $('.' + targetClass).addClass(classToAdd);
        }
        else if (type == "button") {
            var targetClass = "c" + (index + 1) + "-btn-bg";
            var currentBackgroundStyle = $scope.styles.themeColors.buttonItems[index].backgroundStyle;
            var currentGradientStyle = $scope.styles.themeColors.buttonItems[index].backgroundGradientStyle;
            var classToRemove = getBackgroundClass(targetClass, currentBackgroundStyle, currentGradientStyle);
            var classToAdd = getBackgroundClass(targetClass, newBackgroundStyle, newGradientStyle);
            $('.' + targetClass).removeClass(classToRemove);
            $('.' + targetClass).addClass(classToAdd);
        }
        else if (type == "buttonHover") {
            var targetClass = "c" + (index + 1) + "-btn-bg";
            var currentBackgroundStyle = $scope.styles.themeColors.buttonItems[index].backgroundHoverStyle;
            var currentGradientStyle = $scope.styles.themeColors.buttonItems[index].backgroundHoverGradientStyle;
            var classToRemove = getBackgroundClass(targetClass + "-hover", currentBackgroundStyle, currentGradientStyle);
            var classToAdd = getBackgroundClass(targetClass + "-hover", newBackgroundStyle, newGradientStyle);
            $('.' + targetClass).removeClass(classToRemove);
            $('.' + targetClass).addClass(classToAdd);
        }
        else if (type == "baseButtonHover") {
            var targetClass = "base-btn-bg";
            var currentBackgroundStyle = $scope.styles.themeColors.buttonBackgroundHoverStyle;
            var currentGradientStyle = $scope.styles.themeColors.buttonBackgroundHoverGradientStyle;
            var classToRemove = getBackgroundClass(targetClass + "-hover", currentBackgroundStyle, currentGradientStyle);
            var classToAdd = getBackgroundClass(targetClass + "-hover", newBackgroundStyle, newGradientStyle);
            $('.' + targetClass).removeClass(classToRemove);
            $('.' + targetClass).addClass(classToAdd);
        }
    }

    function setDefaultFonts(index) {

        var deletedFont = $scope.styles.themeFonts.fontItems[index];

        $scope.styles.themeFonts.fontItems.splice(index, 1);
        //If selected value has just been deleted, reset to first item.
        if ($scope.styles.themeFonts.bodyFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.bodyFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.h1Font.guid == deletedFont.guid)
            $scope.styles.themeFonts.h1Font = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.h2Font.guid == deletedFont.guid)
            $scope.styles.themeFonts.h2Font = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.h3Font.guid == deletedFont.guid)
            $scope.styles.themeFonts.h3Font = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.h4Font.guid == deletedFont.guid)
            $scope.styles.themeFonts.h4Font = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.h5Font.guid == deletedFont.guid)
            $scope.styles.themeFonts.h5Font = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.h6Font.guid == deletedFont.guid)
            $scope.styles.themeFonts.h6Font = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.headingSmallFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.headingSmallFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.headingMediumFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.headingMediumFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.headingLargeFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.headingLargeFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.secHeadingSmallFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.secHeadingSmallFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.secHeadingMediumFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.secHeadingMediumFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.secHeadingLargeFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.secHeadingLargeFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.introSmallFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.introSmallFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.introMediumFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.introMediumFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.introLargeFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.introLargeFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.blockquoteSmallFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.blockquoteSmallFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.blockquoteMediumFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.blockquoteMediumFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.blockquoteLargeFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.blockquoteLargeFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.buttonSmallFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.buttonSmallFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.buttonMediumFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.buttonMediumFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.buttonLargeFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.buttonLargeFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.mainNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.mainNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.mainNavDropdownFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.mainNavDropdownFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.secondaryNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.secondaryNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.subNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.subNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.footerNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.footerNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.breadcrumbNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.breadcrumbNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.anchorNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.anchorNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.accordionTabNavFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.accordionTabNavFont = $scope.styles.themeFonts.fontItems[0];
        if ($scope.styles.themeFonts.logoFont.guid == deletedFont.guid)
            $scope.styles.themeFonts.logoFont = $scope.styles.themeFonts.fontItems[0];
    }

    function guid(len) {
        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length,
            length = len || 32;

        for (var i = 0; i < length; i++) {
            buf[i] = chars.charAt(Math.floor(Math.random() * charlen));
        }

        return buf.join('');
    }

    function getGoogleFontStyles(styles) {

        var fontStyles = [];

        angular.forEach(styles,
            function (value, key) {
                var style = {};
                style["styleName"] = key;
                style["styleWeight"] = getGoogleFontWeights(value);

                fontStyles.push(style);
            });

        fontStyles = fontStyles.reverse();
        return fontStyles;
    }

    function getImportOptions(options) {

        var output = ":";

        angular.forEach(options,
            function (value, key) {
                for (i = 0; i < value.styleWeight.length; i++) {
                    output += value.styleWeight[i]
                    if (value.styleName == "italic")
                        output += "i";
                    output += ",";
                }
            });

        output = output.substring(0, output.length - 1);

        return output;
    }

    function getGoogleFontWeights(weights) {

        var fontWeights = [];

        angular.forEach(weights,
            function (value, key) {
                fontWeights.push(key.toString());
            });

        return fontWeights;

    }

    function UrlExist(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, false);
        xhr.send();

        return xhr.status !== 404;
    }

    

});

angular.module('designApp').directive('colorpicker', function () {
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
                        var cssVarName = this.dataset.cssvar;
                        var rgb = c._r + "," + c._g + "," + c._b;
                        document.documentElement.style.setProperty(cssVarName, rgb);
                    },
                    hide: function (c) {
                        if (!changeCalled) {
                            ngModel.$setViewValue(originalColor);
                            var cssVarName = this.dataset.cssvar;
                            var rgbObject = hexToRgb(originalColor);
                            var rgb = rgbObject.r + "," + rgbObject.g + "," + rgbObject.b;
                            document.documentElement.style.setProperty(cssVarName, rgb);
                        }
                        
                    },
                    change: function (c) {
                        scope.$apply(function () {
                            changeCalled = true;
                            ngModel.$setViewValue(c.toHexString());
                        });
                        var cssVarName = this.dataset.cssvar;
                        var rgb = c._r + "," + c._g + "," + c._b;
                        document.documentElement.style.setProperty(cssVarName, rgb);
                    }

                });
            };

        }
    }
});

angular.module('designApp').directive('switch', function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: function (element, attrs) {
            var html = '';
            html += '<span';
            html += ' class="switcher' + (attrs.class ? ' ' + attrs.class : '') + '"';
            html += attrs.ngModel ? ' ng-click="' + attrs.ngModel + '=!' + attrs.ngModel + '"' : '';
            html += ' ng-class="{ checked:' + attrs.ngModel + ' }"';
            html += '>';
            html += '<small></small>';
            html += '<input type="checkbox"';
            html += attrs.id ? ' id="' + attrs.id + '-check"' : '';
            html += attrs.name ? ' name="' + attrs.name + '"' : '';
            html += attrs.ngModel ? ' ng-model="' + attrs.ngModel + '"' : '';
            html += ' style="display:none" />';
            html += '</span>';
            return html;
        }
    }
});

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

