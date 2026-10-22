import { ImageResponse } from "next/og";

export const alt =
  "Yun Wangshu — Product Engineer & Interface Designer. Digital products, with a pulse.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080a07",
          color: "#f0f2e8",
          padding: "56px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 620,
            height: 620,
            display: "flex",
            top: -230,
            right: -140,
            borderRadius: 999,
            background:
              "radial-gradient(circle at 40% 40%, #d7ff58 0%, #6f8a39 30%, #080a07 68%)",
            opacity: 0.75,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            display: "flex",
            bottom: -240,
            left: 160,
            borderRadius: 999,
            background:
              "radial-gradient(circle, rgba(142,230,255,0.25), transparent 68%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 44,
                height: 44,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 999,
                background: "#d7ff58",
                color: "#080a07",
                fontSize: 21,
                fontWeight: 800,
              }}
            >
              Y
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 22, fontWeight: 700, letterSpacing: -1 }}>
                Yun Wangshu
              </span>
              <span
                style={{
                  fontSize: 11,
                  letterSpacing: 3,
                  color: "#9a9f91",
                  textTransform: "uppercase",
                }}
              >
                Product engineer · Jakarta
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: 999,
              padding: "9px 16px",
              fontSize: 12,
              color: "#c8ccbd",
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: 999,
                background: "#d7ff58",
              }}
            />
            Open for select work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <span
            style={{
              fontSize: 12,
              letterSpacing: 3,
              color: "#9a9f91",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            Portfolio / 2026
          </span>
          <span
            style={{
              fontSize: 104,
              fontWeight: 600,
              letterSpacing: -7,
              lineHeight: 0.93,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Digital products,</span>
            <span style={{ color: "#d7ff58" }}>with a pulse.</span>
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.13)",
            paddingTop: 22,
            position: "relative",
            fontSize: 12,
            letterSpacing: 2,
            color: "#9a9f91",
            textTransform: "uppercase",
          }}
        >
          <span>Interface × Systems × Motion</span>
          <span>Next.js · Python · Go · Rust</span>
        </div>
      </div>
    ),
    size,
  );
}