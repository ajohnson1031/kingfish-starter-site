import { connectDatabase, getDatabaseConnection } from "@/lib/utils/db";
import { NextResponse } from "next/server";

// Initialize the database connection
export const POST = async (req: Request) => {
  "use server";
  await connectDatabase();
  const { email } = await req.json();

  try {
    const connection = getDatabaseConnection();
    await connection.execute("INSERT INTO newsletter_distro (email) VALUES (?)", [email]);

    return NextResponse.json({ message: "Email added to newsletter list." }, { status: 200 });
  } catch (error: any) {
    console.error("Error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ message: "Duplicate entry" }, { status: 409 });
    }
    return NextResponse.json({ message: "Failed to add email to newsletter list." }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
