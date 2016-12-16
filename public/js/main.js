var estimate = angular.module("estimate", []);

estimate.controller("estimateCtlr", ['$scope', '$http', function($scope, $http){
	$scope.house_estimate = {};
    $scope.mapscript = '';
	profile = {}
	$scope.getInfo = function(){
      //   profile = {"name": $scope.name,
					 //  "address": $scope.address,
      //                 "cityState": $scope.cityState,
					 //  "number": $scope.number
					 // };
        profile = {"name": "scott",
                      "address": "9380 sw meadow ln",
                      "cityState": "portland, or",
                      "number": "503409393"
                     };        
        $http.get('/house_estimate/' + profile.address + '&' + profile.cityState).then(function(response) {
            $scope.house_estimate = response.data;
            console.log($scope.house_estimate);
        });   
       

        $http.post('/info', profile).then(function(response) {
            console.log(response);
        });
    setTimeout(function(){
        $("#map").show();
            map.setCenter(new google.maps.LatLng($scope.house_estimate.lat,$scope.house_estimate.lng));
            google.maps.event.trigger(map,"resize");
    }, 1000);
    setTimeout(function(){
        $("#map").show();
            map.setCenter(new google.maps.LatLng($scope.house_estimate.lat,$scope.house_estimate.lng));
            google.maps.event.trigger(map,"resize");
    }, 1000);
    $("#userinfo").hide();
    };

}]);
