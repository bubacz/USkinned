// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ThemeFonts.Controller", function ($scope, $http, overlayService, notificationsService) {

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
    const googleJson = '/uSkinned/resources/google-fonts.json';
    var googleFontItemsArray = [];

    //True will close tab
    $scope.bodyTabStyle = true;
    $scope.h1TabStyle = true;
    $scope.h2TabStyle = true;
    $scope.h3TabStyle = true;
    $scope.h4TabStyle = true;
    $scope.h5TabStyle = true;
    $scope.h6TabStyle = true;
    $scope.headingSmallTabStyle = true;
    $scope.headingMediumTabStyle = true;
    $scope.headingLargeTabStyle = true;
    $scope.secHeadingSmallTabStyle = true;
    $scope.secHeadingMediumTabStyle = true;
    $scope.secHeadingLargeTabStyle = true;
    $scope.introSmallTabStyle = true;
    $scope.introMediumTabStyle = true;
    $scope.introLargeTabStyle = true;
    $scope.blockquoteSmallTabStyle = true;
    $scope.blockquoteMediumTabStyle = true;
    $scope.blockquoteLargeTabStyle = true;
    $scope.buttonSmallTabStyle = true;
    $scope.buttonMediumTabStyle = true;
    $scope.buttonLargeTabStyle = true;
    $scope.mainNavTabStyle = true;
    $scope.mainNavDropdownTabStyle = true;
    $scope.secondaryNavTabStyle = true;
    $scope.subNavTabStyle = true;
    $scope.footerNavTabStyle = true;
    $scope.breadcrumbNavTabStyle = true;
    $scope.anchorNavTabStyle = true;
    $scope.accordionTabNavTabStyle = true;
    $scope.logoTabStyle = true;
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
            fontCategory: "cursive",
            fontImport: "",
            fontFamily: "Comic Sans MS, cursive",
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
            fontCategory: "Book Antiqua, Palatino, serif",
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

    var promise = $http.get(googleJson,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        });

    promise.then(function (response) {
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

            // Initialize the model
            if (!$scope.model.value || Object.keys($scope.model.value).length == 0) {
                $scope.model.value = {
                    fontItems: [],
                    bodyPreview: 'desktop',
                    bodyLineHeight: 150,
                    bodyLetterSpacing: 0,
                    bodyTextTransform: 'None',
                    bodyDesktopSize: 16,
                    bodyLaptopSize: 16,
                    bodyTabletSize: 16,
                    bodyMobileLandscapeSize: 16,
                    bodyMobilePortraitSize: 16,
                    h1Preview: 'desktop',
                    h1LineHeight: 120,
                    h1LetterSpacing: -0.06,
                    h1TextTransform: 'None',
                    h1DesktopSize: 50,
                    h1LaptopSize: 45,
                    h1TabletSize: 40,
                    h1MobileLandscapeSize: 35,
                    h1MobilePortraitSize: 30,
                    h2Preview: 'desktop',
                    h2LineHeight: 120,
                    h2LetterSpacing: 0,
                    h2TextTransform: 'None',
                    h2DesktopSize: 40,
                    h2LaptopSize: 38,
                    h2TabletSize: 36,
                    h2MobileLandscapeSize: 32,
                    h2MobilePortraitSize: 30,
                    h3Preview: 'desktop',
                    h3LineHeight: 120,
                    h3LetterSpacing: 0,
                    h3TextTransform: 'None',
                    h3DesktopSize: 36,
                    h3LaptopSize: 32,
                    h3TabletSize: 30,
                    h3MobileLandscapeSize: 28,
                    h3MobilePortraitSize: 26,
                    h4Preview: 'desktop',
                    h4LineHeight: 120,
                    h4LetterSpacing: 0,
                    h4TextTransform: 'None',
                    h4DesktopSize: 34,
                    h4LaptopSize: 30,
                    h4TabletSize: 28,
                    h4MobileLandscapeSize: 26,
                    h4MobilePortraitSize: 24,
                    h5Preview: 'desktop',
                    h5LineHeight: 120,
                    h5LetterSpacing: 0,
                    h5TextTransform: 'None',
                    h5DesktopSize: 28,
                    h5LaptopSize: 28,
                    h5TabletSize: 26,
                    h5MobileLandscapeSize: 24,
                    h5MobilePortraitSize: 22,
                    h6Preview: 'desktop',
                    h6LineHeight: 120,
                    h6LetterSpacing: 0,
                    h6TextTransform: 'None',
                    h6DesktopSize: 24,
                    h6LaptopSize: 24,
                    h6TabletSize: 22,
                    h6MobileLandscapeSize: 22,
                    h6MobilePortraitSize: 20,
                    headingSmallPreview: 'desktop',
                    headingSmallLineHeight: 120,
                    headingSmallLetterSpacing: 0,
                    headingSmallTextTransform: 'None',
                    headingSmallDesktopSize: 24,
                    headingSmallLaptopSize: 24,
                    headingSmallTabletSize: 22,
                    headingSmallMobileLandscapeSize: 22,
                    headingSmallMobilePortraitSize: 20,
                    headingMediumPreview: 'desktop',
                    headingMediumLineHeight: 120,
                    headingMediumLetterSpacing: 0,
                    headingMediumTextTransform: 'None',
                    headingMediumDesktopSize: 28,
                    headingMediumLaptopSize: 28,
                    headingMediumTabletSize: 26,
                    headingMediumMobileLandscapeSize: 24,
                    headingMediumMobilePortraitSize: 22,
                    headingLargePreview: 'desktop',
                    headingLargeLineHeight: 120,
                    headingLargeLetterSpacing: 0,
                    headingLargeTextTransform: 'None',
                    headingLargeDesktopSize: 34,
                    headingLargeLaptopSize: 32,
                    headingLargeTabletSize: 30,
                    headingLargeMobileLandscapeSize: 28,
                    headingLargeMobilePortraitSize: 26,
                    secHeadingSmallPreview: 'desktop',
                    secHeadingSmallLineHeight: 120,
                    secHeadingSmallLetterSpacing: 1.5,
                    secHeadingSmallTextTransform: 'Uppercase',
                    secHeadingSmallDesktopSize: 12,
                    secHeadingSmallLaptopSize: 12,
                    secHeadingSmallTabletSize: 12,
                    secHeadingSmallMobileLandscapeSize: 12,
                    secHeadingSmallMobilePortraitSize: 12,
                    secHeadingMediumPreview: 'desktop',
                    secHeadingMediumLineHeight: 120,
                    secHeadingMediumLetterSpacing: 1.5,
                    secHeadingMediumTextTransform: 'Uppercase',
                    secHeadingMediumDesktopSize: 14,
                    secHeadingMediumLaptopSize: 14,
                    secHeadingMediumTabletSize: 14,
                    secHeadingMediumMobileLandscapeSize: 14,
                    secHeadingMediumMobilePortraitSize: 14,
                    secHeadingLargePreview: 'desktop',
                    secHeadingLargeLineHeight: 120,
                    secHeadingLargeLetterSpacing: 1.5,
                    secHeadingLargeTextTransform: 'Uppercase',
                    secHeadingLargeDesktopSize: 18,
                    secHeadingLargeLaptopSize: 18,
                    secHeadingLargeTabletSize: 18,
                    secHeadingLargeMobileLandscapeSize: 18,
                    secHeadingLargeMobilePortraitSize: 18,
                    introSmallPreview: 'desktop',
                    introSmallLineHeight: 140,
                    introSmallLetterSpacing: 0,
                    introSmallTextTransform: 'None',
                    introSmallDesktopSize: 20,
                    introSmallLaptopSize: 20,
                    introSmallTabletSize: 20,
                    introSmallMobileLandscapeSize: 20,
                    introSmallMobilePortraitSize: 20,
                    introMediumPreview: 'desktop',
                    introMediumLineHeight: 140,
                    introMediumLetterSpacing: 0,
                    introMediumTextTransform: 'None',
                    introMediumDesktopSize: 22,
                    introMediumLaptopSize: 22,
                    introMediumTabletSize: 22,
                    introMediumMobileLandscapeSize: 22,
                    introMediumMobilePortraitSize: 22,
                    introLargePreview: 'desktop',
                    introLargeLineHeight: 130,
                    introLargeLetterSpacing: -0.15,
                    introLargeTextTransform: 'None',
                    introLargeDesktopSize: 26,
                    introLargeLaptopSize: 26,
                    introLargeTabletSize: 26,
                    introLargeMobileLandscapeSize: 26,
                    introLargeMobilePortraitSize: 26,
                    blockquoteSmallPreview: 'desktop',
                    blockquoteSmallLineHeight: 140,
                    blockquoteSmallLetterSpacing: -0.25,
                    blockquoteSmallTextTransform: 'None',
                    blockquoteSmallDesktopSize: 18,
                    blockquoteSmallLaptopSize: 18,
                    blockquoteSmallTabletSize: 18,
                    blockquoteSmallMobileLandscapeSize: 18,
                    blockquoteSmallMobilePortraitSize: 18,
                    blockquoteMediumPreview: 'desktop',
                    blockquoteMediumLineHeight: 140,
                    blockquoteMediumLetterSpacing: -0.25,
                    blockquoteMediumTextTransform: 'None',
                    blockquoteMediumDesktopSize: 22,
                    blockquoteMediumLaptopSize: 22,
                    blockquoteMediumTabletSize: 22,
                    blockquoteMediumMobileLandscapeSize: 22,
                    blockquoteMediumMobilePortraitSize: 22,
                    blockquoteLargePreview: 'desktop',
                    blockquoteLargeLineHeight: 140,
                    blockquoteLargeLetterSpacing: -0.25,
                    blockquoteLargeTextTransform: 'None',
                    blockquoteLargeDesktopSize: 26,
                    blockquoteLargeLaptopSize: 26,
                    blockquoteLargeTabletSize: 26,
                    blockquoteLargeMobileLandscapeSize: 26,
                    blockquoteLargeMobilePortraitSize: 26,
                    buttonSmallPreview: 'desktop',
                    buttonSmallLineHeight: 150,
                    buttonSmallLetterSpacing: 0,
                    buttonSmallTextTransform: 'None',
                    buttonSmallDesktopSize: 12,
                    buttonSmallLaptopSize: 12,
                    buttonSmallTabletSize: 12,
                    buttonSmallMobileLandscapeSize: 12,
                    buttonSmallMobilePortraitSize: 12,
                    buttonMediumPreview: 'desktop',
                    buttonMediumLineHeight: 150,
                    buttonMediumLetterSpacing: 0,
                    buttonMediumTextTransform: 'None',
                    buttonMediumDesktopSize: 16,
                    buttonMediumLaptopSize: 16,
                    buttonMediumTabletSize: 16,
                    buttonMediumMobileLandscapeSize: 16,
                    buttonMediumMobilePortraitSize: 16,
                    buttonLargePreview: 'desktop',
                    buttonLargeLineHeight: 150,
                    buttonLargeLetterSpacing: 0,
                    buttonLargeTextTransform: 'None',
                    buttonLargeDesktopSize: 20,
                    buttonLargeLaptopSize: 20,
                    buttonLargeTabletSize: 20,
                    buttonLargeMobileLandscapeSize: 20,
                    buttonLargeMobilePortraitSize: 20,
                    mainNavPreview: 'desktop',
                    mainNavLineHeight: 150,
                    mainNavLetterSpacing: 0,
                    mainNavTextTransform: 'None',
                    mainNavDesktopSize: 16,
                    mainNavLaptopSize: 16,
                    mainNavTabletSize: 16,
                    mainNavMobileLandscapeSize: 16,
                    mainNavMobilePortraitSize: 16,
                    mainNavDropdownPreview: 'desktop',
                    mainNavDropdownLineHeight: 150,
                    mainNavDropdownLetterSpacing: 0,
                    mainNavDropdownTextTransform: 'None',
                    mainNavDropdownDesktopSize: 16,
                    mainNavDropdownLaptopSize: 16,
                    mainNavDropdownTabletSize: 16,
                    mainNavDropdownMobileLandscapeSize: 16,
                    mainNavDropdownMobilePortraitSize: 16,
                    secondaryNavPreview: 'desktop',
                    secondaryNavLineHeight: 150,
                    secondaryNavLetterSpacing: 0,
                    secondaryNavTextTransform: 'None',
                    secondaryNavDesktopSize: 14,
                    secondaryNavLaptopSize: 14,
                    secondaryNavTabletSize: 14,
                    secondaryNavMobileLandscapeSize: 14,
                    secondaryNavMobilePortraitSize: 14,
                    subNavPreview: 'desktop',
                    subNavLineHeight: 150,
                    subNavLetterSpacing: 0,
                    subNavTextTransform: 'None',
                    subNavDesktopSize: 16,
                    subNavLaptopSize: 16,
                    subNavTabletSize: 16,
                    subNavMobileLandscapeSize: 16,
                    subNavMobilePortraitSize: 16,
                    footerNavPreview: 'desktop',
                    footerNavLineHeight: 150,
                    footerNavLetterSpacing: 0,
                    footerNavTextTransform: 'None',
                    footerNavDesktopSize: 13,
                    footerNavLaptopSize: 13,
                    footerNavTabletSize: 13,
                    footerNavMobileLandscapeSize: 13,
                    footerNavMobilePortraitSize: 13,
                    breadcrumbNavPreview: 'desktop',
                    breadcrumbNavLineHeight: 150,
                    breadcrumbNavLetterSpacing: 0,
                    breadcrumbNavTextTransform: 'None',
                    breadcrumbNavDesktopSize: 14,
                    breadcrumbNavLaptopSize: 14,
                    breadcrumbNavTabletSize: 14,
                    breadcrumbNavMobileLandscapeSize: 14,
                    breadcrumbNavMobilePortraitSize: 14,
                    anchorNavPreview: 'desktop',
                    anchorNavLineHeight: 150,
                    anchorNavLetterSpacing: 0,
                    anchorNavTextTransform: 'None',
                    anchorNavDesktopSize: 16,
                    anchorNavLaptopSize: 16,
                    anchorNavTabletSize: 16,
                    anchorNavMobileLandscapeSize: 16,
                    anchorNavMobilePortraitSize: 16,
                    accordionTabNavPreview: 'desktop',
                    accordionTabNavLineHeight: 150,
                    accordionTabNavLetterSpacing: 0,
                    accordionTabNavTextTransform: 'None',
                    accordionTabNavDesktopSize: 16,
                    accordionTabNavLaptopSize: 16,
                    accordionTabNavTabletSize: 16,
                    accordionTabNavMobileLandscapeSize: 16,
                    accordionTabNavMobilePortraitSize: 16,
                    logoPreview: 'desktop',
                    logoLineHeight: 140,
                    logoLetterSpacing: -0.25,
                    logoTextTransform: 'None',
                    logoDesktopSize: 22,
                    logoLaptopSize: 22,
                    logoTabletSize: 22,
                    logoMobileLandscapeSize: 22,
                    logoMobilePortraitSize: 20
                };
                $scope.model.value.fontItems.push({
                    fontType: "system",
                    font: $scope.systemFonts[4],
                    fontStyle: $scope.systemFonts[4].fontStyle[0],
                    fontWeight: $scope.systemFonts[4].fontStyle[0].styleWeight[0],
                    tabStyle: true,
                    style: $scope.systemFonts[4].fontName + ", " + $scope.systemFonts[4].fontCategory + ", " +  $scope.systemFonts[4].fontStyle[0].styleName + ", " + $scope.systemFonts[4].fontStyle[0].styleWeight[0],
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
                $scope.model.value.fontItems.push({
                    fontType: "system",
                    font: $scope.systemFonts[4],
                    fontStyle: $scope.systemFonts[4].fontStyle[1],
                    fontWeight: $scope.systemFonts[4].fontStyle[0].styleWeight[0],
                    tabStyle: true,
                    style: $scope.systemFonts[4].fontName + ", " + $scope.systemFonts[4].fontCategory + ", " + $scope.systemFonts[4].fontStyle[1].styleName + ", " + $scope.systemFonts[4].fontStyle[0].styleWeight[0],
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
                $scope.model.value.fontItems.push({
                    fontType: "system",
                    font: $scope.systemFonts[4],
                    fontStyle: $scope.systemFonts[4].fontStyle[0],
                    fontWeight: $scope.systemFonts[4].fontStyle[0].styleWeight[1],
                    tabStyle: true,
                    style: $scope.systemFonts[4].fontName + ", " + $scope.systemFonts[4].fontCategory + ", " + $scope.systemFonts[4].fontStyle[0].styleName + ", " + $scope.systemFonts[4].fontStyle[0].styleWeight[1],
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
                $scope.model.value.fontItems.push({
                    fontType: "system",
                    font: $scope.systemFonts[4],
                    fontStyle: $scope.systemFonts[4].fontStyle[1],
                    fontWeight: $scope.systemFonts[4].fontStyle[1].styleWeight[1],
                    tabStyle: true,
                    style: $scope.systemFonts[4].fontName + ", " + $scope.systemFonts[4].fontCategory + ", " + $scope.systemFonts[4].fontStyle[1].styleName + ", " + $scope.systemFonts[4].fontStyle[1].styleWeight[1],
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
                $scope.model.value.bodyFont = $scope.model.value.fontItems[0];
                $scope.model.value.h1Font = $scope.model.value.fontItems[2];
                $scope.model.value.h2Font = $scope.model.value.fontItems[2];
                $scope.model.value.h3Font = $scope.model.value.fontItems[2];
                $scope.model.value.h4Font = $scope.model.value.fontItems[2];
                $scope.model.value.h5Font = $scope.model.value.fontItems[2];
                $scope.model.value.h6Font = $scope.model.value.fontItems[2];
                $scope.model.value.headingSmallFont = $scope.model.value.fontItems[2];
                $scope.model.value.headingMediumFont = $scope.model.value.fontItems[2];
                $scope.model.value.headingLargeFont = $scope.model.value.fontItems[2];
                $scope.model.value.secHeadingSmallFont = $scope.model.value.fontItems[0];
                $scope.model.value.secHeadingMediumFont = $scope.model.value.fontItems[0];
                $scope.model.value.secHeadingLargeFont = $scope.model.value.fontItems[0];
                $scope.model.value.introSmallFont = $scope.model.value.fontItems[0];
                $scope.model.value.introMediumFont = $scope.model.value.fontItems[0];
                $scope.model.value.introLargeFont = $scope.model.value.fontItems[0];
                $scope.model.value.blockquoteSmallFont = $scope.model.value.fontItems[3];
                $scope.model.value.blockquoteMediumFont = $scope.model.value.fontItems[3];
                $scope.model.value.blockquoteLargeFont = $scope.model.value.fontItems[3];
                $scope.model.value.buttonSmallFont = $scope.model.value.fontItems[2];
                $scope.model.value.buttonMediumFont = $scope.model.value.fontItems[2];
                $scope.model.value.buttonLargeFont = $scope.model.value.fontItems[2];
                $scope.model.value.mainNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.mainNavDropdownFont = $scope.model.value.fontItems[0];
                $scope.model.value.secondaryNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.subNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.footerNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.breadcrumbNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.anchorNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.accordionTabNavFont = $scope.model.value.fontItems[0];
                $scope.model.value.logoFont = $scope.model.value.fontItems[2];
            }
            else {
                if (!angular.isUndefined($scope.model.value.fontItems)) {
                    //Loop fontItems to reset tabStyle to closed.
                    $scope.model.value.fontItems.forEach(function (item, index) {
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
                }
            }

            $scope.isLoaded = true;
        }
        else {
            notificationsService.error('ERROR', 'Issue getting google fonts');
        }

    });

    // Add a new font item
    $scope.addFontItem = function () {
        $scope.model.value.fontItems.push({
            fontType: "system",
            font: $scope.systemFonts[0],
            fontStyle: $scope.systemFonts[0].fontStyle[0],
            fontWeight: $scope.systemFonts[0].fontStyle[0].styleWeight[0],
            tabStyle: false,
            style: $scope.systemFonts[0].fontName + ", " + $scope.systemFonts[0].fontCategory + ", " + $scope.systemFonts[0].fontStyle[0].styleName + ", " + $scope.systemFonts[0].fontStyle[0].styleWeight[0], adobeFont: '',
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
        const overlayDelete = {
            title: "Delete",
            content: "Are you sure you want to delete this item?",
            closeButtonLabel: "cancel",
            submitButtonLabel: "Yes, delete",
            submitButtonStyle: "danger",
            close: function () {
                overlayService.close();
            },
            submit: function () {
                setDefaultFonts(index);
                overlayService.close();
            }
        };

        const overlayCancelDelete = {
            title: "You cannot delete this font",
            content: "A minimum of 1 font must be available.",
            closeButtonLabel: "cancel",
            close: function () {
                overlayService.close();
            }

        };

        if ($scope.model.value.fontItems.length > 1)
            overlayService.open(overlayDelete);
        else
            overlayService.open(overlayCancelDelete);

    }

    $scope.fontFamilyChange = function (index) {
        $scope.model.value.fontItems[index].fontStyle = $scope.model.value.fontItems[index].font.fontStyle[0];
        $scope.model.value.fontItems[index].fontWeight = $scope.model.value.fontItems[index].font.fontStyle[0].styleWeight[0];
    }

    $scope.fontStyleChange = function (index) {
        //need to update fontStyle object with correct values based on selected
        for (i = 0; i < $scope.model.value.fontItems[index].font.fontStyle.length; i++) {
            if ($scope.model.value.fontItems[index].font.fontStyle[i].styleName == $scope.model.value.fontItems[index].fontStyle.styleName) {
                $scope.model.value.fontItems[index].fontStyle = $scope.model.value.fontItems[index].font.fontStyle[i];
                break;
            }
        }
        
        $scope.model.value.fontItems[index].fontWeight = $scope.model.value.fontItems[index].fontStyle.styleWeight[0];
    }

    //Update font dropdowns
    $scope.updateTypographyFontDropdowns = function (index,fontType) {

        if(fontType != 'adobe')
            $scope.model.value.fontItems[index].style = $scope.model.value.fontItems[index].font.fontFamily + ", " + $scope.model.value.fontItems[index].fontStyle.styleName + ", " + $scope.model.value.fontItems[index].fontWeight;
        else
            $scope.model.value.fontItems[index].style = $scope.model.value.fontItems[index].adobeFontConfirmed ? $scope.model.value.fontItems[index].adobeFontFamily + ", " + $scope.model.value.fontItems[index].adobeFontStyle + ", " + $scope.model.value.fontItems[index].adobeFontWeight : "ADOBE FONT NOT CONFIRMED";

        //This is a fix regarding issue with watches (https://docs.angularjs.org/api/ng/directive/ngOptions)
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.bodyFont.guid) {
            $scope.model.value.bodyFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.h1Font.guid) {
            $scope.model.value.h1Font = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.h2Font.guid) {
            $scope.model.value.h2Font = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.h3Font.guid) {
            $scope.model.value.h3Font = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.h4Font.guid) {
            $scope.model.value.h4Font = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.h5Font.guid) {
            $scope.model.value.h5Font = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.h6Font.guid) {
            $scope.model.value.h6Font = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.headingSmallFont.guid) {
            $scope.model.value.headingSmallFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.headingMediumFont.guid) {
            $scope.model.value.headingMediumFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.headingLargeFont.guid) {
            $scope.model.value.headingLargeFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.secHeadingSmallFont.guid) {
            $scope.model.value.secHeadingSmallFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.secHeadingMediumFont.guid) {
            $scope.model.value.secHeadingMediumFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.secHeadingLargeFont.guid) {
            $scope.model.value.secHeadingLargeFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.introSmallFont.guid) {
            $scope.model.value.introSmallFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.introMediumFont.guid) {
            $scope.model.value.introMediumFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.introLargeFont.guid) {
            $scope.model.value.introLargeFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.blockquoteSmallFont.guid) {
            $scope.model.value.blockquoteSmallFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.blockquoteMediumFont.guid) {
            $scope.model.value.blockquoteMediumFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.blockquoteLargeFont.guid) {
            $scope.model.value.blockquoteLargeFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.buttonSmallFont.guid) {
            $scope.model.value.buttonSmallFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.buttonMediumFont.guid) {
            $scope.model.value.buttonMediumFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.buttonLargeFont.guid) {
            $scope.model.value.buttonLargeFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.mainNavFont.guid) {
            $scope.model.value.mainNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.mainNavDropdownFont.guid) {
            $scope.model.value.mainNavDropdownFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.secondaryNavFont.guid) {
            $scope.model.value.secondaryNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.subNavFont.guid) {
            $scope.model.value.subNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.footerNavFont.guid) {
            $scope.model.value.footerNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.breadcrumbNavFont.guid) {
            $scope.model.value.breadcrumbNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.anchorNavFont.guid) {
            $scope.model.value.anchorNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.accordionTabNavFont.guid) {
            $scope.model.value.accordionTabNavFont = $scope.model.value.fontItems[index];
        }
        if ($scope.model.value.fontItems[index].guid == $scope.model.value.logoFont.guid) {
            $scope.model.value.logoFont = $scope.model.value.fontItems[index];
        }

    }

    $scope.updateFontFields = function (index, event) {

        if (event.target.value === "system" && $scope.model.value.fontItems[index].fontType !== "system") {
            $scope.model.value.fontItems[index].font = $scope.systemFonts[0];
            $scope.model.value.fontItems[index].fontStyle = $scope.systemFonts[0].fontStyle[0];
            $scope.model.value.fontItems[index].fontWeight = $scope.systemFonts[0].fontStyle[0].styleWeight[0];
        }
        else if (event.target.value === "google" && $scope.model.value.fontItems[index].fontType !== "google") {
            $scope.model.value.fontItems[index].font = $scope.googleFonts[0];
            $scope.model.value.fontItems[index].fontStyle = $scope.googleFonts[0].fontStyle[0];
            $scope.model.value.fontItems[index].fontWeight = $scope.googleFonts[0].fontStyle[0].styleWeight[0];
        }
        else if (event.target.value === "adobe" && $scope.model.value.fontItems[index].fontType !== "adobe") {
            //reset font dropdowns to system
            $scope.model.value.fontItems[index].font = $scope.systemFonts[0];
            $scope.model.value.fontItems[index].fontStyle = $scope.systemFonts[0].fontStyle[0];
            $scope.model.value.fontItems[index].fontWeight = $scope.systemFonts[0].fontStyle[0].styleWeight[0];
        }

        $scope.updateTypographyFontDropdowns(index, event.target.value);
           
    };

    $scope.confirmAdobeFontSettings = function (index, event) {
        event.preventDefault();
        var fontUrl = "https://use.typekit.net/" + ($scope.model.value.fontItems[index].adobeProjectId).trim() + ".css"
        if (UrlExist(fontUrl)) {
            $scope.model.value.fontItems[index].adobeFontConfirmed = true;
            $scope.model.value.fontItems[index].adobeConfirmationError = false;
            $scope.model.value.fontItems[index].adobeFontImport = "@import url('https://use.typekit.net/" + ($scope.model.value.fontItems[index].adobeProjectId).trim() + ".css');";

            $scope.updateTypographyFontDropdowns(index, "adobe");
        }
        else {
            $scope.model.value.fontItems[index].adobeConfirmationError = true;
            $scope.model.value.fontItems[index].adobeFontConfirmed = false;
               
        }
    };

    $scope.resetAdobeFontSettings = function (index, event) {
        event.preventDefault();
        $scope.model.value.fontItems[index].adobeFontImport = '';
        $scope.model.value.fontItems[index].adobeProjectId = '';
        $scope.model.value.fontItems[index].adobeFontFamily = '';
        $scope.model.value.fontItems[index].adobeFontStyle = '';
        $scope.model.value.fontItems[index].adobeFontWeight = '';
        $scope.model.value.fontItems[index].adobeFontConfirmed = false;
        $scope.model.value.fontItems[index].adobeConfirmationError = false;
        $scope.model.value.fontItems[index].adobeButtonDisabled = true;
        $scope.updateTypographyFontDropdowns(index, "adobe");
    };

    $scope.validateAdobeFields = function (index) {
        if ($scope.model.value.fontItems[index].adobeProjectId != '' &&
            $scope.model.value.fontItems[index].adobeFontFamily != '' &&
            $scope.model.value.fontItems[index].adobeFontStyle != '' &&
            $scope.model.value.fontItems[index].adobeFontWeight != '')
            $scope.model.value.fontItems[index].adobeButtonDisabled = false;
        else
            $scope.model.value.fontItems[index].adobeButtonDisabled = true;
    };

    $scope.getFonts = function (value) {
        if (value === 'google')
            return $scope.googleFonts;
        else if(value === 'system')
            return $scope.systemFonts;
        else if (value === 'adobe')
            return $scope.systemFonts;
    };


  

    function setDefaultFonts(index) {

        var deletedFont = $scope.model.value.fontItems[index];

        $scope.model.value.fontItems.splice(index, 1);
        //If selected value has just been deleted, reset to first item.
        if ($scope.model.value.bodyFont.guid == deletedFont.guid)
            $scope.model.value.bodyFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.h1Font.guid == deletedFont.guid)
            $scope.model.value.h1Font = $scope.model.value.fontItems[0];
        if ($scope.model.value.h2Font.guid == deletedFont.guid)
            $scope.model.value.h2Font = $scope.model.value.fontItems[0];
        if ($scope.model.value.h3Font.guid == deletedFont.guid)
            $scope.model.value.h3Font = $scope.model.value.fontItems[0];
        if ($scope.model.value.h4Font.guid == deletedFont.guid)
            $scope.model.value.h4Font = $scope.model.value.fontItems[0];
        if ($scope.model.value.h5Font.guid == deletedFont.guid)
            $scope.model.value.h5Font = $scope.model.value.fontItems[0];
        if ($scope.model.value.h6Font.guid == deletedFont.guid)
            $scope.model.value.h6Font = $scope.model.value.fontItems[0];
        if ($scope.model.value.headingSmallFont.guid == deletedFont.guid)
            $scope.model.value.headingSmallFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.headingMediumFont.guid == deletedFont.guid)
            $scope.model.value.headingMediumFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.headingLargeFont.guid == deletedFont.guid)
            $scope.model.value.headingLargeFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.secHeadingSmallFont.guid == deletedFont.guid)
            $scope.model.value.secHeadingSmallFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.secHeadingMediumFont.guid == deletedFont.guid)
            $scope.model.value.secHeadingMediumFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.secHeadingLargeFont.guid == deletedFont.guid)
            $scope.model.value.secHeadingLargeFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.introSmallFont.guid == deletedFont.guid)
            $scope.model.value.introSmallFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.introMediumFont.guid == deletedFont.guid)
            $scope.model.value.introMediumFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.introLargeFont.guid == deletedFont.guid)
            $scope.model.value.introLargeFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.blockquoteSmallFont.guid == deletedFont.guid)
            $scope.model.value.blockquoteSmallFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.blockquoteMediumFont.guid == deletedFont.guid)
            $scope.model.value.blockquoteMediumFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.blockquoteLargeFont.guid == deletedFont.guid)
            $scope.model.value.blockquoteLargeFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.buttonSmallFont.guid == deletedFont.guid)
            $scope.model.value.buttonSmallFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.buttonMediumFont.guid == deletedFont.guid)
            $scope.model.value.buttonMediumFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.buttonLargeFont.guid == deletedFont.guid)
            $scope.model.value.buttonLargeFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.mainNavFont.guid == deletedFont.guid)
            $scope.model.value.mainNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.mainNavDropdownFont.guid == deletedFont.guid)
            $scope.model.value.mainNavDropdownFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.secondaryNavFont.guid == deletedFont.guid)
            $scope.model.value.secondaryNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.subNavFont.guid == deletedFont.guid)
            $scope.model.value.subNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.footerNavFont.guid == deletedFont.guid)
            $scope.model.value.footerNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.breadcrumbNavFont.guid == deletedFont.guid)
            $scope.model.value.breadcrumbNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.anchorNavFont.guid == deletedFont.guid)
            $scope.model.value.anchorNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.accordionTabNavFont.guid == deletedFont.guid)
            $scope.model.value.accordionTabNavFont = $scope.model.value.fontItems[0];
        if ($scope.model.value.logoFont.guid == deletedFont.guid)
            $scope.model.value.logoFont = $scope.model.value.fontItems[0];
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
