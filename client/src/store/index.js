import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './user/user.reducers';
import profile from './profile/profile.reducers';

const reducers = combineReducers ({
    user,
    profile
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;