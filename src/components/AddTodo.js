import React, { useState } from "react";
import "./AddTodo.css";
import {
  Box,
  Button,
  Fade,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import {
  DatePicker,
  DesktopDatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const inputs = [
  {
    id: 1,
    label: "Title",
    placeholder: "Enter Title",
    name: "title",
    type: "text",
  },

  {
    id: 3,
    label: "Category",
    placeholder: "enter category",
    name: "category",
    type: "text",
  },
  {
    id: 4,
    label: "Due Date",
    placeholder: " ",
    name: "dueDate",
    type: Date(),
  },
  {
    id: 5,
    label: "Status",
    placeholder: "",
    name: "status",
    type: Boolean,
  },
];
function AddTodo(props) {
  const [data, setData] = useState(
    props.editdata
      ? {
          ...props.editdata,
          dueDate: dayjs(props.editdata.dueDate),
        }
      : {
          title: "",
          description: "",
          category: "",
          dueDate: "",
          status: false,
        }
  );
  const handleChangeDate = (date) => {
    setData({
      ...data,
      dueDate: dayjs(date),
    });
  };
  const handleChangeData = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setData({ ...data, [name]: value });
  };
  const handleClose = () => props.setOpen(false);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box className="modal_campaigns">
            <p
              className="modal_heading"
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              {props.editdata ? "EDIT" : "ADD"} TODO
            </p>

            <Grid
              container
              direction="row"
              justifyContent="space-between"
              sx={{ my: 1.5, display: "flex", justifyContent: "space-between" }}
              alignItems="center"
              item
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              colgap={1.5}
              columns={{ xs: 12, sm: 12, md: 22 }}
            >
              <Grid item xs={12} sm={6} md={11} key={1} className="inputs_gird">
                <label>Title</label>
                <br />
                <TextField
                  onChange={handleChangeData}
                  name="title"
                  sx={{
                    mt: 0.5,
                    mb: 1,
                    backgroundColor: "#f6f6f6",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    borderRadius: "6px",
                  }}
                  size="small"
                  fullWidth
                  placeholder=""
                  type="text"
                  value={data.title}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={11} key={2} className="inputs_gird">
                <label>Category</label>
                <br />
                <TextField
                  onChange={handleChangeData}
                  name="category"
                  sx={{
                    mt: 0.5,
                    mb: 1,
                    backgroundColor: "#f6f6f6",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    borderRadius: "6px",
                  }}
                  size="small"
                  fullWidth
                  placeholder=""
                  type="text"
                  value={data.category}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={11} key={3} className="inputs_gird">
                <label>Due Date</label>
                <br />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disablePast
                    inputFormat="YYYY-MM-DD"
                    value={data.dueDate}
                    onChange={handleChangeDate}
                    renderInput={(params) => (
                      <TextField
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            border: "none",
                            backgroundColor: "#f6f6f6",
                          },
                          borderRadius: "6px",
                        }}
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6} md={11} key={4} className="inputs_gird">
                <label>Status</label>
                <br />
                <Select
                  name="status"
                  sx={{
                    mt: 0.5,
                    mb: 1,
                    backgroundColor: "#f6f6f6",
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },
                    borderRadius: "6px",
                  }}
                  fullWidth
                  value={data.status}
                  onChange={handleChangeData}
                >
                  <MenuItem value={true}>Completed</MenuItem>
                  <MenuItem value={false}>Active</MenuItem>
                </Select>
              </Grid>
            </Grid>
            <div className="textarea_div">
              <label className="textarea_label">Description</label>
              <br />
              <TextareaAutosize
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                  "&&:after": {
                    borderBottom: "none",
                  },
                }}
                name="description"
                placeholder="Type Here ....."
                className="textarea"
                fullWidth
                value={data.description}
                onChange={handleChangeData}
                minRows={5}
              />
            </div>
            {props.editdata ? (
              <div className="action">
                <Button
                  variant="contained"
                  onClick={() => props.handleEdit(data)}
                  className="action_btn"
                >
                  Edit
                </Button>
              </div>
            ) : (
              <div className="action">
                <Button
                  variant="contained"
                  onClick={() => props.handleAddnew(data)}
                  className="action_btn"
                >
                  Add
                </Button>
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddTodo;
