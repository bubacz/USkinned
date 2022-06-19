// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.AdditionalClassesController", function ($scope) {

    if ($scope.preview) {
        return;
    }

    $scope.classGroups = [{
        heading: 'Spacing',
        items: [{
            text: 'Remove spacing',
            value: 'p-0'
        },
        {
            text: 'Remove spacing top only',
            value: 'pt-0'
        },
        {
            text: 'Remove spacing bottom only',
            value: 'pb-0'
        }]
    }, {
        heading: 'Visibility',
        items: [{
            text: 'Hide on all screens',
            value: 'd-none'
        },
        {
            text: 'Hide on extra small screens',
            value: 'd-xs-none_only'
        },
        {
            text: 'Hide on small screens',
            value: 'd-sm-none_only'
        },
        {
            text: 'Hide on medium screens',
            value: 'd-md-none_only'
        },
        {
            text: 'Hide on large screens',
            value: 'd-lg-none_only'
        },
        {
            text: 'Hide on extra large screens',
            value: 'd-xl-none_only'
        }]
    }, {
        heading: 'Design',
        items: [{
            text: 'Show shadows',
            value: 'has-box-shadows'
        },
        {
            text: 'Sticky',
            value: 'sticky'
        }]
    }];    
    
    $scope.selectedGroups = [];
    setupViewModel();

    function setupViewModel() {
        if ($scope.model.value === null || $scope.model.value === undefined) {
            $scope.model.value = '';
        }

        var currentSelectedItems = $scope.model.value.split(',');

        for (var i = 0; i < $scope.classGroups.length; i++) {

            var selectedItems = [];

            for (var j = 0; j < $scope.classGroups[i].items.length; j++) {

                var isSelected = false;

                for (var k = 0; k < currentSelectedItems.length; k++) {
                    isSelected = currentSelectedItems[k] === $scope.classGroups[i].items[j].value;
                    if (isSelected) { break; }
                }

                selectedItems.push({
                    selected: isSelected,
                    text: $scope.classGroups[i].items[j].text,
                    value: $scope.classGroups[i].items[j].value
                });

            }

            $scope.selectedGroups.push({
                heading: $scope.classGroups[i].heading,
                items: selectedItems
            });
    
        }    
    }

    $scope.$on("formSubmitting",
        function (ev, args) {
            if ($scope.model.value === null || $scope.model.value === undefined) {
                $scope.model.value = '';
            }
            var selectedStyles = "";

            for (var i = 0; i < $scope.selectedGroups.length; i++) {


                for (var j = 0; j < $scope.selectedGroups[i].items.length; j++) {

                    var itemSelected = $scope.selectedGroups[i].items[j].selected;
                    var item = $scope.selectedGroups[i].items[j].value;

                    selectedStyles = itemSelected === true
                        ? selectedStyles + item + ","
                        : selectedStyles + "";

                }
            }

            $scope.model.value = selectedStyles.replace(/(^,)|(,$)/g, "");

        });
});