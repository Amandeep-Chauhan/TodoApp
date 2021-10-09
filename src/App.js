import React from "react";
import { useState, useEffect } from "react";
import TodoList from "./components/todoList";

export default function App() {
  const [input, setInput] = useState();
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setItems((prevItems) => {
      return [...prevItems, input];
    });
    setInput("");
  };

  const deleteItem = (id) => {
    console.log("deleted");

    setItems((prevItems) => {
      return prevItems.filter((arrItems, idx) => {
        return idx !== id;
      });
    });
  };

  // const randomId = { id: new Date().getTime().toString() };

  return (
    <div className="todo-app">
      <h1>todo list </h1>
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
          Add todo
        </button>
      </form>
      <ol>
        {items.map((item, idx) => (
          <TodoList
            key={idx}
            id={idx}
            itemText={item}
            handleDelete={deleteItem}
          />
        ))}
      </ol>
    </div>
  );
}
