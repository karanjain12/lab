import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Code2,
  Award,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const features = [
    {
      icon: BookOpen,
      title: "Guided Lab Exercises",
      description:
        "Structured, hands-on learning paths with step-by-step instructions and real-world cloud scenarios.",
    },
    {
      icon: Award,
      title: "Certification Training",
      description:
        "Prepare for AWS, Azure, GCP certifications with comprehensive study materials and practice exams.",
    },
    {
      icon: Code2,
      title: "Interactive Content",
      description:
        "Learn with videos, code snippets, and downloadable resources tailored to your skill level.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description:
        "Access live training sessions and instructor-led courses from industry professionals.",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description:
        "Monitor your learning journey with visual progress indicators and achievement badges.",
    },
    {
      icon: Zap,
      title: "On-Demand Learning",
      description:
        "Access pre-recorded video training and resources anytime, anywhere at your pace.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Cloud Architect",
      text: "The guided labs helped me transition to a cloud architect role. Highly practical and well-structured.",
      initials: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "DevOps Engineer",
      text: "Comprehensive training material and excellent instructor support. Passed my AWS certification on first attempt.",
      initials: "MR",
    },
    {
      name: "Emily Johnson",
      role: "Solutions Developer",
      text: "The interactive content and real-world scenarios made complex concepts easy to understand.",
      initials: "EJ",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Active Learners" },
    { number: "500+", label: "Lab Exercises" },
    { number: "95%", label: "Pass Rate" },
    { number: "50+", label: "Expert Instructors" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
          <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

          <div className="container mx-auto relative z-10">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="inline-block mb-4 px-4 py-2 bg-blue-100 rounded-full">
                <span className="text-blue-700 font-semibold text-sm">
                  🚀 Master Cloud Technologies
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Cloud Learning for Modern Professionals
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Get hands-on experience with AWS, Azure, and GCP. Earn
                certifications, build real-world skills, and advance your career
                with our comprehensive learning platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/labs">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                  >
                    Explore Labs <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-8 border-slate-300 hover:bg-slate-50"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Why Choose Skills Enhance?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Comprehensive training designed for learners at all levels
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-700">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals advancing their cloud careers
            </p>
            <Link to="/labs">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 px-10 font-semibold"
              >
                Browse Our Courses <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Hear from professionals who transformed their careers with us
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="bg-white p-8 rounded-xl shadow-sm border border-slate-200"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600 text-sm">
                        {testimonial.initials}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Features Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Platform Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Learning Tools
                </h3>
                <ul className="space-y-4">
                  {[
                    "Interactive guided lab exercises",
                    "Video training materials",
                    "Code snippets and downloads",
                    "Progress tracking dashboard",
                    "Achievement badges",
                    "Certification exams",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Learning Experience
                </h3>
                <ul className="space-y-4">
                  {[
                    "Expert instructor-led training",
                    "Flexible on-demand learning",
                    "Hands-on cloud lab access",
                    "Real-world projects",
                    "24/7 customer support",
                    "Multi-currency payments",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
