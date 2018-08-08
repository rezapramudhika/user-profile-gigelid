import {
    LOGIN_SUCCESS,
    LOGIN_LOADING,
    LOGIN_ERROR,
    REGISTER_SUCCESS,
    REGISTER_LOADING,
    REGISTER_ERROR,
    CHECK_EMAIL_SUCCESS,
    CHECK_EMAIL_LOADING,
    CHECK_EMAIL_ERROR,
    CHECK_CONTACT_SUCCESS,
    CHECK_CONTACT_LOADING,
    CHECK_CONTACT_ERROR
} from './user.actionTypes';
import axios from '../../axios';

export const login = (payload) => {
    return dispatch => {
        dispatch(loginLoading());
        axios.post('/users/login', {
            email: payload.email,
            password: payload.password
        }).then(data => {
            dispatch(loginSuccess(data));
            localStorage.setItem('token', data.data.data.token)
            window.location.href = '/';
        }).catch(err => {
            dispatch(loginError(err.response.status));
        })
    }
}

export const register = (payload) => {
    return dispatch => {
        dispatch(registerLoading());
        axios.post('/users/register', {
            email: payload.email,
            password: payload.password,
            name: payload.name,
            contact: payload.contact
        }).then(data => {
            dispatch(registerSuccess(data));
            window.location.href = '/login/register-success'
        }).catch(err => {
            dispatch(registerError(err.response.status));
        })
    }
}

export const checkEmail = (payload) => {
    return dispatch => {
        dispatch(checkEmailLoading());
        axios.get(`/users/check-email?email=${payload.email}`)
            .then(data => {
                dispatch(checkEmailSuccess(data));
            }).catch(err => {
                dispatch(checkEmailError(err.response.status));
            })
    }
}

export const checkContact = (payload) => {
    return dispatch => {
        dispatch(checkContactLoading());
        axios.get(`/users/check-contact?contact=${payload.contact}`)
            .then(data => {
                dispatch(checkContactSuccess(data));
            }).catch(err => {
                dispatch(checkContactError(err.response.status));
            })
    }
}

const loginSuccess = (payload) => {
    return {
        type: LOGIN_SUCCESS,
        payload
    }
}

const loginLoading = () => {
    return {
        type: LOGIN_LOADING,
    }
}

const loginError = (payload) => {
    return {
        type: LOGIN_ERROR,
        payload
    }
}

const registerSuccess = (payload) => {
    return {
        type: REGISTER_SUCCESS,
        payload
    }
}

const registerLoading = () => {
    return {
        type: REGISTER_LOADING,
    }
}

const registerError = (payload) => {
    return {
        type: REGISTER_ERROR,
        payload
    }
}

const checkEmailSuccess = (payload) => {
    return {
        type: CHECK_EMAIL_SUCCESS,
        payload
    }
}

const checkEmailLoading = () => {
    return {
        type: CHECK_EMAIL_LOADING,
    }
}

const checkEmailError = (payload) => {
    return {
        type: CHECK_EMAIL_ERROR,
        payload
    }
}

const checkContactSuccess = (payload) => {
    return {
        type: CHECK_CONTACT_SUCCESS,
        payload
    }
}

const checkContactLoading = () => {
    return {
        type: CHECK_CONTACT_LOADING,
    }
}

const checkContactError = (payload) => {
    return {
        type: CHECK_CONTACT_ERROR,
        payload
    }
}