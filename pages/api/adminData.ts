import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import AdminData from "@/models/AdminData";
import { dbConnect } from "@/lib/dbConnect";

// const MONGODB_URI = process.env.MONGODB_URI || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  try {
    // await mongoose.connect(MONGODB_URI);
    await dbConnect();
    console.log("Connected to MongoDB");

    if (req.method === "GET") {
      const data = await AdminData.findOne().lean();
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
  } catch (error) {
    console.error("Error in API handler:", error);
    return res.status(500).json({ message: "Internal server error" });
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}
