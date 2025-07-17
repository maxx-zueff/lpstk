/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    sassOptions: {
        additionalData: `@import "app/_styles/variables.scss"; @import "app/_styles/mixins.scss";`
      },
      async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://b2b.taxi.yandex.net/:path*',
          },
        ]
      },
}

module.exports = nextConfig
