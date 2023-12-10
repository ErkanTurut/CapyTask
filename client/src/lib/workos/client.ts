"server only";
import { WorkOS, User, Profile } from "@workos-inc/node";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

export default function workosClient() {
  const workos = new WorkOS(process.env.WORKOS_API_KEY);
  const clientId = process.env.WORKOS_CLIENT_ID;
  // Get secret
  const secret = new Uint8Array(
    Buffer.from(process.env.JWT_SECRET_KEY || "", "base64")
  );

  // export async function GET() {
  //   const token = cookies().get("token")?.value || null;
  //   if (!token) {
  //     return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  //   }

  //   // Verify the JWT signature
  //   let verifiedToken;
  //   try {
  //     verifiedToken = await jwtVerify(token, secret);
  //   } catch {
  //     return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  //   }

  //   // Return the User object if the token is valid
  //   return NextResponse.json(
  //     {
  //       isAuthenticated: true,
  //       user: verifiedToken,
  //     },
  //     { status: 200 }
  //   );
  // }
  const currentUser = async () => {
    const token = cookies().get("token")?.value || null;
    if (!token) {
      return null;
    }
    let verifiedToken;
    try {
      verifiedToken = await jwtVerify(token, secret);
    } catch {
      return null;
    }
    return verifiedToken.payload.user as User;
  };

  return { workos, clientId, currentUser };
}
