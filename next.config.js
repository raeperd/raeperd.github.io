module.exports = {
  env: {
    SITE_NAME: 'raeperd.github.io',
    GITHUB: 'raeperd',
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
