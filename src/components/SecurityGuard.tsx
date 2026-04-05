import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function SecurityGuard({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/api/auth/signin");

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email as string }
  });

  if (user && (user.mustChangePassword || !user.twoFactorEnabled)) {
    redirect("/admin/setup-security");
  }

  return <>{children}</>;
}
