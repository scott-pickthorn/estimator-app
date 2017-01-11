var app = angular.module("estimate", []);

app.controller("estimateCtlr", ['$scope', '$http', function($scope, $http){
	$scope.house_estimate = {};
    $scope.mapscript = '';
    $scope.getInfo = function(){
        $http.get('/house_estimate/' + streetAddress + '&' + cityState).then(function(response) {
             if(response.status != 200){
                 console.log(response);
             }
            $scope.house_estimate = response.data;        
            loadSpinner();
         setTimeout(function(){   
            if($scope.house_estimate.low){
                $('#load').hide();
                $("#map").show();
                $("#mapView").show();
                loadMap();
                $("#userinfo").hide();
            }
            else{
                $('#load').hide();
                $("#no-estimate").show();
                $("#userinfo").hide();        
            }
        }, 2000);
            console.log($scope.house_estimate.low);
        }); 
    };
    $scope.getEstimate = function(){
            profile = {"name": $scope.name,
                "email": $scope.email
        };
        console.log(profile);
        $http.post('/info', profile).then(function(response) {
            console.log(response);
        });
        $('#load').show();
        setTimeout(function(){
            if($scope.house_estimate.low){
                $('#load').hide();
                $("#realtor").show();
                $("#mapView").hide();
            }
            else{
                $('#load').hide();
                $("#no-estimate").show();
                $("#mapView").hide();        
            }
        }, 2000);
    };
    loadMap = function () {
        marker = new google.maps.Marker({
            position: address,
            title:"your house",
            size: new google.maps.Size(171, 171),
        });
        marker.setMap(map);
        google.maps.event.trigger(map,"resize");
        map.setCenter(marker.getPosition());
    }
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
    };

}]);

