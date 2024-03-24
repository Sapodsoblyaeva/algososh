export const swap = (arr: string[] | number[], i: number, j: number) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const addingTimer = (
  num: number,
  func: (num: number | null) => void
) => {
  func(num);
  setTimeout(() => {
    func(null);
  }, 1000);
};
