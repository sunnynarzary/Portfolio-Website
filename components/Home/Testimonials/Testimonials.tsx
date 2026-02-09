import DottedBackground from "@/components/DottedBackground";

export default function Testimonials() {
  return (
    <section className="py-12">
      <DottedBackground className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Testimonials</h2>
          <div className="space-y-6">
            {[
              {
                name: "Jane Doe",
                role: "CEO, Example Corp",
                testimonial:
                  "Sunny is an exceptional software engineer. Their dedication and expertise have been invaluable to our projects.",
              },
              {
                name: "John Smith",
                role: "CTO, Tech Innovations",
                testimonial:
                  "Working with Sunny has been a pleasure. Their problem-solving skills and creativity are top-notch.",
              },
            ].map((testi, index) => (
              <div key={index} className="bg-white/90 p-6 rounded-lg shadow">
                <p className="text-gray-700 italic mb-4">"{testi.testimonial}"</p>
                <h3 className="text-lg font-semibold text-gray-800">{testi.name}</h3>
                <p className="text-gray-600">{testi.role}</p>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    </section>
  );
}
