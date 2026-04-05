"use client";

import { useState, useEffect } from "react";
import { 
  Clipboard, ShieldCheck, UserPlus, ShieldAlert, RefreshCcw, 
  User, Trash2, Ban, CheckCircle2, Info, Lock, Eye, Edit3, Camera 
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "", role: "CLUB_ADMIN" });
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [session]);

  const fetchData = async () => {
    try {
      const uRes = await fetch("/api/auth/users");
      const uData = await uRes.json();
      setUsers(uData);

      const meRes = await fetch("/api/admin/me");
      if (meRes.ok) {
        const meData = await meRes.json();
        setCurrentUserRole(meData.role);
      }

      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    setTempPassword(null);

    const res = await fetch("/api/auth/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAdmin)
    });

    const data = await res.json();
    if (res.ok) {
      setTempPassword(data.tempPassword);
      setNewAdmin({ ...newAdmin, name: "", email: "" });
      fetchData();
    }
    setInviting(false);
  };

  const handleUserAction = async (userId: string, action: "DELETE" | "SUSPEND" | "ACTIVATE" | "TOGGLE_MFA", currentVal?: any) => {
    let confirmMsg = "";
    if (action === "DELETE") confirmMsg = "Are you sure you want to PERMANENTLY remove this admin? This action will be logged.";
    if (action === "SUSPEND") confirmMsg = "Suspend this user? They will be immediately blocked from all admin areas.";
    if (action === "ACTIVATE") confirmMsg = "Reactivate this admin account?";
    if (action === "TOGGLE_MFA") confirmMsg = currentVal ? "Deactivate MFA for this user? (Keep secret safe but turn off requirement)" : "Reactivate MFA requirement for this user?";

    if (!confirm(confirmMsg)) return;

    try {
      let res;
      if (action === "DELETE") {
        res = await fetch(`/api/admin/users/${userId}`, { method: "DELETE" });
      } else {
        const body: any = {};
        if (action === "SUSPEND") body.isActive = false;
        if (action === "ACTIVATE") body.isActive = true;
        if (action === "TOGGLE_MFA") body.twoFactorEnabled = !currentVal;
        
        res = await fetch(`/api/admin/users/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body)
        });
      }

      if (res.ok) {
        fetchData();
      } else {
        alert("Action failed. Check permissions.");
      }
    } catch (err) {
      alert("Network error occurred.");
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>Loading security personnel data...</div>;

  const isSuperAdmin = currentUserRole === "DEV_ADMIN";

  const getPermissions = (role: string) => {
    if (role === "DEV_ADMIN") return "Full System Access, User Management, Log Auditing, Security Overrides";
    if (role === "PRO") return "Content Creation, News/Blog Management, Gallery Moderation, Messages";
    return "Inventory Management, Ticket Sales, Volunteer Overviews";
  };

  return (
    <div style={{ maxWidth: "1200px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "900", color: "#0B111D", marginBottom: "8px" }}>Team & Permissions</h1>
        <p style={{ color: "#6b7280" }}>Manage administrative access and mandatory security enforcement.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "40px", alignItems: "start" }}>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          
          {/* Active Personnel List */}
          <section style={{ backgroundColor: "white", padding: "32px", borderRadius: "16px", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
               <ShieldCheck size={24} color="#008236" />
               <h2 style={{ fontSize: "20px", fontWeight: "800" }}>Active Personnel</h2>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "#f3f4f6" }}>
              {users.map((u) => (
                <div key={u.id} style={{ 
                  backgroundColor: u.isActive === false ? "#f9fafb" : "white", 
                  padding: "24px", 
                  display: "flex", 
                  flexDirection: "column",
                  gap: "16px",
                  transition: "background-color 0.2s",
                  borderLeft: u.isActive === false ? "4px solid #ef4444" : "4px solid transparent"
                }}>
                   <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div style={{ 
                          width: "48px", height: "48px", borderRadius: "14px", 
                          backgroundColor: u.isActive === false ? "#fee2e2" : "#f0fdf4", 
                          display: "flex", alignItems: "center", justifyContent: "center", 
                          color: u.isActive === false ? "#ef4444" : "#008236" 
                        }}>
                          <User size={24} />
                        </div>
                        <div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontWeight: "800", fontSize: "16px", color: u.isActive === false ? "#6b7280" : "#111827" }}>{u.name}</span>
                            {u.isActive === false && <span style={{ fontSize: "10px", fontWeight: "900", color: "#ef4444", backgroundColor: "#fee2e2", padding: "2px 6px", borderRadius: "4px" }}>SUSPENDED</span>}
                          </div>
                          <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "2px" }}>{u.email}</div>
                        </div>
                      </div>

                      <div style={{ display: "flex", gap: "8px" }}>
                        {isSuperAdmin && (
                          <>
                            {u.isActive !== false ? (
                              <button onClick={() => handleUserAction(u.id, "SUSPEND")} title="Suspend Account" style={iconBtn}><Ban size={16} color="#ef4444" /></button>
                            ) : (
                              <button onClick={() => handleUserAction(u.id, "ACTIVATE")} title="Reactivate Account" style={iconBtn}><CheckCircle2 size={16} color="#008236" /></button>
                            )}
                            <button onClick={() => handleUserAction(u.id, "TOGGLE_MFA", u.twoFactorEnabled)} title="Deactivate/Reactivate MFA" style={iconBtn}><RefreshCcw size={16} color="#4b5563" /></button>
                            <button onClick={() => handleUserAction(u.id, "DELETE")} title="Remove User Permanently" style={iconBtn}><Trash2 size={16} color="#ef4444" /></button>
                          </>
                        )}
                      </div>
                   </div>

                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", padding: "16px", backgroundColor: "#f9fafb", borderRadius: "12px" }}>
                      <div>
                        <div style={{ fontSize: "10px", fontWeight: "900", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>Primary Role</div>
                        <div style={{ fontSize: "13px", fontWeight: "700", color: "#374151" }}>{u.role}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: "10px", fontWeight: "900", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>Security Status</div>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          {u.twoFactorEnabled ? (
                            <ShieldCheck size={14} color="#008236" />
                          ) : (
                            <ShieldAlert size={14} color="#ef4444" />
                          )}
                          <span style={{ fontSize: "13px", fontWeight: "700", color: u.twoFactorEnabled ? "#008236" : "#ef4444" }}>
                            MFA {u.twoFactorEnabled ? "Active" : "Not Set Up"}
                          </span>
                        </div>
                      </div>
                      <div style={{ gridColumn: "span 2" }}>
                        <div style={{ fontSize: "10px", fontWeight: "900", color: "#9ca3af", textTransform: "uppercase", marginBottom: "4px" }}>Permissions List</div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>{getPermissions(u.role)}</div>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Permissions Overview */}
          <section style={{ backgroundColor: "#0B111D", color: "white", padding: "32px", borderRadius: "16px" }}>
             <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <Info size={20} color="#008236" />
                <h3 style={{ fontSize: "18px", fontWeight: "700" }}>Role Capability Matrix</h3>
             </div>
             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={permRow}><Eye size={14} /> <span>All roles can view live metrics and system health.</span></div>
                <div style={permRow}><Edit3 size={14} /> <span>PRO can edit all public content (News, Galleries, Staff).</span></div>
                <div style={permRow}><Camera size={14} /> <span>All Admins must use the Image Cropper for high-quality visuals.</span></div>
                <div style={permRow}><Lock size={14} /> <span>Only Super Admins (DEV_ADMIN) can manage users & security.</span></div>
             </div>
          </section>
        </div>

        {/* Right: Invite Form */}
        <aside>
          <div style={{ backgroundColor: "#0B111D", color: "white", padding: "32px", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
               <UserPlus size={24} color="#008236" />
               <h2 style={{ fontSize: "20px", fontWeight: "800" }}>Invite New Admin</h2>
            </div>

            {tempPassword ? (
              <div style={{ backgroundColor: "rgba(255,255,255,0.05)", padding: "24px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <p style={{ fontSize: "14px", color: "#9ca3af", marginBottom: "16px" }}>Success! Provide this temporary password to the user manually:</p>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", backgroundColor: "white", color: "#0B111D", padding: "16px", borderRadius: "8px" }}>
                  <code style={{ flex: 1, fontWeight: "900", fontSize: "18px", letterSpacing: "1px" }}>{tempPassword}</code>
                  <button onClick={() => {
                    copyToClipboard(tempPassword);
                    alert("Copied!");
                  }} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer", color: "#008236", padding: "4px" }}>
                    <Clipboard size={20} />
                  </button>
                </div>
                <p style={{ fontSize: "12px", color: "#008236", marginTop: "16px", fontWeight: "700", lineHeight: "1.5" }}>
                  The user will be required to change this password and set up MFA upon their first logon.
                </p>
                <button onClick={() => setTempPassword(null)} style={{ marginTop: "24px", width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", background: "none", color: "white", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}>Invite Another User</button>
              </div>
            ) : (
              <form onSubmit={handleInvite} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                 <div>
                   <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase" }}>Full Name</label>
                   <input 
                     type="text" placeholder="e.g. Jake PRO" required 
                     value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                     style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", color: "white" }}
                   />
                 </div>
                 <div>
                   <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase" }}>Email Address</label>
                   <input 
                     type="email" placeholder="e.g. jake@castlebarceltic.ie" required 
                     value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                     style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.02)", color: "white" }}
                   />
                 </div>
                 <div>
                   <label style={{ display: "block", fontSize: "12px", color: "#9ca3af", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase" }}>Administrative Role</label>
                   <select 
                     value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                     style={{ width: "100%", padding: "14px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(0,0,0,0.2)", color: "white" }}
                   >
                     <option value="CLUB_ADMIN">Club Administrator</option>
                     <option value="PRO">PRO / Media Manager</option>
                     <option value="DEV_ADMIN">System Developer (Super Admin)</option>
                   </select>
                 </div>
                 <button type="submit" disabled={inviting} style={{ backgroundColor: "#008236", color: "white", padding: "16px", borderRadius: "8px", border: "none", fontWeight: "900", cursor: inviting ? "not-allowed" : "pointer", marginTop: "12px", boxShadow: "0 10px 20px rgba(0,130,54,0.2)" }}>
                   {inviting ? "Provisioning Account..." : "Provision Access"}
                 </button>
              </form>
            )}
          </div>
        </aside>

      </div>
    </div>
  );
}

const iconBtn = {
  width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", 
  borderRadius: "8px", border: "1px solid #e5e7eb", backgroundColor: "white", cursor: "pointer"
};

const permRow = {
  display: "flex", alignItems: "center", gap: "10px", fontSize: "13px", color: "rgba(255,255,255,0.7)"
};
