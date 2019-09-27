import f from '../lib/frame.es.min.js';

export default function(content) {
    f.mount(content, f('img', {src: 'https://picsum.photos/640/480'}));
}