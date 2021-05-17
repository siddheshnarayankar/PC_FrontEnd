import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    getAll,
    createUser,
    getAdminUsers,
    updateUser,
    getAppUsers,
    updateAppUser
};

function login(userid, password,phone) {
    return dispatch => {
        dispatch(request({ userid }));

        userService.login(userid, password,phone)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    // dispatch(alertActions.error(error));
                }
            );
    };
    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function getAll(cityId,role) {
    return dispatch => {
        dispatch(request());
        userService.getAll(cityId,role)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAdminUsers(role) {
    return dispatch => {
        dispatch(request());
        userService.getAdminUsers(role)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GET_ADMIN_USER_REQUEST } }
    function success(users) { return { type: userConstants.GET_ADMIN_USER_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GET_ADMIN_USER_FAILURE, error } }
}


function getAppUsers(cityId) {
    return dispatch => {
        dispatch(request());
        userService.getAppUsers(cityId)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: userConstants.GET_APP_USER_REQUEST } }
    function success(appuser) { return { type: userConstants.GET_APP_USER_SUCCESS, appuser } }
    function failure(error) { return { type: userConstants.GET_APP_USER_FAILURE, error } }
}

function createUser(data) {
    return dispatch => {
        userService.createUser(data)
            .then(
                user => { 
                    dispatch(success(user));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(newUser) { return { type: userConstants.CREATE_USER_REQUEST, newUser } }
    function success(newUser) { return { type: userConstants.CREATE_USER_SUCCESS, newUser } }
    function failure(error) { return { type: userConstants.CREATE_USER_FAILURE, error } }
}

function updateUser(data,id) {
    let reqObj = {
        ...data,
        id
    }
    return dispatch => {
        userService.updateUser(data,id)
            .then(
                updatedUser => { 
                    dispatch(success(reqObj));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(updatedUser) { return { type: userConstants.UPDATE_USER_REQUEST, updatedUser } }
    function success(updatedUser) { return { type: userConstants.UPDATE_USER_SUCCESS, updatedUser } }
    function failure(error) { return { type: userConstants.UPDATE_USER_FAILURE, error } }
}

function updateAppUser(data,id) {
    let reqObj = {
        ...data,
        id
    }
  
    return dispatch => {
        dispatch(request());
        userService.updateAppUser(data,id)
            .then(
                updatedUser => { 
                    dispatch(success(reqObj));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };
    function request(updatedAppUser) { return { type: userConstants.UPDATE_APP_USER_REQUEST, updatedAppUser } }
    function success(updatedAppUser) { return { type: userConstants.UPDATE_APP_USER_SUCCESS, updatedAppUser } }
    function failure(error) { return { type: userConstants.UPDATE_APP_USER_FAILURE, error } }
}