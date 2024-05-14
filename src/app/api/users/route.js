import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

// Function to handle POST requests for creating a new user
export async function POST(req, res) {
  try {
    const { firstName, lastName, address, city, email } = await req.json();
    const userId = await getLoggedInUser(req, res); // Get the logged-in user's ID
    const newUser = await db.userProfile.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        city,
        userId,
        organization: "Initial",
      },
    });

    console.log(newUser);
    return NextResponse.json({ user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Failed to create user" });
  }
}

// Function to handle GET requests for fetching all users
export async function GET(req, res) {
  try {
    const users = await db.userProfile.findMany(); // Fetch all users from the database
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Failed to fetch users" });
  }
}

// Function to handle PUT requests for updating a user's role to Admin
export async function PUT(req, res) {
  try {
    const { email,role } = await req.json();
    const updatedUser = await db.user.update({
      where: { email: email },
      data: {
        role: "ADMIN",
      },
    });

    console.log(updatedUser);
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Failed to update user role" });
  }
}

// Function to get the logged-in user from Kinde
async function getLoggedInUser(req, res) {
  try {
    const { getUser } = getKindeServerSession();
    const user = getUser();
    // If user is not logged in, return a default ID
    const id = user.length === 0 ? user.id : "1";
    return id;
  } catch (error) {
    console.error("Error fetching logged-in user:", error);
    throw error; // Rethrow the error to be caught in the calling function
  }
}
