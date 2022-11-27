import { AUTH } from '../constants/actionTypes';
import * as api from '../api';

export const signIn = (formData, navigate) => async (dispatch) => {
    try {
        // log in the user
        const { data } = await api.signIn(formData);
        navigate('/');
        dispatch({ type: AUTH, data });
        
    } catch (error) {
        console.log(error);
    }
}

export const signUp = (formData, navigate) => async (dispatch) => {
    try {
        // sign up the user
        const { data } = await api.signUp(formData);
        navigate('/');
        dispatch({ type: AUTH, data });
    } catch (error) {

    }
}