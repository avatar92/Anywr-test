const sum = (a, b) => a + b;

it('sums number', () => {
    expect(sum(1, 2)).toEqual(3);
    expect(sum(2, 2)).toEqual(4);
})