import { swap } from "../../utils/utils";

export const reverseString = (str: string): string[][] => {
  const word = str.split("");
  const wordLetters = [[...word]];

  if (str.length <= 1) {
    return wordLetters;
  }

  for (let start = 0; start < Math.floor(str.length / 2); start++) {
    const end = str.length - 1 - start;

    swap(word, start, end);

    wordLetters.push([...word]);
  }

  return wordLetters;
};
