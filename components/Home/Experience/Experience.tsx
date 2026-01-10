export default function Experience() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Experience</h2>
        <div className="space-y-6">
          {[
            {
              company: "Tech Solutions Inc.",
              role: "Software Engineer Intern",
              duration: "Summer 2023",
              description:
                "Developed features for the company's main product using React and Node.js. Collaborated with cross-functional teams to enhance user experience.",
            },
            {
              company: "Web Innovations",
              role: "Frontend Developer",
              duration: "2022 - 2023",
              description:
                "Implemented responsive web designs and optimized performance for client websites. Worked closely with designers to bring mockups to life.",
            },
          ].map((exp) => (
            <div key={exp.company} className="bg-gray-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold text-gray-800">{exp.role}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500 mb-4">{exp.duration}</p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}