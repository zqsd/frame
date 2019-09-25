import {mount} from './mount.js';

export class PromiseSwitcher {
    constructor(init, promise) {
        this.el = init();
        promise.then(el => mount.replace(el, this.el));
    }
}