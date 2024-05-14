import Dashboard from "@/components/Dashboard";
import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = getUser();

  // If user is not logged in, redirect to the auth-callback page
  if (!user || !user.id) {
    redirect("/auth-callback?origin=dashboard");
    return null; // Make sure to return null or a loading indicator here
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  console.log(dbUser)

  // If the user is not in the database, redirect to the auth-callback page
  if (!dbUser) {
    redirect("/auth-callback?origin=dashboard");
    return null; // Make sure to return null or a loading indicator here
  }

  // Check user role ('admin' is stored in dbUser.role)
  if (dbUser.role == "ADMIN") {
    redirect("/admin-dashboard"); // Redirect to an unauthorized page or show a message
    return null; // Make sure to return null or a loading indicator here
  }

  // If the user is in the database and has admin role, render the dashboard
  return <Dashboard />;
};

export default Page;
