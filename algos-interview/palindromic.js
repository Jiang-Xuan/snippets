function isPalindromic(str) {
  const len = str.length;

  for (let i = 0; i < len / 2; i++) {
    if (str[i] !== str[len - i - 1]) {
      return false;
    }
  }

  return true;
}

/**
 * @param {string} str
 */
function longestPalindromic(str) {
  let ans = '';
  let max = 0;
  const len = str.length;

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j <= len; j++) {
      const test = str.substring(i, j);
      if (isPalindromic(test) && test.length > max) {
        ans = test;
        max = test.length;
      }
    }
  }

  return ans;
}

const center = {
  longestPalindromic(str) {
    const len = str.length;

    if (len === 0 || len === 1) {
      return str;
    }

    let start = 0;
    let end = 0;
    let maxLen = 0;

    for (let i = 0; i < len; i++) {
      const len1 = center.expendAroundCenter(str, i, i);
      const len2 = center.expendAroundCenter(str, i, i + 1);
      maxLen = Math.max(maxLen, len1, len2);
      if (maxLen > end - start + 1) {
        start = i - (maxLen - 1) / 2;
        end = i + maxLen / 2;
      }
    }

    return str.substr(start, maxLen);
  },
  expendAroundCenter(str, left, right) {
    let l = left;
    let r = right;
    while (l >= 0 && r < str.length && str[left] === str[right]) {
      l--;
      r++;
    }

    return r - l - 1;
  },
};

module.exports = {
  isPalindromic,
  longestPalindromic,
  center
};
