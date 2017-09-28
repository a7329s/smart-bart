import React from 'react';
import ReactDOM from 'react-dom';
//import { createStore, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
//import thunk from 'redux-thunk';
//import reducer from './reducers';
import configureStore from './store/configureStore'
import App from './containers/App';
import './index.scss';

/* //Old code  -uncomment to work.
BartAPI.getBARTStations();
//BartAPI.getStationNames();




function render() {
  
  var route = window.location.hash.substr(1);
 
  ReactDOM.render(
    <App route={route} />,
    document.getElementById('root')
  );

  
}

window.addEventListener('hashchange',render);
render();
*/

//New code with Redux - Start

const store=configureStore();
/*
const middleware = [thunk ];

//const store = createStore(reducer
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, /* preloadedState, / composeEnhancers(
applyMiddleware(...middleware)));
*/


//export default store;
ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>, document.getElementById('root')
);
//New code with Redux - End
