function sum(a, b) {
    if (typeof a !== 'number' ||
        !isFinite(a) ||
        typeof b !== 'number' ||
        !isFinite(b)) {
        return false;
    }
    return a + b;
}

export { sum }