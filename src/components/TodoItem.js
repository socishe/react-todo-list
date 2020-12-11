import React, { useState } from "react";

let dragging = null;

const TodoItem = ({ item, onRemove, onUpdate, onDragMove }) => {
  //   const dragging = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const onDragOver = (event) => {
    event.preventDefault();

    const bounding = event.target.getBoundingClientRect();
    const offsetX = bounding.x + bounding.width / 2;

    if (event.clientX - offsetX > 0) {
      event.target.style["border-right"] = "solid 4px red";
      event.target.style["border-left"] = "";
    } else {
      event.target.style["border-left"] = "solid 4px red";
      event.target.style["border-right"] = "";
    }
  };

  const onDrop = (event) => {
    event.preventDefault();

    let onRight = false;

    if (event.target.style["border-right"] !== "") {
      event.target.style["border-right"] = "";
      onRight = true;
    } else {
      event.target.style["border-left"] = "";
    }

    if (dragging && dragging.id) {
      onDragMove(event.target.id, dragging.id, onRight);
    }
  };

  const toggleForm = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (evt) => {
    setInputValue(evt.target.value);
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();

    onUpdate(item.id, inputValue);

    setIsEditing(false);
  };

  return (
    <>
      {isEditing && (
        <div className="Todo">
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              defaultValue={item ? item.name : ""}
              onChange={handleChange}
              name="name"
            />
            <button type="submit">Save</button>
          </form>
        </div>
      )}

      {!isEditing && (
        <div
          onDragOver={onDragOver}
          onDragLeave={(event) => {
            event.target.style["border-right"] = "";
            event.target.style["border-left"] = "";
          }}
          onDragStart={(event) => {
            const draggingTarget = event.target;
            dragging = draggingTarget;

            event.dataTransfer.setData("text/html", dragging);
          }}
          onDrop={onDrop}
          className="list"
        >
          <div draggable className="item" id={item.id}>
            {item.name}
            <button onClick={toggleForm}> Edit</button>
            <button onClick={() => onRemove(item.id)}>X</button>
          </div>
        </div>
      )}
    </>
  );
};

export default TodoItem;
