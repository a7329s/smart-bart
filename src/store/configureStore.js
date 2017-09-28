import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';


export default function configureStore(initialState) {
    const middleware = [thunk];

    //const store = createStore(reducer
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return createStore(
        reducer, /* preloadedState, */
        composeEnhancers(
            applyMiddleware(...middleware))
    );
}