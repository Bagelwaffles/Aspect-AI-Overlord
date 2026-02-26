import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/dashboard");

  return (
    <main style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Logged in as {session.user?.email ?? session.user?.name}</p>
      <p><a href="/profile">Profile</a></p>
      <p><a href="/api/auth/signout?callbackUrl=/">Sign out</a></p>
    </main>
  );
}
