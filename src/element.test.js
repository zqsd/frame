const {explodeTagIdCls, element} = require('../src/element.js');
const {JSDOM} = require('jsdom');
const window = (new JSDOM(``, {runScripts: "outside-only"})).window;
global.window = window;

describe('element', function () {
    test('explodeTagIdCls()', () => {
        expect(explodeTagIdCls()).toEqual(['div', null, []]);

        // id
        expect(explodeTagIdCls('#id')).toEqual(['div', 'id', []]);
        expect(explodeTagIdCls('span#id')).toEqual(['span', 'id', []]);

        // class
        expect(explodeTagIdCls('.hello')).toEqual(['div', null, ['hello']]);
        expect(explodeTagIdCls('.hello.world')).toEqual(['div', null, ['hello', 'world']]);
        expect(explodeTagIdCls('span.hello.world')).toEqual(['span', null, ['hello', 'world']]);

        // id + class
        expect(explodeTagIdCls('#id.hello')).toEqual(['div', 'id', ['hello']]);
        expect(explodeTagIdCls('#id.hello.world')).toEqual(['div', 'id', ['hello', 'world']]);
        expect(explodeTagIdCls('span#id.hello')).toEqual(['span', 'id', ['hello']]);
        expect(explodeTagIdCls('span#id.hello.world')).toEqual(['span', 'id', ['hello', 'world']]);
    });

    test('f(...) element creation', () => {
        expect(element(null).outerHTML).toBe('<div></div>');
        expect(element(null, '#hello').outerHTML).toBe('<div id="hello"></div>');

        expect(element(null, '.hello').outerHTML).toBe('<div class="hello"></div>');
        expect(element(null, '.hello.world').outerHTML).toBe('<div class="hello world"></div>');
        expect(element(null, 'span.hello').outerHTML).toBe('<span class="hello"></span>');

        expect(element(null, 'font').outerHTML).toBe('<font></font>');
        expect(element(null, 'font', {}).outerHTML).toBe('<font></font>');
        expect(element(null, 'font', 'test').outerHTML).toBe('<font>test</font>');
        expect(element(null, 'font', {}, 'test').outerHTML).toBe('<font>test</font>');
        expect(element(null, 'font', {color: 'red'}).outerHTML).toBe('<font color="red"></font>');
        expect(element(null, 'font', {color: 'red'}, 'test').outerHTML).toBe('<font color="red">test</font>');
    });
});