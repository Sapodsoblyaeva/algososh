import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { reverseString } from "./algorithm";
import { useForm } from "../../hooks/useForm";
import { DELAY_IN_MS } from "../../constants/delays";

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
  const [circle, setCircle] = useState<boolean>(false);
  const [word, setWord] = useState<string[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const { values, handleChange } = useForm({
    inputValueStr: "",
    inputValueNum: "",
  });

  useEffect(() => {
    values.inputValueStr === ""
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);
  }, [values.inputValueStr]);

  const onClick = () => {
    setIsLoading(true);
    const steps = reverseString(values.inputValueStr);

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
    }, DELAY_IN_MS);

    setCircle(true);
    values.inputValueStr = "";
  };

  console.log(word.slice(word.length - 1));

  return (
    <SolutionLayout title="Строка">
      <div className={styles.string__layout}>
        <Input
          extraClass={styles.string__input}
          isLimitText={true}
          maxLength={11}
          onChange={handleChange}
          value={values.inputValueStr}
          type="text"
          name="inputValueStr"
        />
        <Button
          extraClass={styles.string__button}
          type="button"
          text="Развернуть"
          onClick={onClick}
          isLoader={isLoading}
          disabled={isButtonDisabled}
          data-testid="add-button"
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
