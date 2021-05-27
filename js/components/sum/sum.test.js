import { sum } from './sum.js';

test('skaiciaus ir jo neigiamos versijos suma lygi 0', () => {
    expect(sum(-5, 5)).toBe(0);
})

test('2 + 3 = 5', () => {
    expect(sum(2, 3)).toBe(5);
})

test('-2 + -3 = -5', () => {
    expect(sum(-2, -3)).toBe(-5);
})

test('jei pirmas parametras ne skaicius, grazina false', () => {
    expect(sum('hi', -3)).toBe(false);
})

test('jei antras parametras ne skaicius, grazina false', () => {
    expect(sum(-3, 'hi')).toBe(false);
})

test('jei pirmas parametras yra NaN, grazina false', () => {
    expect(sum(NaN, -3)).toBe(false);
})

test('jei antras parametras yra NaN, grazina false', () => {
    expect(sum(-3, NaN)).toBe(false);
})

test('jei pirmas parametras yra Infinity, grazina false', () => {
    expect(sum(Infinity, -3)).toBe(false);
})

test('jei antras parametras yra Infinity, grazina false', () => {
    expect(sum(-3, Infinity)).toBe(false);
})

test('jei pirmas parametras yra -Infinity, grazina false', () => {
    expect(sum(-Infinity, -3)).toBe(false);
})

test('jei antras parametras yra -Infinity, grazina false', () => {
    expect(sum(-3, -Infinity)).toBe(false);
})

test('0.1 + 0.2 = 0.3', () => {
    expect(sum(0.1, 0.2)).toBeCloseTo(0.3, 5);
})

test('-0.1 + -0.2 = -0.3', () => {
    expect(sum(-0.1, -0.2)).toBeCloseTo(-0.3, 5);
})