import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function OrdersDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  // Fetch all orders natively from the Prisma Commerce DB
  const orders = await prisma.order.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div>
      <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>Order & Invoice Tracking</h1>
      
      <div style={{ backgroundColor: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" }}>
         <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
            <thead style={{ backgroundColor: "#F9FAFB", borderBottom: "1px solid #E5E7EB" }}>
               <tr>
                  <th style={{ padding: "16px", fontWeight: "600", color: "#4B5563" }}>Order ID</th>
                  <th style={{ padding: "16px", fontWeight: "600", color: "#4B5563" }}>Customer</th>
                  <th style={{ padding: "16px", fontWeight: "600", color: "#4B5563" }}>Contact</th>
                  <th style={{ padding: "16px", fontWeight: "600", color: "#4B5563" }}>Item</th>
                  <th style={{ padding: "16px", fontWeight: "600", color: "#4B5563" }}>Status</th>
                  <th style={{ padding: "16px", fontWeight: "600", color: "#4B5563" }}>Actions</th>
               </tr>
            </thead>
            <tbody>
               {orders.length === 0 ? (
                  <tr>
                     <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "#6B7280" }}>
                        No orders recorded yet.
                     </td>
                  </tr>
               ) : (
                  orders.map((order: any) => (
                     <tr key={order.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                        <td style={{ padding: "16px", color: "#111827", fontFamily: "monospace" }}>{order.id.slice(0,8)}</td>
                        <td style={{ padding: "16px", color: "#111827" }}>{order.buyerName}</td>
                        <td style={{ padding: "16px", color: "#4B5563" }}>{order.buyerContact}</td>
                        <td style={{ padding: "16px", color: "#111827" }}>{order.product.name} (EUR {order.product.price})</td>
                        <td style={{ padding: "16px" }}>
                           <span style={{ 
                               backgroundColor: order.paymentStatus === 'PAID' ? "#DCFCE7" : "#FEF3C7", 
                               color: order.paymentStatus === 'PAID' ? "#166534" : "#92400E",
                               padding: "4px 8px", borderRadius: "10px", fontSize: "12px", fontWeight: "bold"
                           }}>
                              {order.paymentStatus}
                           </span>
                        </td>
                        <td style={{ padding: "16px", display: "flex", gap: "10px" }}>
                           <button style={{ padding: "6px 12px", backgroundColor: "white", border: "1px solid #D1D5DB", borderRadius: "4px", fontSize: "14px", cursor: "pointer", color: "#374151" }}>View</button>
                           {!order.invoiceSent && (
                              <button style={{ padding: "6px 12px", backgroundColor: "var(--primary-color)", border: "none", color: "white", borderRadius: "4px", fontSize: "14px", cursor: "pointer" }}>Send Invoice</button>
                           )}
                        </td>
                     </tr>
                  ))
               )}
            </tbody>
         </table>
      </div>
    </div>
  );
}
