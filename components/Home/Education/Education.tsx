"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles/Education.module.css";
import DottedBackground from "@/components/DottedBackground";

export default function Education() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px" }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.education} ${isRevealed ? styles.revealed : ""} py-12`}
    >
      <DottedBackground className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Education</h2>
          <div className="space-y-6">
            {[
              {
                institution: "University of Example",
                degree: "Bachelor of Science in Computer Science",
                year: "2020 - 2024",
              },
              {
                institution: "Example High School",
                degree: "High School Diploma",
                year: "2016 - 2020",
              },
            ].map((edu) => (
              <div key={edu.institution} className="bg-gray-50/90 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-gray-500">{edu.year}</p>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    </section>
  );
}
