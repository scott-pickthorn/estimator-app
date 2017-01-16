    streetAddress = "";
    cityState = "";
    function init() {
        // create the map
        var myOptions = {
            zoom: 19,
            center: new google.maps.LatLng(45.6, -122.76),
            mapTypeId: google.maps.MapTypeId.SATELLITE
          }
        map = new google.maps.Map(document.getElementById("map"),myOptions);
            $("#map").hide();
        autocomplete = new google.maps.places.SearchBox(document.getElementById("address"), {type:'geocode'});
        google.maps.event.addListener(autocomplete, 'places_changed', function(){
                var place = autocomplete.getPlaces();
                address = place[0].geometry.location;
                for (i = 0; i < place[0].address_components.length; i++){
                    if(place[0].address_components[i].types[0] == 'street_number')
                        var streetNumber = place[0].address_components[i].long_name;
                    if(place[0].address_components[i].types[0] == 'route')
                        var streetRoute = place[0].address_components[i].long_name;
                    if(place[0].address_components[i].types[0] == 'locality')
                        var city = place[0].address_components[i].long_name;
                    if(place[0].address_components[i].types[0] == 'administrative_area_level_1')
                        var state = place[0].address_components[i].long_name;
                }           
                streetAddress = streetNumber + " " + streetRoute;
                cityState = city + "," + state;
                
        });
     }