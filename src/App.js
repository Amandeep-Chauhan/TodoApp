import React, { useEffect } from "react";

import "./app.styles.scss";
import { useState } from "react";
import TodoList from "./components/todoList";

const getLocalItems = () => {
  const lists = localStorage.getItem("lists");
  const retrievedLists = lists ? JSON.parse(localStorage.getItem("lists")) : [];
  return retrievedLists;
};

export default function App() {
  const [input, setInput] = useState();
  const [items, setItems] = useState(getLocalItems());
  const [isEditOn, setIsEditOn] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isSame, setIsSame] = useState(false);
  const [isEditNull, setIsEditNull] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(items));
  }, [items]);

  useEffect(() => {}, [isEditOn]);

  const handlesubmit = (e) => {
    e.preventDefault();
    for (let i = 0; i < items.length; i++) {
      if (items[i].name === input) {
        setIsSame(true);
        setInput("");
        setIsEditOn(false);
        return;
      }
    }
    if (isEditOn) {
      if (!input) {
        setIsEditNull(true);
      } else {
        const newInput = items.map((item) => {
          if (toEdit !== null && toEdit === item.id) {
            return { ...item, name: input };
          }
          return item;
        });
        setToEdit(null);
        setIsEditOn(false);
        setItems(newInput);
      }
    } else {
      if (!input) {
        setIsEmpty(true);
      } else {
        const allInput = { id: Date.now(), name: input };
        setItems([...items, allInput]);
      }
    }
    setInput("");
  };

  const handleEdit = (id, value) => {
    setIsEditOn(true);
    setToEdit(id);
    setInput(value);
  };

  // delete items in todo list
  const deleteItem = (id) => {
    setItems((items) => {
      return items.filter((arrItems) => {
        return arrItems.id !== id;
      });
    });
  };

  // clearall
  const handleClearAll = () => {
    setItems([]);
  };

  return (
    <div className="todo-app">
      {isEmpty ? (
        <div className="popup">
          <p className="popup-text">Enter a To-Do before adding</p>
          <button
            className="popup-button"
            onClick={() => {
              setIsEmpty(false);
            }}
          >
            OK
          </button>
        </div>
      ) : null}
      {isSame ? (
        <div className="popup">
          <p className="popup-text">Todo already exist</p>
          <button
            className="popup-button"
            onClick={() => {
              setIsSame(false);
            }}
          >
            OK
          </button>
        </div>
      ) : null}
      {isEditNull ? (
        <div className="popup">
          <p className="popup-text">Enter a todo before Saving</p>
          <button
            className="popup-button"
            onClick={() => {
              setIsEditNull(false);
            }}
          >
            OK
          </button>
        </div>
      ) : null}
      <h2>What's the Plan for Today ?</h2>
      <form className="todo-form" onSubmit={handlesubmit} autoComplete="off">
        <input
          type="text"
          placeholder="Add a todo"
          value={input}
          onChange={handleChange}
          name="text"
          className="todo-input"
        />
        <button type="submit" className="todo-button">
          {isEditOn ? "Save Todo" : "Add Todo"}
        </button>
      </form>
      {items.length > 0 ? (
        <div className="item-list-wrapper">
          <ul className="scroll-wrapper">
            {items.map((elem) => (
              <TodoList
                key={elem.id}
                id={elem.id}
                itemText={elem.name}
                handleEdit={handleEdit}
                handleDelete={deleteItem}
              />
            ))}
          </ul>
          {items.length > 1 ? (
            <div className="clearall">
              <button className="clearall-button" onClick={handleClearAll}>
                Clear All
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="intro">
          <p className="intro-text">welcome to my to-do app</p>
        </div>
      )}
    </div>
  );
}
