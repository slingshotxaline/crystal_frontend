export default function robots() {
  return {
    rules: {
      // Intentionally disallowed until brand approval and content
      // sign-off are complete (see layout.js metadata.robots too).
      userAgent: '*',
      disallow: '/',
    },
    sitemap: 'https://www.crystalexpress.example/sitemap.xml',
  };
}
