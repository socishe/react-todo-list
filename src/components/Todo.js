import React, { Component } from "react";
import './Todo.css'
class Todo extends Component {
  state={
      isEditing: false,
      // task: this.props.task
  }
  handleRemove=()=> {
    this.props.removeTodo(this.props.id);
  }
  toggleForm=()=> {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleUpdate=(evt)=> {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.name);
    this.setState({ isEditing: false });
  }
  handleChange=(evt)=> {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleToggle=(evt)=> {
    this.props.toggleTodo(this.props.id);
  }
  render() {
  let result;
  if(this.state.isEditing){
      result =(
          <div className="Todo" >
              <form onSubmit={this.handleUpdate}>
                  <input type='text'value={this.state.task} onChange={this.handleChange} name="task" />
                  <button>Save</button>
              </form>
          </div>
      )
  }else{
      result = (
        <div className="Todo" >
          <li className="Todo-task">{this.props.task}</li>
        <button onClick={this.toggleForm}>Edit</button>
        <button onClick={this.handleRemove}>X</button>
        
    </div>
      )
  }
  
    return result; 
  }
}
export default Todo;
