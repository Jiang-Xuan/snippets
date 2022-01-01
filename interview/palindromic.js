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

    for (let i = 0; i < len; i++) {
      const len1 = center.expendAroundCenter(str, i, i);
      // len2 如果是最大的， 说明是一个偶数字数的回文字符串
      const len2 = center.expendAroundCenter(str, i, i + 1);
      const len = Math.max(len1, len2);
      const isOdd = len === len2;
      if (len > end - start) {
        const startBack = isOdd ? (len - 2) / 2 : (len - 1) / 2;
        start = i - startBack;
        const endGo = isOdd ? len / 2 : (len - 1) / 2;
        end = i + endGo;
      }
    }

    return str.substring(start, end + 1);
  },
  expendAroundCenter(str, left, right) {
    let l = left;
    let r = right;
    while (l >= 0 && r < str.length && str[l] === str[r]) {
      l--;
      r++;
    }

    return r - 1 - l;
  },
};

const dp = {
  /**
   * @param {string} str
   */
  longestPalindromic(str) {
    const length = str.length;
    if (length < 2) {
      return s;
    }

    let maxLength = 1;
    let begin = 0;

    const db = new Array(length).fill(undefined).map(() => new Array(length));

    for (let i = 0; i < length; i++) {
      db[i][i] = true;
    }

    for (let j = 0; j < length; j++) {
      for (let i = 0; i < j; i++) {
        if (str[i] !== str[j]) {
          db[i][j] = false;
        } else {
          if (i - j < 3) {
            db[i][j] = true;
          } else {
            db[i][j] = db[i + 1][j - 1];
          }
        }

        if (db[i][j] && j - i + 1 > maxLength) {
          maxLength = j - i + 1;
          begin = i;
        }
      }
    }

    return str.substring(begin, begin + maxLength);
  },
};

module.exports = {
  isPalindromic,
  longestPalindromic,
  center,
  dp,
};
