import Axios from 'axios';
import Latlong from 'latlong';
import React from 'react';
import ReactDOM from 'react-dom';
import Station from '../components/station';
import Geolib from 'geolib';
var BartAPI = {
  getBARTStations: function (callback) {

    Axios.get('https://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&JSON=y')
      .then(function (response) {
        var responseJSON = JSON.parse(response.request.responseText);
        var stations = responseJSON.root.stations.station;
        var coords = [];
        var compressed_stations = {};
        console.log('hi');
        stations.forEach(function (station) {
          coords.push({
            "lat": station.gtfs_latitude, "long": station.gtfs_longitude, "name": station.name
          });
          var latlong = { latitude: station.gtfs_latitude, longitude: station.gtfs_longitude };
          compressed_stations[station.name] = latlong;
          // compressed_stations.push({station.name:latlong});

        }, this);
        //console.log(JSON.stringify(compressed_stations));

        console.log(coords);
        //     var coords = [
        // {lat: '40.739683', long: '73.985151', name: 'Gramercy Theatre'},
        // {lat: '40.730601', long: '74.000447', name: 'Blue Note Jazz Club'},
        // {lat: '40.742256', long: '74.006344', name: 'Milk Studios'},
        // {lat: '40.691805', long: '73.908089', name: 'Greenroom Brooklyn'}
        // ];
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              console.log(position.coords.latitude + ' ' + position.coords.longitude);
              var user_location = {};
              user_location = { latitude: position.coords.latitude, longitude: position.coords.longitude };




              // var x = Geolib.
              var close = Geolib.findNearest(user_location, compressed_stations, 0, 5);
              //var close = Latlong(coords, {loc: {lat: position.coords.latitude, long: position.coords.long}, max: 1});

              console.log(close);
              //close.length = 0;
              //close.push({"key":"Location blocked!"})
              //close = {key:"no loc"};
              console.log(close);
              ReactDOM.render(<Station list={close} />, document.getElementById('debug'));

            },
            function (error) {
              console.log(error);
              var close = [];
              close.push({ "key": "Location blocked!" })

              ReactDOM.render(<Station list={close} />, document.getElementById('debug'));
            }
          );
        }
        else {
          console.log('Check if you are not serving this page from HTTP or local file system in chrome.');
        }





      })
      .catch(function (response) {
        console.log('error');
        console.log(response);
      });

  }
};


module.exports = BartAPI;