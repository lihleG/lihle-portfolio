import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "#fff",
          background:
            "radial-gradient(60% 70% at 85% 10%, rgba(139,92,246,0.45), transparent 70%), radial-gradient(50% 60% at 10% 100%, rgba(59,130,246,0.35), transparent 70%), #08090D",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#A1A1AA", display: "flex" }}>
          {siteConfig.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, display: "flex" }}>{siteConfig.name}</div>
          <div style={{ fontSize: 44, color: "#A78BFA", marginTop: 8, display: "flex" }}>{siteConfig.title}</div>
        </div>
      </div>
    ),
    size,
  );
}
