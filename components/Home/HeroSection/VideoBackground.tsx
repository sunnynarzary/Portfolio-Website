export default function VideoBackground() {
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster="/hero.jpg"
      className="absolute inset-0 z-0 w-full h-full object-cover"
    >
      <source src="/hero.webm" type="video/webm" />
      <source src="/hero.mp4" type="video/mp4" />
    </video>
  );
}
