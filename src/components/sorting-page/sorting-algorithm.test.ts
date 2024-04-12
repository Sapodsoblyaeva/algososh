import { bubbleSort, selectionSort } from "./algorithm";

jest.setTimeout(20000);
const setChangingElements = jest.fn();
const setSortedElements = jest.fn();
const setAscendingButtonDisabled = jest.fn();
const setDescendingButtonDisabled = jest.fn();
const setIsLoading = jest.fn();
const setRandomArray = jest.fn();

describe("selectionSort algorithm tests", () => {
  it("selectionSort arr ascending", async () => {
    const sortedArray = await selectionSort(
      [4, 2, 6, 7],
      "ascending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(setRandomArray).toHaveBeenCalledWith([2, 4, 6, 7]);
    expect(sortedArray).toEqual([2, 4, 6, 7]);
  });

  it("selectionSort arr ascending with empty arr", async () => {
    const sortedArray = await selectionSort(
      [],
      "ascending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(setRandomArray).toHaveBeenCalledWith([]);
    expect(sortedArray).toEqual([]);
  });

  it("selectionSort arr ascending with one eleme arr", async () => {
    const sortedArray = await selectionSort(
      [1],
      "ascending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(setRandomArray).toHaveBeenCalledWith([1]);
    expect(sortedArray).toEqual([1]);
  });

  it("selectionSort arr descending", async () => {
    const sortedArray = await selectionSort(
      [4, 2, 6, 7],
      "descending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(setRandomArray).toHaveBeenCalledWith([7, 6, 4, 2]);
    expect(sortedArray).toEqual([7, 6, 4, 2]);
  });
});

describe("bubbleSort algorithm tests", () => {
  it("bubbleSort arr in descending order", async () => {
    const sortedArray = await bubbleSort(
      [4, 2, 6, 7],
      "descending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(sortedArray).toEqual([7, 6, 4, 2]);
  });

  it("bubbleSort arr in descending order with empty arr", async () => {
    const sortedArray = await bubbleSort(
      [],
      "descending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(sortedArray).toEqual([]);
  });

  it("bubbleSort arr in descending order with one elem arr", async () => {
    const sortedArray = await bubbleSort(
      [1],
      "descending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(sortedArray).toEqual([1]);
  });

  it("bubbleSort arr in ascending order", async () => {
    const sortedArray = await bubbleSort(
      [4, 2, 6, 7],
      "ascending",
      setChangingElements,
      setRandomArray,
      setSortedElements,
      setAscendingButtonDisabled,
      setDescendingButtonDisabled,
      setIsLoading
    );

    expect(sortedArray).toEqual([2, 4, 6, 7]);
  });
});
