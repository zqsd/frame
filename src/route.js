import {mount} from './mount';

/**
 * Initializes the frame router
 * 
 * @param {HTMLElement} root root container element
 * @param {Object} table map of each route. key is pattern, value is content
 * @param {*} base base url at which the page is loaded. '' for website at root
 */
export function route(root, table, base) {
    for(const pattern in table) {
        route.add(pattern, table[pattern]);
    }
    route.root = root;
    if(typeof(base) === 'string')
        route.base = base;

    window.addEventListener('popstate', ({state}) => {
        if(state) {
            route.set(state.path, state.params);
        }
        else {
            route.set(document.location.pathname + document.location.hash);
        }
    });
    route.set(document.location.pathname + document.location.hash);

    return route;
}

route.base = document.location.pathname + '#';
route.table = [];

/**
 * Compiles a regex from a route pattern
 * 
 * @param {*} pattern route pattern
 * @returns {RegExp} regexp satisfiying the pattern
 */
function routeToRegex(pattern) {
    const regex = pattern.replace(/\//g, '\\/').replace(/:(\w+)/g, '(?<$1>\\w+)');
    return new RegExp(`^${regex}$`);;
}

/**
 * Adds a route to the route table
 * 
 * @param {string} pattern
 * @param {function,HTMLElement,FrameElement,Object} content Content to display. Can have a controller function in the middle.
 */
route.add = function(pattern, content) {
    route.table.push({
        pattern,
        regex: routeToRegex(pattern),
        content,
    });
};

/**
 * Load route without changing the browser URL
 * 
 * @param {string} path route path
 */
route.set = function(path) {
    let [matchingRoute, params] = route.get(path);
    if(matchingRoute) {
        // give params if matching route is a function
        let content = matchingRoute instanceof Function ? matchingRoute(params) : matchingRoute;
        mount(route.root, content);
    }
    else {
        throw new Error('No route found ' + path);
    }
};

/**
 * Load route and change browser URL
 * 
 * @param {string} path route path
 */
route.go = function(path) {
    route.set(path);
    history.pushState({
        path,
    }, 'Title', route.base + path);
};

/**
 * Find a route that matches the given path
 * 
 * @param  {string} path route path
 * @returns {[content, params]} The route content and params extracted from the path if any
 */
route.get = function(path) {
    // manage default route
    if(route.base.substr(-1) === '#' && path + '#' === route.base) {
        path = '/';
    }
    // remove base from path
    if(path.startsWith(route.base)) {
        path = path.substring(route.base.length);
    }

    // find route that matches path
    for(const r of route.table) {
        const m = r.regex.exec(path);
        if(m) {
            return [r.content, m.groups];
        }
    }
}
