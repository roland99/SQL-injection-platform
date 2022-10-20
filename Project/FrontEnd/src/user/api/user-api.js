import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";

const endpoint = {
    userRegister: '/user/register',
    userLogin: '/user/login',
    generateCode: '/user/generateCode',
    resetPassword: '/user/resetPassword',
    getLevels: '/user/getLevels'
};

//TODO const header = pt jwt
const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization":`${localStorage.getItem('jwt')}`,
};

function postRegisterUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.userRegister,{
        method: 'POST',
        headers: header,
        body: JSON.stringify(user)
    });
    console.log(request.url);
    RestApiClient.performRequest(request,callback);
}

function postLoginUser(user, callback){
    let request = new Request(HOST.backend_api + endpoint.userLogin,{
        method: 'POST',
        headers : header,
        body: JSON.stringify(user)
    });
    console.log(request.url);
    console.log(user);
    RestApiClient.performRequest(request,callback);
}

function postGenerateCode(userEmail, callback){
    let request = new Request(HOST.backend_api + endpoint.generateCode,{
        method: 'POST',
        headers : header,
        body: JSON.stringify(userEmail)
    });
    console.log(request);
    RestApiClient.performRequest(request,callback);
}

function postResetPassword(userPasswordReset, callback){
    let request = new Request(HOST.backend_api + endpoint.resetPassword, {
        method: 'POST',
        headers : header,
        body: JSON.stringify(userPasswordReset)
    });
    console.log(request);
    RestApiClient.performRequest(request,callback);
}

function getLevels(callback){
    let request = new Request(HOST.backend_api + endpoint.getLevels,{
        method: 'GET',
        headers: header
    });
    console.log(request);
    RestApiClient.performRequest(request,callback);
}

export{
    postRegisterUser,
    postGenerateCode,
    postLoginUser,
    postResetPassword,
    getLevels
}