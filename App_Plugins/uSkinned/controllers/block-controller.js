angular.module("umbraco").controller("USN.BlockController", function ($scope, entityResource) {

    var blockAlias = $scope.block.content.contentTypeAlias.toLowerCase();
    $scope.hasChildItems = false;
    $scope.hasColumns = false;
    $scope.isSplit = false;
    $scope.isSplit = false;

    updateBlockInfo();

    $scope.$watch("block.data", function (newValue, oldValue) {
        if (newValue !== oldValue) {
            updateBlockInfo();
        }
    }, true);

    function updateBlockInfo() {

        if ($scope.block.settingsData) {
            $scope.columnWidth = !$scope.block.settingsData.desktopColumnWidth ? '' : 'Desktop: ' + $scope.block.settingsData.desktopColumnWidth + ' | Tablet: ' + $scope.block.settingsData.tabletColumnWidth;
            $scope.hasColumns = !$scope.block.settingsData.desktopColumnWidth ? false : true;
        }

        $scope.itemName = !$scope.block.settingsData || !$scope.block.settingsData.itemName || $scope.block.settingsData.itemName == '' ? $scope.block.content.contentTypeName : $scope.block.settingsData.itemName

        switch (blockAlias) {
            case "usn_cbi_accordiontabitem":
                $scope.itemName = !$scope.block.data.itemHeading || $scope.block.data.itemHeading == '' ? $scope.block.content.contentTypeName : $scope.block.data.itemHeading;
                break;
            case "usn_cbi_datalistitem":
                $scope.itemName = !$scope.block.data.textLeft || $scope.block.data.textLeft == '' ? $scope.block.content.contentTypeName : $scope.block.data.textLeft;
                break;
            case "usn_cb_accordiontab":
            case "usn_pb_accordiontab":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.accordionTabs ? $scope.block.data.accordionTabs.contentData.length : 0;
                break;
            case "usn_cb_anchornavigation":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.anchorNavigation ? $scope.block.data.anchorNavigation.length : 0;
                break;
            case "usn_cb_banner":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.banners ? $scope.block.data.banners.contentData.length : 0;
                break;
            case "usn_cb_datalist":
            case "usn_pb_datalist":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.dataItems ? $scope.block.data.dataItems.contentData.length : 0; 
                break;
            case "usn_cb_gallery":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.imageVideo ? $scope.block.data.imageVideo.contentData.length : 0;
                break;
            case "usn_cb_links":
            case "usn_pb_links":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.links ? $scope.block.data.links.contentData.length : 0;
                break;
            case "usn_cb_pods":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.pods ? $scope.block.data.pods.contentData.length : 0;
                break;
            case "usn_pb_relatedcontent":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.relatedContent ? $scope.block.data.relatedContent.split(",").length : 0;
                break;
            case "usn_pb_reusablepods":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.reusablePodGroups ? $scope.block.data.reusablePodGroups.split(",").length : 0;
                break;
            case "usn_pb_searchlinks":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.links ? $scope.block.data.links.length : 0;
                break;
            case "usn_pb_sociallinks":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.socialLinks ? $scope.block.data.socialLinks.length : 0;
                break;
            case "usn_cb_splitcomponent":
                $scope.isSplit = true;

                if ($scope.block.data.splitSection1 && $scope.block.data.splitSection1.contentData[0]) {
                    entityResource.getById($scope.block.data.splitSection1.contentData[0].contentTypeKey, "DocumentType")
                        .then(function (data) {
                            $scope.splitSection1 = !$scope.block.data.splitSection1.settingsData[0].itemName || $scope.block.data.splitSection1.settingsData[0].itemName == '' ? data.name : $scope.block.data.splitSection1.settingsData[0].itemName;
                        });
                }
                else {
                    $scope.splitSection1 = "";
                }

                if ($scope.block.data.splitSection2 && $scope.block.data.splitSection2.contentData[0]) {
                    entityResource.getById($scope.block.data.splitSection2.contentData[0].contentTypeKey, "DocumentType")
                        .then(function (data) {
                            $scope.splitSection2 = !$scope.block.data.splitSection2.settingsData[0].itemName || $scope.block.data.splitSection2.settingsData[0].itemName == '' ? data.name : $scope.block.data.splitSection2.settingsData[0].itemName;
                        });
                }
                else {
                    $scope.splitSection2 = "";
                }

                break;
            case "usn_cb_subpagelisting":
            case "usn_pb_podsubpagelisting":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.linkToListing ? $scope.block.data.linkToListing.length : 0;
                break;
            case "usn_cb_windows":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.windows ? $scope.block.data.windows.contentData.length : 0;
                break;
            case "usn_pb_spacercolumn":
                $scope.columnWidth = !$scope.block.data.desktopColumnWidth ? '' : 'Desktop: ' + $scope.block.data.desktopColumnWidth + ' | Tablet: ' + $scope.block.data.tabletColumnWidth;
                $scope.hasColumns = !$scope.block.data.desktopColumnWidth ? false : true;
                break;
            case "usn_cbi_gallerymultipleimages":
                $scope.hasChildItems = true;
                $scope.childCount = $scope.block.data.images ? $scope.block.data.images.split(",").length : 0;
                break;
        }
    }

});

