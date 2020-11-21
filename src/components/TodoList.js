import React, { Component } from 'react'
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css'
class TodoList extends Component {
    state ={
        todos: []
    }
    create =(newTodo)=>{
        this.setState({
            todos: [...this.state.todos, newTodo]
        })
    }
    remove =(id)=>{
        this.setState({
           todos:this.state.todos.filter(todo => todo.id !==id) 
        })
    }
    update=(id, updatedTask)=> {
        const updatedTodos = this.state.todos.map(todo => {
          if (todo.id === id) {
            return { ...todo, task: updatedTask };
          }
          return todo;
        });
        this.setState({ todos: updatedTodos });
      }
    render() {
        const todos = this.state.todos.map(todo=>{
            return <Todo 
            removeTodo={this.remove}
             id={todo.id}
              key={todo.id}
              task={todo.task} 
              updateTodo={this.update} />
        })
        return (
            <div className="TodoList">
                <h1>Todo List</h1>
                <NewTodoForm createTodo ={this.create}/>
                <ul>
                    {todos}
                </ul>
            </div>
        )
    }
}

export default TodoList
