import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Award, Zap } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description:
        "Committed to delivering the highest quality training and education",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building a supportive community of learners and professionals",
    },
    {
      icon: Zap,
      title: "Innovation",
      description:
        "Constantly evolving with the latest technologies and best practices",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="container mx-auto">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">About Us</h1>
            <p className="text-xl text-slate-600">
              Empowering professionals with world-class cloud training
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Skills Enhance is dedicated to providing accessible, high-quality
              cloud training to professionals, students, and corporations
              worldwide. We believe that everyone deserves the opportunity to
              master cloud technologies and advance their careers.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Through our comprehensive lab exercises, certification
              preparation, and expert instruction, we're transforming how people
              learn and master cloud computing.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
              Our Values
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Highlights Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-12">
              Why Choose Us
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Expert Instructors",
                  desc: "Learn from industry professionals with real-world experience",
                },
                {
                  title: "Hands-On Labs",
                  desc: "Practice with real cloud environments and practical scenarios",
                },
                {
                  title: "Comprehensive Curriculum",
                  desc: "Cover all major cloud platforms: AWS, Azure, GCP, and more",
                },
                {
                  title: "Certification Ready",
                  desc: "Prepare for and pass industry-recognized certifications",
                },
                {
                  title: "Flexible Learning",
                  desc: "Learn at your own pace with on-demand videos and instructor-led sessions",
                },
                {
                  title: "Career Support",
                  desc: "Get guidance on resumes, interviews, and career advancement",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-600">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Join Our Community Today
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Start your journey towards cloud mastery and career advancement
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              Get Started Now
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
