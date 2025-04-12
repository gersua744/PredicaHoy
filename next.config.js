/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  i18n: {
    locales: ['es'],
    defaultLocale: 'es',
  },
  // Configuración para Netlify
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    return config;
  },
  // Habilitar caché de compilación
  experimental: {
    turbotrace: {
      logLevel: 'error',
    },
  },
}

module.exports = nextConfig
