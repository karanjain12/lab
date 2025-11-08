import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Award, TrendingUp, BookOpen } from "lucide-react";

export default function Certifications() {
  const certifications = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      provider: "Amazon AWS",
      difficulty: "Intermediate",
      students: "2,450",
      rating: 4.8,
      color: "from-orange-500 to-red-600",
    },
    {
      id: 2,
      name: "Azure Administrator Certified",
      provider: "Microsoft Azure",
      difficulty: "Intermediate",
      students: "1,890",
      rating: 4.7,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 3,
      name: "GCP Associate Cloud Engineer",
      provider: "Google Cloud",
      difficulty: "Intermediate",
      students: "1,240",
      rating: 4.9,
      color: "from-red-500 to-yellow-500",
    },
    {
      id: 4,
      name: "Kubernetes Application Developer",
      provider: "Cloud Native Computing",
      difficulty: "Advanced",
      students: "980",
      rating: 4.8,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 5,
      name: "DevOps Engineer Professional",
      provider: "Industry Standard",
      difficulty: "Advanced",
      students: "756",
      rating: 4.7,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 6,
      name: "Cloud Architect Professional",
      provider: "Cloud Computing Consortium",
      difficulty: "Advanced",
      students: "654",
      rating: 4.9,
      color: "from-emerald-500 to-teal-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="container mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold text-slate-900 mb-4">
                Certification Tests
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Prepare for industry-recognized certifications with
                comprehensive test series and practice exams.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-slate-50 border-b border-slate-200">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">95%</div>
                <p className="text-slate-600">Pass Rate</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <p className="text-slate-600">Expert Instructors</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  10K+
                </div>
                <p className="text-slate-600">Certifications Earned</p>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all"
                >
                  <div className={`h-32 bg-gradient-to-br ${cert.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Award className="w-8 h-8 text-blue-600" />
                      <span className="text-sm font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {cert.difficulty}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {cert.provider}
                    </p>
                    <div className="flex items-center gap-4 mb-6 text-sm text-slate-600">
                      <span>⭐ {cert.rating}</span>
                      <span>👥 {cert.students} students</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Start Preparation
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Modes */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Two Ways to Prepare
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <BookOpen className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Learning Mode
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      View correct answers immediately
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Read detailed explanations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Learn at your own pace
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">No time restrictions</span>
                  </li>
                </ul>
                <Button variant="outline" className="w-full">
                  Start Learning
                </Button>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Exam Mode
                </h3>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">Real exam conditions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Timed test experience
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Detailed performance reports
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-slate-700">
                      Get certified upon passing
                    </span>
                  </li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Take Exam
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
