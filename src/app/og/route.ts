import { ImageResponse } from "next/og";
import { site } from "../../config/site";

export const runtime = "edge";

export const alt = site.seo.title;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export async function GET() {
  const title = site.brandName;
  const tagline = site.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage:
            "radial-gradient(circle at top left, #1f2937 0, #020617 45%, #000 100%)",
          color: "#f9fafb",
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
        }}
      >
        {/* Subtle noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='noStitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.14'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Center card */}
        <div
          style={{
            position: "relative",
            width: 960,
            padding: "56px 72px",
            borderRadius: 36,
            border: "1px solid rgba(248, 250, 252, 0.14)",
            background:
              "linear-gradient(145deg, rgba(15,23,42,0.92), rgba(15,23,42,0.82))",
            boxShadow:
              "0 32px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(15,23,42,0.9)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Highlight edge */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: 36,
              background:
                "linear-gradient(135deg, rgba(248,250,252,0.12), transparent 40%, transparent 60%, rgba(148,163,184,0.22))",
              mixBlendMode: "screen",
              opacity: 0.7,
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: 999,
                border: "1px solid rgba(248,250,252,0.18)",
                background:
                  "linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))",
                color: "rgba(248,250,252,0.82)",
                fontSize: 18,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <span style={{ fontSize: 14, marginRight: 6 }}>Plaquiste</span>
              <span>Occitanie</span>
            </div>

            <h1
              style={{
                fontSize: 60,
                lineHeight: 1.05,
                letterSpacing: -1,
                fontWeight: 700,
              }}
            >
              {title}
            </h1>

            <p
              style={{
                marginTop: 8,
                maxWidth: 640,
                fontSize: 24,
                lineHeight: 1.4,
                color: "rgba(226,232,240,0.92)",
              }}
            >
              {tagline}
            </p>
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                fontSize: 18,
                color: "rgba(148,163,184,0.9)",
              }}
            >
              <span>Doublages • Faux plafonds • Cloisons</span>
              <span>Création &amp; décoration intérieure sur mesure</span>
            </div>

            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: 999,
                border: "1px solid rgba(248,250,252,0.35)",
                background:
                  "linear-gradient(120deg, rgba(248,250,252,0.9), rgba(226,232,240,0.9))",
                color: "#020617",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              <span style={{ marginRight: 10 }}>Devis gratuit</span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26,
                  height: 26,
                  borderRadius: "999px",
                  backgroundColor: "#0f172a",
                  color: "#e5e7eb",
                  fontSize: 18,
                }}
              >
                ✓
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    },
  );
}


