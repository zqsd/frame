export function explodeTagIdCls(tagIdCls) {
    const [, tag, , id, clss] = /^(\w*)(#([\w-]+)|)((\.[\w-]+)*)$/g.exec(tagIdCls || '');
    const cls = clss.split('.').slice(1);
    return [tag.length > 0 ? tag : 'div', id && id.length > 0 ? id : null, cls];
};

export function element(tagIdCls, arg2, arg3) {
    const [tag, id, cls] = explodeTagIdCls(tagIdCls);
    let attrs, content;
    if(arg3) {
        attrs = arg2;
        content = arg3;
    }
    else {
        if(typeof(arg2) === 'object') {
            attrs = arg2;
        }
        else {
            content = arg2;
        }
    }
    const el = document.createElement(tag);
    if(id) {
        el.id = id;
    }

    if(cls.length > 0) {
        el.className = cls.join(' ');
    }

    if(attrs) {
        for(const [key, value] of Object.entries(attrs)) {
            el.setAttribute(key, value);
        }
    }
    if(content) {
        if(typeof(content) === 'string') {
            el.appendChild(document.createTextNode(content));
        }
    }

    return el;
};