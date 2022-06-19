// Author: uSkinned
// License: uSkinned Commercial License (https://uSkinned.net/license)

angular.module("umbraco").controller("USN.WelcomeController", function ($scope, $http, eventsService, userService, logResource, entityResource, tourService, notificationsService, appState) {
    var vm = this;

    var evts = [];
    vm.isInfoLoaded = false;
    vm.isHistoryLoaded = false;
    vm.UmbracoVersion = Umbraco.Sys.ServerVariables.application.version;

    userService.getCurrentUser().then(function (user) {
        vm.UserName = user.name;
        vm.Email = user.email;
    });

    $http.get('backoffice/api/USNWelcomeDashboard/GetInfo').then(function (payload) {
            vm.InfoData = payload.data;
            vm.isInfoLoaded = true;
        },
        function (errorPayLoad) {
            notificationsService.error("Error", "Issue getting dashboard information");
        }
    );

    $http.get('backoffice/api/USNWelcomeDashboard/GetContentUpdateHistory').then(function (payload) {
            vm.HistoryData = payload.data;
            vm.isHistoryLoaded = true;
        },
        function (errorPayLoad) {
            notificationsService.error("Error", "Issue getting log history information");
        }
    );

    vm.tours = [];

    vm.closeDrawer = closeDrawer;
    vm.startTour = startTour;
    vm.getTourGroupCompletedPercentage = getTourGroupCompletedPercentage;
    vm.showTourButton = showTourButton;

    vm.showDocTypeTour = false;
    vm.docTypeTours = [];
    vm.nodeName = '';

    function startTour(tour) {
        tourService.startTour(tour);
        closeDrawer();
    }

    function oninit() {

        tourService.getGroupedTours().then(function (groupedTours) {
            vm.tours = groupedTours;
            getTourGroupCompletedPercentage();
        });


        if (!vm.section) {
            vm.section = "content";
        }
        

        // check if a tour is running - if it is open the matching group
        var currentTour = tourService.getCurrentTour();

        if (currentTour) {
            openTourGroup(currentTour.alias);
        }

    }

    function closeDrawer() {
        appState.setDrawerState("showDrawer", false);
    }

  
    function showTourButton(index, tourGroup) {
        if (index !== 0) {
            var prevTour = tourGroup.tours[index - 1];
            if (prevTour.completed) {
                return true;
            }
        } else {
            return true;
        }
    }

    function openTourGroup(tourAlias) {
        angular.forEach(vm.tours, function (group) {
            angular.forEach(group, function (tour) {
                if (tour.alias === tourAlias) {
                    group.open = true;
                }
            });
        });
    }

    function getTourGroupCompletedPercentage() {
        // Finding out, how many tours are completed for the progress circle
        angular.forEach(vm.tours, function (group) {
            var completedTours = 0;
            angular.forEach(group.tours, function (tour) {
                if (tour.completed) {
                    completedTours++;
                }
            });
            group.completedPercentage = Math.round((completedTours / group.tours.length) * 100);
        });
    }


    evts.push(eventsService.on("appState.tour.complete", function (event, tour) {
        tourService.getGroupedTours().then(function (groupedTours) {
            vm.tours = groupedTours;
            openTourGroup(tour.alias);
            getTourGroupCompletedPercentage();
        });
    }));

    $scope.$on('$destroy', function () {
        for (var e in evts) {
            eventsService.unsubscribe(evts[e]);
        }
    });

    oninit();

});