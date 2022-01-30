import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { authReducer } from '../reducers/authReducer';
import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// the combineReducers method will allow us to have more than one reducer in the
// project
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer
})

// the createStore method will contain all the reducers in our webpage, along with the
// middleware from redux needed to execute asynchronous tasks
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);