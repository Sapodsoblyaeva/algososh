import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./stack-page.module.css";
import { Circle } from "../ui/circle/circle";
import { sleep } from "../../utils/utils";
import { Stack } from "./algorithm";
import { ElementStates } from "../../types/element-states";
import { useForm } from "../../hooks/useForm";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

type Props = {
  index: number;
  addingElementIndex?: number | null;
  top?: number;
};

const getStackItemStatus = ({ index, addingElementIndex }: Props) => {
  if (index === addingElementIndex) {
    return ElementStates.Changing;
  }

  return ElementStates.Default;
};

const getStackItemPosition = ({ index, top }: Props) => {
  if (index === top) {
    return "top";
  }
  return "";
};

export const StackPage: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [addingElementIndex, setAddingElementIndex] = useState<number | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [buttonAddDisabled, setButtonAddDisabled] = useState<boolean>(false);
  const [buttonDeleteDisabled, setButtonDeleteDisabled] =
    useState<boolean>(false);
  const [top, setTop] = useState<number>(0);
  const [stackNew, setStackNew] = useState(new Stack<string>());

  const { values, handleChange } = useForm({
    inputValueStr: "",
    inputValueNum: "",
  });

  useEffect(() => {
    if (values.inputValueStr === "") {
      setButtonAddDisabled(true);
      setButtonDeleteDisabled(true);
    } else {
      setButtonAddDisabled(false);
    }

    if (stackNew.getSize() !== 0) {
      setButtonDeleteDisabled(false);
      setButtonAddDisabled(false);
    }
  }, [values.inputValueStr, stackNew]);

  const onAddClick = async () => {
    setButtonDeleteDisabled(true);
    setIsLoading(true);

    await sleep(SHORT_DELAY_IN_MS);
    stackNew.push(values.inputValueStr);
    setStackNew(stackNew);

    values.inputValueStr = "";
    setOpen(true);

    setAddingElementIndex(stackNew.getSize() - 1);
    setTimeout(() => {
      setAddingElementIndex(null);
    }, SHORT_DELAY_IN_MS);

    setTop(stackNew.getSize() - 1);
    setIsLoading(false);
    setButtonDeleteDisabled(false);
  };

  const onDeleteClick = async () => {
    setButtonAddDisabled(true);
    setIsLoading(true);

    setAddingElementIndex(stackNew.getSize() - 1);
    setTimeout(() => {
      setAddingElementIndex(null);
    }, SHORT_DELAY_IN_MS);

    await sleep(SHORT_DELAY_IN_MS);
    stackNew.pop();
    setStackNew(stackNew);
    setTop(stackNew.getSize() - 1);

    setIsLoading(false);
    setButtonAddDisabled(false);
  };

  const onClearClick = () => {
    setStackNew(new Stack<string>());
    setOpen(false);
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack__layout}>
        <div className={styles.stack__buttons}>
          <Input
            extraClass={styles.stack__input}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            value={values.inputValueStr}
            type="text"
            max={4}
            name="inputValueStr"
          />
          <Button
            extraClass={styles.stack__button}
            type="button"
            text="Добавить"
            onClick={onAddClick}
            isLoader={buttonAddDisabled ? false : isLoading}
            disabled={buttonAddDisabled}
          />
          <Button
            extraClass={styles.stack__button}
            type="button"
            text="Удалить"
            onClick={onDeleteClick}
            isLoader={buttonDeleteDisabled ? false : isLoading}
            disabled={buttonDeleteDisabled}
          />
        </div>
        <Button
          extraClass={styles.stack__button}
          type="button"
          text="Очистить"
          onClick={onClearClick}
          isLoader={
            buttonAddDisabled || buttonDeleteDisabled ? false : isLoading
          }
          disabled={buttonAddDisabled || buttonDeleteDisabled ? true : false}
        />
      </div>
      <div className={styles.stack__circles}>
        {open &&
          stackNew.getElements().map((item, index) => {
            const status = getStackItemStatus({ index, addingElementIndex });
            const position = getStackItemPosition({ index, top });
            return (
              <Circle
                letter={item}
                key={index}
                state={status}
                index={index}
                head={position}
              />
            );
          })}
      </div>
    </SolutionLayout>
  );
};
