import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import * as speakeasy from "speakeasy";
import * as QRCode from "qrcode";
import { recordAuditAction } from "@/lib/audit";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Generate a new temporary secret for the setup process
  const secret = speakeasy.generateSecret({
    name: `Castlebar Celtic (${session.user?.email})`,
  });

  const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || "");

  return NextResponse.json({ 
    secret: secret.base32, 
    qrCode: qrCodeUrl 
  });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { token, secret } = await req.json();

  const verified = speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
  });

  if (verified) {
    await prisma.user.update({
      where: { email: session.user?.email as string },
      data: { 
        twoFactorSecret: secret,
        twoFactorEnabled: true 
      }
    });

    await recordAuditAction("ENABLE_2FA", "USER", (session.user as any).id, "Admin successfully enabled 2FA enforcement.");
    
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Invalid token. Please try again." }, { status: 400 });
}
