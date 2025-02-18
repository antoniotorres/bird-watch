# BIRD WATCH

A Next.js application for bird watching through a live video feed using WebRTC.

## Features

- Live video streaming using WebRTC
- Real-time connection status indicators
- Responsive design for all devices
- Built with modern web technologies

## Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/antoniotorres/bird-watch.git
cd bird-watch
pnpm install
```

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Update the environment variables in `.env.local` with your configuration:

```
NEXT_PUBLIC_VIDEO_STREAM_URL=your-video-stream-url
NEXT_PUBLIC_UMAMI_ANALYTICS_URL=your-umami-analytics-url
NEXT_PUBLIC_UMAMI_ANALYTICS_WEBSITE_ID=your-umami-analytics-website-id
NEXT_PUBLIC_WEBRTC_WS_URL=your-webrtc-ws-url
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [WebRTC](https://webrtc.org/) - Real-time video streaming
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vercel Analytics](https://vercel.com/analytics) - Analytics

## Deploy on Vercel

The easiest way to deploy your Bird Watch app is to use the [Vercel Platform](https://vercel.com/new).

## License

This project is open source and available under the [MIT license](LICENSE).
