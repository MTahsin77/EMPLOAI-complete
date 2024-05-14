import { NextResponse } from "next/server";
import { db } from "@/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function PATCH(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userIds, organization } = await req.json();
  console.log("PATCH", userIds, organization);

  try {
    // Iterate over the array of user IDs and update each user profile with the provided organization
    const updatedUserProfiles = await Promise.all(
      userIds.map(async (userId) => {
        return await db.userProfile.update({
          where: { id: String(userId) },
          data: { organization },
        });
      })
    );

    return NextResponse.json({ userProfiles: updatedUserProfiles });
  } catch (error) {
    console.error("Error updating user profiles:", error);
    return NextResponse.json({ error: "Failed to update user profiles" });
  }
}
