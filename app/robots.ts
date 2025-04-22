import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/favicon.ico"],
        disallow: [
          "/admin",
          "/signin",
          "/signup",
          "/dealer",
          "/dashboard",
          "/change-password",
          "/reset-password",
        ],
      },
    ],
    // sitemap: "https://www.ayurvedicbyadivashi.com/sitemap.xml",
  };
}
