import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
			},
			{
				protocol: "https",
				hostname: "1.bp.blogspot.com",
			},
			{
				protocol: "https",
				hostname: "ucarecdn.com",
				port: "",
				pathname: "/**",
			},
		],
	},

	async headers() {
		return [
			{
				source: "/api/:path*",
				headers: [
					{ key: "Access-Control-Allow-Credentials", value: "true" },

					{ key: "Access-Control-Allow-Origin", value: "*" },

					{
						key: "Access-Control-Allow-Methods",
						value: "GET, POST, PUT, PATCH, DELETE, OPTIONS",
					},
					{
						key: "Access-Control-Allow-Headers",
						value:
							"Content-Type, Authorization, Accept, X-Requested-With, X-CSRF-Token, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
					},
					{ key: "Access-Control-Max-Age", value: "86400" },
				],
			},
		];
	},

	experimental: {},
};

export default nextConfig;
