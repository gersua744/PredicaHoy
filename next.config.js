/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  swcMinify: false, // Deshabilitar SWC minify
  experimental: {
    forceSwcTransforms: false, // Deshabilitar SWC transforms
  }
}

module.exports = nextConfig
