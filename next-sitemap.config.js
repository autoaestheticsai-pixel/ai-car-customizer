/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://autoaesthetics.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/api/*', '/admin/*'],
  additionalPaths: async (config) => [
    await config.transform(config, '/visualizer'),
    await config.transform(config, '/pricing'),
    await config.transform(config, '/gallery'),
    await config.transform(config, '/about'),
    await config.transform(config, '/contact'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    additionalSitemaps: [
      'https://autoaesthetics.com/sitemap.xml',
    ],
  },
}
