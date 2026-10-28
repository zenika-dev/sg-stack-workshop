const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['better-sqlite3'],
  },
  async rewrites() {
    return [
      { source: '/events', destination: '/api/events' },
      { source: '/events/summary', destination: '/api/events/summary' },
      { source: '/events/export', destination: '/api/events/export' },
      { source: '/healthz', destination: '/api/healthz' },
    ];
  },
};

export default nextConfig;
