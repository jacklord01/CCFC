import { PrismaClient } from '@prisma/client';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const prisma = new PrismaClient();
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');

async function migrate() {
  console.log('🚀 Starting data migration from SQLite to Supabase...');

  const db = new sqlite3.Database(dbPath);
  const all = promisify(db.all).bind(db);

  try {
    // 1. Migrate Users
    console.log('👥 Migrating Users...');
    const users: any[] = await all('SELECT * FROM User');
    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          id: user.id,
          email: user.email,
          password: user.password,
          role: user.role,
          name: user.name,
          mustChangePassword: user.mustChangePassword === 1,
          twoFactorEnabled: user.twoFactorEnabled === 1,
          twoFactorSecret: user.twoFactorSecret,
          isActive: user.isActive === 1,
          createdAt: new Date(user.createdAt),
        },
      });
    }

    // 2. Migrate Products
    console.log('📦 Migrating Merchandise...');
    const products: any[] = await all('SELECT * FROM Product');
    for (const product of products) {
      await prisma.product.upsert({
        where: { id: product.id },
        update: {},
        create: {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          imageUrl: product.imageUrl,
        },
      });
    }

    // 3. Migrate Volunteers
    console.log('🤝 Migrating Personnel...');
    const volunteers: any[] = await all('SELECT * FROM Volunteer');
    for (const volunteer of volunteers) {
      await prisma.volunteer.upsert({
        where: { id: volunteer.id },
        update: {},
        create: {
          id: volunteer.id,
          name: volunteer.name,
          role: volunteer.role,
          description: volunteer.description,
          imageUrl: volunteer.imageUrl,
          order: volunteer.order,
        },
      });
    }

    // 4. Migrate Audit Logs
    console.log('📜 Migrating Audit Logs...');
    const logs: any[] = await all('SELECT * FROM AuditLog');
    for (const log of logs) {
      await prisma.auditLog.create({
        data: {
          id: log.id,
          adminId: log.adminId,
          adminName: log.adminName,
          action: log.action,
          targetType: log.targetType,
          targetId: log.targetId,
          details: log.details,
          timestamp: new Date(log.timestamp),
        },
      });
    }

    // 5. Migrate Settings
    console.log('⚙️ Migrating Settings...');
    const settings: any[] = await all('SELECT * FROM Setting');
    for (const setting of settings) {
      await prisma.setting.upsert({
        where: { key: setting.key },
        update: {},
        create: {
          id: setting.id,
          key: setting.key,
          value: setting.value,
        },
      });
    }

    console.log('✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    db.close();
    await prisma.$disconnect();
  }
}

migrate();
 pharmacy: string;
