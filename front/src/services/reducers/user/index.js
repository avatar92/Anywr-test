import * as t from './types';

const initState = {};

export default (state=initState,action) => {
    switch(action.type){
        case t.SET_USER: 
            return action.payload;
        default: 
            return state;
    }
}