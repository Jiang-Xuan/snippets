function bubboSort(array) {
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i++) {
    for (let j = 0; j < newArray.length; j++) {
      if (newArray[j] < newArray[j + 1]) {
        const temp = newArray[j];
        newArray[j] = newArray[j + 1];
        newArray[j + 1] = temp;
      }
    }
  }

  return newArray;
}

const result = bubboSort([1, 2, 3, 4, 6, 7, 8, 9, 6]);
console.log(result);
