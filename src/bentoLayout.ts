export type BoxId =
  | 'story'
  | 'clip'
  | 'map'
  | 'gif'
  | 'free'
  | 'movie'
  | 'board'
  | 'why'

/** Content area from Figma box positions (before gutters) */
export const CONTENT_WIDTH = 9943
export const CONTENT_HEIGHT = 6373

/**
 * Tan gutter between boxes in the Figma design.
 * Derived from clip spanning story + gap + gif rows: 2489 + G + 1914 = 4543 → G = 140
 */
export const GUTTER = 140

/** Full repeatable tile including half-gutter padding on each edge (for seamless tiling) */
export const TILE_WIDTH = CONTENT_WIDTH + GUTTER * 4
export const TILE_HEIGHT = CONTENT_HEIGHT + GUTTER * 3

/** Column width ratios from Figma exports */
export const COL_FR = [1970, 1970, 2757, 3107] as const

/** Row height ratios from Figma exports */
export const ROW_FR = [2489, 1914, 1970] as const

export const BOX_IDS: BoxId[] = [
  'story',
  'clip',
  'map',
  'gif',
  'free',
  'movie',
  'board',
  'why',
]

export const GRID_AREAS = `
  "story story clip map"
  "gif   free  clip movie"
  "board board board why"
` as const

export function gutterPx(scale: number) {
  return GUTTER * scale
}

export function tileSize(scale: number) {
  return {
    width: TILE_WIDTH * scale,
    height: TILE_HEIGHT * scale,
    gutter: gutterPx(scale),
  }
}

export function computeScale() {
  const scaleW = window.innerWidth / TILE_WIDTH
  const scaleH = window.innerHeight / TILE_HEIGHT
  return Math.min(scaleW, scaleH) * 0.92
}
