require('isomorphic-fetch');

export const FAKE_LATENCY = Symbol('Fake Latency');
export const CALL_API = Symbol('Call API');

export default store => next => action => {
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') {
        return next(action);
    }

    function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction;
    }

    if (callApi.types.length > 1) {
        setTimeout(function () {
            next(actionWith({
                type: callApi.types[0]
            }));
        }, 0);
    }

    var options = {
        method: callApi.method || 'GET',
        body: callApi.body ? JSON.stringify(callApi.body) : null,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    };

    fetch(callApi.url, options).then(function (response) {
        return response.json().then(function (body) {
            next(actionWith({
                type: callApi.types[callApi.types.length == 1 ? 0 : 1],
                response: body
            }));
        });
    }).catch(function (ex) {
    });
};
