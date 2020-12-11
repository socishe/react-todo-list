import React, { Component } from "react";
import TodoItem from "./TodoItem";

class List extends Component {
  state = {};

  handleRemove = (id) => {
    this.props.removeTodo(id);
  };

  handleUpdate = (itemId, inputValue) => {
    this.props.updateTodo(itemId, inputValue);
  };

  onDragMove = (targetId, dragId, onRight) => {
    this.props.insertItem(targetId, dragId, onRight);
  };

  render() {
    return (
      <div>
        {this.props.items.map((item, index) => {
          return (
            <TodoItem
              key={`${item.id}_${index.toString()}`}
              item={item}
              onUpdate={this.handleUpdate}
              onDragMove={this.onDragMove}
              onRemove={this.handleRemove}
            />
          );
        })}
      </div>
    );
  }
}

export default List;
