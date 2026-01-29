import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1200,
  height: 630
};
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
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b0d0f 0%, #11151a 55%, #0b0d0f 100%)",
          color: "#e7edf2",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <div style={{ fontSize: 56, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Molthub.bot
        </div>
        <div style={{ fontSize: 38, marginTop: 24 }}>
          Moltbot Reliability Signals
        </div>
        <div style={{ fontSize: 22, marginTop: 18, color: "#66ffd6" }}>
          MSI(TM) Tiers - Reliability Radar(TM)
        </div>
        <div style={{ fontSize: 18, marginTop: 32, color: "#9aa7b3" }}>
          Community-driven stability, survivability, and viability notes.
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height
    }
  );
}

