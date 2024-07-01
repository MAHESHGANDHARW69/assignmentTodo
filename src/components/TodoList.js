import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TodoItem from './TodoItem';
import { removeItem, toggleTodo } from '../app/todolist/todoSlice';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';


const TodoList = (props) => {
    const {task,setTask,setToggle,setIds} = props;
    const dispatch = useDispatch();
    const todos = useSelector(state => state.counter.todos);
    console.log(todos)

    useEffect(() => {
        // dispatch(fetchTodos());
    }, [dispatch]);

    function editTask(valItem){
        setTask(valItem?.task)
        setIds(valItem?.id)
        setToggle(true)        
    }
    function handleToggle(id){
        dispatch(toggleTodo(id))
    }
    function handleRemoveItem(id){
        dispatch(removeItem(id))

    }

    return (
        <div className="task-list">
            <h1>Todo List</h1>
            {/* {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo}  />
            ))} */}
            <Table responsive="sm">
                <thead>
                    <tr>
                        <th>sno</th>
                        <th>Status</th>
                        <th>Task</th>
                        <th>Toggle</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {Array.isArray(todos) && todos?.map((todo,i)=>{
                    return(
                        <tr>
                            <td>{i+1}</td>
                            <td>{todo.completed?'complete':"incomplete"}</td>
                            <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.task}</td>
                            <td>
                            <button onClick={()=>handleToggle(todo.id)}>Toggle</button>
                            </td>
                            <td>
                            <button onClick={()=>editTask(todo)}>Edit</button>
                            <button onClick={()=>handleRemoveItem(todo.id)} >Delete</button>                                
                            </td>
                        </tr>                        
                    )
                })}                    
                </tbody>
            </Table>
            {/* {Array.isArray(todos) && todos?.map((todo,i)=>{
                return (
                    <div className="task-item" key={i}>
                        <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.task}</span>
                        <button onClick={()=>handleToggle(todo.id)}>Toggle</button>
                        <button onClick={()=>editTask(todo)}>Edit</button>
                        <button onClick={()=>handleRemoveItem(todo.id)} >Delete</button>
                    </div>
                )
            })} */}
        </div>
    );
};

export default TodoList;
