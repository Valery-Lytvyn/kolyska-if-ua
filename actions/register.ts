"use server";
import { dbConnect } from "@/lib/db/dbConnect";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: {
  name: string;
  email: string;
  password: string;
}) => {
  const { name, email, password } = values;

  try {
    await dbConnect();
    const userFound = await User.findOne({ email });
    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    console.log(savedUser);
  } catch (e) {
    console.log(e);
  }
};
