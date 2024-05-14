import { NextResponse } from "next/server";
import { db } from "@/db";

export const dynamic = "force-dynamic"; // defaults to auto

export async function PUT(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { action, organizationName, userIds } = await req.json(); // Change organization to organizationName
  console.log("PUT", action, organizationName, userIds);

  try {
    if (action === "updateOrganization") {
      // Find or create the organization by name
      let organization = await db.organization.findUnique({
        where: { name: organizationName },
      });

      if (!organization) {
        organization = await db.organization.create({
          data: { name: organizationName },
        });
      }

      // Update users with the provided organization
      const updatedUserProfiles = await Promise.all(
        userIds.map(async (userId) => {
          return await db.userProfile.update({
            where: { id: String(userId) },
            data: { organization: { connect: { id: organization.id } } },
          });
        })
      );

      return NextResponse.json({
        organization: { id: organization.id, name: organizationName }, // Send organization name along with ID
        userProfiles: updatedUserProfiles,
      });
    } else {
      return res.status(400).json({ error: "Invalid action" });
    }
  } catch (error) {
    console.error("Error updating organization and user profiles:", error);
    return NextResponse.json({
      error: "Failed to update organization and user profiles",
    });
  }
}
