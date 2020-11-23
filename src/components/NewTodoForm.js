import React, { Component } from "react";
import "./NewTodoForm.css";

class NewTodoForm extends Component {
  state = { task: "" };
  handleChange=(e)=> {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit=(e)=> {
    e.preventDefault();
    this.props.createTodo({ ...this.state, id:this.state.task, completed: false });
    this.setState({ task: "" });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor='task'>Add Todo item</label>
        <input
          type='text'
          placeholder='New Todo'
          id='task'
          name='task'
          value={this.state.task}
          onChange={this.handleChange}
        />
        <button>Add Todo</button>
      </form>
    );
  }
}
export default NewTodoForm;
