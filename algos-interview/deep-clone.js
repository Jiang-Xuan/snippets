function deepClone(obj) {
  if (!obj || typeof obj !== 'object') {
    return;
  }

  const newObject = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'object') {
      newObject[key] = deepClone(obj[key]);
      return newObject;
    } else {
      newObject[key] = obj[key];
    }
  });

  return newObject;
}

module.exports = deepClone;
