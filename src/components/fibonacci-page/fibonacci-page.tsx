import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { getFibonacciSequence } from "./algorithm";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [fibonacciSequence, setFibonacciSequence] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLButtonElement;
    setInputValue(value);
  };

  const onClick = () => {
    const fibonacciArray = getFibonacciSequence(parseInt(inputValue));
    setFibonacciSequence(fibonacciArray);
    setCurrentIndex(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < fibonacciSequence.length - 1) {
        setIsLoading(true);
        setCurrentIndex(currentIndex + 1);
      } else {
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, fibonacciSequence]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.fibonacci__layout}>
        <Input
          extraClass={styles.fibonacci__input}
          onChange={handleChange}
          value={inputValue}
          max={19}
          isLimitText={true}
          type="number"
        />
        <Button
          extraClass={styles.fibonacci__button}
          type="button"
          text="Рассчитать"
          onClick={onClick}
          isLoader={isLoading}
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
