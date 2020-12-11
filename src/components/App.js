import React from "react";
import NewTodoForm from "./NewTodoForm";
import "../App.css";

import List from "./List";

class App extends React.Component {
  state = {
    items: [],
  };

  insertItem = (id, idToInsert, after) => {
    if (id !== idToInsert) {
      let removed = null;
      let removedId = null;

      let newArr = this.state.items.reduce((arr, i) => {
        if (i.id.toString() === idToInsert) {
          removed = i;
          return arr;
        }

        if (i.id.toString() === id) {
          if (after) {
            arr.push(i);
            arr.push(null);
            removedId = arr.length - 1;
          } else {
            arr.push(null);
            removedId = arr.length - 1;
            arr.push(i);
          }
        } else {
          arr.push(i);
        }

        return arr;
      }, []);

      newArr[removedId] = removed;

      this.setState({
        items: newArr,
      });
    }
  };

  create = (newTodo) => {
    this.setState({
      items: [...this.state.items, newTodo],
    });
  };

  remove = (id) => {
    this.setState({
      items: this.state.items.filter((todo) => todo.id !== id),
    });
  };

  handleToggle = (evt) => {
    this.props.toggleTodo(this.props.id);
  };

  update = (id, updatedTask) => {
    const updatedTodos = this.state.items.map((todo) => {
      if (todo.id === id) {
        return { ...todo, name: updatedTask };
      }

      return todo;
    });

    this.setState({ items: updatedTodos });
  };

  render() {
    return (
      <div className="App">
        <h1> React Drag & Drop Todo App </h1>
        <NewTodoForm items={this.state.items} createTodo={this.create} />
        <List
          insertItem={this.insertItem}
          removeTodo={this.remove}
          items={this.state.items}
          updateTodo={this.update}
        />
      </div>
    );
  }
}

export default App;
