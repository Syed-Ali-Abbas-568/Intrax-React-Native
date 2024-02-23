
import axios from "axios";

const URL = 'http://192.168.100.75:8001';

export const loginCaptain = async (email, password) => {
    try {
  
      const response = await axios.get(`${URL}/driver/login`, {
        params: {
          email: email,
          password: password
        },
        withCredentials: true
      });
      console.log(response.data)
      return response.data;  // Assuming the server responds with data
    } catch (error) {
      //console.error("Error while calling findUserByPhoneNumber API ", error.message);
      return "Not Found"
    }
  };