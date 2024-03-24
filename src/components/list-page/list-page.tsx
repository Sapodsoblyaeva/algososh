import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./list-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { LinkedList } from "./algorithm";
import { useForm } from "../../hooks/useForm";
import { ElementStates } from "../../types/element-states";
import { addingTimer, sleep } from "../../utils/utils";

const getListStatus = (
  index: number,
  arr: (string | null)[],
  addingElementIndex: number | null,
  letter: string | null,
  deletingElementIndex: number | null,
  addedElementIndex: number | null
) => {
  let firstFilledIndex = null;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== null) {
      firstFilledIndex = i;
      break;
    }
  }

  if (index === addingElementIndex!) {
    const state = getListItemStatus(
      index,
      addingElementIndex,
      arr,
      addedElementIndex,
      deletingElementIndex
    );
    return {
      head: (
        <Circle
          letter={letter === null ? undefined : letter}
          isSmall={true}
          state={state}
        />
      ),
      tail: null,
    };
  }

  if (index === deletingElementIndex) {
    const state = getListItemStatus(
      index,
      addingElementIndex,
      arr,
      addedElementIndex,
      deletingElementIndex
    );
    return {
      head: index === 0 ? "head" : null,
      tail: (
        <Circle
          letter={letter === null ? undefined : letter}
          isSmall={true}
          state={state}
        />
      ),
    };
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

const getListItemStatus = (
  i: number,
  addingElementIndex: number | null,
  arr: (string | null)[],
  addedElementIndex: number | null,
  deletingElementIndex: number | null
) => {
  if (i === addingElementIndex) {
    return ElementStates.Changing;
  }

  if (i < addingElementIndex! && addingElementIndex! !== arr.length - 1) {
    return ElementStates.Changing;
  }

  if (addingElementIndex! === 0 && i < addingElementIndex) {
    return ElementStates.Changing;
  }

  if (i === deletingElementIndex) {
    return ElementStates.Changing;
  }

  if (i < deletingElementIndex! && deletingElementIndex! !== arr.length - 1) {
    return ElementStates.Changing;
  }

  if (
    (deletingElementIndex! === arr.length - 1 || deletingElementIndex! === 0) &&
    i === deletingElementIndex
  ) {
    return ElementStates.Changing;
  }

  if (deletingElementIndex === null && i === deletingElementIndex) {
    return ElementStates.Modified;
  }

  if (addingElementIndex === null && i === addedElementIndex) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
};

export const ListPage: React.FC = () => {
  const [list, setList] = useState(new LinkedList<string>());
  const [listForRendering, setListForRendering] = useState<string[]>([]);
  const { values, handleChange } = useForm({
    headTail: "",
    index: "",
  });
  const [addingElementIndex, setAddingElementIndex] = useState<number | null>(
    null
  );

  const [deletingElementIndex, setDeletingElementIndex] = useState<
    number | null
  >(null);

  const [addedElementIndex, setAddedElementIndex] = useState<number | null>(
    null
  );

  const [newValue, setNewValue] = useState<string | null>(null);
  const [isNewHeadLoading, setIsNewHeadLoading] = useState<boolean>(false);
  const [isNewTailLoading, setIsNewTailLoading] = useState<boolean>(false);
  const [isNewIndexLoading, setIsNewIndexLoading] = useState<boolean>(false);
  const [isHeadDeletedLoading, setIsHeadDeletedLoading] =
    useState<boolean>(false);
  const [isTailDeletedLoading, setIsTailDeletedLoading] =
    useState<boolean>(false);
  const [isIndexDeletedLoading, setIsIndexDeletedLoading] =
    useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  useEffect(() => {
    list.prepend("0");
    list.prepend("34");
    list.prepend("8");
    list.prepend("1");
    const result = list.print();
    setList(list);
    setListForRendering(result);
  }, []);

  const onAddToHeadClick = () => {
    setIsNewHeadLoading(true);
    setButtonDisabled(true);

    list.prepend(values.headTail);
    const result = list.print();
    addingTimer(0, setAddingElementIndex);

    setAddedElementIndex(0);
    setTimeout(() => {
      setAddedElementIndex(null);
    }, 1500);

    setNewValue(values.headTail);
    setTimeout(() => {
      setListForRendering(result);
      setIsNewHeadLoading(false);
      setButtonDisabled(false);
    }, 1000);

    values.headTail = "";
  };

  const onAddToTailClick = () => {
    setIsNewTailLoading(true);
    setButtonDisabled(true);

    list.append(values.headTail);
    const result = list.print();

    addingTimer(list.getSize() - 2, setAddingElementIndex);

    setAddedElementIndex(list.getSize() - 1);
    setTimeout(() => {
      setAddedElementIndex(null);
    }, 1500);
    setNewValue(values.headTail);

    setTimeout(() => {
      setListForRendering(result);
      setIsNewTailLoading(false);
      setButtonDisabled(false);
    }, 1000);

    values.headTail = "";
  };

  const onAddIndexClick = async () => {
    setIsNewIndexLoading(true);
    setButtonDisabled(true);
    list.insertAt(values.headTail, parseInt(values.index));

    const result = list.print();

    setNewValue(values.headTail);
    for (let i = 0; i <= parseInt(values.index); i++) {
      await sleep(1000);
      setAddingElementIndex(i);
      setTimeout(() => {
        setAddingElementIndex(null);
      }, 1000);
    }

    setAddedElementIndex(parseInt(values.index));
    setTimeout(() => {
      setAddedElementIndex(null);
    }, 1500);

    setTimeout(() => {
      setListForRendering(result);
      setIsNewIndexLoading(false);
      setButtonDisabled(false);
    }, 1000);

    values.index = "";
    values.headTail = "";
  };

  const onDeleteHeadClick = () => {
    setIsHeadDeletedLoading(true);
    setButtonDisabled(true);

    setNewValue(list.head!.value);
    list.makeElementNull(list.head, "");
    setListForRendering(list.print());

    list.deleteHead();
    const result = list.print();
    addingTimer(0, setDeletingElementIndex);

    setTimeout(() => {
      setListForRendering(result);
      setIsHeadDeletedLoading(false);
      setButtonDisabled(false);
    }, 1000);
  };

  const onDeleteTailClick = () => {
    setIsTailDeletedLoading(true);
    setButtonDisabled(true);
    setNewValue(list.tail!.value);
    list.makeElementNull(list.tail, "");
    setListForRendering(list.print());

    list.deleteTail();
    const result = list.print();
    addingTimer(list.getSize(), setDeletingElementIndex);

    setTimeout(() => {
      setListForRendering(result);
      setIsTailDeletedLoading(false);
      setButtonDisabled(false);
    }, 1000);
  };

  const onDeleteIndexClick = async () => {
    setIsIndexDeletedLoading(true);
    setButtonDisabled(true);
    const node = list.find(parseInt(values.index));

    setNewValue(node!.value);

    for (let i = 0; i <= parseInt(values.index); i++) {
      await sleep(1000);
      setDeletingElementIndex(i);
      setTimeout(() => {
        setDeletingElementIndex(null);
      }, 1000);
    }

    list.makeElementNull(node, "");
    setListForRendering(list.print());

    list.deleteAtIndex(parseInt(values.index));
    const result = list.print();

    setTimeout(() => {
      setListForRendering(result);
      setIsIndexDeletedLoading(false);
      setButtonDisabled(false);
    }, 1000);

    values.index = "";
    values.headTail = "";
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.list__layout}>
        <div className={styles.list__buttons}>
          <Input
            extraClass={styles.list__input}
            isLimitText={true}
            maxLength={4}
            onChange={handleChange}
            value={values.headTail}
            type="text"
            name={"headTail"}
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Добавить в head"
            onClick={onAddToHeadClick}
            isLoader={isNewHeadLoading}
            disabled={buttonDisabled}
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Добавить в tail"
            onClick={onAddToTailClick}
            isLoader={isNewTailLoading}
            disabled={buttonDisabled}
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Удалить из head"
            onClick={onDeleteHeadClick}
            isLoader={isHeadDeletedLoading}
            disabled={buttonDisabled}
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Удалить из tail"
            onClick={onDeleteTailClick}
            isLoader={isTailDeletedLoading}
            disabled={buttonDisabled}
          />
        </div>
        <div className={styles.list__buttons}>
          <Input
            extraClass={styles.list__input}
            onChange={handleChange}
            value={values.index}
            type="text"
            name="index"
          />
          <Button
            extraClass={styles.list__bigButton}
            type="button"
            text="Добавить по индексу"
            onClick={onAddIndexClick}
            isLoader={isNewIndexLoading}
            disabled={buttonDisabled}
          />
          <Button
            extraClass={styles.list__bigButton}
            type="button"
            text="Удалить по индексу"
            onClick={onDeleteIndexClick}
            isLoader={isIndexDeletedLoading}
            disabled={buttonDisabled}
          />
        </div>
      </div>
      <div className={styles.list__circles}>
        {listForRendering.map((item, index) => {
          const status = getListStatus(
            index,
            listForRendering,
            addingElementIndex,
            newValue,
            deletingElementIndex,
            addedElementIndex
          );
          const state = getListItemStatus(
            index,
            addingElementIndex,
            listForRendering,
            addedElementIndex,
            deletingElementIndex
          );
          return (
            <div className={styles.list__circle} key={index}>
              <Circle
                index={index}
                letter={item}
                head={status.head}
                tail={status.tail}
                state={state}
              />
              {index !== listForRendering.length - 1 && <ArrowIcon />}
            </div>
          );
        })}
      </div>
    </SolutionLayout>
  );
};
