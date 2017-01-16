var app = angular.module("estimate");

app.factory('profileService', profileService);

function profileService(){
    profile = {};
    profile.email = '';
    profile.name = '';
    profile.estimate = '';
    return {
        setEmail: function(email){
            profile.email = email;
            return profile; 
        },
        setName: function(name){
            profile.name = name;
            return profile; 
        },
        setEstimate: function(estimate){
            profile.estimate = estimate;
            return profile; 
        },
        getProfile: function(){
            return profile;
        }
    }
}