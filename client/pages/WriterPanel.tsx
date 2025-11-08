import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Plus, Edit2, Trash2, Eye, EyeOff, Send } from "lucide-react";
import { useState } from "react";

interface Content {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: Date;
  isPublished: boolean;
  status: "draft" | "pending_approval" | "approved" | "rejected";
  reviewNotes?: string;
}

export default function WriterPanel() {
  const { currentUser, hasPermission } = useAuth();
  const [contents, setContents] = useState<Content[]>([
    {
      id: "1",
      title: "AWS EC2 Fundamentals",
      description: "Learn the basics of AWS EC2 instances",
      category: "AWS",
      createdAt: new Date("2024-03-01"),
      isPublished: true,
      status: "approved",
    },
    {
      id: "2",
      title: "Docker Containerization",
      description: "Introduction to Docker and containers",
      category: "DevOps",
      createdAt: new Date("2024-03-05"),
      isPublished: false,
      status: "pending_approval",
    },
    {
      id: "3",
      title: "Kubernetes Basics",
      description: "Getting started with Kubernetes",
      category: "DevOps",
      createdAt: new Date("2024-03-10"),
      isPublished: false,
      status: "draft",
      reviewNotes: "Please add more code examples",
    },
  ]);
  const [showNewContentForm, setShowNewContentForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newContent, setNewContent] = useState({
    title: "",
    description: "",
    category: "AWS",
  });

  if (!hasPermission("create")) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Access Denied
            </h1>
            <p className="text-slate-600">Only writers can access this panel</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePublish = (id: string) => {
    setContents((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, isPublished: true, status: "pending_approval" }
          : item,
      ),
    );
  };

  const handleDelete = (id: string) => {
    setContents((items) => items.filter((item) => item.id !== id));
  };

  const handleAddContent = () => {
    const id = Date.now().toString();
    setContents([
      ...contents,
      {
        id,
        ...newContent,
        createdAt: new Date(),
        isPublished: false,
        status: "draft",
      },
    ]);
    setNewContent({ title: "", description: "", category: "AWS" });
    setShowNewContentForm(false);
  };

  const statusColors: Record<string, string> = {
    draft: "bg-slate-100 text-slate-700",
    pending_approval: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const stats = [
    { label: "Total Content", value: contents.length },
    { label: "Published", value: contents.filter((c) => c.isPublished).length },
    {
      label: "Pending Review",
      value: contents.filter((c) => c.status === "pending_approval").length,
    },
    {
      label: "Drafts",
      value: contents.filter((c) => c.status === "draft").length,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Content Management
            </h1>
            <p className="text-slate-600">
              Create, edit, and manage your course content
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200"
              >
                <p className="text-slate-600 text-sm font-medium mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Add Content Form */}
          {showNewContentForm && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Create New Content
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <Input
                    value={newContent.title}
                    onChange={(e) =>
                      setNewContent({ ...newContent, title: e.target.value })
                    }
                    placeholder="Content title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={newContent.description}
                    onChange={(e) =>
                      setNewContent({
                        ...newContent,
                        description: e.target.value,
                      })
                    }
                    placeholder="Content description"
                    rows={4}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newContent.category}
                    onChange={(e) =>
                      setNewContent({ ...newContent, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>AWS</option>
                    <option>Azure</option>
                    <option>GCP</option>
                    <option>DevOps</option>
                    <option>Development</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleAddContent}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Save Draft
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowNewContentForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Content List */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
                Your Content
              </h2>
              <Button
                onClick={() => setShowNewContentForm(true)}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Content
              </Button>
            </div>

            <div className="space-y-4 p-6">
              {contents.map((content) => (
                <div
                  key={content.id}
                  className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-slate-900">
                        {content.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {content.description}
                      </p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-700 rounded">
                          {content.category}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${
                            statusColors[content.status]
                          }`}
                        >
                          {content.status
                            .replace("_", " ")
                            .charAt(0)
                            .toUpperCase() +
                            content.status.replace("_", " ").slice(1)}
                        </span>
                        {content.isPublished && (
                          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded">
                            Published
                          </span>
                        )}
                        <span className="text-xs text-slate-500">
                          {content.createdAt.toLocaleDateString()}
                        </span>
                      </div>

                      {content.reviewNotes && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                          <p className="text-xs font-semibold text-yellow-800 mb-1">
                            Review Notes:
                          </p>
                          <p className="text-sm text-yellow-700">
                            {content.reviewNotes}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {!content.isPublished && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8"
                          onClick={() => handlePublish(content.id)}
                          title="Submit for approval"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                      {content.isPublished && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-blue-600"
                          title="Unpublish"
                        >
                          <EyeOff className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-red-600"
                        onClick={() => handleDelete(content.id)}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
