import React, { Component } from "react";
class Todo extends Component {
  state={
      isEditing: false,
      task: this.props.task
  }
  handleRemove=()=> {
    this.props.removeTodo(this.props.id);
  }
  toggleForm=()=> {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleUpdate=(evt)=> {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
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
          <div >
              <form onSubmit={this.handleUpdate}>
                  <input type='text'value={this.state.task} onChange={this.handleChange} name="task" />
                  <button>Save</button>
              </form>
          </div>
      )
  }else{
      result = (
        <div >
        <button onClick={this.toggleForm}>Edit</button>
        <button onClick={this.handleRemove}>X</button>
        <li>{this.props.task}</li>
    </div>
      )
  }
  
    return result; 
  }
}
export default Todo;
