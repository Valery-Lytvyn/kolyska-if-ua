import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, RECAPTCHA_SECRET_KEY } =
  process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { message, recaptchaToken } = req.body;

  if (!recaptchaToken) {
    return res.status(400).json({ message: "Помилка reCAPTCHA" });
  }

  try {
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify`,
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: "Помилка reCAPTCHA" });
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await axios.post(telegramUrl, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
    });

    if (response.data.ok) {
      return res
        .status(200)
        .json({ success: true, message: "Message sent successfully!" });
    } else {
      return res.status(500).json({ message: "Failed to send message." });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error sending message:", error.response?.data || error);
    return res.status(500).json({ message: "Error sending message." });
  }
}
