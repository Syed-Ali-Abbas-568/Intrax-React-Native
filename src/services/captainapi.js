
import axios from "axios";

const URL = 'http://192.168.100.27:8001';

export const loginCaptain = async (email, password) => {
  try {

    const response = await axios.get(`${URL}/driver/login`, {
      params: {
        email: email,
        password: password
      },
      withCredentials: true
    });
    //console.log(response.data)
    return response.data;  // Assuming the server responds with data
  } catch (error) {
    //console.error("Error while calling findUserByPhoneNumber API ", error.message);
    return "Not Found"
  }
};




export const getAssignmentByID = async (id) => {
  try {

    const response = await axios.get(`${URL}/assignment/${id}`);
    //console.log(response.data)
    return response.data;  // Assuming the server responds with data
  } catch (error) {
    //console.error("Error while calling findUserByPhoneNumber API ", error.message);
    return "Not Found"
  }
};



export const getAllStations = async () => {
  try {
    const response = await axios.get(`${URL}/station/view`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stations:', error);
    throw error;
  }
};



export const updateBusLocation = async (id, coords) => {
  try {
    const { latitude, longitude } = coords;
    const response = await axios.put(`${URL}/bus/${id}/location`, { latitude, longitude });
    return response.data;  // Assuming the server responds with data
  } catch (error) {
    console.error('Error while updating bus location:', error);
    return 'Not Found';
  }
};