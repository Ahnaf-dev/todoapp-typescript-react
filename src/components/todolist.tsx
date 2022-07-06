import React, { useState } from "react";
import { TodoItem } from "./todoitem";
import { v4 as uuidv4 } from "uuid";

const TodoList: React.FC = () => {
  interface todoData {
    id: string;
    text: string;
    completed: boolean;
  }

  const [list, setList] = useState<todoData[]>([]);
  const [display, setDisplay] = useState<"all" | "active" | "complete">("all");

  function clearList() {
    setList([]);
  }
  function addToList(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      const uniqueID: string = uuidv4();
      const value = (e.target as HTMLInputElement).value;

      if (list.length > 0) {
        setList([...list, { id: uniqueID, text: value, completed: false }]);
      } else {
        setList([{ id: uniqueID, text: value, completed: false }]);
      }

      (e.target as HTMLInputElement).value = "";
    }
  }

  return (
    <div className="todolist">
      <div className="todolist__header">
        <h1>TODO</h1>
        <img src="/assets/icon-sun.svg" alt="logo of the sun" />
      </div>
      <div className="todolist__input">
        <input
          onKeyUp={(e) => addToList(e)}
          type="text"
          placeholder="Create a new todo..."
        />
      </div>
      <>
        {list.map((item, index) => {
          return (
            <TodoItem
              display={display}
              setList={setList}
              key={index}
              list={list}
              item={item}
            />
          );
        })}
      </>
      <div className="todolist__footer">
        <span className="todolist__display">{list.length} Items Left</span>
        <div className="todolist__options">
          <span
            onClick={() => setDisplay("all")}
            className={
              display === "all" ? "active todolist__all" : "todolist__all"
            }
          >
            All
          </span>
          <span
            onClick={() => setDisplay("active")}
            className={
              display === "active"
                ? "active todolist__active"
                : "todolist__active"
            }
          >
            Active
          </span>
          <span
            onClick={() => setDisplay("complete")}
            className={
              display === "complete"
                ? "active todolist__complete"
                : "todolist__complete"
            }
          >
            Complete
          </span>
        </div>
        <span onClick={() => clearList()} className="todolist__clear">
          Clear Completed
        </span>
      </div>
    </div>
  );
};

export default TodoList;
