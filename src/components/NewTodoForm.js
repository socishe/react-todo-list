import React, { Component } from "react";
import "./NewTodoForm.css";

class NewTodoForm extends Component {
  state = { name: "" };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.createTodo({
      ...this.state,
      id: `${this.state.name}_${this.props.items.length}`,
      completed: false,
    });

    this.setState({ name: "" });
  };

  render() {
    return (
      <div className="NewTodoForm">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Add Todo Item</label>
          <div>
            <input
              type="text"
              placeholder="New Todo"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <button>Add Todo</button>
          </div>
        </form>
      </div>
    );
  }
}
export default NewTodoForm;
