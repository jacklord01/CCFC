# 📋 Organization Projects Registry

This document serves as your central "source of truth" for all digital assets and organizations under your management.

| Project Name | Built With | Domain | AWS Account | Service | Database | Cost Center |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Castlebar Celtic** | Next.js 15 | castlebarceltic.ie | Admin-Shared | Lightsail | SQLite | Castlebar Celtic FC |
| **WestConnect** | React / Vite | westconnect.ie | Admin-Shared | Amplify | - | WestConnect Ireland |
| **Migrant Support** | Next.js | support.westconnect.ie | Admin-Shared | Lightsail | Postgres | WestConnect Ireland |

## 🛡️ Infrastructure Conventions
- **Preferred Region**: `eu-west-1` (Ireland)
- **Deployment Strategy**: LTS (Long Term Support) Linux images for stability.
- **SSL**: Automatic rotation via Let's Encrypt / Certbot.
- **Backups**: Weekly automated snapshots (Lightsail) / Git-driven (Amplify).

---
> [!TIP]
> Keep this file updated whenever you provision a new service or domain to ensure you have a clear bird's-eye view of your operational costs.
