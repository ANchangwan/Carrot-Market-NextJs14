import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export async function middleware(req: NextRequest) {
  const {
    nextUrl: { pathname },
  } = req;
  const session = await getSession();
  
  if (pathname === "/profile") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
