function deepClone(obj, map = new Map()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};

  if (map.get(obj)) {
    return map.get(obj);
  }

  map.set(obj, newObj);

  Object.keys(obj).forEach(key => {
    newObj[key] = deepClone(obj[key], map);
  });

  return newObj;
}

module.exports = deepClone;
