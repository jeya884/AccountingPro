import React from "react";
import { T, fmt, fmtDate } from "../theme";
import { StatusBadge } from "../components/Shared";

export default function Dashboard({ totalIncome, totalExpense, netProfit, totalAssets, totalLiabilities, transactions, invoices }) {
  const cards = [
    { label: "Total Revenue", value: fmt(totalIncome), color: T.green, icon: "↑", sub: "Cloud Synced" },
    { label: "Total Expenses", value: fmt(totalExpense), color: T.red, icon: "↓", sub: "Cloud Synced" },
    { label: "Net Profit", value: fmt(netProfit), color: netProfit >= 0 ? T.accent : T.red, icon: "◈", sub: "Margin: " + (totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : "0.0") + "%" },
    { label: "Total Assets", value: fmt(totalAssets), color: T.purple, icon: "◉", sub: "Liabilities: " + fmt(totalLiabilities) },
  ];

  const pending = invoices.filter(i => i.status === "Pending" || i.status === "Overdue");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const barData = [28000, 34000, 29000, 41000, totalIncome, 0];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `${c.color}08`, borderRadius: "0 16px 0 80px" }} />
            <div style={{ fontSize: 28, color: c.color, marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontSize: 13, color: T.muted, marginBottom: 4 }}>{c.label}</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: c.color }}>{c.value}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 4 }}>{c.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 16 }}>
        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 20 }}>Revenue Overview</div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
            {barData.map((v, i) => {
              const h = v > 0 ? Math.max((v / 45000) * 120, 4) : 4;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 10, color: T.muted, fontFamily: T.mono }}>{v > 0 ? "$" + (v / 1000).toFixed(0) + "k" : "-"}</div>
                  <div style={{ width: "100%", height: h, background: i === 4 ? `linear-gradient(180deg,${T.accent},${T.accentDim})` : `${T.accent}30`, borderRadius: "4px 4px 0 0" }} />
                  <div style={{ fontSize: 11, color: T.muted }}>{months[i]}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20 }}>
          <div style={{ fontWeight: 700, marginBottom: 16 }}>Pending Invoices</div>
          {pending.length === 0 ? <div style={{ color: T.muted, fontSize: 14 }}>All invoices paid ✓</div> :
            pending.map(inv => (
              <div key={inv.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${T.border}` }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{inv.client_name}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>Due {fmtDate(inv.due_date)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 700, color: T.accent }}>{fmt(inv.amount)}</div>
                  <StatusBadge status={inv.status} />
                </div>
              </div>
            ))
          }
        </div>
      </div>

      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, padding: 20, marginTop: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Recent Transactions</div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${T.border}` }}>
              {["Date", "Description", "Category", "Account", "Amount"].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...transactions].slice(-5).reverse().map(t => (
              <tr key={t.id} className="hover-row" style={{ borderBottom: `1px solid ${T.border}20` }}>
                <td style={{ padding: "10px 12px", fontSize: 13, color: T.muted, fontFamily: T.mono }}>{fmtDate(t.date)}</td>
                <td style={{ padding: "10px 12px", fontSize: 14, fontWeight: 500 }}>{t.description}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, color: T.muted }}>{t.category}</td>
                <td style={{ padding: "10px 12px", fontSize: 13, color: T.muted }}>{t.account_name}</td>
                <td style={{ padding: "10px 12px", fontWeight: 700, color: t.type === "Income" ? T.green : T.red, fontFamily: T.mono }}>
                  {t.type === "Income" ? "+" : "-"}{fmt(t.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
