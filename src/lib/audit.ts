import { prisma } from "./prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export async function recordAuditAction(action: string, targetType: string, targetId?: string, details?: string) {
  try {
    const session = await getServerSession(authOptions);
    
    // Fallback if no session (e.g. initial setup)
    const adminId = (session?.user as any)?.id || "SYSTEM";
    const adminName = session?.user?.name || "System Process";

    await prisma.auditLog.create({
      data: {
        adminId,
        adminName,
        action,
        targetType,
        targetId: targetId || null,
        details: details || null,
      }
    });
  } catch (error) {
    console.error("Audit Log Failure:", error);
    // Don't throw, we don't want audit failure to break the primary action
  }
}
