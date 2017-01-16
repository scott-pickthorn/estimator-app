var app = angular.module("estimate");

app.controller("estimateController", ['$scope', '$http', 'profileService', function($scope, $http, profileService){
    $scope.getEstimate = function(user){
            console.log(user);
        profileService.setEmail(user.email);
        profileService.setName(user.name);
        profile = profileService.getProfile();
        $http.post('/info', profile).then(function(response) {
            console.log(response);
        });
        $('#load').show();
        setTimeout(function(){
            if(profile.estimate.low){
                $http.post('/email_estimate', profile).then(function(response){
                    if(response.status != 200){
                        console.log(response);
                    }
                    else{
                        console.log(response.data);
                    }
                });
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
}]);
