import {mount} from './mount';
import {route} from './route';

export function explodeTagIdCls(tagIdCls) {
    const [, tag, , id, clss] = /^(\w*)(#([\w-]+)|)((\.[\w-]+)*)$/g.exec(tagIdCls || '');
    const cls = clss.split('.').slice(1);
    return [tag.length > 0 ? tag : 'div', id && id.length > 0 ? id : null, cls];
};

export function element(ns, tagIdCls, arg2, arg3) {
    const [tag, id, cls] = explodeTagIdCls(tagIdCls);
    let attrs, content;

    // arg2: element attributes, arg3: content
    if(typeof(arg2) === 'object' && arg2.__proto__.constructor.name === 'Object') {
        attrs = arg2;
        content = arg3;
    }
    else {
        content = arg2;
    }

    const el = ns ? document.createElementNS(ns, tag) : document.createElement(tag);
    if(id) {
        el.id = id;
    }

    if(cls.length > 0) {
        el.className = cls.join(' ');
    }

    // route links
    if(route.table && tag === 'a' && !('click' in attrs) && ('href' in attrs)) {
        if(route.get(attrs.href)) {
            attrs.click = (e) => {
                route.go(attrs.href);
                e.preventDefault();
            };
        }
    }

    if(attrs) {
        for(const [key, value] of Object.entries(attrs)) {
            if(typeof(value) === 'function') {
                el.addEventListener(key, value);
                if(key === 'click' && tag === 'a' && !('href' in attrs)) {
                    el.setAttribute('href', 'javascript:;');
                }
            }
            if(value === false || value === null || value === undefined) {
	    }
            else {
                el.setAttribute(key, value);
            }
        }
    }
    mount(el, content);

    return el;
};
