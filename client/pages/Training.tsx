import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Award, Clock, Video } from "lucide-react";

export default function Training() {
  const upcomingSessions = [
    {
      id: 1,
      title: "AWS Solutions Architect Professional",
      instructor: "John Smith",
      date: "March 15, 2024",
      time: "2:00 PM - 5:00 PM EST",
      duration: "3 hours",
      students: "24",
      mode: "Online",
    },
    {
      id: 2,
      title: "Azure Administrator Masterclass",
      instructor: "Sarah Johnson",
      date: "March 18, 2024",
      time: "10:00 AM - 1:00 PM EST",
      duration: "3 hours",
      students: "18",
      mode: "Online",
    },
    {
      id: 3,
      title: "Kubernetes Deep Dive",
      instructor: "Michael Chen",
      date: "March 22, 2024",
      time: "3:00 PM - 6:00 PM EST",
      duration: "3 hours",
      students: "32",
      mode: "Online",
    },
    {
      id: 4,
      title: "GCP Cloud Engineering",
      instructor: "Emily Rodriguez",
      date: "March 25, 2024",
      time: "1:00 PM - 4:00 PM EST",
      duration: "3 hours",
      students: "21",
      mode: "Online",
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
                Instructor-Led Training
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Learn directly from industry experts through scheduled live
                training sessions. Interactive Q&A, hands-on demonstrations, and
                personalized guidance.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Why Choose Live Training?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Expert Instructors",
                  description:
                    "Learn from certified cloud professionals with 10+ years experience",
                },
                {
                  icon: Video,
                  title: "Interactive Sessions",
                  description:
                    "Real-time Q&A, live demonstrations, and hands-on exercises",
                },
                {
                  icon: Award,
                  title: "Certification Ready",
                  description:
                    "Structured curriculum aligned with certification requirements",
                },
                {
                  icon: Clock,
                  title: "Flexible Schedules",
                  description:
                    "Sessions at convenient times with flexible registration",
                },
              ].map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-slate-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Upcoming Sessions */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Upcoming Sessions
            </h2>

            <div className="space-y-6">
              {upcomingSessions.map((session) => (
                <div
                  key={session.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 mb-2">
                        {session.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        Instructor:{" "}
                        <span className="font-semibold">
                          {session.instructor}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span>{session.time}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>{session.students} students enrolled</span>
                      </div>
                      <div className="text-slate-600">
                        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                          {session.mode}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Register Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Course Materials Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Course Materials
            </h2>
            <p className="text-slate-600 mb-8">
              All registered participants receive:
            </p>

            <ul className="space-y-4">
              {[
                "Pre-training materials and study guides",
                "Live session recordings for future reference",
                "Code samples and configuration files",
                "Certificate of completion upon finishing",
                "Access to Q&A forum with instructors",
                "Post-training support and resources",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-blue-600 font-bold mt-1">✓</span>
                  <span className="text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Learn from Experts?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Register for an upcoming session and take your skills to the next
              level
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Browse All Sessions
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
