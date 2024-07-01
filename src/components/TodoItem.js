import React from 'react';
import { useDispatch } from 'react-redux';

const TodoItem = ({ todo, toggleTodo, deleteTodo }) => {
    const dispatch = useDispatch();

    return (
        <div className="task-item">
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
            <button onClick={() => dispatch(toggleTodo(todo._id))}>Toggle</button>
            <button onClick={() => dispatch(deleteTodo(todo._id))}>Delete</button>
        </div>
    );
};

export default TodoItem;
