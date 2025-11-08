import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BookOpen, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Labs() {
  const [searchTerm, setSearchTerm] = useState("");

  const labCategories = [
    "All",
    "AWS",
    "Azure",
    "GCP",
    "DevOps",
    "Development",
    "Architecture",
  ];

  const sampleLabs = [
    {
      id: 1,
      title: "EC2 Deployment & Management",
      category: "AWS",
      level: "Beginner",
      duration: "4 hours",
      description: "Learn to deploy and manage EC2 instances on AWS",
    },
    {
      id: 2,
      title: "Kubernetes on AKS",
      category: "Azure",
      level: "Intermediate",
      duration: "6 hours",
      description: "Master Kubernetes deployment on Azure Kubernetes Service",
    },
    {
      id: 3,
      title: "GCP Cloud Functions",
      category: "GCP",
      level: "Intermediate",
      duration: "3 hours",
      description: "Build serverless functions on Google Cloud Platform",
    },
    {
      id: 4,
      title: "DevOps CI/CD Pipeline",
      category: "DevOps",
      level: "Advanced",
      duration: "8 hours",
      description: "Create complete CI/CD pipelines with modern tools",
    },
    {
      id: 5,
      title: "Database Design & Optimization",
      category: "Development",
      level: "Intermediate",
      duration: "5 hours",
      description: "Design and optimize database architectures",
    },
    {
      id: 6,
      title: "Microservices Architecture",
      category: "Architecture",
      level: "Advanced",
      duration: "7 hours",
      description: "Design scalable microservices systems",
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
                Guided Lab Exercises
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Structured, hands-on learning paths with step-by-step
                instructions and real-world cloud scenarios.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filter Section */}
        <section className="py-12 px-4 border-b border-slate-200">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search labs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {labCategories.map((category, idx) => (
                <button
                  key={idx}
                  className="px-4 py-2 rounded-lg font-medium text-sm transition-all bg-slate-100 text-slate-700 hover:bg-blue-100 hover:text-blue-700"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Labs Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sampleLabs.map((lab) => (
                <div
                  key={lab.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md hover:border-blue-300 transition-all"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-blue-100 opacity-50" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                        {lab.category}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-700 rounded-full">
                        {lab.level}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {lab.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4">
                      {lab.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                      <span>⏱️ {lab.duration}</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Start Lab
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-blue-50 border-y border-blue-200">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Need more guidance?
            </h2>
            <p className="text-slate-600 mb-6">
              Our instructors are ready to help you with live training sessions
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Schedule Instructor-Led Training
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
