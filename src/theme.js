import { createClient } from '@supabase/supabase-js';

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

// ====================================================================
// SUPABASE CLIENT INITIALIZATION
// Replace these placeholders with your actual project keys from Supabase
// ====================================================================
const supabaseUrl = 'https://bkiosrbwriyepnnzfzhb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJraW9zcmJ3cml5ZXBubnpmemhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxMzk2MjAsImV4cCI6MjA5NDcxNTYyMH0.BJpzEn2oy3O36NL4JogMitR2jo6A-bjEM9UZXOv-2DA';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Async Database Interface Engine
export const DB = {
  get: async (table) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error(`Error fetching from ${table}:`, error.message);
      return [];
    }
    return data;
  },

  insert: async (table, record) => {
    // Remove client-side temporary IDs so Supabase can assign them via identity columns
    const { id, ...cleanRecord } = record; 
    const { data, error } = await supabase
      .from(table)
      .insert([cleanRecord])
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },

  update: async (table, id, updates) => {
    const { data, error } = await supabase
      .from(table)
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw new Error(error.message);
    return data[0];
  },

  delete: async (table, id) => {
    const { error } = await supabase
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  }
};

export const fmt = (n) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
export const fmtDate = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

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
