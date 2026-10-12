import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = (site ? site.origin : "https://demo.pranavyayoga.com").replace(/\/$/, "");
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/about/", priority: "0.8", changefreq: "monthly" },
    { url: "/membership/", priority: "0.8", changefreq: "weekly" },
    { url: "/schedule/", priority: "0.9", changefreq: "weekly" },
    { url: "/contactUs/", priority: "0.7", changefreq: "monthly" },
    { url: "/ourPodcast/", priority: "0.8", changefreq: "weekly" },
    { url: "/faq/", priority: "0.6", changefreq: "monthly" },
    { url: "/privacyPolicy/", priority: "0.4", changefreq: "yearly" },
    { url: "/termscondition/", priority: "0.4", changefreq: "yearly" },
    { url: "/testimonials/", priority: "0.7", changefreq: "monthly" },
    { url: "/giftCard/", priority: "0.7", changefreq: "monthly" },
    { url: "/bookClass/", priority: "0.8", changefreq: "weekly" },
    { url: "/login/", priority: "0.5", changefreq: "monthly" },
    { url: "/shop/", priority: "0.9", changefreq: "daily" },
    { url: "/Cart/", priority: "0.5", changefreq: "monthly" },
    { url: "/wishlist/", priority: "0.5", changefreq: "monthly" },
    { url: "/index-2/", priority: "0.8", changefreq: "weekly" },
    { url: "/index-3/", priority: "0.8", changefreq: "weekly" },
    { url: "/index-4/", priority: "0.8", changefreq: "weekly" },
    { url: "/classes/classOne/", priority: "0.8", changefreq: "weekly" },
    { url: "/classes/classTwo/", priority: "0.8", changefreq: "weekly" },
    { url: "/events/ourEvents/", priority: "0.8", changefreq: "weekly" },
    { url: "/events/ourEventsTwo/", priority: "0.8", changefreq: "weekly" },
    { url: "/retreat/YogaRetreat/", priority: "0.8", changefreq: "weekly" },
    { url: "/team/teamOne/", priority: "0.8", changefreq: "monthly" },
    { url: "/blogs/blogOne/", priority: "0.8", changefreq: "weekly" },
    { url: "/blogs/blogTwo/", priority: "0.8", changefreq: "weekly" },
    { url: "/blogs/blogThree/", priority: "0.8", changefreq: "weekly" },
  ];

  const [blogs, classes, events, retreats, products, teams] = await Promise.all([
    getCollection("blogs"),
    getCollection("classes"),
    getCollection("events"),
    getCollection("retreats"),
    getCollection("products"),
    getCollection("teams"),
  ]);

  const dynamicRoutes = [
    ...blogs.map((b) => ({
      url: `/blog/${b.data.slug}/`,
      priority: "0.7",
      changefreq: "monthly",
    })),
    ...classes.map((c) => ({
      url: `/classes/${c.id}/`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...events.map((e) => ({
      url: `/events/${e.data.slug}/`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...retreats.map((r) => ({
      url: `/retreat/${r.data.slug}/`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...products.map((p) => ({
      url: `/shop/${p.data.slug || p.id}/`,
      priority: "0.8",
      changefreq: "weekly",
    })),
    ...teams.map((t) => ({
      url: `/team/${t.data.slug}/`,
      priority: "0.7",
      changefreq: "monthly",
    })),
  ];

  const allUrls = new Map<string, { priority: string; changefreq: string }>();

  for (const item of [...staticRoutes, ...dynamicRoutes]) {
    if (!allUrls.has(item.url)) {
      allUrls.set(item.url, {
        priority: item.priority,
        changefreq: item.changefreq,
      });
    }
  }

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from(allUrls.entries())
  .map(
    ([path, meta]) => `  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${meta.changefreq}</changefreq>
    <priority>${meta.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
