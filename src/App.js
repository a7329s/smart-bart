import React, { Component } from 'react';
import './App.css';
import Header from './components/common/headers';
import Footer from './components/common/footer';
import station from './components/station';
import stationList from './components/stations/stationPage';
import nearbyStation from './components/nearbyStation/nearbyStation';
import bartMap from './components/bartMap/bartMap';
import BartAPI from './API/BartAPI';


class App extends Component {
  render() {
      var Child;
    switch(this.props.route){
      case 'nearbyStation': Child=nearbyStation; break;
      case 'station': Child=station; break;
      case 'bartMap': Child=bartMap; break;

      
      default: Child=stationList; 
    }

    return (
      <div className="App">        
        <Header/>
        <Child />       
        <Footer />
      </div>
    );
  }
};


export default App;

