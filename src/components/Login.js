import React, { useState } from 'react';
// import { loginValidation, signUpValidation } from '../../utils/validation';
import "./login.css"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/todolist/todoSlice';

const LoginAccount = () => {
    const [inputData, setInputData] = useState({username:'',password:''})
    const [errorMsg, setErrorMsg] = useState({})
    const dispatch = useDispatch()
    const todos = useSelector(state => state.counter);
    const handleChange = (e) => {
        let { name, value } = e.target;
        let newData = { [name]: value }
        setInputData({ ...inputData, [name]: value })
        if(name === 'username'){            
            if(value.length<3){
                setErrorMsg({
                    ...errorMsg,
                    [name]:'Minimum 3 character Required'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    [name]:''
                })
            }
        }
        if(name === 'password'){
            if(value.length<3){
                setErrorMsg({
                    ...errorMsg,
                    [name]:'Minimum 3 character Required'
                })
            }else{
                setErrorMsg({
                    ...errorMsg,
                    [name]:''
                })
            }
        }
    }
    const handleLogin=async()=>{
        const errors= {};
        if(!inputData.username || inputData.username.length<3 || !inputData.password || inputData.password.length<3){
            if(!inputData.username){
                errors.username = 'username is Required'
            }else if(inputData.username.length<3){
                errors.username = 'Minimum 3 character required'
            }
            if(!inputData.password){
                errors.password = 'password is Required'
            }else if(inputData.password.length<3){
                errors.password = 'Minimum 3 character required'
            }
            await setErrorMsg(errors)
        }else{
            dispatch(loginUser(inputData));
            
        }
    }
    console.log(todos)
    return (
        <div className='main'>
                <div className="row">
                    <div className="colm-form">
                        <div className="form-container">
                            <h1>Login</h1>
                            {/* <form > */}
                                <input type="text" name="username" onChange={handleChange} placeholder="username" required  />
                                <input type="password" name="password" placeholder="Password" required onChange={handleChange} />                                
                                <button className="btn-login" onClick={handleLogin}>Submit</button>
                            {/* </form> */}
                        </div>
                    </div>
                </div>            
        </div>
    )
}

export default LoginAccount;