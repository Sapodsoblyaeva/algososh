import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./queue-page.module.css";
import { Circle } from "../ui/circle/circle";
import { Queue } from "./algorithms";
import { sleep } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

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
  const [buttonClearDisabled, setButtonClearDeleteDisabled] =
    useState<boolean>(false);

  const { values, handleChange } = useForm({
    inputValueStr: "",
    inputValueNum: "",
  });

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
    if (values.inputValueStr === "") {
      setButtonAddDisabled(true);
      setButtonDeleteDisabled(true);
      setButtonClearDeleteDisabled(true);
    } else {
      setButtonAddDisabled(false);
    }
    if (initialQueue.getSize() >= 0) {
      setButtonDeleteDisabled(false);
      setButtonClearDeleteDisabled(false);
    }
    if (initialQueue.length === size) {
      setButtonAddDisabled(true);
    }
  }, [addingElementIndex, values.inputValueStr]);

  const onAddClick = async () => {
    setIsLoading(true);
    setButtonDeleteDisabled(true);
    await sleep(SHORT_DELAY_IN_MS);
    initialQueue.enqueue(values.inputValueStr);
    setInitialQueue(initialQueue);
    setAddingElementIndex(initialQueue.getSize());
    setTimeout(() => {
      setAddingElementIndex(null);
    }, DELAY_IN_MS);

    values.inputValueStr = "";
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
    }, DELAY_IN_MS);

    await sleep(DELAY_IN_MS);
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
            value={values.inputValueStr}
            type="text"
            name="inputValueStr"
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
          disabled={buttonClearDisabled}
        />
      </div>
      <div className={styles.queue__circles}>{renderInitialCircles()}</div>
    </SolutionLayout>
  );
};
