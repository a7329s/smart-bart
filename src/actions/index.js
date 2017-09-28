 import Stations from '../app_data/stations.json'
 import Geolib from 'geolib';

export const REQUEST_ETD = 'REQUEST_ETD'
export const RECEIVE_ETD = 'RECEIVE_ETD'
export const ADD_NEARBY = 'ADD_NEARBY'
export const GET_GEO = 'GET_GEO'
export const SET_GEO = 'SET_GEO'
export const addNearby = (stn) => ({
  type: ADD_NEARBY,
  stn
})

export const requestETD = (stn,id) => ({
  type: REQUEST_ETD,
  stn,
  id
})

export const receiveETD = (id,stn, json) => ({
  type: RECEIVE_ETD,
  stn,
  id,
  etd: json
})


export const getGEO = () => ({
  type: GET_GEO
})

export const setGEO = () => ({
  type: SET_GEO
})

export const fetchETD = (stn,id) => dispatch => {
  dispatch(requestETD(stn,id))
  return fetch(`https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${stn}&key=MW9S-E7SL-26DU-VV8V&JSON=Y`)
    .then(response => response.json())
    .then(json => dispatch(receiveETD(id,stn, json)))
}

export const fetchCurrentLocation = () => dispatch => { 
  dispatch(getGEO())
  var responseJSON = Stations;
        var stations = responseJSON.root.stations.station;
        var compressed_stations = {};
        stations.forEach(function (station) {
          var latlong = { latitude: station.gtfs_latitude, longitude: station.gtfs_longitude };
          compressed_stations[station.abbr] = latlong;
        }, this);
       
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position.coords.latitude + ' ' + position.coords.longitude);
        var user_location = {};
        user_location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        var close = Geolib.findNearest(user_location, compressed_stations, 0, 2);
        console.log(close);
        close.forEach(function(element) {
          dispatch(addNearby(element.key))
        }, this);
         
        //return this.close;


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



