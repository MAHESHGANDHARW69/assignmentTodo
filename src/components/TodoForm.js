import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, editItem } from '../app/todolist/todoSlice';
// import { addTodo } from '../actions/todoActions';

const TodoForm = (props) => {
    const {task,setTask,toggle,setToggle,ids} = props;
    const todos = useSelector(state => state.counter);
    const dispatch = useDispatch();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            if(toggle && task){
                dispatch(editItem({id:ids,task,completed:false,username:todos.user.username,password:todos.user.password})) 
                setToggle(false);
                setTask('')
            }else if(!toggle && !task){
                alert('Please enter task')
            } else if(toggle && !task){
                alert('Please enter update task')
            }else{                
                dispatch(addItem({id: Date.now(),task,completed: false,username:todos.user.username,password:todos.user.password}));
                setTask('');
            }            
        } catch (err) {
            console.log(err)            
        }                
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new todo"
            />
            <button type="submit">{toggle?"Update":"Add"}</button>
        </form>
    );
};

export default TodoForm;
