// next.config.mjs
import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/care/:path*',
        destination: 'http://127.0.0.1:5000/care/:path*', // Proxy to backend
      },
    ];
  },
};

export default nextConfig;
