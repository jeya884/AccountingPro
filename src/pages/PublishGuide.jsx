import React from "react";
import { T } from "../theme";
import { InfoBanner, StepCard, CodeBlock } from "../components/Shared";

export default function PublishGuide() {
  return (
    <div>
      <InfoBanner color={T.purple}>Your app is ready for global distribution via Vercel or Netlify.</InfoBanner>
      <div style={{ display: "grid", gap: 16 }}>
        <StepCard step={1} title="Optimize Production Build" color={T.green}>
          Package application files locally to verify output compilation codes:
          <CodeBlock>npm run build</CodeBlock>
        </StepCard>
        <StepCard step={2} title="Assign API Environment Variables" color={T.accent}>
          When deploying, move your <code style={{fontFamily: T.mono, color: T.accent}}>supabaseUrl</code> and <code style={{fontFamily: T.mono, color: T.accent}}>supabaseKey</code> strings into your hosting control panel's Environment Variables panel for top-tier production security.
        </StepCard>
      </div>
    </div>
  );
}
