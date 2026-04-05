const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = "manny@sll.ie";
  const password = "MannyCeltic2026!"; // Requested by user
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(`[IDENTITY] Migrating super admin to: ${email}`);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: "DEV_ADMIN",
      name: "Manny",
      isActive: true,
      mustChangePassword: true, // Force change on first login
      twoFactorEnabled: false   // Enforce setup on first login
    },
    create: {
      email,
      password: hashedPassword,
      role: "DEV_ADMIN",
      name: "Manny",
      isActive: true,
      mustChangePassword: true,
      twoFactorEnabled: false
    }
  });

  console.log(`[SUCCESS] Super admin ${email} is now ready for initial login.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
