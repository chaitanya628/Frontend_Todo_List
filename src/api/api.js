import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/";
const API_BASE_URL = "https://todolist-backend-vlla.onrender.com/";
const api = {
  applicationApi: async (url, method, data) => {
    const token = localStorage.getItem("login_token");
    try {
      return axios(`${API_BASE_URL}${url}`, {
        method: method,
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
        data: data || {},
      })
        .then((result) => {
          return result;
        })
        .catch((err) => {
          return err.response;
        });
    } catch (error) {
      return false;
    }
  },
};

export default api;
