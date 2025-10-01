// src/api.js
import axios from "axios";

// Axios instance
const api = axios.create({
  baseURL: "https://excel-analytics-backend-5umy.onrender.com/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ----- CRUD Methods -----

export const getUsers = async () => {
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const response = await api.post("/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await api.put(`/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user ${id}:`, error);
    throw error;
  }
};

// ----- Admin / Role-Based Methods -----

// Promote user to admin
export const promoteUser = async (id) => {
  try {
    const response = await api.put(`/admin/users/${id}/promote`);
    return response.data;
  } catch (error) {
    console.error(`Error promoting user ${id}:`, error);
    throw error;
  }
};

// Demote admin to regular user
export const demoteUser = async (id) => {
  try {
    const response = await api.put(`/admin/users/${id}/demote`);
    return response.data;
  } catch (error) {
    console.error(`Error demoting user ${id}:`, error);
    throw error;
  }
};

// Get all users with admin-only access
export const getAdminUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching admin users:", error);
    throw error;
  }
};

export default api;
