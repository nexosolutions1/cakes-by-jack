import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    target: "netlify",
    server: { entry: "server" },
  },
  nitro: {
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
        "@radix-ui/react-dropdown-menu"
      ],
    },
  },
});