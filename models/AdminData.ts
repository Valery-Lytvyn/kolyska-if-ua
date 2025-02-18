import mongoose, { Schema, Document } from "mongoose";

export interface IAdminData extends Document {
  bestOffer: string[];
  newOffer: string[];
  bgImagePath: string[];
}

const AdminDataSchema: Schema = new Schema({
  bestOffer: { type: [String], required: true },
  newOffer: { type: [String], required: true },
  bgImagePath: { type: [String], required: true },
});

export default mongoose.models.AdminData ||
  mongoose.model<IAdminData>("AdminData", AdminDataSchema);
