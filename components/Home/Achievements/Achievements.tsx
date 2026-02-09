import DottedBackground from "@/components/DottedBackground";

export default function Achievements() {
  return (
    <section className="py-12">
      <DottedBackground className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Achievements</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "Certified Kubernetes Administrator",
                issuer: "The Linux Foundation",
                year: "2023",
              },
              {
                title: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                year: "2022",
              },
              {
                title: "Google Cloud Professional Data Engineer",
                issuer: "Google Cloud",
                year: "2021",
              },
            ].map((achievement, index) => (
              <div
                key={index}
                className="bg-gray-50/90 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600">{achievement.issuer}</p>
                <p className="text-gray-500">{achievement.year}</p>
              </div>
            ))}
          </div>
        </div>
      </DottedBackground>
    </section>
  );
}
