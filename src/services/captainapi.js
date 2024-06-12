
import axios from "axios";

const URL = 'http://192.168.0.112:8001';

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




export const getStationByID = async (stationID) => {

  const apiUrl = `${URL}/station/${stationID}`; // Replace with your actual API URL
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    // Handle errors for individual requests
    console.error(`Error fetching data for station ID ${stationID}:`, error);
  }
}




export const getStationsByID = async (stationList) => {
  const apiUrl = `${URL}/station/`; // Replace with your actual API URL
  const results = [];

  try {
    for (let i = 0; i < stationList.length; i++) {
      const stationId = stationList[i];

      try {
        const response = await axios.get(`${apiUrl}${stationId}`);
        results.push(response.data);
      } catch (error) {
        // Handle errors for individual requests
        console.error(`Error fetching data for station ID ${stationId}:`, error);
      }
    }

    // Return the collected results

    return results;

  } catch (error) {
    // Handle any other errors that occur
    console.error('Error while getting stations by ID', error);
    return 'No station found';
  }
};


export const updateBusLocation = async (id, coords, timeOfArrival, nextStation) => {
  try {
    const { latitude, longitude } = coords;
    const response = await axios.put(`${URL}/bus/${id}/location`, { latitude, longitude, timeOfArrival, nextStation });
    return response.data;  // Assuming the server responds with data
  } catch (error) {
    console.error('Error while updating bus location:', error);
    return 'Not Found';
  }
};






export const getAllBuses = async () => {
  try {
    const response = await axios.get(`${URL}/bus/view`);
    return response.data;
  } catch (error) {
    console.error('Error fetching buses:', error);
    throw error;
  }
};




export const getAllRoutes = async () => {

  try {
    const response = await axios.get(`${URL}/route/view`);
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }




}