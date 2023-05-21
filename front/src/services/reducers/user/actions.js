import * as t from './types';


export const setUser = (user={}) => dispatch => {
    dispatch({
        type: t.SET_USER,
        payload: user,
    })
}