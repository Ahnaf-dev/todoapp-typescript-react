import React from "react";

interface todoData {
  id: string;
  text: string;
  completed: boolean;
}

interface Props {
  list: todoData[];
  item: todoData;
  setList: React.Dispatch<React.SetStateAction<todoData[]>>;
  display: "all" | "active" | "complete";
}

export const TodoItem: React.FC<Props> = ({ list, item, setList, display }) => {
  const { id, text, completed } = item;

  function deleteItem() {
    const newList = list.filter((item) => !(item.id === id));
    setList([...newList]);
  }

  function filterItem(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    if ((e.target as HTMLInputElement).checked) {
      const newList = list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: true };
        }
        return item;
      });
      setList([...newList]);
    } else {
      const newList = list.map((item) => {
        if (item.id === id) {
          return { ...item, completed: false };
        }
        return item;
      });
      setList([...newList]);
    }
  }

  if (display === "complete") {
    if (completed) {
      return (
        <div className="todolist__item">
          <label>
            <input checked onClick={(e) => filterItem(e)} type="checkbox" />
            <span>{text}</span>
          </label>
          <img
            onClick={() => deleteItem()}
            src="/assets/icon-cross.svg"
            alt="image of a cross"
          />
        </div>
      );
    }
  }

  if (display === "active") {
    if (!completed) {
      return (
        <div className="todolist__item">
          <label>
            <input onClick={(e) => filterItem(e)} type="checkbox" />
            <span>{text}</span>
          </label>
          <img
            onClick={() => deleteItem()}
            src="/assets/icon-cross.svg"
            alt="image of a cross"
          />
        </div>
      );
    }
  }

  if (display === "all") {
    return (
      <div className="todolist__item">
        <label>
          {completed ? (
            <input checked onClick={(e) => filterItem(e)} type="checkbox" />
          ) : (
            <input onClick={(e) => filterItem(e)} type="checkbox" />
          )}
          <span>{text}</span>
        </label>
        <img
          onClick={() => deleteItem()}
          src="/assets/icon-cross.svg"
          alt="image of a cross"
        />
      </div>
    );
  }

  return <span className="invisible">t</span>;
};
