import axios, { AxiosError } from "axios";
import { note_url } from "../hooks/constants"; // Assuming this is the base URL for your API

export async function get_notes_by_id(
  user_id: string,
  date_start?: Date,
  date_end?: Date,
  tags?: string[],
  title?: string
) {
  try {
    // Prepare the body data dynamically, leaving undefined out
    const body: Record<string, unknown> = {
      user_id,
      date_start: date_start ? date_start.toISOString() : undefined,
      date_end: date_end ? date_end.toISOString() : undefined,
      tags: tags || [],
      title: title || undefined,
    };

    // Remove any undefined values from the body to prevent sending them in the request
    Object.keys(body).forEach((key) => {
      if (body[key] === undefined) {
        delete body[key];
      }
    });

    // Make the POST request
    const response = await axios.post(
      `${note_url}list`,
      body,
      { withCredentials: true } // Ensures cookies are included
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error("Failed to fetch notes.");
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching notes:", err.response?.data || err.message);
    return { success: false, data: err.response?.data || err.message };
  }
}

export async function get_note(note_id: string) {
  try {
    const response = await axios.get(`${note_url}show`, {
      params: { note_id }, // Pass note_id as a query parameter
      withCredentials: true,
    });

    return { success: true, data: response.data };
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error fetching note:", err.response?.data || err.message);
    return { success: false, data: err.response?.data || err.message };
  }
}

export async function update_note(
  note_id: string,
  tags?: string[],
  title?: string,
  content?: string
) {
  try {
    const body: Record<string, unknown> = {
      note_id,
      tags: tags || [],
      title: title || undefined,
      content: content || undefined,
    };

    Object.keys(body).forEach((key) => {
      if (body[key] === undefined) {
        delete body[key];
      }
    });

    const response = await axios.post(`${note_url}update`, body, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error("Failed to update note.");
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error update note:", err.response?.data || err.message);
    return { success: false, data: err.response?.data || err.message };
  }
}

export async function save_note(
  user_id: string,
  title?: string,
  content?: string,
  tags?: string[]
) {
  try {
    const body: Record<string, unknown> = {
      user_id,
      title: title || undefined,
      content: content || undefined,
      tags: tags || undefined,
    };

    Object.keys(body).forEach((key) => {
      if (body[key] === undefined) {
        delete body[key];
      }
    });

    const response = await axios.post(
      `${note_url}create`,
      body,
      { withCredentials: true } // Ensures cookies are included
    );

    if (response.status === 200) {
      return { success: true, data: response.data };
    } else {
      throw new Error("Failed to create note.");
    }
  } catch (error) {
    const err = error as AxiosError;
    console.error("Error create note:", err.response?.data || err.message);
    return { success: false, data: err.response?.data || err.message };
  }
}
