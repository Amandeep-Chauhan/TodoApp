import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";

function TodoList({ itemText, handleDelete, id }) {
  return (
    <>
      <li className="todo-list">
        {itemText}
        <RiDeleteBin5Fill
          title="Delete item"
          onClick={() => handleDelete(id)}
        />
      </li>
    </>
  );
}

export default TodoList;
