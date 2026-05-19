import React, { useState } from "react";
import { T } from "../theme";
import { InfoBanner, StepCard, CodeBlock } from "../components/Shared";

export default function PublishGuide() {
  const [tab, setTab] = useState("vercel");
  const tabs = [
    { id: "vercel", label: "Vercel (Recommended)", icon: "▲" },
    { id: "netlify", label: "Netlify", icon: "◆" },
  ];

  return (
    <div>
      <InfoBanner color={T.purple}>Follow these setups to map, build, package, and distribute your production application bundle globally.</InfoBanner>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "8px 16px", background: tab === t.id ? T.purple : T.card, color: tab === t.id ? "#fff" : T.muted, fontWeight: 600, fontSize: 13 }}>{t.icon} {t.label}</button>
        ))}
      </div>

      {tab === "vercel" && (
        <div style={{ display: "grid", gap: 16 }}>
          <StepCard step={1} title="Run production compilation test" color={T.green}>
            <CodeBlock>npm run build</CodeBlock>
          </StepCard>
          <StepCard step={2} title="Link Repository" color={T.accent}>
            Import into Vercel and assign environment configuration variables to securely publish live.
          </StepCard>
        </div>
      )}
      {tab === "netlify" && <div style={{ padding: 10, color: T.muted }}>Netlify build tracking configurations are managed natively using standard workspace properties.</div>}
    </div>
  );
}
