import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'brian-mckeon-painting';
const pagesBasePath = isGitHubPages ? `/${repositoryName}` : '';

const nextConfig: NextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath || undefined,
  trailingSlash: isGitHubPages,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: pagesBasePath },
};

export default nextConfig;
