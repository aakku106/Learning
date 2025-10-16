import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request) {
  try {
    const { userName, password } = await request.json();

    // Read the db.json file
    const filePath = path.join(process.cwd(), "db.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // Find the user with matching username and password
    const user = data.users.find(
      (u) => u.userName === userName && u.password === password
    );

    if (user) {
      // Return user data without password
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          name: user.name,
          age: user.age,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 }
    );
  }
}
