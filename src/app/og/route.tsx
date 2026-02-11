import { ImageResponse } from "next/og";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0b2a4a",
          color: "white",
          fontSize: 64,
          fontWeight: 700,
          fontFamily: "sans-serif",
        }}
      >
        Lucas le Plaquiste
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}







