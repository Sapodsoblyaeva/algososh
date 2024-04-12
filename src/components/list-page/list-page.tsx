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
import { DELAY_IN_MS, LONG_DELAY_IN_MS } from "../../constants/delays";
import { HEAD, TAIL } from "../../constants/element-captions";

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
      head: index === 0 ? HEAD : null,
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
    return { head: null, tail: TAIL };
  }

  if (index === arr.length - 1 && arr.length < 2) {
    return { head: HEAD, tail: TAIL };
  }

  if (index === firstFilledIndex) {
    return { head: HEAD, tail: null };
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
    inputValueStr: "",
    inputValueNum: "",
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
  const [addButtonDisabled, setAddButtonDisabled] = useState<boolean>(false);
  const [buttonAddIndexDisabled, setButtonAddIndexDisabled] =
    useState<boolean>(false);
  const [deleteButtonDisabled, setDeleteButtonDisabled] =
    useState<boolean>(false);
  const [buttonDeleteIndexDisabled, setButtonDeleteIndexDisabled] =
    useState<boolean>(false);

  useEffect(() => {
    list.prepend("0");
    list.prepend("34");
    list.prepend("8");
    list.prepend("1");
    const result = list.print();
    setList(list);
    setListForRendering(result);
  }, []);

  useEffect(() => {
    if (values.inputValueStr === "") {
      setAddButtonDisabled(true);
    } else {
      setAddButtonDisabled(false);
    }

    if (
      values.inputValueNum === "" ||
      values.inputValueStr === "" ||
      parseInt(values.inputValueNum) < 0 ||
      parseInt(values.inputValueNum) > listForRendering.length - 1
    ) {
      setButtonAddIndexDisabled(true);
    } else {
      setButtonAddIndexDisabled(false);
    }
  }, [values.inputValueStr, values.inputValueNum, listForRendering]);

  useEffect(() => {
    if (
      values.inputValueNum === "" ||
      parseInt(values.inputValueNum) < 0 ||
      parseInt(values.inputValueNum) > listForRendering.length - 1 ||
      listForRendering.length === 0
    ) {
      setButtonDeleteIndexDisabled(true);
    } else {
      setButtonDeleteIndexDisabled(false);
    }
  }, [listForRendering, values.inputValueNum]);

  useEffect(() => {
    if (
      parseInt(values.inputValueNum) < 0 ||
      parseInt(values.inputValueNum) > listForRendering.length - 1 ||
      listForRendering.length === 0 ||
      buttonDisabled
    ) {
      setDeleteButtonDisabled(true);
    } else {
      setDeleteButtonDisabled(false);
    }
  }, [listForRendering, values.inputValueNum, buttonDisabled]);

  const onAddToHeadClick = () => {
    setIsNewHeadLoading(true);
    setDeleteButtonDisabled(true);
    list.prepend(values.inputValueStr);
    const result = list.print();
    addingTimer(0, setAddingElementIndex);

    setAddedElementIndex(0);
    setTimeout(() => {
      setAddedElementIndex(null);
    }, LONG_DELAY_IN_MS);

    setNewValue(values.inputValueStr);
    setTimeout(() => {
      setListForRendering(result);
      setIsNewHeadLoading(false);
      setDeleteButtonDisabled(false);
    }, DELAY_IN_MS);

    values.inputValueStr = "";
  };

  const onAddToTailClick = () => {
    setIsNewTailLoading(true);
    setDeleteButtonDisabled(true);
    list.append(values.inputValueStr);
    const result = list.print();

    addingTimer(list.getSize() - 2, setAddingElementIndex);

    setAddedElementIndex(list.getSize() - 1);
    setTimeout(() => {
      setAddedElementIndex(null);
    }, LONG_DELAY_IN_MS);
    setNewValue(values.inputValueStr);

    setTimeout(() => {
      setListForRendering(result);
      setIsNewTailLoading(false);
      setDeleteButtonDisabled(false);
    }, DELAY_IN_MS);

    values.inputValueStr = "";
  };

  const onAddIndexClick = async () => {
    setIsNewIndexLoading(true);
    setAddButtonDisabled(true);
    setDeleteButtonDisabled(true);
    setButtonDeleteIndexDisabled(true);

    list.insertAt(values.inputValueStr, parseInt(values.inputValueNum));

    const result = list.print();

    setNewValue(values.inputValueStr);
    for (let i = 0; i <= parseInt(values.inputValueNum); i++) {
      await sleep(DELAY_IN_MS);
      setAddingElementIndex(i);
      setTimeout(() => {
        setAddingElementIndex(null);
      }, DELAY_IN_MS);
    }

    setAddedElementIndex(parseInt(values.inputValueNum));
    setTimeout(() => {
      setAddedElementIndex(null);
    }, LONG_DELAY_IN_MS);

    setTimeout(() => {
      setListForRendering(result);
      setIsNewIndexLoading(false);
      setDeleteButtonDisabled(false);
    }, DELAY_IN_MS);

    values.inputValueNum = "";
    values.inputValueStr = "";
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
    }, DELAY_IN_MS);
  };

  const onDeleteTailClick = async () => {
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
    }, DELAY_IN_MS);
  };

  const onDeleteIndexClick = async () => {
    setIsIndexDeletedLoading(true);

    setDeleteButtonDisabled(true);

    const node = list.find(parseInt(values.inputValueNum));

    setNewValue(node!.value);

    for (let i = 0; i <= parseInt(values.inputValueNum); i++) {
      await sleep(DELAY_IN_MS);
      setDeletingElementIndex(i);
      setTimeout(() => {
        setDeletingElementIndex(null);
      }, DELAY_IN_MS);
    }

    list.makeElementNull(node, "");
    setListForRendering(list.print());

    list.deleteAtIndex(parseInt(values.inputValueNum));
    const result = list.print();

    setTimeout(() => {
      setListForRendering(result);
      setIsIndexDeletedLoading(false);
      setDeleteButtonDisabled(false);
    }, DELAY_IN_MS);

    values.inputValueNum = "";
    values.inputValueStr = "";
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
            value={values.inputValueStr}
            type="text"
            name="inputValueStr"
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Добавить в head"
            onClick={onAddToHeadClick}
            isLoader={isNewHeadLoading}
            disabled={addButtonDisabled}
            name="add-button"
            value="head"
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Добавить в tail"
            onClick={onAddToTailClick}
            isLoader={isNewTailLoading}
            disabled={addButtonDisabled}
            name="add-button"
            value="tail"
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Удалить из head"
            onClick={onDeleteHeadClick}
            isLoader={isHeadDeletedLoading}
            disabled={deleteButtonDisabled}
            name="delete-button"
            value="head"
          />
          <Button
            extraClass={styles.list__button}
            type="button"
            text="Удалить из tail"
            onClick={onDeleteTailClick}
            isLoader={isTailDeletedLoading}
            disabled={deleteButtonDisabled}
            name="delete-button"
            value="tail"
          />
        </div>
        <div className={styles.list__buttons}>
          <Input
            extraClass={styles.list__input}
            onChange={handleChange}
            value={values.inputValueNum}
            type="number"
            name="inputValueNum"
          />
          <Button
            extraClass={styles.list__bigButton}
            type="button"
            text="Добавить по индексу"
            onClick={onAddIndexClick}
            isLoader={isNewIndexLoading}
            disabled={buttonAddIndexDisabled}
            name="add-index-button"
            value="index"
          />
          <Button
            extraClass={styles.list__bigButton}
            type="button"
            text="Удалить по индексу"
            onClick={onDeleteIndexClick}
            isLoader={isIndexDeletedLoading}
            disabled={buttonDeleteIndexDisabled}
            name="delete-index-button"
            value="index"
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
