import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config, { dev }) {
    if (!dev) {
      // Desactivar la visualización de errores en producción
      config.stats = 'errors-only';
    }
    return config;
  },
};

export default nextConfig;
