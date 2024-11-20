/** @type {import('next').NextConfig} */
const nextConfig = {
    // Override the default webpack configuration
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                sharp$: false,
                fs: false,
                path: false,
                child_process: false,
                // onnxruntime: false,
                "onnxruntime-node$": false,
            };
        }

        config.externals.push({
           'onnxruntime-node': 'commonjs onnxruntime-node',
        }); 

        return config;
    },

    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1',
                port: '3000',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'sambanovaclips.vercel.app',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cdn.hashnode.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
