import DottedBackground from "@/components/DottedBackground";

export default function Projects() {
  return (
    <section className="py-12">
      <DottedBackground className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Projects</h2>
          <div className="space-y-6">
            {[
              {
                name: "Project Alpha",
                description: "A web application for managing tasks.",
                link: "asdsa.com",
              },
              {
                name: "Project Beta",
                description: "A mobile app for tracking fitness activities.",
                link: "asdsa.com",
              },
            ].map((project) => (
              <div key={project.name} className="bg-gray-50/90 p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800">{project.name}</h3>
                <p className="text-gray-700 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View Project
                </a>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    </section>
  );
}
