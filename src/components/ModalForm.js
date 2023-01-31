import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import Toaster from "./Toaster";

const customStyles = {
  content: {
    width: "440px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #ddd",
  },
};
const ModalForm = ({
  isOpen,
  setIsOpen,
  submitted,
  isSubmitted,
  editId,
  setEditId,
  toaster,
  setToaster,
}) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/todos", {
        title: title,
        task: task,
      })
      .then((response) => alert("Data Added succesfsully", response.data))
      .catch((error) => console.error(error));
    setIsOpen(false);
    isSubmitted(!submitted);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setTask("");
    setTitle("");
    axios
      .put(`http://localhost:3000/todos/${editId}`, {
        title: title,
        task: task,
      })
      .then((response) => {
        setToaster(true);
        isSubmitted(!submitted);
        setIsOpen(false);
      })
      .catch((error) => console.error(error));
    isSubmitted(!submitted);
    setIsOpen(false);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/todos/${editId}`)
      .then((response) => {
        setTitle(response.data?.title);
        setTask(response.data?.task);
      })
      .catch((error) => console.error(error));
  }, [editId, submitted]);

  return (
    <div className="modal">
      <ReactModal
        isOpen={isOpen}
        style={customStyles}
        onRequestClose={() => setIsOpen(false) & setEditId(null)}
      >
        <h3
          style={{
            color: "#1f3499",
            textAlign: "center",
            borderBottom: "1px solid #ddd",
          }}
        >
          {editId ? " Edit this Todo" : "Add a new Todo"}
        </h3>
        <label>Enter Title</label> <br />
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={editId && title}
        />
        <br />
        <label>Enter Task</label> <br />
        <input
          type="text"
          onChange={(e) => setTask(e.target.value)}
          value={editId && task}
        />
        <br />
        {editId ? (
          <button className="main" onClick={handleUpdate}>
            Update todo
          </button>
        ) : (
          <button className="main" onClick={handleSubmit}>
            Add todo
          </button>
        )}
      </ReactModal>
      {toaster === true && (
        <Toaster setToaster={setToaster} message="Updated Successfully" />
      )}
    </div>
  );
};

export default ModalForm;
