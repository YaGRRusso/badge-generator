const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  i18n,
  images: {
    domains: ['shields.io', 'img.shields.io'],
  },
}

module.exports = nextConfig
