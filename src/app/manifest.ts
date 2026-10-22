import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yun Wangshu — Product Engineer & Interface Designer",
    short_name: "Yun Wangshu",
    description:
      "Independent product engineer blending considered interface design with resilient full-stack systems.",
    start_url: "/",
    display: "standalone",
    background_color: "#080a07",
    theme_color: "#d7ff58",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}