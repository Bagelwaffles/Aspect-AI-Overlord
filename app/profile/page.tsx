import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin?callbackUrl=/profile");

  return (
    <main style={{ padding: 24 }}>
      <h1>Profile</h1>
      <pre style={{ padding: 12, overflowX: "auto" }}>
        {JSON.stringify(session, null, 2)}
      </pre>
      <p><a href="/dashboard">Back to Dashboard</a></p>
    </main>
  );
}
