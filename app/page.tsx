import Achievements from "@/components/Home/Achievements/Achievements";
import Contact from "@/components/Home/Contact/Contact";
import Education from "@/components/Home/Education/Education";
import Experience from "@/components/Home/Experience/Experience";
import { Hero } from "@/components/Home/HeroSection";
import Projects from "@/components/Home/Projects/Projects";
import Tools from "@/components/Home/Tools/Tools";

export default function Home() {
  return (
    <main>
      <Hero />
      <Education />
      <Experience />
      <Tools />
      <Projects />
      <Achievements />
      <Contact />

    </main>
  );
}
