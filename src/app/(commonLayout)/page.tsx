import { userService } from "@/services/user.service"

export default async function Home() {
  const { data, error } = await userService.getSession();
  console.log({ data, error });
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}