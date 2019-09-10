import {element as f} from './element.js';
import {mount, unmount} from './mount.js';
import {request} from './request.js';

f.mount = mount;
f.unmount = unmount;
f.request = request;

export default f;
