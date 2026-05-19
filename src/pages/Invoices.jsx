import React, { useState } from "react";
import { T, fmt, fmtDate, DB } from "../theme";
import { StatusBadge } from "../components/Shared";

export default function Invoices({ invoices, setInvoices, customers, notify }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ client_name: "", amount: "", date: new Date().toISOString().split("T")[0], due_date: "", status: "Draft" });

  const add = async () => {
    if (!form.client_name || !form.amount || !form.due_date) return notify("Fill required fields", T.red);
    try {
      const rawInv = { ...form, amount: parseFloat(form.amount) };
      const savedInv = await DB.insert("invoices", rawInv);
      setInvoices(prev => [...prev, savedInv]);
      setShowForm(false);
      notify("Invoice generated successfully!");
    } catch (e) {
      notify(e.message, T.red);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const updated = await DB.update("invoices", id, { status: newStatus });
      setInvoices(prev => prev.map(i => i.id === id ? updated : i));
      notify(`Status synced to: ${newStatus}`);
    } catch (e) {
      notify(e.message, T.red);
    }
  };

  const statusColors = { Paid: T.green, Pending: T.yellow, Overdue: T.red, Draft: T.muted };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16 }}>
          {[["Draft", T.muted], ["Pending", T.yellow], ["Paid", T.green], ["Overdue", T.red]].map(([s, c]) => (
            <div key={s} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{invoices.filter(i => i.status === s).length}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{s}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowForm(o => !o)} style={{ padding: "10px 20px", background: T.accent, color: "#000", fontWeight: 700 }}>+ New Invoice</button>
      </div>

      {showForm && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>New Invoice</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Client</label>
              <select value={form.client_name} onChange={e => setForm({ ...form, client_name: e.target.value })}>
                <option value="">Select client</option>
                {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Amount ($)</label><input type="number" placeholder="0.00" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} /></div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Invoice Date</label><input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Due Date</label><input type="date" value={form.due_date} onChange={e => setForm({ ...form, due_date: e.target.value })} /></div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {["Draft", "Pending", "Paid", "Overdue"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button onClick={add} style={{ padding: "10px 24px", background: T.green, color: "#000", fontWeight: 700 }}>Create Invoice</button>
            <button onClick={() => setShowForm(false)} style={{ padding: "10px 24px", background: T.card, color: T.muted, border: `1px solid ${T.border}`, fontWeight: 600 }}>Cancel</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 12 }}>
        {invoices.map(inv => (
          <div key={inv.id} className="hover-row" style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${statusColors[inv.status]}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>◫</div>
              <div>
                <div style={{ fontWeight: 700 }}>{inv.client_name}</div>
                <div style={{ fontSize: 12, color: T.muted }}>Issued {fmtDate(inv.date)} · Due {fmtDate(inv.due_date)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <div style={{ fontWeight: 800, fontSize: 18, fontFamily: T.mono }}>{fmt(inv.amount)}</div>
              <StatusBadge status={inv.status} />
              <select value={inv.status} onChange={e => updateStatus(inv.id, e.target.value)} style={{ width: 120, fontSize: 12, padding: "6px 10px" }}>
                {["Draft", "Pending", "Paid", "Overdue"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
