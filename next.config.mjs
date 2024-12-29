/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            hostname: 'aceternity.com',
          },
          {
            hostname: 'plus.unsplash.com',
          },
          {
            hostname: 'images.unsplash.com',
          },
          {
            hostname: 'assets.aceternity.com',
          },
          {
            hostname: 'lh3.googleusercontent.com',
          },
          {
            hostname: 'mhotnxrykauitctlgzwi.supabase.co',
          },
        ],
      },
};

export default nextConfig;
