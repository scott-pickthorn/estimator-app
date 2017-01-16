var app = angular.module("estimate", []);
app.controller('addressController',['$scope','$http', 'profileService', addressController]);

function addressController($scope, $http, profileService){
    $scope.profile = profileService.getProfile();
    $scope.getInfo = function(){
        loadSpinner();
        $http.get('/house_estimate/' + streetAddress + '&' + cityState).then(function(response) {
             if(response.status != 200){
                 console.log(response);
             }
            $scope.house_estimate = response.data;        
            profileService.setEstimate($scope.house_estimate);
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
}
