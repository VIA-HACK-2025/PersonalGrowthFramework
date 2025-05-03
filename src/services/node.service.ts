import axios from "axios";

import apiUrl from "./const.json";
const apiUri = "nodes";

export const createNode = async (parentId?: string, info?: { title?: string; icon?: string }) => {
  try {
    const response = await axios.post(`${apiUrl}/${apiUri}/`, { parentId, info });
    return response.data;
  } catch (error) {
    console.error("Error creating node:", error);
    throw error;
  }
};

export const getNode = async (id: string) => {
  try {
    const response = await axios.get(`${apiUrl}/${apiUri}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting node:", error);
    throw error;
  }
};

export const getAllNodes = async () => {
  try {
    const response = await axios.get(`${apiUrl}/${apiUri}`);
    return response.data;
  } catch (error) {
    console.error("Error getting all nodes:", error);
    throw error;
  }
};

export const deleteNodeById = async (id: string) => {
  try {
    const response = await axios.delete(`${apiUrl}/${apiUri}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting node:", error);
    throw error;
  }
};

