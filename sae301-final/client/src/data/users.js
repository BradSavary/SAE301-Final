import {postRequest} from '../lib/api-request.js';

let UserData   = {};

UserData.signup= async function (formdata) {
    let data = await postRequest("/users/signup", formdata);
    return data;
}

UserData.signin= async function (formdata) {
    let data = await postRequest("/users/signin", formdata);
    return data;
}

UserData.signout= async function () {
    let data = await postRequest("/users/signout");
    return data;
}

export { UserData };