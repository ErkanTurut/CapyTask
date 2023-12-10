import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { serverClient } from "@/trpc/serverClient";

// Javascript Object Signing and Encryption (JOSE)
// https://www.npmjs.com/package/jose

// Get secret
const secret = new Uint8Array(
  Buffer.from(process.env.JWT_SECRET_KEY || "", "base64")
);

export async function GET() {
  const token = cookies().get("token")?.value || null;
  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  // Verify the JWT signature
  let verifiedToken;
  try {
    verifiedToken = await jwtVerify(token, secret);
  } catch {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  // Return the User object if the token is valid
  return NextResponse.json(
    {
      isAuthenticated: true,
      user: verifiedToken,
    },
    { status: 200 }
  );
}
