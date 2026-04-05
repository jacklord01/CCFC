import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { recordAuditAction } from "@/lib/audit";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, role } = data;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Auto-generate a high-entropy random password
    const rawPassword = Math.random().toString(36).slice(-8) + "!" + Math.floor(Math.random() * 100);
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || "CLUB_ADMIN",
        mustChangePassword: true, // Mandatory change at logon
      }
    });

    // Record Audit
    await recordAuditAction("CREATE_USER", "USER", user.id, `Invited ${name} (${role}). Generated Temporary Password: ${rawPassword}`);

    return NextResponse.json({ success: true, id: user.id, tempPassword: rawPassword });

    // Record Audit
    await recordAuditAction("CREATE_USER", "USER", user.id, `Invited ${name} (${role}) to the admin team.`);

    return NextResponse.json({ success: true, id: user.id });
  } catch (error) {
    console.error("Invitation error:", error);
    return NextResponse.json({ error: "Failed to invite user" }, { status: 500 });
  }
}
