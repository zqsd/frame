function getElement(obj) {
    if(obj instanceof Element)
        return obj;

    const type = typeof(obj);
    if(type === 'object' && obj.__proto__.constructor.name !== 'Object') {
        return obj.el;
    }
    else if(type === 'string') {
        return document.createTextNode(obj);
    }
    else {
        return obj;
    }
}

function mount(parent, children) {
    mount.clear(parent);
    for(const child of Array.isArray(children) ? children : [children])
        mount.append(parent, child);
}

mount.clear = function(element) {
    element.innerHTML = ''; // quick clear
}

mount.prepend = function(parent, children) {
    if(!children)
        return;
    for(const child of Array.isArray(children) ? children : [children])
        parent.insertBefore(getElement(child), parent.firstChild);
};

mount.append = function(parent, children) {
    if(!children)
        return;
    for(const child of Array.isArray(children) ? children : [children])
        parent.appendChild(getElement(child));
};

mount.before = function(parent, children, reference) {
    if(!children)
        return;
    for(const child of Array.isArray(children) ? children : [children])
        parent.insertBefore(getElement(child), reference);
};

mount.after = function(parent, children, reference) {
    if(!children)
        return;
    for(const child of Array.isArray(children) ? children : [children])
        parent.insertBefore(getElement(child), reference.nextSibling);
};

mount.replace = function(parent, children, reference) {
    if(children) {
        for(const child of Array.isArray(children) ? children : [children])
            parent.replaceChild(getElement(child), reference);
    }
    else {
        mount.clear(parent);
    }
};

function unmount(children) {
    for(const child of Array.isArray(children) ? children : [children])
        child.remove();
}

export {mount, unmount};
