function calcSum(array, i, j) {
  let sum = array[i];

  for (let k = i + 1; k <= j; k++) {
    sum += array[k];
  }

  console.log('calcsum', sum, i, j);
  return sum;
}

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const length = nums.length;

  if (length === 1) {
    return nums[0];
  }

  let max = nums[0];
  for (let i = 0; i < length; i++) {
    for (let j = i; j < length; j++) {
      const sum = calcSum(nums, i, j);
      if (sum > max) {
        max = sum;
      }
    }
  }

  return max;
};

module.exports = maxSubArray;
