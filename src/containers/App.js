import React, { Component } from 'react';
import '../CSS/Sass/App.css';
//import '../App.css';
import logo from '../img/SmartBART.png';
import { connect } from 'react-redux';
import { fetchCurrentLocation } from '../actions';
import NearBy from '../components/nearby';


class App extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCurrentLocation())
  }
  
  render() {
    
    return (
      <div className="mainDiv">
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <p className="App-intro">
            Your nearby stations and estimated departures...
            
        </p>
        </div>
        <div >
          <NearBy list={this.props.nearby}> </NearBy>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { nearby: state.nearby };
}

export default connect(mapStateToProps)(App)

