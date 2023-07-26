import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Select,
  MenuItem,
} from "@mui/material";
import "./TodoItems.css";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { fetchTodoList, updateTodoData } from "../api/taskApi";

const TodoItems = (props) => {
  const defaultData = [
    {
      title: "Default Task 1",
      description: "-",
      category: "-",
      dueDate: "-",
      status: "-",
    },
    {
      title: "Default Task 2",
      description: "-",
      category: "-",
      dueDate: "-",
      status: "-",
    },
    // Add more default data here as needed
  ];
  const dispatch = useDispatch();
  const fetchData = () => {
    dispatch(fetchTodoList());
  };
  const handleStatusChange = (e, row) => {
    console.log(row);
    const updatedRow = { ...row, status: e.target.value === "Completed" };
    dispatch(updateTodoData(row._id, updatedRow, fetchData));
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "#F6F6F6", color: "black" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="default table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#bfbbc3" }}>
            {props.headData.map((column) => (
              <TableCell
                className="table_head"
                align="left"
                sx={{
                  whiteSpace: "nowrap",
                  fontFamily: "DM Sans",
                  fontWeight: "600",
                  fontSize: "20px",
                  height: "21px",
                  color: "#1C1C1C",
                }}
                key={column.id}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.length !== 0 ? (
            props.data?.map((row) => (
              <TableRow
                key={row.title}
                className={row.status === true ? "tablecompleted" : ""}
              >
                <TableCell
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#636365",
                  }}
                  className="table_column"
                  align="left"
                >
                  {row.title ? row.title : ""}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#636365",
                  }}
                  className="table_column"
                  align="left"
                >
                  {row.description ? row.description : ""}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#636365",
                  }}
                  className="table_column"
                  align="left"
                >
                  {row.category ? row.category : ""}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#636365",
                  }}
                  className="table_column"
                  align="left"
                >
                  {row.dueDate?.substring(0, 10)}
                </TableCell>
                <TableCell
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "21px",
                    color: "#636365",
                  }}
                  className="table_column"
                  align="left"
                >
                  <div className="career_lastcol">
                    <Select
                      value={row.status === true ? "Completed" : "Active"}
                      onChange={(e) => handleStatusChange(e, row)}
                      sx={{ minWidth: 100 }}
                    >
                      <MenuItem value={"Completed"}>Completed</MenuItem>
                      <MenuItem value={"Active"}>Active</MenuItem>
                    </Select>
                    <div className="action">
                      <BorderColorIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => props.handleEditdata(row)}
                      />
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => props.handleDelete(row._id)}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>
                <Box className="loader_box"> No Data Found</Box>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TodoItems;
