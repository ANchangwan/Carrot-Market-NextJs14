import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound(); //session이 없을 경우에만 실행1
}

export default async function Profile() {
  const user = await getUser();
  const logout = async () => {
    "use server";
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>welcome! {user?.username}</h1>
      <form action={logout}>
        <button>Log out</button>
      </form>
    </div>
  );
}
