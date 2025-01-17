import axios, { AxiosError } from "axios";
import { user_url } from "../hooks/constants";
import Cookies from "js-cookie";

// Login API
export async function user_login(email: string, password: string) {
  try {
    const response = await axios.post(
      `${user_url}login`,
      { email, password },
      { withCredentials: true } // Ensures cookies are included
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error("Login failed. Unexpected response.");
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Login failed:", err.response?.data || err.message);
    return { success: false, data: err.response?.data || err.message };
  }
}

// Logout API
export async function logout_user() {
  try {
    const response = await axios.post(
      `${user_url}logout`,
      {},
      { withCredentials: true } // Ensures cookies are included
    );

    if (response.status === 200) {
      Cookies.remove("note_id");
      return { success: true, data: response.data };
    } else {
      throw new Error("Logout failed.");
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Logout failed:", err.response?.data || err.message);
    return { success: false, data: err.response?.data || err.message };
  }
}

// Register API
export async function register_user(
  username: string,
  password: string,
  email: string
) {
  try {
    const response = await axios.post(`${user_url}register`, {
      username,
      password,
      email,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Registration failed:", err.response?.data || err.message);
    return { success: false, data: error };
  }
}

// Auth Check API
export async function auth_check() {
  try {
    const response = await axios.get(`${user_url}auth/check`, {
      withCredentials: true, // Required for session-based authentication
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error("Unauthorized");
    }
  } catch (error) {
    console.error("Auth check failed:", error);
    return { success: false, data: error };
  }
}

// Change Password API
export async function password_change(
  user_id: string,
  password: string,
  new_password: string
) {
  try {
    const response = await axios.post(`${user_url}change_password`, {
      user_id,
      password,
      new_password,
    });
    return { success: true, data: response.data };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Password change failed:", err.response?.data || err.message);
    return { success: false, data: error };
  }
}
