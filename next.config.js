module.exports = {
  env: {
    SITE_NAME: 'raeperd.github.io',
    GITHUB: 'raeperd',
    LINKEDIN: 'raeperd',
    NOTION: 'raeperd.notion.site/raeperd-5f287d810fa94048b45c917d2375e013',
    CV: 'github.com/raeperd/resume/raw/main/resume.pdf',
    INSTAGRAM: 'raeperd',
    TWITTER: 'raeperd117',
    AUTHOR: 'raeperd',
    PAGE_SIZE: 10,
  },
  images: {
    loader: 'akamai',
    path: '',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
