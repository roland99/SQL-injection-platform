function performRequest(request, callback){
    fetch(request)
        .then(
            function(response) {
                if (response.ok) {
                    if(response.status === 204){
                        response.then(data => callback(data,response.status, null));
                    }else{
                    response.json().then(json => callback(json, response.status,null));
                    //localStorage.setItem('jwt',response.headers.get('authorization'));
                    }
                }
                else {
                    response.json().then(err => callback(null, response.status,  err));
                }
            })
        .catch(function (err) {
            //catch any other unexpected error, and set custom code for error = 1
            callback(null, 1, err)
        });
}

module.exports = {
    performRequest
};
