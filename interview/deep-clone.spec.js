const deepClone = require('./deep-clone');

describe('deepClone', () => {
  test('array', () => {
    expect(deepClone([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test.only('array', () => {
    expect(deepClone([null, 2, 3])).toEqual([null, 2, 3]);
  });

  test('array/object', () => {
    expect(deepClone([{ foo: 'foo' }, 2, 3])).toEqual([{ foo: 'foo' }, 2, 3]);
  });

  test('circular', () => {
    const obj = {
      foo: 'foo',
      bar: 'bar',
    };

    obj.quz = obj;

    const result = deepClone(obj);
    console.log(result);
    return;
    expect(deepClone(obj)).toEqual({
      foo: 'foo',
      bar: 'bar',
      quz: obj,
    });
  });
});
