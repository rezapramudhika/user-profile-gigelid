import {
    GET_PROFILE_SUCCESS,
    GET_PROFILE_LOADING,
    GET_PROFILE_ERROR,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_LOADING,
    UPDATE_PROFILE_ERROR,
    UPDATE_DATE_OF_BIRTH,
    UPLOAD_IMAGE_SUCCESS,
    UPLOAD_IMAGE_LOADING,
    UPLOAD_IMAGE_ERROR,
    SET_IMG_URL,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_LOADING,
    CHANGE_PASSWORD_ERROR
} from './profile.actionTypes';
import moment from 'moment';

const initialState = {
    profile: '',
    dateOfBirth: '',
    imgUrl: '',
    getProfileLoading: false,
    getProfileError: false,
    updateProfileLoading: false,
    updateProfileError: false,
    uploadImageLoading: false,
    uploadImageError: false,
    changePasswordErrorCode: 0,
    changePasswordLoading: false,
    changePasswordError: false,
}

const reducers = (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                dateOfBirth: action.payload.birthofdate ? moment(action.payload.birthofdate) : '',
                imgUrl: action.payload.imgUrl ? action.payload.imgUrl : '',
                getProfileLoading: false,
                getProfileError: false
            }
        case GET_PROFILE_LOADING:
            return {
                ...state,
                getProfileError: false,
                getProfileLoading: true,
            }
        case GET_PROFILE_ERROR:
            return {
                ...state,
                getProfileLoading: false,
                getProfileError: true
            }
        case UPDATE_DATE_OF_BIRTH:
            return {
                ...state,
                dateOfBirth: action.payload
            }
        case SET_IMG_URL:
            return {
                ...state,
                imgUrl: action.payload ? action.payload : ''
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                dateOfBirth: action.payload.birthofdate ? moment(action.payload.birthofdate) : '',
                updateProfileLoading: false,
                updateProfileError: false
            }
        case UPDATE_PROFILE_LOADING:
            return {
                ...state,
                updateProfileError: false,
                updateProfileLoading: true,
            }
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                updateProfileLoading: false,
                updateProfileError: true
            }
        case UPLOAD_IMAGE_SUCCESS:
            return {
                ...state,
                profile: action.payload,
                imgUrl: action.payload.imgUrl,
                uploadImageLoading: false,
                uploadImageError: false
            }
        case UPLOAD_IMAGE_LOADING:
            return {
                ...state,
                uploadImageError: false,
                uploadImageLoading: true,
            }
        case UPLOAD_IMAGE_ERROR:
            return {
                ...state,
                uploadImageLoading: false,
                uploadImageError: true
            }
        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                changePasswordErrorCode: 0,
                changePasswordLoading: false,
                changePasswordError: false
            }
        case CHANGE_PASSWORD_LOADING:
            return {
                ...state,
                changePasswordError: false,
                changePasswordLoading: true,
            }
        case CHANGE_PASSWORD_ERROR:
            return {
                ...state,
                changePasswordErrorCode: action.payload,
                changePasswordLoading: false,
                changePasswordError: true
            }
        default:
            return state;
    }
}

export default reducers;