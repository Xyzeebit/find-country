const path = require('path');

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'style')]
  },
  images: {
    domains: ['flagcdn.com']
  }
}
