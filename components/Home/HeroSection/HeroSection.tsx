import Name from "./Name";
import VideoBackground from "./VideoBackground";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background video */}
      <VideoBackground />

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

      {/* Foreground content */}
      <Name />
    </section>
  );
}
