import React from "react";
import { useState } from "react";

function TodoForm() {
  const [inputList, setInputList] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    setInputList("");
  };

  const handleChange = (e) => {
    setInputList(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={handlesubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={inputList}
        onChange={handleChange}
        name="text"
        className="todo-input"
      />
      <button className="todo-button">Add todo</button>
    </form>
  );
}

export default TodoForm;
