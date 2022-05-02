import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8086/api/test/";

const API_URL1 = "http://localhost:8081/flights/";
const addFlight = (data) => {
  return axios.post(API_URL1 + "addFlights", data,
          { headers: authHeader() }).then((response) => {
        if(response){
          console.log("Inside user service");
          console.log(response.data);
          console.log("Inside user service");
        }
        else{
          console.log("hiii")
        }
      return response.data;
    });
}

const updateFlight = (data,id) => {
  return axios.put(API_URL1 + "updateFlight/" + id, data,
          { headers: authHeader() }).then((response) => {
        if(response){
          console.log("Inside user service");
          console.log(response.data);
          console.log("Inside user service");
        }
        else{
          console.log("hiii")
        }
      return response.data;
    });
}

const deleteFlight = (id) => {
  return axios.delete(API_URL1 + "deleteFlights/" + id,
          { headers: authHeader() }).then((response) => {
        if(response){
          console.log("Inside user service");
          console.log(response.data);
          console.log("Inside user service");
        }
        else{
          console.log("hiii")
        }
      return response.data;
    });
}

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  addFlight,
  updateFlight,
  deleteFlight,
};

export default UserService;
