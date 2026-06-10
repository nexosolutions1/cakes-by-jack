// @ts-nocheck
import { defineNitroConfig } from "nitro/config";

export default defineNitroConfig({
  externals: {
    external: [
      "@tanstack/react-router",
      "@tanstack/react-query",
      "sonner",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-label",
      "@radix-ui/react-select",
      "@radix-ui/react-toast",
      "@radix-ui/react-slot",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-popover",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-collapsible",
      "@radix-ui/react-menu",
      "@radix-ui/react-portal",
      "@radix-ui/react-presence",
      "@radix-ui/react-focus-scope",
      "@radix-ui/react-focus-guards",
      "@radix-ui/react-dismissable-layer",
      "@radix-ui/react-collection",
      "@radix-ui/react-direction"
    ]
  }
});