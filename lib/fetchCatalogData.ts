import axios from "axios";

export const fetchCatalogData = async () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"; // Fallback for local dev

  const response = await axios.get(`${baseUrl}/api/convertXmlToJson`, {
    responseType: "json",
  });

  return response.data;
};
