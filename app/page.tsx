import Achievements from "@/components/Home/Achievements/Achievements";
import Contact from "@/components/Home/Contact/Contact";
import { Hero } from "@/components/Home/HeroSection";
import Projects from "@/components/Home/Projects/Projects";
import Timeline from "@/components/Home/Timeline/Timeline";
import Tools from "@/components/Home/Tools/Tools";

export default function Home() {
  return (
    <main>
      <div className="relative">
        <Hero />
        <Timeline />
      </div>
      <Tools />
      <Projects />
      <Achievements />
      <Contact />

    </main>
  );
}
