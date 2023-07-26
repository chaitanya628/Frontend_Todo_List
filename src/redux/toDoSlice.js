import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addTodoItem } from "../api/taskApi";

const initialState = {
  data: null,
};

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (todoData, fetchData) => {
    const response = await addTodoItem(todoData, fetchData);
    return response;
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoList: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: {
    [addTodoAsync.fulfilled]: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { addTodo, setTodoList } = todoSlice.actions;

export default todoSlice.reducer;
