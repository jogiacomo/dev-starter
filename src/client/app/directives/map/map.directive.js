function mapDir (User, Contact, Announcement, $timeout) {
  'ngInject';
  var helper = {};

  return {
    restrict: 'EA',
    scope: {
        announcement: '=',
        contact: '=',
        user: '=',
        list: '=',
        loadMap: '&mapLoad'
    },
    templateUrl: 'directives/map/map.html',

    link: function(scope, element, attrs) {

      var data = null,
          service = null;

      var locationData = null;

      if (scope.contact) {
        data = scope.contact;
        service = Contact;
      } else if (scope.user) {
        data = scope.user;
        service = User;
      } else {
        data = scope.announcement;
        service = Announcement;
      }

      scope.map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:48.856614, lng:2.3522219000000177},
        zoom: 16
      });

     // scope.map.setOptions({styles: styles.retro});

      scope.infowindow = new google.maps.InfoWindow();

      scope.directionsDisplay = new google.maps.DirectionsRenderer({
        map: scope.map
      });

      scope.markers = [];

      scope.initMap = () => {
        if (scope.list) {
         service.findAll().then(
          (res) => {
            for (i=0; i < res.length; i++) {
              let address = res[i].address.street + ', ' + res[i].address.city + ', ' + res[i].address.zipcode;
              scope.geocodeAddress(address, res[i]);
            }
          }
         ) 
        } else {
          service.findOne(data._id.$oid).then(
            (res) => {
              if (scope.announcement) {
                scope.geocodeAddress(res.depart, res);
                scope.geocodeAddress(res.arrival, res);
                //scope.setDirectionRenderer(res);
              } else {
                let address = res.address.street + ', ' + res.address.city + ', ' + res.address.zipcode;
                scope.geocodeAddress(address, res);
              }
            }
          )
        }
        
      };

      scope.geocodeAddress = (address, data) => {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address }, function(results, status) {
            if(status === google.maps.GeocoderStatus.OK) {
              scope.map.setCenter(results[0].geometry.location);
               if (scope.announcement) {
                 locationData = results[0].geometry.location;
                 if (data.depart === address) {
                   locationData.depart = {};
                   locationData.depart.lat = locationData.lat();
                   locationData.depart.lng = locationData.lng();
                   localStorage.setItem('depart', JSON.stringify(locationData));
                 } else {
                   locationData.arrival = {};
                   locationData.arrival.lat = locationData.lat();
                   locationData.arrival.lng = locationData.lng();
                   localStorage.setItem('arrival', JSON.stringify(locationData));
                 }
              } else {
                data.address.geo.lat = results[0].geometry.location.lat();
                data.address.geo.lng = results[0].geometry.location.lng();
                scope.createMarker(data);
              }
            }else {
            window.alert('We could not find that location - try entering a more' +
                    ' specific place.');
            }
        });
      };

      scope.createMarker = (data) => {
        var marker = new google.maps.Marker({
            map: scope.map,
            position: new google.maps.LatLng(data.address.geo.lat, data.address.geo.lng),
            title: data.address.street
        });
        marker.content = '<div class="infow-window"><img src=' +
                           data.image + ' width="100" height="100"></div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            scope.infowindow.setContent('<p>' + marker.title + '</p>' + marker.content);
            scope.infowindow.open(scope.map, marker);
        });
        
        scope.markers.push(marker);
      };

      // Pass the directions request to the directions service.
      scope.setDirectionRenderer = () => {
        var depart = JSON.parse(localStorage.getItem('depart'));
        var arrival = JSON.parse(localStorage.getItem('arrival'));

        // Set destination, origin and travel mode.
        var request = {
          destination: arrival,
          origin: depart,
          travelMode: 'DRIVING'
        };

        var directionsService = new google.maps.DirectionsService();

        if (depart && arrival) {
          directionsService.route(request, function(response, status) {
            if (status == 'OK') {
              // Display the route on the map.
              scope.directionsDisplay.setDirections(response);
            }
          });
        } 

      }

      $timeout(scope.initMap, 0);
      if (scope.announcement) {
        $timeout(scope.setDirectionRenderer, 0);
      }
      
    }
  };
};

export default mapDir;
