import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  Lock,
  Clock,
  Send,
  X,
  Bold,
  Italic,
  Code,
  Image,
  FileText,
} from "lucide-react";
import { useState } from "react";

interface Lab {
  id: string;
  title: string;
  description: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  format: "manual" | "video" | "challenge" | "instructor-led";
  content: string;
  status: "draft" | "pending_approval" | "approved" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export default function WriterLabs() {
  const { currentUser, hasPermission } = useAuth();
  const [labs, setLabs] = useState<Lab[]>([
    {
      id: "1",
      title: "AWS EC2 Deployment",
      description: "Learn to deploy applications on EC2 instances",
      skillLevel: "beginner",
      estimatedTime: 120,
      format: "manual",
      content: "# AWS EC2 Deployment Guide\n\nStep-by-step instructions...",
      status: "published",
      createdAt: new Date("2024-03-01"),
      updatedAt: new Date("2024-03-05"),
    },
    {
      id: "2",
      title: "Kubernetes Advanced",
      description: "Advanced Kubernetes cluster management",
      skillLevel: "advanced",
      estimatedTime: 240,
      format: "video",
      content: "# Kubernetes Advanced Topics\n\nCluster management...",
      status: "pending_approval",
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-15"),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingLabId, setEditingLabId] = useState<string | null>(null);
  const [newLab, setNewLab] = useState({
    title: "",
    description: "",
    skillLevel: "beginner" as const,
    estimatedTime: 120,
    format: "manual" as const,
    content: "",
  });

  if (!hasPermission("create")) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Access Denied
            </h1>
            <p className="text-slate-600">Only writers can create labs</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredLabs = labs.filter(
    (lab) =>
      lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lab.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateLab = () => {
    if (newLab.title.trim()) {
      setLabs([
        ...labs,
        {
          id: `lab-${Date.now()}`,
          ...newLab,
          status: "draft",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      setNewLab({
        title: "",
        description: "",
        skillLevel: "beginner",
        estimatedTime: 120,
        format: "manual",
        content: "",
      });
      setShowCreateModal(false);
    }
  };

  const handleEditLab = (labId: string) => {
    const lab = labs.find((l) => l.id === labId);
    if (lab) {
      setEditingLabId(labId);
      setNewLab({
        title: lab.title,
        description: lab.description,
        skillLevel: lab.skillLevel,
        estimatedTime: lab.estimatedTime,
        format: lab.format,
        content: lab.content,
      });
      setShowEditorModal(true);
    }
  };

  const handleSaveLabContent = () => {
    if (editingLabId && newLab.title.trim()) {
      setLabs((prevLabs) =>
        prevLabs.map((lab) =>
          lab.id === editingLabId
            ? { ...lab, ...newLab, updatedAt: new Date() }
            : lab,
        ),
      );
      setEditingLabId(null);
      setNewLab({
        title: "",
        description: "",
        skillLevel: "beginner",
        estimatedTime: 120,
        format: "manual",
        content: "",
      });
      setShowEditorModal(false);
    }
  };

  const handlePublishLab = (id: string) => {
    setLabs((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, status: "pending_approval", updatedAt: new Date() }
          : item,
      ),
    );
  };

  const handleDeleteLab = (id: string) => {
    setLabs(labs.filter((lab) => lab.id !== id));
  };

  const skillLevelColors = {
    beginner: "bg-green-100 text-green-700",
    intermediate: "bg-yellow-100 text-yellow-700",
    advanced: "bg-red-100 text-red-700",
  };

  const statusColors = {
    draft: "bg-slate-100 text-slate-700",
    pending_approval: "bg-yellow-100 text-yellow-700",
    approved: "bg-blue-100 text-blue-700",
    published: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Lab Management
            </h1>
            <p className="text-slate-600">Create and manage your lab content</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Your Labs
                </h2>
                <Input
                  placeholder="Search labs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-md h-10"
                />
              </div>
              <Button
                onClick={() => setShowCreateModal(true)}
                className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                New Lab
              </Button>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredLabs.map((lab) => (
                <div
                  key={lab.id}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900">
                        {lab.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {lab.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => handleEditLab(lab.id)}
                        title="Edit lab content"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {lab.status === "draft" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-blue-600"
                          onClick={() => handlePublishLab(lab.id)}
                          title="Submit for approval"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-red-600"
                        onClick={() => handleDeleteLab(lab.id)}
                        title="Delete lab"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${skillLevelColors[lab.skillLevel]}`}
                    >
                      {lab.skillLevel.charAt(0).toUpperCase() +
                        lab.skillLevel.slice(1)}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[lab.status]}`}
                    >
                      {lab.status.replace("_", " ").charAt(0).toUpperCase() +
                        lab.status.replace("_", " ").slice(1)}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <Clock className="w-3 h-3" />
                      {lab.estimatedTime} min
                    </div>
                    <span className="text-xs text-slate-500">
                      Format: {lab.format}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Content Editor Modal */}
      {showEditorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-slate-900">Edit Lab</h3>
              <button
                onClick={() => {
                  setShowEditorModal(false);
                  setEditingLabId(null);
                }}
                className="p-1 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto flex-1 p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Title *
                </label>
                <Input
                  placeholder="Lab title"
                  value={newLab.title}
                  onChange={(e) =>
                    setNewLab({ ...newLab, title: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Lab description"
                  value={newLab.description}
                  onChange={(e) =>
                    setNewLab({ ...newLab, description: e.target.value })
                  }
                  rows={2}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={newLab.skillLevel}
                    onChange={(e) =>
                      setNewLab({
                        ...newLab,
                        skillLevel: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Format
                  </label>
                  <select
                    value={newLab.format}
                    onChange={(e) =>
                      setNewLab({ ...newLab, format: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="manual">Manual</option>
                    <option value="video">Video</option>
                    <option value="challenge">Challenge</option>
                    <option value="instructor-led">Instructor-Led</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Estimated Time (minutes)
                </label>
                <Input
                  type="number"
                  value={newLab.estimatedTime}
                  onChange={(e) =>
                    setNewLab({
                      ...newLab,
                      estimatedTime: parseInt(e.target.value),
                    })
                  }
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Content
                </label>
                <div className="border border-slate-300 rounded-lg overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-300 p-3 flex flex-wrap gap-2">
                    <button
                      className="p-2 hover:bg-slate-200 rounded text-sm font-medium flex items-center gap-1"
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-slate-200 rounded text-sm font-medium flex items-center gap-1"
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <div className="border-l border-slate-300 mx-1" />
                    <button
                      className="p-2 hover:bg-slate-200 rounded text-sm font-medium flex items-center gap-1"
                      title="Code block"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-slate-200 rounded text-sm font-medium flex items-center gap-1"
                      title="Insert image"
                    >
                      <Image className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-slate-200 rounded text-sm font-medium flex items-center gap-1"
                      title="Insert file"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                  <textarea
                    placeholder="Write your lab content here (supports Markdown)..."
                    value={newLab.content}
                    onChange={(e) =>
                      setNewLab({ ...newLab, content: e.target.value })
                    }
                    rows={10}
                    className="w-full px-4 py-3 focus:outline-none font-mono text-sm"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  💡 Tip: You can use Markdown syntax for formatting
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-slate-200 flex gap-3 justify-end bg-slate-50">
              <Button
                variant="outline"
                onClick={() => {
                  setShowEditorModal(false);
                  setEditingLabId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSaveLabContent}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Create New Lab
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Title *
                </label>
                <Input
                  placeholder="Lab title"
                  value={newLab.title}
                  onChange={(e) =>
                    setNewLab({ ...newLab, title: e.target.value })
                  }
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Lab description"
                  value={newLab.description}
                  onChange={(e) =>
                    setNewLab({ ...newLab, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Skill Level
                  </label>
                  <select
                    value={newLab.skillLevel}
                    onChange={(e) =>
                      setNewLab({
                        ...newLab,
                        skillLevel: e.target.value as any,
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-1">
                    Format
                  </label>
                  <select
                    value={newLab.format}
                    onChange={(e) =>
                      setNewLab({ ...newLab, format: e.target.value as any })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                  >
                    <option value="manual">Manual</option>
                    <option value="video">Video</option>
                    <option value="challenge">Challenge</option>
                    <option value="instructor-led">Instructor-Led</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Estimated Time (minutes)
                </label>
                <Input
                  type="number"
                  value={newLab.estimatedTime}
                  onChange={(e) =>
                    setNewLab({
                      ...newLab,
                      estimatedTime: parseInt(e.target.value),
                    })
                  }
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Initial Content (Optional)
                </label>
                <textarea
                  placeholder="Start with some content..."
                  value={newLab.content}
                  onChange={(e) =>
                    setNewLab({ ...newLab, content: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleCreateLab}
              >
                Create Lab
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
