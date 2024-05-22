import * as fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import * as path from "path";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: "EMAIL_REQUIRED" }, { status: 400 });
    }

    const emailFilePath = path.join(process.cwd(), "./app/capture.txt");

    const data = fs.readFileSync(emailFilePath, "utf8");
    const emailExists = data.split("\n").includes(email);

    if (emailExists) {
      return NextResponse.json({ message: "SUBSCRIBER_EXISTS" }, { status: 409 });
    }

    fs.appendFileSync(emailFilePath, `${email}\n`);
    return NextResponse.json({ message: "EMAIL_ADDED" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: `Error: ${error.message}` }, { status: 500 });
  }
};

export const dynamic = "force-static";
