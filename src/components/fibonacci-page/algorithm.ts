export const getFibonacciSequence = (index: number): number[] => {
  let arr: number[] = [];

  const getFibonacciNumber = (index: number): number => {
    if (index === 0) {
      return 1;
    }

    if (index === 1) {
      return 1;
    }

    return getFibonacciNumber(index - 1) + getFibonacciNumber(index - 2);
  };

  if (index <= 19) {
    for (let i = 0; i <= index!; i++) {
      arr.push(getFibonacciNumber(i));
    }
    return arr;
  }
  throw new Error("the number cannot be more than 19");
};
