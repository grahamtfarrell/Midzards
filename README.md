# Midzards Bento Site

Single-page explainer site — 8 bento boxes in one grid.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Mapbox

Create a `.env` file (see `.env.example`) with your public token:

```
VITE_MAPBOX_TOKEN=pk.your_token_here
```

Get a free token at [mapbox.com](https://account.mapbox.com/access-tokens/). Without it, the map box falls back to the static `map.png`.

## Add video

Drop a looping MP4 at `public/assets/video/movie.mp4` (muted, H.264). Until then the movie box shows the poster image.

## Build

```bash
npm run build
npm run preview
```
