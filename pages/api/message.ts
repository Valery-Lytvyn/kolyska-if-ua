import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { message } = req.body;
    const telegramUrl = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN}/sendMessage`;

    try {
      const response = await axios.post(telegramUrl, {
        chat_id: process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID,
        text: message,
      });
      if (response.data.ok) {
        return res
          .status(200)
          .json({ success: true, message: "Message sent successfully!" });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Failed to send message." });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Error sending message to Telegram:",
        error.response?.data || error
      );
      return res
        .status(500)
        .json({ success: false, message: "Error sending message." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
