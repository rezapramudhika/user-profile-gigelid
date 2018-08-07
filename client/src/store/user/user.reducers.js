import {
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING,
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

const initialState = {
    loginErrorCode: 0,
    loginLoading: false,
    loginError: false,
    registerErrorCode: 0,
    registerLoading: false,
    registerError: false,
    checkEmailErrorCode: 0,
    checkEmailLoading: false,
    checkEmailError: false,
    checkContactErrorCode: 0,
    checkContactLoading: false,
    checkContactError: false,
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginLoading: false,
                loginError: false
            }
        case LOGIN_LOADING:
            return {
                ...state,
                loginError: false,
                loginLoading: true,
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loginErrorCode: action.payload,
                loginLoading: false,
                loginError: true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                registerLoading: false,
                registerError: false
            }
        case REGISTER_LOADING:
            return {
                ...state,
                registerError: false,
                registerLoading: true,
            }
        case REGISTER_ERROR:
            return {
                ...state,
                registerErrorCode: action.payload,
                registerLoading: false,
                registerError: true
            }
        case CHECK_EMAIL_SUCCESS:
            return {
                ...state,
                checkEmailErrorCode: 0,
                checkEmailLoading: false,
                checkEmailError: false
            }
        case CHECK_EMAIL_LOADING:
            return {
                ...state,
                checkEmailError: false,
                checkEmailLoading: true,
            }
        case CHECK_EMAIL_ERROR:
            return {
                ...state,
                checkEmailErrorCode: action.payload,
                checkEmailLoading: false,
                checkEmailError: true
            }
        case CHECK_CONTACT_SUCCESS:
            return {
                ...state,
                checkContactErrorCode: 0,
                checkContactLoading: false,
                checkContactError: false
            }
        case CHECK_CONTACT_LOADING:
            return {
                ...state,
                checkContactError: false,
                checkContactLoading: true,
            }
        case CHECK_CONTACT_ERROR:
            return {
                ...state,
                checkContactErrorCode: action.payload,
                checkContactLoading: false,
                checkContactError: true
            }
        default:
            return state;
    }
}

export default reducers;