/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    GOOGLE_MAPS_PLACE_ID: process.env.GOOGLE_MAPS_PLACE_ID,
  },
};

module.exports = nextConfig;
