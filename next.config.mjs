/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "utfs.io" },
      { hostname: "img.clerk.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "avatar.vercel.sh" },
      { hostname: "plus.unsplash.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "images.prismic.io"}
    ],
  },
}

export default nextConfig
