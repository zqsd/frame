const {mount} = require('../src/mount.js');
import {element as f} from './element.js';
const {JSDOM} = require('jsdom');
const window = (new JSDOM(``, {runScripts: "outside-only"})).window;
global.window = window;

function oneTwoThreeFour() {
    const promA = new Promise(resolve => resolve('Three')),
    promB = promA.then(() => 'Four'),
    promC = promB.then(() => 'One'),
    promD = promC.then(() => 'Two');
    return [promC, promD, promA, promB];
}


describe('mount', function () {
    let root;
    beforeEach(() => {
        root = document.createElement('div');
    });

    test('mount() text', () => {
        expect(mount(root, 'Hello world')).toBeUndefined();
        expect(root.innerHTML).toBe('Hello world');
    });

    test('mount() html element', () => {
        const span = document.createElement('span');
        span.textContent = 'Hello world';
        expect(mount(root, span)).toBeUndefined();
        expect(root.innerHTML).toBe('<span>Hello world</span>');
    });

    test('mount() function', () => {
        expect(mount(root, () => 'Hello world')).toBeUndefined();
        expect(root.innerHTML).toBe('Hello world');
    });

    test('mount() function', () => {
        expect(mount(root, () => 'Hello world')).toBeUndefined();
        expect(root.innerHTML).toBe('Hello world');
    });

    test('mount() component', () => {
        class Component {
            constructor() {
                this.el = document.createElement('span');
                this.update('Hello world');
            }

            update(text) {
                this.el.textContent = text;
            }
        }
        const component = new Component();
        expect(mount(root, component)).toBeUndefined();
        expect(root.innerHTML).toBe('<span>Hello world</span>');
        component.update('Bonjour monde');
        expect(root.innerHTML).toBe('<span>Bonjour monde</span>');
    });

    test('mount() promise', () => {
        const result = mount(root, async () => 'Hello world');
        expect(root.innerHTML).toBe('');
        expect(result).toBeInstanceOf(Promise);
        return result.then(() => {
            expect(root.innerHTML).toBe('Hello world');
        });
    });

    test('mount() frame element', () => {
        expect(mount(root, f('div', 'Hello world'))).toBeUndefined();
        expect(root.innerHTML).toBe('<div>Hello world</div>');
    });

    test('mount() array text', () => {
        expect(mount(root, [
            'Hello',
            'World'
        ])).toBeUndefined();
        expect(root.innerHTML).toBe('HelloWorld');
    });

    test('mount() promise array', () => {
        const promA = new Promise(resolve => resolve('Three')),
              promB = promA.then(() => 'Four'),
              promC = promB.then(() => 'One'),
              promD = promC.then(() => 'Two');

        const result = mount(root, [promC, promD, promA, promB]);
        expect(result).toBeInstanceOf(Promise);
        return result.then(() => {
            expect(root.innerHTML).toBe('OneTwoThreeFour');
        });
    });

    test('mount() between elements', () => {
        root.innerHTML = '<div>head</div><div>foot</div>';
        const result = mount(root, oneTwoThreeFour());
        expect(result).toBeInstanceOf(Promise);
        return result.then(() => {
            expect(root.innerHTML).toBe('OneTwoThreeFour');
        });
    });

    describe('mount.append', function () {
         test('mount.append() between elements', () => {
            root.innerHTML = '<div>head</div><div>foot</div>';
            const result = mount.append(root, oneTwoThreeFour());
            expect(result).toBeInstanceOf(Promise);
            return result.then(() => {
                expect(root.innerHTML).toBe('<div>head</div><div>foot</div>OneTwoThreeFour');
            });
        });
    });

    test('mount.after() between elements', () => {
        root.innerHTML = '<div>head</div><div>foot</div>';
        const result = mount.after(root, oneTwoThreeFour(), root.firstChild);
        expect(result).toBeInstanceOf(Promise);
        return result.then(() => {
            expect(root.innerHTML).toBe('<div>head</div>OneTwoThreeFour<div>foot</div>');
        });
    });

    test('mount.prepend() between elements', () => {
        root.innerHTML = '<div>head</div><div>body</div><div>foot</div>';
        const result = mount.prepend(root, oneTwoThreeFour());
        expect(result).toBeInstanceOf(Promise);
        return result.then(() => {
            expect(root.innerHTML).toBe('OneTwoThreeFour<div>head</div><div>body</div><div>foot</div>');
        });
    });

    test('mount.before() between elements', () => {
        root.innerHTML = '<div>head</div><div>foot</div>';
        const result = mount.before(root, oneTwoThreeFour(), root.lastChild);
        expect(result).toBeInstanceOf(Promise);
        return result.then(() => {
            expect(root.innerHTML).toBe('<div>head</div>OneTwoThreeFour<div>foot</div>');
        });
    });
});
