function select(arg) {
    if(arg instanceof Element)
        return arg;
    else
        return document.querySelector(arg);
}

/* Traverse a node tree and converts everything to html elements
 * @param {HTMLElement,Array,Promise,function,string,Component} node Tree of elements
 * @param {function} callback Call on each resolved element for the caller to make desired operations on element
 * @returns undefined if all elements processed synchronously, instanceof Promise resolved when all elements are ready if async
 */
function traverse(node, callback) {
    // use directly html element
    if(node instanceof Node) {
        callback(node, null);
    }
    // list of elements
    else if(Array.isArray(node)) {
        let promises;
        for(let i = 0; i < node.length; i++) {
            const currentNode = node[i];
            // at least one promise in the list, traversal will be async
            if(currentNode instanceof Promise) {
                if(!promises)
                    promises = [currentNode];
                else
                    promises.push(currentNode);
                
                currentNode.then(result => {
                    traverse(result, (element, before) => {
                        node[i] = element;
                        // find were our element should be located
                        for(let j = i + 1; j < node.length; j++) {
                            if(node[j] && node[j] instanceof Node) {
                                before = node[j];
                                break;
                            }
                        }
                        callback(element, before);
                    });
                });
            }
            // synchronous case
            else {
                traverse(currentNode, callback);
            }
        }
        // wait for promises to complete
        if(promises) {
            return Promise.all(promises);
        }
    }
    // promise : resolve
    else if(node instanceof Promise) {
        return node.then(node => traverse(node, callback));
    }
    // nothing : skip
    else if(node === null || node === undefined) {
    }
    else {
        const type = typeof(node);

        // component
        if(type === 'object' && node.__proto__.constructor.name !== 'Object' && 'el' in node && node.el instanceof Node) {
            callback(node.el, null);
        }
        // dynamic function
        else if(type === 'function') {
            return traverse(node(), callback);
        }
        // consider everything else as text
        else {
            callback(document.createTextNode(node), null);
        }
    }
}

/**
 * Clears all contents of element
 * @param {HTMLElement} element
 */
mount.clear = function(selector) {
    const element = select(selector);
    if(element.childNodes.length > 0)
        element.innerHTML = ''; // quick clear
}

/**
 * Mount children elements into parent
 * Replaces all previous content inside parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement,Array,Promise,function,string,Component} children
 */
function mount(parentSelector, children) {
    const parent = select(parentSelector);
    mount.clear(parent);
    return mount.append(parent, children);
}

/**
 * Mount children elements before all existing elements of parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement,Array,Promise,function,string,Component} children
 */
mount.prepend = function(parentSelector, children) {
    const parent = select(parentSelector);
    return mount.before(parent, children, parent.firstChild);
};

/**
 * Mount children elements after all existing elements of parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement,Array,Promise,function,string,Component} children
 */
mount.append = function(parentSelector, children) {
    const parent = select(parentSelector);
    return mount.after(parent, children, null);
};

/**
 * Mount children elements before reference element of parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement,Array,Promise,function,string,Component} children
 * @param {HTMLElement} reference 
 */
mount.before = function(parentSelector, children, reference) {
    const parent = select(parentSelector);
    return traverse(children, (element, reference2) => {
        parent.insertBefore(element, reference2 ? reference2 : reference);
    });
};

/**
 * Mount children elements after reference element of parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement,Array,Promise,function,string,Component} children
 * @param {HTMLElement} reference 
 */
mount.after = function(parentSelector, children, reference) {
    const parent = select(parentSelector);
    const after = reference ? reference.nextSibling : null;
    return traverse(children, (element, after2) => {
        parent.insertBefore(element, after2 ? after2 : after);
    });
};

mount.replace = function(children, reference) {
    if(children) {
        return traverse(children, (element) => {
            reference.parentNode.replaceChild(element, reference)
        });
    }
    else {
        mount.clear(reference.parentNode);
    }
};

function unmount(children) {
    for(const child of Array.isArray(children) ? children : [children])
        child.remove();
}

export {mount, unmount};