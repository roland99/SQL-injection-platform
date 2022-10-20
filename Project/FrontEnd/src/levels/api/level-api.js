import { HOST } from "../../commons/hosts";
import RestApiClient from "../../commons/api/rest-client";



const endpoint = {
    getOneLevel: '/user/getOneLevel',
    level1: '/user/level1',
    level2: '/user/level2',
    level3: '/user/level3',
    level4: '/user/level4',
    level5: '/user/level5',
    level6: '/user/level6',
    level7: '/user/level7',
    level8: '/user/level8'

};

const header = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "Authorization":`${localStorage.getItem('jwt')}`,
};

function getPostLevelInfo(data,callback){
    let request = new Request(HOST.backend_api + endpoint.getOneLevel,{
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);

}

function postLevel1(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level1, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel2(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level2, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel3(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level3, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel4(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level4, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel5(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level5, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel6(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level6, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel7(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level7, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}

function postLevel8(data,callback){
    let request = new Request(HOST.backend_api + endpoint.level8, {
        method: 'POST',
        headers: header,
        body: JSON.stringify(data)
    });
    console.log("URL: " + request.url);
    RestApiClient.performRequest(request,callback);
}


export {
    getPostLevelInfo,
    postLevel1,
    postLevel2,
    postLevel3,
    postLevel4,
    postLevel5,
    postLevel6,
    postLevel7,
    postLevel8
};