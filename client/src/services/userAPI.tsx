import axios from "axios";
import { user_url } from "../constants";


export async function user_login(username: string, password: string) {
  try {
    const response = await axios.post(user_url + "login", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
}

export async function register_user(
  username: string,
  password: string,
  email: string
) {
  try {
    const response = await axios.post(user_url + "register", {
      username,
      password,
      email,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
