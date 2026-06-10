// @ts-nocheck
import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  preset: "netlify",

  externals: {
    external: [
      "@tanstack/react-router",
      "@tanstack/react-query",
      "react",
      "react-dom",
      "sonner",
    ],
  },
});