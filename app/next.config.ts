import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [
      'remark-gfm',
      'remark-frontmatter',
      'remark-mdx-frontmatter',
    ],
    rehypePlugins: [],
  },
})

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  output: 'standalone',
}

export default withMDX(nextConfig)
