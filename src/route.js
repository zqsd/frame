import {mount} from './mount';

export function route(root, table, base) {
    route.table = table;
    route.root = root;
    route.base = typeof(base) === 'string' ? base : document.location.pathname + '#';

    window.addEventListener('popstate', (event) => {
        route.set(document.location.pathname, event.state);
    });

    console.log('router base : ' + document.location.pathname)
    route.set(document.location.pathname + document.location.hash);

    return route;
}

route.table = null;

route.set = function(path, state) {
    let matchingRoute = route.get(path);
    if(matchingRoute) {
        mount(route.root, matchingRoute);
    }
    else {
        console.error('No route found ' + path);
    }
};

route.go = function(path, state) {
    route.set(path, state);
    history.pushState(state, 'Title', route.base + path);
};

route.get = function(path) {
    if(route.base.substr(-1) === '#' && path + '#' === route.base) {
        path = '/';
    }
    if(path.startsWith(route.base)) {
        path = path.substring(route.base.length);
    }
    console.log('get ' + path)
    if(path in route.table) {
        return route.table[path];
    }
}
