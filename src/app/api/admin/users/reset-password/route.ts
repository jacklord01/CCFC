import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as any).role !== "DEV_ADMIN") {
    return NextResponse.json({ error: "Unauthorized access. Super Admin privileges required." }, { status: 401 });
  }

  try {
    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Enforce 10-char minimum 
    if (newPassword.length < 10) {
      return NextResponse.json({ error: "Policy violation: Password must be 10+ characters." }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { 
        password: hashedPassword,
        mustChangePassword: true // Force them to choose their own on next login
      }
    });

    // Audit Log
    await prisma.auditLog.create({
      data: {
        adminId: (session.user as any).id,
        adminName: session.user.name || "System Admin",
        action: "PASSWORD_RESET_MANUAL",
        targetType: "USER",
        targetId: userId,
        details: `Manually reset password for user ID: ${userId}`
      }
    });

    return NextResponse.json({ success: true, message: "Credential override successful." });
  } catch (error) {
    console.error("Manual Reset Error:", error);
    return NextResponse.json({ error: "System error during override." }, { status: 500 });
  }
}
