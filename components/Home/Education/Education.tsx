export default function Education() {
  return (
    <section className="py-12 bg-white">
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
            <div key={edu.institution} className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">{edu.degree}</h3>
              <p className="text-gray-600">{edu.institution}</p>
              <p className="text-gray-500">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}