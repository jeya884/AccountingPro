import React, { useState, useEffect } from "react";
import { T, DB, NAV } from "./theme";

// Routing View Imports
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Invoices from "./pages/Invoices";
import Accounts from "./pages/Accounts";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";
import DatabaseSetup from "./pages/DatabaseSetup";
import PublishGuide from "./pages/PublishGuide";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [transactions, setTransactions] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [sideOpen, setSideOpen] = useState(true);
  const [toast, setToast] = useState(null);

  const notify = (msg, color = T.green) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  // ====================================================================
  // ASYNCHRONOUS INITIALIZATION LAYER
  // Loads global telemetry down from the database upon application load
  // ====================================================================
  useEffect(() => {
    async function syncCloudDatastore() {
      try {
        const [tx, inv, acc, cust] = await Promise.all([
          DB.get("transactions"),
          DB.get("invoices"),
          DB.get("accounts"),
          DB.get("customers")
        ]);

        setTransactions(tx);
        setInvoices(inv);
        setAccounts(acc);
        setCustomers(cust);
      } catch (err) {
        console.error("Critical Cloud Synced Drop Error:", err);
        notify("Database sync failure", T.red);
      } finally {
        setLoading(false);
      }
    }
    syncCloudDatastore();
  }, []);

  // Structural Math Aggregation Layers
  const totalIncome = transactions.filter(t => t.type === "Income").reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = transactions.filter(t => t.type === "Expense").reduce((s, t) => s + Number(t.amount), 0);
  const netProfit = totalIncome - totalExpense;
  const totalAssets = accounts.filter(a => a.type === "Asset").reduce((s, a) => s + Number(a.balance), 0);
  const totalLiabilities = accounts.filter(a => a.type === "Liability").reduce((s, a) => s + Number(a.balance), 0);

  if (loading) {
    return (
      <div style={{ height: "100vh", width: "100vw", background: T.bg, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: T.font, color: T.accent }}>
        <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 12, animate: "pulse 1.5s infinite" }}>⬡ ACCPRO</div>
        <div style={{ fontSize: 13, color: T.muted, fontFamily: T.mono }}>Establishing secure connection pipeline...</div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${T.bg}; color: ${T.text}; font-family: ${T.font}; overflow: hidden; }
        input, select, textarea { font-family: ${T.font}; color: ${T.text}; background: ${T.bg}; border: 1px solid ${T.border}; border-radius: 8px; padding: 10px 14px; outline: none; width: 100%; }
        input:focus, select:focus, textarea:focus { border-color: ${T.accent}; }
        button { font-family: ${T.font}; cursor: pointer; border: none; border-radius: 8px; transition: all .2s; }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        .hover-row:hover { background: ${T.border}!important; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", width: "100vw", overflow: "hidden" }}>
        {/* SIDEBAR NAVIGATION PANEL */}
        <aside style={{ width: sideOpen ? 240 : 64, background: T.surface, borderRight: `1px solid ${T.border}`, display: "flex", flexDirection: "column", transition: "width .3s", flexShrink: 0 }}>
          <div style={{ padding: "20px 16px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12, minHeight: 64 }}>
            <div style={{ width: 32, height: 32, background: `linear-gradient(135deg,${T.accent},${T.purple})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>Σ</div>
            {sideOpen && <span style={{ fontWeight: 800, fontSize: 18, background: `linear-gradient(90deg,${T.accent},${T.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AccPro</span>}
          </div>

          <nav style={{ flex: 1, padding: "12px 0", overflowY: "auto" }}>
            {NAV.map(n => (
              <button key={n.id} onClick={() => setPage(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", background: page === n.id ? `${T.accent}15` : "transparent", borderLeft: page === n.id ? `3px solid ${T.accent}` : "3px solid transparent", color: page === n.id ? T.accent : T.muted, fontWeight: 600, fontSize: 14, borderRadius: 0, textAlign: "left" }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{n.icon}</span>
                {sideOpen && n.label}
              </button>
            ))}
          </nav>
          <button onClick={() => setSideOpen(o => !o)} style={{ margin: 12, padding: 10, background: T.card, color: T.muted }}>{sideOpen ? "←" : "→"}</button>
        </aside>

        {/* VIEWPORTS HEADER WRAPPER CONTAINER */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <header style={{ height: 64, borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 28px", background: T.surface }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{NAV.find(n => n.id === page)?.label}</div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ padding: "6px 14px", background: `${T.green}15`, color: T.green, borderRadius: 20, fontSize: 13, fontWeight: 600 }}>● Connected</div>
            </div>
          </header>

          <main style={{ flex: 1, overflow: "auto", padding: 28 }}>
            {page === "dashboard" && <Dashboard {...{ totalIncome, totalExpense, netProfit, totalAssets, totalLiabilities, transactions, invoices }} />}
            {page === "transactions" && <Transactions {...{ transactions, setTransactions, accounts, notify }} />}
            {page === "invoices" && <Invoices {...{ invoices, setInvoices, customers, notify }} />}
            {page === "accounts" && <Accounts {...{ accounts, setAccounts, notify }} />}
            {page === "customers" && <Customers {...{ customers, setCustomers, notify }} />}
            {page === "reports" && <Reports {...{ transactions, accounts }} />}
            {page === "database" && <DatabaseSetup />}
            {page === "publish" && <PublishGuide />}
          </main>
        </div>
      </div>

      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, background: toast.color, color: "#000", padding: "12px 20px", borderRadius: 10, fontWeight: 700, zIndex: 9999 }}>
          {toast.msg}
        </div>
      )}
    </>
  );
}
