import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "DEV_ADMIN") {
    return NextResponse.json({ error: "Unauthorized. Super Admin access only." }, { status: 403 });
  }

  const { id } = await context.params;

  try {
    await prisma.user.delete({ where: { id } });
    
    // Log the action
    await prisma.auditLog.create({
      data: {
        adminId: (session.user as any).id,
        adminName: session.user?.name || "Unknown",
        action: "DELETE_ADMIN",
        targetType: "USER",
        targetId: id,
        details: `Deleted admin account for user ID: ${id}`
      }
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "DEV_ADMIN") {
    return NextResponse.json({ error: "Unauthorized. Super Admin access only." }, { status: 403 });
  }

  const { id } = await context.params;
  const { isActive, twoFactorEnabled } = await req.json();

  try {
    const updateData: any = {};
    if (typeof isActive === "boolean") updateData.isActive = isActive;
    
    // If resetting/deactivating MFA
    if (typeof twoFactorEnabled === "boolean" && twoFactorEnabled === false) {
      updateData.twoFactorEnabled = false;
      updateData.twoFactorSecret = null;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData
    });

    // Log the action
    await prisma.auditLog.create({
      data: {
        adminId: (session.user as any).id,
        adminName: session.user?.name || "Unknown",
        action: isActive === false ? "DEACTIVATE_ADMIN" : isActive === true ? "REACTIVATE_ADMIN" : "RESET_MFA",
        targetType: "USER",
        targetId: id,
        details: JSON.stringify(updateData)
      }
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
