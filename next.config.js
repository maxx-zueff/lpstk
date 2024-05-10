/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    sassOptions: {
        additionalData: `@import "app/_styles/variables.scss"; @import "app/_styles/mixins.scss";`
      },
}

module.exports = nextConfig
