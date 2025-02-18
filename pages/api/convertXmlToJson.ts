import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { parseStringPromise } from "xml2js";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get("https://carrellobaby.com/uk_offers.xml");
    const xmlData = response.data;
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });
    res.status(200).json(jsonData);
  } catch (error) {
    console.error("Error converting XML to JSON:", error);
    res.status(500).json({ error: "Failed to convert XML to JSON" });
  }
}
