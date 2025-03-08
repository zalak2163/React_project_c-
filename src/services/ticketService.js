import axios from "axios";

const Tic_URL = "https://localhost:7166/api/Ticket";

const getticket = (id) => {
  return axios.get(`${Tic_URL}/${id}`);
};
export default {
  getticket,
};
