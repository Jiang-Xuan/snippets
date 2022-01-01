const { isPalindromic, longestPalindromic, center, dp } = require('./palindromic');

describe('isPalindromic', () => {
  test.only('yes', () => {
    expect(isPalindromic('12321')).toEqual(true);
  });
});

describe('longestPalindromic', () => {
  test('yes', () => {
    expect(longestPalindromic('abcbaab')).toEqual('abcba');
  });

  test.only('center', () => {
    expect(center.longestPalindromic('32112345678998765')).toEqual('5678998765');
  });
});

describe.only('dp', () => {
  test('yes', () => {
    expect(dp.longestPalindromic('32112345678998765')).toEqual('5678998765');
  });
});
