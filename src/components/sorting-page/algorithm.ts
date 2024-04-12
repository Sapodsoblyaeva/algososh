import { DELAY_IN_MS } from "../../constants/delays";
import { sleep, swap } from "../../utils/utils";

export const selectionSort = async (
  randomArray: number[],
  order: "ascending" | "descending",
  setChangingElements: (arr: number[]) => void,
  setRandomArray: (arr: number[]) => void,
  setSortedElements: (arr: number[]) => void,
  setAscendingButtonDisabled: (state: boolean) => void,
  setDescendingButtonDisabled: (state: boolean) => void,
  setIsLoading: (state: boolean) => void
) => {
  const initialArray = [...randomArray];
  let arr: number[] = [];

  for (let i = 0; i < initialArray.length; i++) {
    let indexMin = i;

    for (let j = i + 1; j < initialArray.length; j++) {
      setChangingElements([i, j]);
      await sleep(DELAY_IN_MS);

      if (order === "ascending") {
        if (initialArray[indexMin] > initialArray[j]) {
          indexMin = j;
        }
      } else {
        if (initialArray[indexMin] < initialArray[j]) {
          indexMin = j;
        }
      }
    }
    if (indexMin !== i) {
      await sleep(DELAY_IN_MS);
      swap(initialArray, i, indexMin);
      setRandomArray([...initialArray]);
    }

    arr.push(i);

    setSortedElements([...arr]);
  }

  setChangingElements([]);
  setRandomArray([...initialArray]);

  setAscendingButtonDisabled(false);
  setDescendingButtonDisabled(false);
  setIsLoading(false);
  return [...initialArray];
};

export const bubbleSort = async (
  randomArray: number[],
  order: "ascending" | "descending",
  setChangingElements: (arr: number[]) => void,
  setRandomArray: (arr: number[]) => void,
  setSortedElements: (arr: number[]) => void,
  setAscendingButtonDisabled: (state: boolean) => void,
  setDescendingButtonDisabled: (state: boolean) => void,
  setIsLoading: (state: boolean) => void
) => {
  const initialArray = [...randomArray];
  const length = initialArray.length;
  let swapped: boolean;
  let arr: number[] = [];

  for (let i = 0; i < length; i++) {
    swapped = false;
    for (let j = 0; j < length - 1 - i; j++) {
      setChangingElements([j, j + 1]);

      if (order === "ascending") {
        if (initialArray[j] > initialArray[j + 1]) {
          await sleep(DELAY_IN_MS);

          swap(initialArray, j, j + 1);
          setRandomArray([...initialArray]);
          swapped = true;
        }
      } else {
        if (initialArray[j] < initialArray[j + 1]) {
          await sleep(DELAY_IN_MS);

          swap(initialArray, j + 1, j);
          setRandomArray([...initialArray]);
          swapped = true;
        }
      }

      await sleep(DELAY_IN_MS);
    }
    arr.push(length - 1 - i);

    setSortedElements([...arr]);
    if (!swapped) {
      for (let y = 0; y < length - arr.length; y++) {
        arr.push(y);
      }
      setSortedElements([...arr]);
      break;
    }
  }
  setAscendingButtonDisabled(false);
  setDescendingButtonDisabled(false);
  setIsLoading(false);

  setChangingElements([]);

  return [...initialArray];
};
