import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import user from './user/user.reducers';

const reducers = combineReducers ({
    user
})

const store = createStore(
    reducers,
    applyMiddleware(thunk)
);

export default store;