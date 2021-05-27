import { Features } from './Features.js';

test('turi buti tinkamas tipas', () => {
    const features = new Features();
    expect(features instanceof Features).toBe(true);
})

test('be parametru turi grazinti false', () => {
    const features = new Features();
    expect(features.isValidSelector()).toBe(false);
})

test('selector parametras netinkamo tipo', () => {
    const features = new Features(145);
    expect(features.isValidSelector()).toBe(false);
})

test('selector parametras negali buti tuscias tekstas', () => {
    const features = new Features('');
    expect(features.isValidSelector()).toBe(false);
})

test('selector parametras ne tuscias tekstas', () => {
    const features = new Features('a');
    expect(features.isValidSelector()).toBe(true);
})

test('geba rasti reikiama elementa pagal selector parametra', () => {
    document.body.innerHTML = '<p></p>';
    const features = new Features('p');
    features.findElementBySelector();
    expect(features.DOM).not.toBeNull();
})

test('neranda reikiamo elemento pagal selector parametra, jei elementas neegzistuoja', () => {
    document.body.innerHTML = '<p></p>';
    const features = new Features('#features_block');
    features.findElementBySelector();
    expect(features.DOM).toBeNull();
})

test('geba rasti reikiama elementa pagal selector parametra ID', () => {
    document.body.innerHTML = '<div id="features_block"></div>';
    const features = new Features('#features_block');
    features.findElementBySelector();
    expect(features.DOM).not.toBeNull();
})