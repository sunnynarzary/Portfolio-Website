import DottedBackground from "@/components/DottedBackground";

export default function Tools() {
  return (
    <section className="py-12">
      <DottedBackground className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Tools & Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Tailwind CSS",
              "Git",
              "Docker",
              "AWS",
            ].map((tool) => (
              <div
                key={tool}
                className="bg-white/90 p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-lg font-medium text-gray-800">{tool}</h3>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    </section>
  );
}
