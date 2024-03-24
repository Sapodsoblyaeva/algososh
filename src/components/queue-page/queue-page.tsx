import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./algorithms";
import { sleep } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";

const getQueueStatus = (index: number, arr: (string | null)[]) => {
  let firstFilledIndex = null;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      firstFilledIndex = i;
      break;
    }
  }

  if (arr.length >= 2 && index === arr.length - 1) {
    return { head: null, tail: "tail" };
  }

  if (index === arr.length - 1 && arr.length < 2) {
    return { head: "head", tail: "tail" };
  }

  if (index === firstFilledIndex) {
    return { head: "head", tail: null };
  }

  return { head: null, tail: null };
};

const getQueueItemStatus = (i: number, addingElementIndex: number | null) => {
  if (i === addingElementIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [addingElementIndex, setAddingElementIndex] = useState<number | null>(
    null
  );

  const size = 7;
  const queue = new Queue<string | null>(size);

  const [initialQueue, setInitialQueue] = useState<Queue<string | null>>(queue);

  const [buttonAddDisabled, setButtonAddDisabled] = useState<boolean>(false);
  const [buttonDeleteDisabled, setButtonDeleteDisabled] =
    useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLButtonElement;
    setInputValue(value);
  };

  const renderInitialCircles = () => {
    const queueItems = initialQueue.getElements();
    const items = [];
    for (let i = 0; i < size; i++) {
      if (i < queueItems.length) {
        const status = getQueueStatus(i, queueItems);
        const state = getQueueItemStatus(i, addingElementIndex);

        items.push(
          <Circle
            index={i}
            key={i}
            letter={queueItems[i]!}
            head={status.head}
            tail={status.tail}
            state={state}
          />
        );
      } else {
        items.push(<Circle index={i} key={i} />);
      }
    }
    return items;
  };

  useEffect(() => {
    if (initialQueue.length === size) {
      setButtonAddDisabled(true);
    }
  }, [addingElementIndex]);

  const onAddClick = async () => {
    setIsLoading(true);
    setButtonDeleteDisabled(true);
    await sleep(500);
    initialQueue.enqueue(inputValue);
    setInitialQueue(initialQueue);
    setAddingElementIndex(initialQueue.getSize());
    setTimeout(() => {
      setAddingElementIndex(null);
    }, 1000);

    setInputValue("");
    setButtonDeleteDisabled(false);
    setIsLoading(false);
  };

  const onDeleteClick = async () => {
    setIsLoading(true);
    setButtonAddDisabled(true);
    const newQueueEx = new Queue<string | null>(size);

    setAddingElementIndex(0);
    setTimeout(() => {
      setAddingElementIndex(null);
    }, 1000);

    await sleep(1000);
    initialQueue.dequeue();

    const newQueue = initialQueue.getElements();

    for (let i = 0; i < newQueue.length; i++) {
      newQueueEx.enqueue(newQueue[i]);
    }

    setInitialQueue(newQueueEx);
    setButtonAddDisabled(false);
    setIsLoading(false);
  };

  const onClearClick = async () => {
    setIsLoading(true);
    await sleep(500);
    setInitialQueue(new Queue<string | null>(size));
    setIsLoading(false);
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.queue__layout}>
        <div className={styles.queue__buttons}>
          <Input
            extraClass={styles.queue__input}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            value={inputValue}
            type="text"
          />
          <Button
            extraClass={styles.queue__button}
            type="button"
            text="Добавить"
            onClick={onAddClick}
            isLoader={buttonAddDisabled ? false : isLoading}
            disabled={buttonAddDisabled}
          />
          <Button
            extraClass={styles.queue__button}
            type="button"
            text="Удалить"
            onClick={onDeleteClick}
            isLoader={buttonDeleteDisabled ? false : isLoading}
            disabled={buttonDeleteDisabled}
          />
        </div>
        <Button
          extraClass={styles.queue__button}
          type="button"
          text="Очистить"
          onClick={onClearClick}
          isLoader={
            buttonAddDisabled || buttonDeleteDisabled ? false : isLoading
          }
          disabled={
            (buttonAddDisabled && isLoading) ||
            (buttonDeleteDisabled && isLoading)
              ? true
              : isLoading
          }
        />
      </div>
      <div className={styles.queue__circles}>{renderInitialCircles()}</div>
    </SolutionLayout>
  );
};
