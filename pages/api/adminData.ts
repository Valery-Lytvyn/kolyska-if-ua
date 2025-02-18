import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import AdminData from "@/models/AdminData";

const MONGODB_URI = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(MONGODB_URI);

  if (req.method === "GET") {
    const data = await AdminData.findOne();
    return res
      .status(200)
      .json(data || { bestOffer: [], newOffer: [], bgImagePath: [] });
  }

  if (req.method === "POST") {
    const { bestOffer, newOffer, bgImagePath } = req.body;
    let data = await AdminData.findOne();

    if (!data) {
      data = new AdminData({ bestOffer, newOffer, bgImagePath });
    } else {
      data.bestOffer = bestOffer;
      data.newOffer = newOffer;
      data.bgImagePath = bgImagePath;
    }

    await data.save();
    return res.status(200).json({ message: "Data updated successfully" });
  }

  return res.status(405).json({ message: "Method not allowed" });
}
