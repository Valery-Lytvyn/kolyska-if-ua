import axios from "axios";
import { getBaseUrl } from "../utils/getBaseUrl";

export const fetchAdminData = async () => {
  const baseUrl = getBaseUrl();
  try {
    const response = await axios.get(`${baseUrl}/api/adminData`, {
      responseType: "json",
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching admin data:", error);
    throw error; // Re-throw the error so it can be handled by the calling function
  }
};
