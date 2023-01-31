import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ModalForm from "./ModalForm";

const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [list, setList] = useState();
  const [submitted, isSubmitted] = useState(false);
  const [editId, setEditId] = useState();
  const [toaster, setToaster] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/todos")
      .then((response) => setList(response.data))
      .catch((error) => console.error(error));
  }, [submitted]);

  const handleEdit = (id) => {
    setEditId(id);
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/todos/${id}`)
      .then((response) => alert("deleted successfully"))
      .catch((error) => console.error(error));
    isSubmitted(!submitted);
  };

  return (
    <div className="todo">
      <div className="" style={{ textAlign: "center" }}>
        <h1 className="title">Todo App</h1>
        <button className="main" id="addButton" onClick={() => setIsOpen(true)}>
          + Add New Todo
        </button>
      </div>
      <div className="todoList">
        {!list?.length &&
          "no todos found, but you can add todo by clicking the Add New todo"}
        {list?.map((item, index) => (
          <div className="todoItem" key={index}>
            <div className="detail">
              <h3>Title:</h3>
              {item?.title}
            </div>
            <div className="detail">
              <h3>Task:</h3> {item?.task}
            </div>
            <div className="detail">
              <button className="main" onClick={() => handleEdit(item?.id)}>
                Edit
              </button>
              <button className="danger" onClick={() => handleDelete(item?.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ModalForm
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        submitted={submitted}
        isSubmitted={isSubmitted}
        editId={editId}
        setEditId={setEditId}
        toaster={toaster}
        setToaster={setToaster}
      />
    </div>
  );
};

export default Todo;
