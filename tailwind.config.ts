import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0D12",
        graphite: "#1D2430",
        blue: {
          brand: "#155EEF",
          deep: "#0B2D68",
          soft: "#EAF1FF"
        },
        surface: {
          50: "#F8FAFC",
          100: "#F1F5F9",
          200: "#E2E8F0"
        }
      },
      boxShadow: {
        soft: "0 18px 50px -34px rgba(15, 23, 42, 0.42)",
        lift: "0 22px 65px -40px rgba(21, 94, 239, 0.48)"
      },
      borderRadius: {
        ui: "8px"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(.2,.8,.2,1)"
      }
    }
  },
  plugins: []
} satisfies Config;
