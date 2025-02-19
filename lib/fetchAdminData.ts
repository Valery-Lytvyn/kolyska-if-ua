import axios from "axios";

export const fetchAdminData = async () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://kolyska-if-ua.vercel.app/"; // Fallback for local dev

  const response = await axios.get(`${baseUrl}/api/adminData`, {
    responseType: "json",
  });
  return response.data;
};
