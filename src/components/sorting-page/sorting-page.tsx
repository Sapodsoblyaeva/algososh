import React, { MouseEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { bubbleSort, selectionSort } from "./algorithm";

const createRandomArr = () => {
  let arr = [];
  for (let i = 0; i < Math.floor(Math.random() * (17 - 3) + 3); i++) {
    arr.push(Math.floor(Math.random() * (100 - 0) + 0));
  }
  return arr;
};

type Props = {
  index: number;
  changingElements: number[];
  sortedElements: number[];
};

const getArrColumnStatus = ({
  index,
  changingElements,
  sortedElements,
}: Props) => {
  if (sortedElements.includes(index)) {
    return ElementStates.Modified;
  }
  if (changingElements.includes(index)) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const SortingPage: React.FC = () => {
  const [randomArray, setRandomArray] = useState<number[]>([]);
  const [changingElements, setChangingElements] = useState<number[]>([]);
  const [sortedElements, setSortedElements] = useState<number[]>([]);
  const [bubbleInput, setBubbleInput] = useState<boolean>(false);
  const [selectionInput, setSelectionInput] = useState<boolean>(false);
  const [buttonAscendingDisabled, setAscendingButtonDisabled] =
    useState<boolean>(false);
  const [buttonDescendingDisabled, setDescendingButtonDisabled] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const randomArray = createRandomArr();
    setRandomArray(randomArray);
  }, []);

  const onRandomClick = async () => {
    const randomArray = createRandomArr();
    setSortedElements([]);
    setRandomArray(randomArray);
  };

  const onAscendingClick = () => {
    if (!bubbleInput && !selectionInput) {
      return;
    }
    setIsLoading(true);
    setAscendingButtonDisabled(true);

    setSortedElements([]);
    if (bubbleInput) {
      bubbleSort(
        randomArray,
        "ascending",
        setChangingElements,
        setRandomArray,
        setSortedElements,
        setAscendingButtonDisabled,
        setDescendingButtonDisabled,
        setIsLoading
      );
    }
    if (selectionInput) {
      selectionSort(
        randomArray,
        "ascending",
        setChangingElements,
        setRandomArray,
        setSortedElements,
        setAscendingButtonDisabled,
        setDescendingButtonDisabled,
        setIsLoading
      );
    }
  };

  const onDescendingClick = async () => {
    setDescendingButtonDisabled(true);
    setIsLoading(true);

    setSortedElements([]);
    if (bubbleInput) {
      bubbleSort(
        randomArray,
        "descending",
        setChangingElements,
        setRandomArray,
        setSortedElements,
        setAscendingButtonDisabled,
        setDescendingButtonDisabled,
        setIsLoading
      );
    }
    if (selectionInput) {
      selectionSort(
        randomArray,
        "descending",
        setChangingElements,
        setRandomArray,
        setSortedElements,
        setAscendingButtonDisabled,
        setDescendingButtonDisabled,
        setIsLoading
      );
    }

    return;
  };

  const checkRadioInput = (e: MouseEvent<HTMLInputElement>) => {
    const { name } = e.target as HTMLInputElement;
    setIsChecked(true);

    if (name === "bubble") {
      setBubbleInput(true);
      setSelectionInput(false);
    } else {
      setBubbleInput(false);
      setSelectionInput(true);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.sorting__layout}>
        <div className={styles.sorting__radioButtons}>
          <RadioInput
            label="Выбор"
            name="selection"
            onChange={checkRadioInput}
            checked={selectionInput}
            disabled={isLoading}
          />
          <RadioInput
            label="Пузырек"
            name="bubble"
            onChange={checkRadioInput}
            checked={bubbleInput}
            disabled={
              (buttonDescendingDisabled || buttonAscendingDisabled) && isLoading
            }
          />
        </div>
        <div className={styles.sorting__buttons}>
          <Button
            extraClass={styles.sorting__button}
            type="button"
            text="По убыванию"
            onClick={onDescendingClick}
            sorting={Direction.Ascending}
            disabled={!isChecked ? true : buttonDescendingDisabled
                ? buttonDescendingDisabled
                : buttonAscendingDisabled
                ? true
                : false
            }
            isLoader={buttonDescendingDisabled ? isLoading : false}
            name="descending"
          />
          <Button
            extraClass={styles.sorting__button}
            type="button"
            text="По возрастанию"
            onClick={onAscendingClick}
            sorting={Direction.Descending}
            disabled={!isChecked ? true : buttonAscendingDisabled
                ? buttonAscendingDisabled
                : buttonDescendingDisabled
                ? true
                : false
            }
            isLoader={buttonAscendingDisabled ? isLoading : false}
            name="ascending"
          />
        </div>
        <Button
          extraClass={styles.sorting__button}
          type="button"
          text="Новый массив"
          onClick={onRandomClick}
          disabled={
            (buttonDescendingDisabled || buttonAscendingDisabled) && true
          }
          name="newArray"
        />
      </div>
      <div className={styles.sorting__array}>
        {randomArray.map((number, index) => {
          const status = getArrColumnStatus({
            index,
            changingElements,
            sortedElements,
          });
          return <Column index={number} key={index} state={status} />;
        })}
      </div>
    </SolutionLayout>
  );
};
