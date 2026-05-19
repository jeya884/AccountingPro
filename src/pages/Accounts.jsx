import React, { useState } from "react";
import { T, fmt, DB } from "../theme";

export default function Accounts({ accounts, setAccounts, notify }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Asset", balance: "" });
  const types = ["Asset", "Liability", "Equity", "Income", "Expense"];
  const typeColors = { Asset: T.green, Liability: T.red, Equity: T.purple, Income: T.accent, Expense: T.yellow };

  const add = async () => {
    if (!form.name) return notify("Enter account name", T.red);
    try {
      const rawAcc = { ...form, balance: parseFloat(form.balance) || 0 };
      const savedAcc = await DB.insert("accounts", rawAcc);
      setAccounts(prev => [...prev, savedAcc]);
      setForm({ name: "", type: "Asset", balance: "" }); 
      setShowForm(false); 
      notify("Account added directly to ledger!");
    } catch (e) {
      notify(e.message, T.red);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 16 }}>
          {types.map(tp => (
            <div key={tp} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: typeColors[tp] }}>{accounts.filter(a => a.type === tp).length}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{tp}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setShowForm(o => !o)} style={{ padding: "10px 20px", background: T.accent, color: "#000", fontWeight: 700 }}>+ Add Account</button>
      </div>

      {showForm && (
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Account Name</label><input placeholder="e.g. Petty Cash" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Type</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {types.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div><label style={{ fontSize: 12, color: T.muted, display: "block", marginBottom: 6 }}>Opening Balance ($)</label><input type="number" placeholder="0.00" value={form.balance} onChange={e => setForm({ ...form, balance: e.target.value })} /></div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button onClick={add} style={{ padding: "10px 24px", background: T.green, color: "#000", fontWeight: 700 }}>Save Account</button>
            <button onClick={() => setShowForm(false)} style={{ padding: "10px 24px", background: T.card, color: T.muted, border: `1px solid ${T.border}`, fontWeight: 600 }}>Cancel</button>
          </div>
        </div>
      )}

      {types.map(tp => {
        const group = accounts.filter(a => a.type === tp);
        if (!group.length) return null;
        return (
          <div key={tp} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ background: `${typeColors[tp]}10`, borderBottom: `1px solid ${T.border}`, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 700, color: typeColors[tp] }}>{tp}s</span>
              <span style={{ fontWeight: 800, fontFamily: T.mono, color: typeColors[tp] }}>{fmt(group.reduce((s, a) => s + Number(a.balance), 0))}</span>
            </div>
            {group.map(a => (
              <div key={a.id} className="hover-row" style={{ padding: "14px 20px", borderBottom: `1px solid ${T.border}20`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 500 }}>{a.name}</div>
                <div style={{ fontWeight: 700, fontFamily: T.mono, color: typeColors[tp] }}>{fmt(a.balance)}</div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
