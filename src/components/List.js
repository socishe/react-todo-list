import React from "react";

const List = ({ items, ...props }) => {
  var dragging = null;
    const handleRemove=()=> {
        props.removeTodo(items.id);
      }
    
  return (
      
    <div
      onDragOver={event => {
        event.preventDefault();
        var bounding = event.target.getBoundingClientRect();
        var offsetX = bounding.x + bounding.width / 2;
        if (event.clientX - offsetX > 0) {
          event.target.style["border-right"] = "solid 4px red";
          event.target.style["border-left"] = "";
        } else {
          event.target.style["border-left"] = "solid 4px red";
          event.target.style["border-right"] = "";
        }
      }}
      onDragLeave={event => {
        event.target.style["border-right"] = "";
        event.target.style["border-left"] = "";
      }}
      onDragStart={event => {
        dragging = event.target;
        console.log(event.target);
        event.dataTransfer.setData("text/html", dragging);
      }}
      onDrop={event => {
        event.preventDefault();

        if (event.target.style["border-right"] !== "") {
          event.target.style["border-right"] = "";
          props.insertItem(event.target.id, dragging.id, true);
        } else {
          event.target.style["border-left"] = "";
          props.insertItem(event.target.id, dragging.id, false);
        }
      }}
      
      className="list"
    >
        
      {items.map(item => (
        <div draggable
         id={item.id} 
         key={item.id}
         name={item.name}
          className="item">
          {item.name}
          <button> Edit</button>
          <button onClick={()=>handleRemove(items.id)}>X</button>
        </div>
      ))}
    </div>
  );
};

export default List;
