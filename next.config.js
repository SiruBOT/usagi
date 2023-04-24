/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'cdn.discordapp.com',
      port: '',
      pathname: '/**/**',
    }]
  },
  output: "standalone",
  reactStrictMode: true,
}

module.exports = nextConfig
