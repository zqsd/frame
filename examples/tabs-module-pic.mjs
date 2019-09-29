import {f, mount} from '../lib/frame.es.min.js';

export default function(content) {
    mount(content, f('img', {src: 'https://picsum.photos/640/480'}));
}