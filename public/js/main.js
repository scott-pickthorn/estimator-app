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
     };
    
    function loadMap() {
        marker = new google.maps.Marker({
            position: address,
            title:"your house",
            size: new google.maps.Size(171, 171),
        });
        marker.setMap(map);
        google.maps.event.trigger(map,"resize");
        map.setCenter(marker.getPosition());
    };
    
    function loadSpinner() {
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