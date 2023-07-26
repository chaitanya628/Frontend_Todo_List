import React, { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TodoItems from "./TodoItems";
import "./TodoList.css";
import Tableheader from "./Tableheader";
import Navbar from "./Navbar";
import { deleteTodoItem, fetchTodoList, updateTodoData } from "../api/taskApi";
import { addTodoAsync } from "../redux/toDoSlice";

const headData = [
  {
    id: "title",
    label: "Title",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "description",
    label: "Description",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "category",
    label: "Category",
    // format: (value) => value.toLocaleString(),
  },
  {
    id: "dueDate",
    label: "Due Date",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "completed",
    label: "Status",
    format: (value) => value.toLocaleString(),
    dropdown: true,
  },
];
const filterdata = [
  { label: "Active", value: "active" },
  { label: "Completed", value: "completed" },
];
function TodoList() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editdata, setEditdata] = useState();
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todos.data);
  const [condition, setCondition] = useState({
    search: "",
    filter: "",
    sorting: "",
  });
  const fetchdata = () => {
    dispatch(fetchTodoList());
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleFilter = (event) => {
    const value = event.target.value;
    setCondition({ ...condition, filter: value });
  };
  const handleSearch = (e) => {
    let value = e.target.value;
    setCondition({ ...condition, search: value });
  };
  const handleEditdata = (dt) => {
    setEdit(true);
    setEditdata(dt);
  };
  const handleDelete = (id) => {
    dispatch(deleteTodoItem(id, fetchdata));
  };
  const handleEdit = (dt) => {
    dispatch(updateTodoData(dt._id, dt, fetchdata));
    setEdit(false);
  };
  const handleAddnew = (todoData) => {
    dispatch(addTodoAsync(todoData)); // Dispatch the async thunk with the todoData
    setOpen(false);
  };
  const handleStatusChange = (event, id) => {
    const newStatus = event.target.value;
    const selectedItem = todoList.find((item) => item._id === id);
    if (selectedItem) {
      selectedItem.status = newStatus === "completed";
      dispatch(updateTodoData(selectedItem._id, selectedItem, fetchdata));
    }
  };
  return (
    <div className="main">
      {open ? (
        <AddTodo open={open} setOpen={setOpen} handleAddnew={handleAddnew} />
      ) : (
        ""
      )}
      {edit ? (
        <AddTodo
          handleEdit={handleEdit}
          open={edit}
          editdata={editdata}
          setOpen={setEdit}
        />
      ) : (
        ""
      )}
      <Navbar />
      <div className="components">
        <Tableheader
          handleFilter={handleFilter}
          filterdata={filterdata}
          condition={condition}
          search={condition.search}
          handleSearch={handleSearch}
          open={open}
          setOpen={setOpen}
        />

        <TodoItems
          headData={headData}
          handleStatusChange={handleStatusChange}
          handleEditdata={handleEditdata}
          handleDelete={handleDelete}
          data={
            todoList &&
            todoList
              .filter((val) => {
                if (condition.search === "") {
                  return val;
                } else if (
                  val.category
                    .toLowerCase()
                    .includes(condition.search.toLowerCase())
                ) {
                  return val;
                }
              })
              .filter((val) => {
                if (condition.filter === "completed") {
                  return val.status === true;
                } else if (condition.filter === "active") {
                  return val.status === false;
                } else {
                  return val;
                }
              })
          }
        />
      </div>
    </div>
  );
}

export default TodoList;
