function mount(parent, child) {
    parent.innerHTML = ''; // quick clear
    parent.appendChild(child);
}

mount.prepend = function(parent, child) {
    parent.insertBefore(child, parent.firstChild);
};

mount.append = function(parent, child) {
    parent.appendChild(child);
};

mount.before = function(parent, child, reference) {
    parent.insertBefore(child, reference);
};

mount.after = function(parent, child, reference) {
    parent.insertBefore(child, reference.nextSibling);
};

mount.replace = function(parent, child, reference) {
    parent.replaceChild(child, reference);
};

function unmount(element) {
    element.remove();
}

export {mount, unmount};
