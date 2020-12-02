import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoItemList extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.todos !== nextProps.todos;
    }
    
  render() {
    const { todos, onToggle, onRemove } = this.props;

    const todoList = todos.map(
        (/*{id, text, checked, color}*/ todo) => (
            <TodoItem 
            /*
                id = {id}
                text = {text}
                checked = {checked}
                color = {color}
              */
                {...todo}
                onToggle = {onToggle}
                onRemove = {onRemove}
                key = {todo.id}
            />
        )
    )

    return (
        <div>
            {todoList}
        </div>
    );
  }
}

export default TodoItemList;