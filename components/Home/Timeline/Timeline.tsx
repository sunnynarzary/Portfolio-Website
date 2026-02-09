import DottedBackground from "@/components/DottedBackground";
import styles from "./styles/Timeline.module.css";

const TIMELINE_ITEMS = [
  {
    period: "Nov 2020 - Jul 2024",
    title: "IIT Guwahati",
    subtitle: "Education",
  },
  {
    period: "Apr 2024 - Nov 2025",
    title: "Tradepeeps",
    subtitle: "Experience",
  },
  {
    period: "Dec 2025 - Present",
    title: "Optima",
    subtitle: "Experience",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="min-h-[100svh]">
      <DottedBackground className={styles.background}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">
            Timeline
          </h2>
          <div className={styles.timeline}>
            {TIMELINE_ITEMS.map((item) => (
              <div key={item.title} className={styles.item}>
                <span className={styles.marker} aria-hidden="true" />
                <div className={styles.card}>
                  <p className={styles.period}>{item.period}</p>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.subtitle}>{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    </section>
  );
}
