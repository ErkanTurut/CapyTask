import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log(req.body);

  try {
    const t = await req.json();
    console.log(t);
    return NextResponse.json({ message: "success" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "failed" });
  }
}
