// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.ColorPickerController", function ($scope, notificationsService, $http, $routeParams) {

    if (typeof $scope.model.value == "object")
        $scope.model.value = JSON.stringify($scope.model.value);

    //setup the default config
    var config = {
        items: [],
        multiple: false
    };

    //map the user config
    angular.extend(config, $scope.model.config);

    //map back to the model
    $scope.model.config = config;

    $scope.isConfigured = false;


    //Only get values if in edit mode
    if (!$scope.preview) {

        var promise = $http.get('backoffice/api/USNColorPicker/GetColors',
            {
                params: {
                    currentNodeID: $routeParams.id
                }
            }
        );

        promise.then(

            function (payload) {
                $scope.vm = payload.data;
                var colorItemsArray = [];

                if ($scope.vm.buttonBackground !== null) {

                    if ($scope.model.config.colorSource.type == "button") {
                        colorItemsArray.push({
                            value: getColor($scope.vm.buttonBackgroundStyle, $scope.vm.buttonBackground, $scope.vm.buttonBackground2, $scope.vm.buttonBackgroundGradientStyle, $scope.vm.buttonBackgroundGradientDirection, false),
                            firstBgColor: $scope.vm.buttonBackground,
                            text: $scope.vm.buttonText,
                            border: $scope.vm.buttonBorder,
                            label: "base",
                            sortOrder: 0,
                            id: 1
                        });

                        //Loop buttonItems.
                        $scope.vm.buttonItems.forEach(function (item, index) {
                            colorItemsArray.push({
                                value: getColor(item.backgroundStyle, item.background, item.background2, item.backgroundGradientStyle, item.backgroundGradientDirection, false),
                                firstBgColor: item.background,
                                text: item.text,
                                border: item.border,
                                label: "c" + (index + 1),
                                sortOrder: index + 1,
                                id: index + 2
                            });
                        });
                    }
                    else {
                        colorItemsArray.push({
                            value: getColor($scope.vm.contentBackgroundStyle, $scope.vm.contentBackground, $scope.vm.contentBackground2, $scope.vm.contentBackgroundGradientStyle, $scope.vm.contentBackgroundGradientDirection, false),
                            firstBgColor: $scope.vm.contentBackground,
                            heading: $scope.vm.contentHeading,
                            secondaryheading: $scope.vm.contentSecondaryHeading.substr(1),
                            text: $scope.vm.contentText,
                            border: $scope.vm.contentBorder,
                            label: "base",
                            sortOrder: 0,
                            id: 1
                        });

                        //Loop contentItems.
                        $scope.vm.contentItems.forEach(function (item, index) {
                            colorItemsArray.push({
                                value: getColor(item.backgroundStyle, item.background, item.background2, item.backgroundGradientStyle, item.backgroundGradientDirection, false),
                                firstBgColor: item.background,
                                heading: item.heading,
                                secondaryheading: item.secondaryHeading,
                                text: item.text,
                                border: item.border,
                                label: "c" + (index + 1),
                                sortOrder: index + 1,
                                id: index + 2
                            });
                        });
                    }
                }
                else {
                    notificationsService.error('ERROR', 'Check \'Website Style\' is available and has been correctly assigned to this page or \'Global > Settings\'');
                }
                

                $scope.model.config.items = colorItemsArray;


                $scope.isConfigured = $scope.model.config && $scope.model.config.items && _.keys($scope.model.config.items).length > 0;
            },
            function (errorPayLoad) {
                notificationsService.error("Error", "Issue getting colors.");
                $scope.model.value = "";
            }
        );

    }

    if ($scope.isConfigured) {

        for (var key in $scope.model.config.items) {
            if (!$scope.model.config.items[key].hasOwnProperty("value"))
                $scope.model.config.items[key] = { value: $scope.model.config.items[key], label: $scope.model.config.items[key] };
        }

        
    }

    $scope.validateMandatory = function () {
        var isValid = !$scope.model.validation.mandatory || (
            $scope.model.value != null
            && $scope.model.value != ""
            && (!$scope.model.value.hasOwnProperty("value") || $scope.model.value.value !== "")
        );
        return {
            isValid: isValid,
            errorMsg: "Value cannot be empty",
            errorKey: "required"
        };
    }


    $scope.model.current = $scope.model.value;

    // Item click
    $scope.check = function (event) {

        //code to allow deselect of radio buttons
        if ($scope.model.current === event.target.value) {
            $scope.model.value = "";
            $scope.model.current = "";
        }
        else {
            $scope.model.value = event.target.value;
            $scope.model.current = event.target.value;
        }
    };
   

    function getColor(backgroundStyle, background1, background2, gradientStyle, gradientDirection, addTag) {
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
                        output = "radial-gradient(" + background1 + " 0%, " + background2 + " 100%)";
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

            if (addTag)
                output = "background: " + output + ";";
        }
        else if (backgroundStyle == "solid") {
            if (addTag)
                output = "background:" + background1 + ";";
            else
                output = background1;
        }

        return output;
    }

});