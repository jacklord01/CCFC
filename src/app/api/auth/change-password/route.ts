import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { recordAuditAction } from "@/lib/audit";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { password } = await req.json();

  if (!password || password.length < 8) {
    return NextResponse.json({ error: "Password too weak" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { email: session.user?.email as string },
    data: { 
      password: hashedPassword,
      mustChangePassword: false 
    }
  });

  await recordAuditAction("PASSWORD_CHANGE", "USER", (session.user as any).id, "Admin updated their mandatory temporary password.");

  return NextResponse.json({ success: true });
}
