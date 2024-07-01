// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    todos: [],
    user : {},
  },
  reducers: {
    loginUser: (state,action) => {
      state.user = action.payload
    },
    addItem: (state,action) => {
      state.todos  = [...state.todos,action.payload];
    },
    removeItem: (state,action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editItem: (state, action) => {
      const index = state.todos.findIndex(item=>item.id === action.payload.id);
      if(index !== -1){
        state.todos[index] = action.payload;
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { loginUser,addItem, removeItem, editItem,toggleTodo } = counterSlice.actions;

export default counterSlice.reducer;
