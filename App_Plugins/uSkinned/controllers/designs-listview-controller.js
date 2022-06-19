// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.DesignListViewController", function ($scope, listViewHelper) {

    // Init the controller
    function activate() {

        
        angular.forEach($scope.items, function (design) {

            design.contentBackgroundSwatch = getColor(design.styleColors.contentBackgroundStyle,
                design.styleColors.contentBackground,
                design.styleColors.contentBackground2,
                design.styleColors.contentBackgroundGradientStyle,
                design.styleColors.contentBackgroundGradientDirection);

            if (!angular.isUndefined(design.styleColors.contentItems)) {
                //Loop contentItems.
                design.styleColors.contentItems.forEach(function (item, index) {
                    //Load initial swatch colors from values
                    item.backgroundSwatch = getColor(item.backgroundStyle,
                        item.background,
                        item.background2,
                        item.backgroundGradientStyle,
                        item.backgroundGradientDirection);
                });
            }
        });

    }

    $scope.viewItem = function (item) {

        listViewHelper.editItem(item, $scope);

    }

    activate();

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