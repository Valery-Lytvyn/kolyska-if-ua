import axios from "axios";

export const sendMessageToTelegram = async (message: string) => {
  const response = await axios.post("/api/sendMessage", { message });
  return response.data;
};
