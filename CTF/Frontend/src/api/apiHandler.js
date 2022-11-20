import axios from "axios";

const backendAddress = 'http://localhost:5000'

export const loginEndpoint = async (email, password) => {

    let uri = backendAddress + '/login';

    return await axios.put(uri, {
        email: email,
        password: password
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
    })
        .then(response => response)
        .catch(error => error);

};

