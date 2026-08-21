import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const res = await fetch("http://localhost:5000/api/auth/get-session", {
    headers: {
      Cookie: cookieStore.toString()
    },
    cache: "no-store"
  });
  const session = await res.json();

  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}