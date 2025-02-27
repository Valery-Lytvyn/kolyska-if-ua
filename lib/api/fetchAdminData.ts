import axios from "axios";

export const fetchAdminData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://kolyska.if.ua";
  // "http://localhost:3000"  // Fallback for local dev
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
