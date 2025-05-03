import axios from "axios";

import apiUrl from "./const.json";
const apiUri = "tasks";

export const createTask = async (parentId: string) => {
  try {
    const response = await axios.post(`${apiUrl}/${apiUri}/`, { parentId });
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const getTask = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${apiUri}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting task:", error);
    throw error;
  }
};

export const getAllTasks = async (parentId: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${apiUri}/`, {
      params: { parentId },
    });
    return response.data;
  } catch (error) {
    console.error("Error getting all tasks:", error);
    throw error;
  }
};

export const deleteTaskById = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${apiUri}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
