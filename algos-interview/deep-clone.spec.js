const deepClone = require('./deep-clone');

describe('deepClone', () => {
  test('array', () => {
    expect(deepClone([1, 2, 3])).toEqual([1, 2, 3]);
  });
});
