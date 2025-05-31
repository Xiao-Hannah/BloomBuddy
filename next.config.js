/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const repoName = 'BloomBuddy'; // replace with your GitHub repo name

module.exports = {
  output: "export",
  basePath: `/${repoName}`,
  assetPrefix: `/${repoName}/`,
  images: {
    unoptimized: true,
  },
};