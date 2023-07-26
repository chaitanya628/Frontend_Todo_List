import { Button, FormControl, MenuItem, Select } from "@mui/material";
import "./Tableheader.css";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
export default function Tableheader(props) {
  const handleAddbtn = () => {
    props.setOpen && props.setOpen(true);
  };

  return (
    <div>
      <div className="buyer_header">
        <div className="input_div">
          <input
            onChange={props.handleSearch}
            name="search"
            value={props.search}
            className="search_input"
            type="text"
            placeholder="Search by..."
          />
          <SearchIcon className="search_icon" />
        </div>
        <div className="header_action">
          <FormControl>
            <Select
              value={props.condition && props.condition.filter}
              onChange={props.handleFilter && props.handleFilter}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{ height: "44px", maxWidth: "150px", color: "#636365" }}
              className="selects"
              IconComponent={() => <ArrowDropDownIcon />}
            >
              <MenuItem value="">All</MenuItem>
              {props.filterdata &&
                props.filterdata.map((val) => (
                  <MenuItem value={val.value}>{val.label}</MenuItem>
                ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            onClick={handleAddbtn}
            className="add_btn"
            sx={{
              width: { xs: "120", sm: "100px" },
              mt: { xs: 1, sm: 0 },
              mb: { xs: 1, sm: 0 },
              minWidth: 100,
              height: "44px",
              mr: 0,
              ml: 0,
            }}
            style={{ backgroundColor: "#111" }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
