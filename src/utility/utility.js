 import Stations from '../app_data/stations.json'
 import Geolib from 'geolib';
 export default function getNearbyStations()
 {
        var responseJSON = Stations;
        var stations = responseJSON.root.stations.station;
        var coords = [];
        var compressed_stations = {};
        stations.forEach(function (station) {
          coords.push({
            "lat": station.gtfs_latitude, "long": station.gtfs_longitude, "name": station.name
          });
          var latlong = { latitude: station.gtfs_latitude, longitude: station.gtfs_longitude };
          compressed_stations[station.name] = latlong;
       
        }, this);
       
        console.log(coords);
       
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              console.log(position.coords.latitude + ' ' + position.coords.longitude);
              var user_location = {};
              user_location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
               var close = Geolib.findNearest(user_location, compressed_stations, 0, 5);
              console.log(close);
              return this.close;

            },
            function (error) {
              console.log(error);
              var close = [];
              close.push({ "key": "Location blocked!" })
                return close;
              //ReactDOM.render(<Station list={close} />, document.getElementById('debug'));
            }
          );
        }
        else {
          console.log('Check if you are not serving this page from HTTP or local file system in chrome.');
        }
 }


