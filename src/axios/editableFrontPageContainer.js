import axios from "axios";
import { fullRestURL } from "../App";

export const sendPost = async ({mainText, sideText}) => {
  try {
    const response = await axios.post(`${fullRestURL()}/frontpage/`, {
        mainText,
        sideText,
      })
    console.log(response);
  } catch (error) { 
    console.log("error", error);
  }
};

export const getTest = async () => {
  try {
    const response = await axios.get(`${fullRestURL()}/frontpage`)
    return response.data
  } catch (error) {
    console.log(error)
  }
};