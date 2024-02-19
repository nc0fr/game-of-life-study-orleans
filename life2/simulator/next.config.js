/** @type {import('next').NextConfig} */
const conf = {
    compress: true,
    distDir: 'build',
    eslint: {
        // checked during CI
        ignoreDuringBuilds: true,
    },
    trailingSlash: true,
    reactStrictMode: true
};

module.exports = conf;
