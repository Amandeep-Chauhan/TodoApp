import React from "react";
import "./todoList.styles.scss";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";

function TodoList({ itemText, handleDelete, id, handleEdit }) {
  return (
    <span className="todo-list">
      <li className="todo-list_text">{itemText}</li>
      <FaRegEdit
        onClick={() => handleEdit(id, itemText)}
        className="todo-List_edit"
        title="Edit item"
      />
      <RiDeleteBin5Fill
        className="todo-List_delete"
        title="Delete item"
        onClick={() => handleDelete(id)}
      />
    </span>
  );
}

export default TodoList;
