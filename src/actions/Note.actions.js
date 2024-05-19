import axios from "axios";

const PORT = 4000; 

const API_URL = `http://localhost:${PORT}`;

const baseApiResponse = (data, isSuccess) => {
  return {
    success: isSuccess,
    data: data || null,
  };
};

export const fetchNotesWithAxios = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`);
    return baseApiResponse(response.data.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const getNoteDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/note/${id}`);
    return baseApiResponse(response.data.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const addNote = async (title, body) => {
  try {
    const response = await axios.post(`${API_URL}/addNote`, { title, body });
    return baseApiResponse(response.data.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const updateNote = async (id, title, body) => {
  try {
    const response = await axios.put(`${API_URL}/updateNote/${id}`, { title, body });
    return baseApiResponse(response.data.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteNote/${id}`);
    return baseApiResponse(response.data.data, true);
  } catch (error) {
    console.error(error);
    return baseApiResponse(null, false);
  }
};