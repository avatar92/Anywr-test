import {applyMiddleware,createStore,compose} from "redux";

import thunk from "redux-thunk";

import rootReducer from "../reducers/index"; 

const initState = {};

const middleware = [thunk];

const store = createStore(rootReducer,initState,compose(
    applyMiddleware(...middleware)
));

export default store;