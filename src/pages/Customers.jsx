import React, { useState } from "react";
import { T, fmt, uid } from "../theme";

export default function Customers({ customers, setCustomers, notify }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", balance: 0 });

  const add = () => {
    if (!form.name || !form.email) return notify("Fill required fields", T.red);
    setCustomers(prev => [...prev, { ...form, id: uid() }]);
    setForm({ name: "", email: "", phone: "", balance: 0 }); setShowForm(false); notify("Customer added!");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ color: T.muted }}>{customers.length} customers</div>
        <button onClick={() => setShowForm(o => !o)} style={{ padding: "10px 20px", background: T.accent, color: "#000", fontWeight: 700 }}>+ Add Customer</button>
      </div>

      {showForm && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Name *</label><input placeholder="Company name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Email *</label><input type="email" placeholder="billing@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Phone</label><input placeholder="+1 555-0000" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} /></div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button onClick={add} style={{ padding: "10px 24px", background: T.green, color: "#000", fontWeight: 700 }}>Save</button>
            <button onClick={() => setShowForm(false)} style={{ padding: "10px 24px", background: T.card, color: T.muted, border: `1px solid ${T.border}`, fontWeight: 600 }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
        {customers.map(c => (
          <div key={c.id} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: `linear-gradient(135deg,${T.accent},${T.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, flexShrink: 0 }}>
                {c.name ? c.name[0] : "?"}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{c.name}</div>
                <div style={{ fontSize: 13, color: T.muted }}>{c.email}</div>
                <div style={{ fontSize: 13, color: T.muted }}>{c.phone}</div>
              </div>
              {c.balance > 0 && <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: T.muted }}>Outstanding</div>
                <div style={{ fontWeight: 700, color: T.red, fontFamily: T.mono }}>{fmt(c.balance)}</div>
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
