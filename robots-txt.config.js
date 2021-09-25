module.exports = {
    host: 'https://malditawifi.web.app',
    sitemap: 'https://malditawifi.web.app/sitemap.xml',
    policy: [
        {
            userAgent: "*",
            allow: "/",
            disallow: ["/tag/", "/category/"],
            crawlDelay: 2,
        },
    ],
};