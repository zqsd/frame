import {element as f} from './element.js';
import {mount, unmount} from './mount.js';
import {request} from './request.js';
import {irange, range} from './range.js';

f.mount = mount;
f.unmount = unmount;
f.request = request;
f.irange = irange;
f.range = range;

export default f;
