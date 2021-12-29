const { isPalindromic, longestPalindromic, center } = require('./palindromic');

describe('isPalindromic', () => {
  test.only('yes', () => {
    expect(isPalindromic('12321')).toEqual(true);
  });
});

describe.only('longestPalindromic', () => {
  test('yes', () => {
    expect(longestPalindromic('abcbaab')).toEqual('abcba');
  });

  test.only('center', () => {
    expect(center.longestPalindromic('abcbaab')).toEqual('abcba');
  })
});
