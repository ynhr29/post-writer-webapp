// contentlayerを使う場合は「next.config.js」という名前にする必要があるかもしれない
import { withContentlayer } from "next-contentlayer2"

/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, swcMinify: true }

export default withContentlayer(nextConfig)
