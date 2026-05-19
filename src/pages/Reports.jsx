import React from "react";
import { T, fmt } from "../theme";

export default function Reports({ transactions, accounts }) {
  const income = transactions.filter(t => t.type === "Income").reduce((s, t) => s + Number(t.amount), 0);
  const expenses = transactions.filter(t => t.type === "Expense").reduce((s, t) => s + Number(t.amount), 0);
  const netProfit = income - expenses;
  const assets = accounts.filter(a => a.type === "Asset").reduce((s, a) => s + Number(a.balance), 0);
  const liabilities = accounts.filter(a => a.type === "Liability").reduce((s, a) => s + Number(a.balance), 0);
  const equity = assets - liabilities;

  const catTotals = transactions.filter(t => t.type === "Expense").reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + Number(t.amount); return acc;
  }, {});

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ background: `${T.accent}10`, borderBottom: `1px solid ${T.border}`, padding: "14px 20px", fontWeight: 700, color: T.accent }}>Profit & Loss Statement</div>
        <div style={{ padding: 20 }}>
          <ReportRow label="Total Revenue" value={income} color={T.green} />
          <div style={{ height: 1, background: T.border, margin: "12px 0" }} />
          <ReportRow label="Total Expenses" value={expenses} color={T.red} />
          <div style={{ height: 1, background: T.border, margin: "12px 0" }} />
          <ReportRow label="Net Profit" value={netProfit} color={netProfit >= 0 ? T.green : T.red} bold />
          <div style={{ marginTop: 12, padding: 12, background: `${netProfit >= 0 ? T.green : T.red}10`, borderRadius: 8 }}>
            <div style={{ fontSize: 12, color: T.muted }}>Profit Margin</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: netProfit >= 0 ? T.green : T.red }}>
              {income > 0 ? ((netProfit / income) * 100).toFixed(1) : "0.0"}%
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ background: `${T.purple}10`, borderBottom: `1px solid ${T.border}`, padding: "14px 20px", fontWeight: 700, color: T.purple }}>Balance Sheet</div>
        <div style={{ padding: 20 }}>
          <ReportRow label="Total Assets" value={assets} color={T.green} />
          <ReportRow label="Total Liabilities" value={liabilities} color={T.red} />
          <div style={{ height: 1, background: T.border, margin: "12px 0" }} />
          <ReportRow label="Owner's Equity" value={equity} color={T.purple} bold />
          {accounts.filter(a => a.type === "Asset").map(a => (
            <div key={a.id} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0 6px 12px", fontSize: 13, borderLeft: `2px solid ${T.green}30` }}>
              <span style={{ color: T.muted }}>{a.name}</span>
              <span style={{ fontFamily: T.mono }}>{fmt(a.balance)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportRow({ label, value, color, bold }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0" }}>
      <span style={{ fontSize: bold ? 15 : 14, fontWeight: bold ? 700 : 500, color: bold ? T.text : T.muted }}>{label}</span>
      <span style={{ fontFamily: T.mono, fontWeight: 700, fontSize: bold ? 18 : 14, color }}>{fmt(value)}</span>
    </div>
  );
}
