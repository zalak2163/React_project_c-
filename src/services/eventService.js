import axios from "axios";

// Define the base API URL
const API_URL = "https://localhost:7166/api/Event";

// Function to get all events
const getAllEvents = () => {
  return axios.get(API_URL);
};

// Function to get an event by its ID
const getEventById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

// Function to create a new event
const createEvent = (eventData) => {
  return axios.post(API_URL, eventData);
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
};
