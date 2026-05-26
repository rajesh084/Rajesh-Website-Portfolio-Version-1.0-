/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 88],
  },
  turbopack: {
    root: process.cwd(),
  },
}

export default nextConfig
