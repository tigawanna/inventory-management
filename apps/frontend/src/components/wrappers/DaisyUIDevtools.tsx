import React from "react";

export const DaisyUIDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("daisyui-devtools").then((res) => ({
          default: res.DaisyUIDevtools,
          // For Embedded Mode
          // default: res.DaisyUIThemeList
        })),
      );