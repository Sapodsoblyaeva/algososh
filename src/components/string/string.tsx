import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./algorithm";

type Props = {
  index: number;
  word: string[][];
  currentIndex: number;
};

const getLetterStatus = ({ index, word, currentIndex }: Props) => {
  const maxIndex = word[currentIndex].length - 1;

  if (
    index < currentIndex ||
    index > maxIndex - currentIndex ||
    currentIndex === word.length - 1
  ) {
    return ElementStates.Modified;
  }

  if (index === currentIndex || index === maxIndex - currentIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [circle, setCircle] = useState<boolean>(false);
  const [word, setWord] = useState<string[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLButtonElement;
    setInputValue(value);
  };

  const onClick = () => {
    setIsLoading(true);
    const steps = reverseString(inputValue);

    setWord(steps);
    setCurrentIndex(0);

    if (!steps.length) return;

    let index = 0;

    const intervalId = setInterval(() => {
      if (index >= steps.length - 1) {
        clearInterval(intervalId);
        setIsLoading(false);
        return;
      }
      setCurrentIndex(++index);
    }, 1000);

    setCircle(true);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string__layout}>
        <Input
          extraClass={styles.string__input}
          isLimitText={true}
          maxLength={11}
          onChange={handleChange}
          value={inputValue}
          type="text"
        />
        <Button
          extraClass={styles.string__button}
          type="button"
          text="Развернуть"
          onClick={onClick}
          isLoader={isLoading}
        />
      </div>
      <div className={styles.string__circles}>
        {circle &&
          word?.[currentIndex].map((letter, index) => {
            const status = getLetterStatus({ index, word, currentIndex });
            return <Circle letter={letter} key={index} state={status} />;
          })}
      </div>
    </SolutionLayout>
  );
};
