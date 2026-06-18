const GITHUB_MEDIA_BASE =
  'https://media.githubusercontent.com/media/grahamtfarrell/Midzards/main/public'

/** Assets stored in Git LFS — Vercel deploys pointer files instead of binaries. */
const LFS_ASSETS = new Set([
  '/assets/vulture.gif',
  '/assets/midzards.gif',
  '/assets/video/movie.mp4',
  '/assets/mood-board/21.jpg',
])

export function assetUrl(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (import.meta.env.DEV || !LFS_ASSETS.has(normalized)) {
    return normalized
  }

  return `${GITHUB_MEDIA_BASE}${normalized}`
}
