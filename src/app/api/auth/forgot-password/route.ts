import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      // Security best practice: Don't reveal if user exists
      return NextResponse.json({ success: true, message: "If an account exists, a reset link has been sent." });
    }

    // Create a 1-hour expiration token
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 3600000); 

    await prisma.passwordResetToken.create({
      data: {
        email,
        token,
        expiresAt
      }
    });

    // Send via Web3Forms (using the existing implementation pattern)
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;
    
    // We proxy the email via Web3Forms as the user has already configured it
    const emailRes = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        access_key: "62689ef0-039c-4861-ad81-3069176ed896", // Using provided key
        subject: "Castlebar Celtic - Secure Password Reset",
        from_name: "CCFC Security",
        message: `A password reset has been requested for your Castlebar Celtic admin account.
        
        Click the link below to securely reset your credentials. This link expires in 1 hour.
        
        ${resetUrl}
        
        If you did not request this, please contact the System Developer immediately.`,
        to_email: email
      })
    });

    return NextResponse.json({ success: true, message: "If an account exists, a reset link has been sent." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
