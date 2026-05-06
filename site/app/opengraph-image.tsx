import { ImageResponse } from "next/og";

export const alt = "Resilient Data Futures — Discourse Graph";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#faf7f0",
          color: "#1a1410",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg
            width="64"
            height="64"
            viewBox="52 3 34 34"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M77.8534 29.7571C75.5597 31.594 72.6869 32.6231 69.7071 32.6753C66.7274 32.7275 63.8178 31.7997 61.4566 30.0443C59.0953 28.2889 57.4227 25.8104 56.7137 23.0159C56.0047 20.2215 56.3014 17.2773 57.5551 14.6672C58.8088 12.0571 60.9448 9.93625 63.6123 8.65316C66.2798 7.37007 69.32 7.00105 72.2335 7.60673C75.147 8.21241 77.7604 9.75677 79.6443 11.9861C81.5283 14.2153 82.5707 16.997 82.6004 19.8739C82.6089 20.6944 83.3048 21.353 84.1548 21.3449C85.0048 21.3367 85.687 20.6649 85.6785 19.8443C85.6419 16.293 84.3551 12.8594 82.0296 10.1075C79.704 7.35566 76.478 5.44929 72.8815 4.70164C69.2851 3.95398 65.5322 4.4095 62.2394 5.99335C58.9467 7.57721 56.3099 10.1952 54.7624 13.4172C53.2149 16.6391 52.8486 20.2734 53.7238 23.7229C54.599 27.1724 56.6636 30.2319 59.5784 32.3988C62.4932 34.5656 66.0847 35.7109 69.763 35.6465C73.4413 35.5821 76.9874 34.3117 79.8188 32.0442C80.4731 31.5203 80.5635 30.5835 80.0207 29.952C79.478 29.3204 78.5077 29.2331 77.8534 29.7571Z"
              fill="#3A5837"
            />
            <path
              d="M84.7178 25.4942C84.7178 27.04 83.4198 28.2932 81.8185 28.2932C80.2173 28.2932 78.9192 27.04 78.9192 25.4942C78.9192 23.9484 80.2173 22.6953 81.8185 22.6953C83.4198 22.6953 84.7178 23.9484 84.7178 25.4942Z"
              fill="#3A5837"
            />
          </svg>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 1,
              textTransform: "uppercase",
              color: "#6b6660",
              fontFamily: "Arial, sans-serif",
            }}
          >
            SciOS · Discourse Graph
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -1,
            }}
          >
            Resilient Data Futures
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.35,
              color: "#3a3530",
              maxWidth: 980,
              fontFamily: "Arial, sans-serif",
            }}
          >
            A living, content-addressed, contributable form of the SciOS
            whitepaper — every claim, evidence item, question, method, and
            source as its own addressable node.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#6b6660",
            fontFamily: "Arial, sans-serif",
          }}
        >
          <div>rdf.scios.tech</div>
          <div style={{ display: "flex", gap: 24 }}>
            <span>Graph</span>
            <span>Narratives</span>
            <span>Nodes</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
