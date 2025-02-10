import HeaderComponent from "@/components/header";
import FooterComponent from "@/components/footer";
import VideoFeed from "@/components/video-feed";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-[family-name:var(--font-geist-sans)]">
      <HeaderComponent />
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-20 bg-orange-primary">
        <main className="flex flex-col gap-8 items-center sm:items-start text-white">
          <VideoFeed />
        </main>
      </div>
      <FooterComponent />
    </div>
  );
}
