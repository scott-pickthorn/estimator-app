var estimate = angular.module("estimate", []);

estimate.controller("estimateCtlr", ['$scope', '$http', function($scope, $http){
	$scope.house_estimate = {};
    $scope.mapscript = '';
	profile = {}
	$scope.getInfo = function(){
        profile = {"name": $scope.name,
					  "address": $scope.address,
                      "cityState": $scope.cityState,
					  "number": $scope.number
					 };
        // profile = {"name": "scott",
        //               "address": "9380 sw meadow ln",
        //               "cityState": "portland, or",
        //               "number": "503409393"
        //              };        
        $http.get('/house_estimate/' + profile.address + '&' + profile.cityState).then(function(response) {
            $scope.house_estimate = response.data;
            console.log($scope.house_estimate);
        });   
       

        $http.post('/info', profile).then(function(response) {
            console.log(response);
        });
        loadSpinner();
    setTimeout(function(){
        $('#load').hide();
        $("#map").show();
        $("#map-estimator").show();
        latlng = new google.maps.LatLng($scope.house_estimate.lat,$scope.house_estimate.lng);
        marker = new google.maps.Marker({
            position: latlng,
            title:"your house",
            size: new google.maps.Size(171, 171),
        });
        marker.setMap(map);
        google.maps.event.trigger(map,"resize");
        map.setCenter(marker.getPosition());
           }, 2000);
    $("#userinfo").hide();
    };
    loadSpinner = function () {
        var opts = {
          lines: 12 // The number of lines to draw
        , length: 14 // The length of each line
        , width: 6 // The line thickness
        , radius: 22 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 1 // Corner roundness (0..1)
        , color: '#FB0' // #rgb or #rrggbb or array of colors
        , opacity: 0.35 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: true // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'fixed' // Element positioning
        }
        var target = document.getElementById('load');
        var spinner = new Spinner(opts).spin(target);
        console.log("spinner loaded");
    };

}]);

