import { setTodoList } from "../redux/toDoSlice";
import api from "./api";

export function fetchTodoList() {
  return async function fetchUsertypesThunk(dispatch, getState) {
    try {
      const apiResponse = await api.applicationApi("api/task/list", "GET");
      if (apiResponse.status === 200) {
        dispatch(setTodoList(apiResponse.data.result));
      } else {
        if (apiResponse.status === 401) {
          alert("error occured");
        }
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export async function addTodoItem(data, fetchData) {
  try {
    const apiResponse = await api.applicationApi(
      "api/task/create",
      "POST",
      data
    );

    if (apiResponse.status === 200) {
      window.location.reload();
      alert(apiResponse.data.message);
      fetchData();
    } else {
      if (apiResponse.status === 401) {
        console.log(apiResponse.data.message);
      } else {
        console.log(apiResponse.data.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export function updateTodoData(id, data, fetchData) {
  return async function fetchsubscriptionDataThunk(dispatch) {
    try {
      const apiResponse = await api.applicationApi(
        `api/task/update/${id}`,
        "PUT",
        data
      );
      if (apiResponse.status === 200) {
        alert(apiResponse.data.message);
        fetchData();
      } else {
        if (apiResponse.status === 401) {
          alert(apiResponse.data.message);
        } else {
          alert(apiResponse.data.message);
        }
      }
    } catch (err) {
      console.log(err);
      // dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function deleteTodoItem(id, fetchData) {
  return async function fetchsubscriptionDataThunk(dispatch) {
    try {
      const apiResponse = await api.applicationApi(
        `api/task/delete/${id}`,
        "DELETE"
      );
      if (apiResponse.status === 200) {
        alert(apiResponse.data.message);
        fetchData();
      } else {
        if (apiResponse.status === 401) {
          alert(apiResponse.data.message);
        } else {
          alert(apiResponse.data.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
}
