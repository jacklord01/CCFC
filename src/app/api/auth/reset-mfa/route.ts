import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { recordAuditAction } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if the current user is a Super Admin (DEV_ADMIN)
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });

    if (!currentUser || currentUser.role !== "DEV_ADMIN") {
      return NextResponse.json({ error: "Only Super Admins can reset MFA" }, { status: 403 });
    }

    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing User ID" }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!targetUser) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 });
    }

    // Reset MFA fields
    await prisma.user.update({
      where: { id: userId },
      data: {
        twoFactorEnabled: false,
        twoFactorSecret: null,
      }
    });

    // Record Audit
    await recordAuditAction(
      "RESET_MFA", 
      "USER", 
      userId, 
      `Super Admin ${currentUser.name} reset MFA for ${targetUser.name} (${targetUser.email})`
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("MFA Reset Error:", error);
    return NextResponse.json({ error: "Failed to reset MFA" }, { status: 500 });
  }
}
