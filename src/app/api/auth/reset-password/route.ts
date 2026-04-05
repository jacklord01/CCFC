import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Enforce 10-character minimum password policy (per user request)
    if (password.length < 10) {
      return NextResponse.json({ error: "Password must be at least 10 characters long" }, { status: 400 });
    }

    // 2. Verify token
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token }
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    // 3. Update Password
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { 
        password: hashedPassword,
        mustChangePassword: false // Clear the flag if any
      }
    });

    // 4. Securely remove the token after use
    await prisma.passwordResetToken.delete({
      where: { token }
    });

    return NextResponse.json({ success: true, message: "Credential alignment successful. You may now log in." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
  }
}
