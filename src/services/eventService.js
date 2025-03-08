import axios from "axios";

const API_URL = "https://localhost:7166/api/Event";

const getAllEvents = () => {
  return axios.get(API_URL);
};
const getEventById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};
export default {
  getAllEvents,
  getEventById,
};
