import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { getFibonacciSequence } from "./algorithm";
import { Circle } from "../ui/circle/circle";
import { useForm } from "../../hooks/useForm";
import { DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fibonacciSequence, setFibonacciSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);

  const { values, handleChange } = useForm({
    inputValueStr: "",
    inputValueNum: "",
  });

  const onClick = () => {
    const fibonacciArray = getFibonacciSequence(parseInt(values.inputValueNum));
    setFibonacciSequence(fibonacciArray);
    setCurrentIndex(0);
  };

  useEffect(() => {
    parseInt(values.inputValueNum) <= 0 || parseInt(values.inputValueNum) > 19
      ? setIsButtonDisabled(true)
      : setIsButtonDisabled(false);

    const timer = setTimeout(() => {
      if (currentIndex < fibonacciSequence.length - 1) {
        setIsLoading(true);
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsLoading(false);
      }
    }, DELAY_IN_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, fibonacciSequence, values.inputValueNum]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.fibonacci__layout}>
        <Input
          extraClass={styles.fibonacci__input}
          onChange={handleChange}
          value={values.inputValueNum}
          max={19}
          maxLength={2}
          isLimitText={true}
          type="number"
          name="inputValueNum"
        />
        <Button
          extraClass={styles.fibonacci__button}
          type="button"
          text="Рассчитать"
          onClick={onClick}
          isLoader={isLoading}
          disabled={isButtonDisabled}
        />
      </div>
      <div className={styles.fibonacci__circles}>
        {fibonacciSequence.map((number, index) => {
          return (
            <Circle
              letter={number.toString()}
              key={index}
              extraClass={
                index <= currentIndex
                  ? styles.fibonacci__visible
                  : styles.fibonacci__invisible
              }
              index={index}
            />
          );
        })}
      </div>
    </SolutionLayout>
  );
};
