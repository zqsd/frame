const request = {};

function json(url, args) {
    return fetch(url, args).then(response => response.json());
}

json.get = function(originalUrl, query = {}) {
    const url = new URL(originalUrl, document.location.href);
    const sp = new URLSearchParams(originalUrl.search);
    for(const [key, value] of Object.entries(query)) {
        if(Array.isArray(value)) {
            for(const v of value) {
                sp.append(key, v);
            }
        }
        else if(value === undefined || value === undefined) {
        }
        else {
            sp.append(key, value);
        }
    }
    url.search = sp.toString();
    return json(url.toString(), {
        method: 'GET',
        credentials: 'include',
    });
};

json.post = function(url, data) {
    return json(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
};

json.put = function(url, data) {
    return json(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
};

json.delete = function(url, data) {
    return json(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
    });
};

request.json = json;

export {request};
