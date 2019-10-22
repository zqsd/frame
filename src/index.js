import {element as element} from './element.js';
import {mount, unmount} from './mount.js';
import {request} from './request.js';
import {irange, range} from './range.js';
import {route} from './route.js';
import {PromiseSwitcher} from './PromiseSwitcher.js';

function html(arg1, arg2, arg3) {
    return element(null, arg1, arg2, arg3);
}
function f(arg1, arg2, arg3) {
    return element(null, arg1, arg2, arg3);
}

function svg(arg1, arg2, arg3) {
    return element('http://www.w3.org/2000/svg', arg1, arg2, arg3);
}

export default f;
export {
    element,
    f,
    html,
    svg,
    mount,
    unmount,
    request,
    irange,
    range,
    PromiseSwitcher,
    route,
};
