import axios from 'axios';

const API_URL = 'http://localhost:12000/api'; // Replace with your API URL

// User signup
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// User signin
export const signin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a session
export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(`${API_URL}/sessions`, sessionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Read all sessions
export const getSessions = async () => {
  try {
    const response = await axios.get(`${API_URL}/sessions/all`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Read a session by ID
export const getSessionById = async (sessionId) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/get/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getLeaderboard = async () => {
  try {
    const response = await axios.get(`${API_URL}/leaderboard`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a session
export const updateSession = async (sessionId, sessionData) => {
  try {
    const response = await axios.put(`${API_URL}/sessions/${sessionId}`, sessionData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a session
export const deleteSession = async (sessionId) => {
  try {
    const response = await axios.delete(`${API_URL}/sessions/${sessionId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const completeClass = async (sessionId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/classes/complete`, { sessionId, userId });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

// Create a profile
export const createProfile = async (profileData) => {
  try {
    const response = await axios.post(`${API_URL}/profiles`, profileData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Read all profiles
export const getAllProfiles = async () => {
  try {
    const response = await axios.get(`${API_URL}/profiles`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Read a profile by ID
export const getProfileById = async (profileId) => {
  try {
    const response = await axios.get(`${API_URL}/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update a profile
export const updateProfile = async (profileId, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/profiles/${profileId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a profile
export const deleteProfile = async (profileId) => {
  try {
    const response = await axios.delete(`${API_URL}/profiles/${profileId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};