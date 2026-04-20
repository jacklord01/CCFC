# PR 1 Plan: Admin/Auth Hardening

This branch was created to scope the first auth hardening pass for CCFC.

Planned changes:
- enrich NextAuth JWT/session with role, isActive, mustChangePassword, twoFactorEnabled
- harden middleware so /admin is not token-only
- keep mustChangePassword true until 2FA verification succeeds
- tighten /admin/setup-security gating
- keep bootstrap target aligned to manny@sll.ie in any setup script

Notes:
- this branch currently contains the planning artifact only
- implementation patches should follow after validating the remaining auth and setup dependencies
