import axios from "axios";

export const fetchCatalogData = async () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_URL || "https://kolyska-if-ua.vercel.app"; // Fallback for local dev

  const response = await axios.get(`${baseUrl}/api/convertXmlToJson`, {
    responseType: "json",
  });

  return response.data;
};
