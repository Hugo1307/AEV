import axios from "axios";
import {getAuthorizationHeader} from "./authHandler";

const backendAddress = 'http://localhost:5050'

export const loginEndpoint = async (email, password) => {

    let uri = backendAddress + '/login';

    return await axios.put(uri, {
        email: email,
        password: password
    }, {
        headers: {Authorization: getAuthorizationHeader()}
    })
        .then(response => {
            return {success: true, response: response};
        })
        .catch(error => {
            return {success: false, response: error.response};
        });

};

export const registerEndpoint = async (email, password) => {

    let uri = backendAddress + '/register';

    return await axios.post(uri, {
        email: email,
        password: password
    }, {
        headers: {Authorization: getAuthorizationHeader()}
    })
        .then(response => {
            return {success: true, response: response};
        })
        .catch(error => {
            return {success: false, response: error.response};
        });

};

export const getCategoriesEndpoint = () => {
    return {uri: backendAddress + '/categories'}
}

export const getCategoryInfoEndpoint = () => {
    return {uri: backendAddress + '/category'}
}

export const getProfileEndpoint = () => {
    return {uri: backendAddress + '/profile'}
}

export const getCronLogs = () => {
    return {uri: backendAddress + '/cron'}
}

export const setCronSchedule = (newSchedulerArg) => {

    let uri = backendAddress + '/cron';

    return axios.post(uri, {
        new_cron_time: newSchedulerArg
    }, {
        headers: {Authorization: getAuthorizationHeader()}
    })
        .then(response => {
            return {success: true, response: response};
        })
        .catch(error => {
            return {success: false, response: error.response};
        });

}
