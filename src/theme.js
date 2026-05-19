export const T = {
  bg: "#0A0F1E",
  surface: "#111827",
  card: "#1A2235",
  border: "#1E2D45",
  accent: "#00D4FF",
  accentDim: "#0099BB",
  green: "#00E676",
  red: "#FF4757",
  yellow: "#FFD60A",
  purple: "#A78BFA",
  text: "#E8F0FE",
  muted: "#6B7FA3",
  font: "'Syne', sans-serif",
  mono: "'JetBrains Mono', monospace",
};

export const seed = {
  accounts: [
    { id: 1, name: "Cash", type: "Asset", balance: 45000 },
    { id: 2, name: "Accounts Receivable", type: "Asset", balance: 12300 },
    { id: 3, name: "Inventory", type: "Asset", balance: 8900 },
    { id: 4, name: "Accounts Payable", type: "Liability", balance: 5400 },
    { id: 5, name: "Loans Payable", type: "Liability", balance: 20000 },
    { id: 6, name: "Owner's Equity", type: "Equity", balance: 40800 },
    { id: 7, name: "Revenue", type: "Income", balance: 68000 },
    { id: 8, name: "Cost of Goods Sold", type: "Expense", balance: 32000 },
    { id: 9, name: "Operating Expenses", type: "Expense", balance: 15600 },
  ],
  transactions: [
    { id: 1, date: "2026-05-01", description: "Client Payment - Acme Corp", category: "Revenue", amount: 8500, type: "Income", account: "Cash" },
    { id: 2, date: "2026-05-03", description: "Office Rent", category: "Operating Expenses", amount: 2200, type: "Expense", account: "Cash" },
    { id: 3, date: "2026-05-05", description: "Software Licenses", category: "Operating Expenses", amount: 450, type: "Expense", account: "Cash" },
    { id: 4, date: "2026-05-08", description: "Supplier Invoice #INV-204", category: "Cost of Goods Sold", amount: 3800, type: "Expense", account: "Accounts Payable" },
    { id: 5, date: "2026-05-10", description: "Service Revenue - Beta LLC", category: "Revenue", amount: 5200, type: "Income", account: "Accounts Receivable" },
    { id: 6, date: "2026-05-12", description: "Utilities Bill", category: "Operating Expenses", amount: 320, type: "Expense", account: "Cash" },
    { id: 7, date: "2026-05-15", description: "Product Sales", category: "Revenue", amount: 11200, type: "Income", account: "Cash" },
    { id: 8, date: "2026-05-17", description: "Marketing Campaign", category: "Operating Expenses", amount: 1800, type: "Expense", account: "Cash" },
  ],
  invoices: [
    { id: 1, client: "Acme Corp", amount: 8500, status: "Paid", date: "2026-04-25", due: "2026-05-10" },
    { id: 2, client: "Beta LLC", amount: 5200, status: "Pending", date: "2026-05-10", due: "2026-06-10" },
    { id: 3, client: "Gamma Inc", amount: 3400, status: "Overdue", date: "2026-04-01", due: "2026-05-01" },
    { id: 4, client: "Delta Corp", amount: 7800, status: "Draft", date: "2026-05-18", due: "2026-06-18" },
  ],
  customers: [
    { id: 1, name: "Acme Corp", email: "billing@acme.com", phone: "+1 555-0101", balance: 0 },
    { id: 2, name: "Beta LLC", email: "accounts@beta.com", phone: "+1 555-0202", balance: 5200 },
    { id: 3, name: "Gamma Inc", email: "finance@gamma.com", phone: "+1 555-0303", balance: 3400 },
    { id: 4, name: "Delta Corp", email: "pay@delta.com", phone: "+1 555-0404", balance: 0 },
  ],
};

export const DB = {
  get: (key) => {
    try { return JSON.parse(localStorage.getItem("accpro_" + key)) || seed[key]; }
    catch { return seed[key]; }
  },
  set: (key, val) => localStorage.setItem("accpro_" + key, JSON.stringify(val)),
};

export const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
export const uid = () => Date.now() + Math.floor(Math.random() * 1000);

export const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "transactions", label: "Transactions", icon: "⇄" },
  { id: "invoices", label: "Invoices", icon: "◫" },
  { id: "accounts", label: "Chart of Accounts", icon: "≡" },
  { id: "customers", label: "Customers", icon: "◉" },
  { id: "reports", label: "Reports", icon: "▦" },
  { id: "database", label: "Database Setup", icon: "☁" },
  { id: "publish", label: "Publish Guide", icon: "↑" },
];

