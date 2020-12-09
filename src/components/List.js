import React, { Component } from 'react'

class List extends Component {
  state={
    isEditing: false,
    name: this.props.name
}
   handleRemove=(id)=> {

    this.props.removeTodo(id);
  }
  toggleForm=()=> {
    this.setState({ isEditing: !this.state.isEditing });
  }
  handleChange=(evt)=> {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  }
  handleUpdate=(evt)=> {
    evt.preventDefault();
    this.props.updateTodo(this.props.id, this.state.task);
    this.setState({ isEditing: false });
  }
  render() {
    let dragging = null;
    let result;
    if(this.state.isEditing){
        result =(
            <div className="Todo" >
                <form onSubmit={this.handleUpdate}>
                    <input type='text'value={this.state.name} onChange={this.handleChange} name="name" />
                    <button>Save</button>
                </form>
            </div>
        )
        }else{
          result =<div
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
              this.props.insertItem(event.target.id, dragging.id, true);
            } else {
              event.target.style["border-left"] = "";
              this.props.insertItem(event.target.id, dragging.id, false);
            }
          }}
          
          className="list"
        >
            
          {this.props.items.map(item => (
            <div draggable
             id={item.id} 
             key={item.id}
             name={item.name}
              className="item">
              {item.name}
              <button onClick={this.toggleForm}> Edit</button>
              <button onClick={()=>this.handleRemove(item.id)}>X</button>
            </div>
          ))}
        </div>;
        }
    return result;
  }
}

// const List = ({ items, ...props }) => {
  
  
    
    
//   return (
      
    
//   );
// };

export default List;
