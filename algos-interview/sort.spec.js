const { bubboSort, bubboSort2, selectionSort, insertionSort } = require('./sort');

const origin = [9, 8, 7, 5, 9, 7];
const result = [5, 7, 7, 8, 9, 9];
describe('sort', () => {
  test('冒泡排序', () => {
    expect(bubboSort(origin)).toEqual(result);
  });

  test('冒泡排序的优化版本', () => {
    expect(bubboSort2(origin)).toEqual(result);
  });

  test('选择排序', () => {
    expect(selectionSort(origin)).toEqual(result);
  });

  test('插入排序', () => {
    expect(insertionSort(origin)).toEqual(result);
  });
});
