import api from "./api";

export async function loginApi(data, navigate) {
  try {
    const apiResponse = await api.applicationApi(
      "api/user/login",
      "POST",
      data
    );

    if (apiResponse.status === 200) {
      localStorage.setItem("user_id", apiResponse.data.result.userId);
      localStorage.setItem("login_token", apiResponse.data.result.token);
      localStorage.setItem("username", apiResponse.data.result.username);
      navigate("/todoList");
      return alert("Successfully Logged in");
    } else {
      if (apiResponse.status === 401) {
        console.log(apiResponse.data.message);
      } else {
        console.log(apiResponse.data.message);
      }
    }
  } catch (err) {
    // console.log(err, 'error enter');
    alert(" Network error");
  }
}

export async function Registeration(data, navigate, setUser) {
  try {
    const apiResponse = await api.applicationApi(
      "api/user/register",
      "POST",
      data
    );
    if (apiResponse.status === 200) {
      console.log("apiresponse :", apiResponse);
      alert(apiResponse.data.message);
      navigate("/login");
      setUser({
        firstname: "",
        lastname: "",
        email: "",
        mobilenumber: "",
        username: "",
        password: "",
      });
    } else {
      if (apiResponse.status === 401) {
        alert("Error Occured");
      } else {
        alert(apiResponse.data.message);
      }
    }
  } catch (err) {
    console.log(err);
  }
}
export async function fetchProfile(setUser) {
  try {
    const apiResponse = await api.applicationApi("api/user/profile", "GET");
    if (apiResponse.status === 200) {
      setUser(apiResponse.data.result);
    } else {
      if (apiResponse.status === 401) {
        alert("error occured");
      }
      return false;
    }
  } catch (err) {
    console.log(err);
  }
}
