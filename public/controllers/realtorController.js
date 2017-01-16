var app = angular.module("estimate");
app.controller('realtorController',['$scope','profileService', realtorController]);

function realtorController($scope, profileService){
    $scope.profile = profileService.getProfile();
}
