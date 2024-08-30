import { NextRequest, NextResponse } from "next/server";
import cors from "./middlewares/cors";

export async function middleware(request) {
  let response = await cors(request);
  return response;
}

export const config = {
  matcher: "/api/:path*",
};
