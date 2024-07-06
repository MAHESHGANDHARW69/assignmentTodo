import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { useState } from 'react';
import LoginAccount from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './app/todolist/todoSlice';

function App() {
  const [task, setTask] = useState('');
  const [toggle,setToggle] = useState(false);
  const [ids,setIds] = useState();
  let user = useSelector(state=>state.counter.user)
  const dispatch = useDispatch()
  return (
    <div className="App">
      {
        !user?.username?
        <LoginAccount />:
        <>
        <h1>Advanced To-Do App</h1>
        <TodoForm task={task} setTask={setTask} toggle={toggle} setToggle={setToggle} ids={ids} /> 
        <button onClick={()=>dispatch(loginUser({}))}>Exit</button>
        <TodoList task={task} setTask={setTask} setToggle={setToggle} setIds={setIds} />
        </>
      }
            
    </div>
  );
}

export default App;