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
    SET_IMG_URL
} from './profile.actionTypes';
import axios from '../../axios';

export const getProfile = () => {
    return dispatch => {
        dispatch(getProfileLoading());
        axios.get('/profile')
            .then(data => {
                dispatch(getProfileSuccess(data.data.data));
            }).catch(err => {
                dispatch(getProfileError(err.response.status));
            })
    }
}

export const updateProfile = (payload) => {
    return dispatch => {
        dispatch(updateProfileLoading());
        axios.put('/profile/update', payload)
            .then(data => {
                dispatch(updateProfileSuccess(data.data.data));
            }).catch(err => {
                dispatch(updateProfileError(err.response.status));
            })
    }
}

export const uploadImage = (payload) => {
    return dispatch => {
        dispatch(uploadImageLoading());
        axios.post('/profile/upload-image', payload)
            .then(async data => {
                dispatch(uploadImageSuccess(data.data.data));
            }).catch(err => {
                dispatch(uploadImageError(err.response.status));
            })
    }
}

export const updateDateOfBirth = (payload) => {
    return {
        type: UPDATE_DATE_OF_BIRTH,
        payload
    }
}

export const setImgUrl = (payload) => {
    return {
        type: SET_IMG_URL,
        payload
    }
}

const getProfileSuccess = (payload) => {
    return {
        type: GET_PROFILE_SUCCESS,
        payload
    }
}

const getProfileLoading = () => {
    return {
        type: GET_PROFILE_LOADING,
    }
}

const getProfileError = (payload) => {
    return {
        type: GET_PROFILE_ERROR,
        payload
    }
}

const updateProfileSuccess = (payload) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload
    }
}

const updateProfileLoading = () => {
    return {
        type: UPDATE_PROFILE_LOADING,
    }
}

const updateProfileError = (payload) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        payload
    }
}
const uploadImageSuccess = (payload) => {
    return {
        type: UPLOAD_IMAGE_SUCCESS,
        payload
    }
}

const uploadImageLoading = () => {
    return {
        type: UPLOAD_IMAGE_LOADING,
    }
}

const uploadImageError = (payload) => {
    return {
        type: UPLOAD_IMAGE_ERROR,
        payload
    }
}