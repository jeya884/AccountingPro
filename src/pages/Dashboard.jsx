import React from "react";
import { T } from "../theme";
import { InfoBanner, StepCard, CodeBlock } from "../components/Shared";

export default function DatabaseSetup() {
  return (
    <div>
      <InfoBanner color={T.green}>Live Configuration Confirmed: Database layer points directly to the cloud.</InfoBanner>
      <div style={{ display: "grid", gap: 16 }}>
        <StepCard step={1} title="Status Check" color={T.accent}>
          Your database endpoints are initialized through the application core framework layout context. Ensure you have executed your table configuration inside your SQL editor.
        </StepCard>
        <StepCard step={2} title="Production Database Architecture Layout Schema" color={T.purple}>
          Verify your columns completely match the assigned structural table fields:
          <CodeBlock>{`create table transactions (
  id bigint generated always as identity primary key,
  date date not null,
  description text not null,
  category text not null,
  amount numeric not null,
  type text not null,
  account_name text not null
);`}</CodeBlock>
        </StepCard>
      </div>
    </div>
  );
}
