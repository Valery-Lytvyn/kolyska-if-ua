import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";

export async function DELETE() {
  try {
    // Connect to the database
    await dbConnect();

    // Get session to check if the user is logged in
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract email from session
    const email = session?.user?.email;

    // Delete user from database
    const deletedUser = await User.deleteOne({ email });

    if (!deletedUser.deletedCount) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
