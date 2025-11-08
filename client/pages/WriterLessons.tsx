import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Edit2,
  Trash2,
  Lock,
  BookMarked,
  X,
  Bold,
  Italic,
  Code as CodeIcon,
  Image as ImageIcon,
  FileText,
  Send,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import ContentSectionEditor from "@/components/ContentSectionEditor";
import { ContentSection, LessonWithSections } from "@shared/api";

interface Lesson extends LessonWithSections {
  // Extending with additional UI properties
  sections: ContentSection[];
}

export default function WriterLessons() {
  const { hasPermission } = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      courseId: "1",
      title: "Introduction to AWS",
      content: "Learn AWS basics",
      order: 1,
      status: "published",
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-05"),
    },
    {
      id: "2",
      courseId: "1",
      title: "EC2 Instances",
      content: "Understand EC2 architecture",
      order: 2,
      status: "draft",
      createdAt: new Date("2024-02-10"),
      updatedAt: new Date("2024-03-10"),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditorModal, setShowEditorModal] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    courseId: "1",
    sections: [] as ContentSection[],
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
            <p className="text-slate-600">Only writers can create lessons</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateLesson = () => {
    if (newLesson.title.trim()) {
      setLessons([
        ...lessons,
        {
          id: `lesson-${Date.now()}`,
          courseId: newLesson.courseId,
          title: newLesson.title,
          content: newLesson.content,
          order:
            lessons.filter((l) => l.courseId === newLesson.courseId).length + 1,
          status: "draft",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      setNewLesson({
        title: "",
        content: "",
        courseId: "1",
      });
      setShowCreateModal(false);
    }
  };

  const handleEditLesson = (lessonId: string) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (lesson) {
      setEditingLessonId(lessonId);
      setNewLesson({
        title: lesson.title,
        content: lesson.content,
        courseId: lesson.courseId,
      });
      setShowEditorModal(true);
    }
  };

  const handleSaveLessonContent = () => {
    if (editingLessonId && newLesson.title.trim()) {
      setLessons((prevLessons) =>
        prevLessons.map((lesson) =>
          lesson.id === editingLessonId
            ? {
                ...lesson,
                title: newLesson.title,
                content: newLesson.content,
                updatedAt: new Date(),
              }
            : lesson,
        ),
      );
      setEditingLessonId(null);
      setNewLesson({
        title: "",
        content: "",
        courseId: "1",
      });
      setShowEditorModal(false);
    }
  };

  const handlePublishLesson = (lessonId: string) => {
    setLessons((prevLessons) =>
      prevLessons.map((lesson) =>
        lesson.id === lessonId
          ? { ...lesson, status: "published", updatedAt: new Date() }
          : lesson,
      ),
    );
  };

  const statusColors = {
    draft: "bg-slate-100 text-slate-700",
    published: "bg-green-100 text-green-700",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Lesson Management
            </h1>
            <p className="text-slate-600">Create and manage course lessons</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Your Lessons
                </h2>
                <Input
                  placeholder="Search lessons..."
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
                New Lesson
              </Button>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredLessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-6 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                        <BookMarked className="w-5 h-5 text-blue-600" />
                        {lesson.title}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        {lesson.content}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8"
                        onClick={() => handleEditLesson(lesson.id)}
                        title="Edit lesson content"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      {lesson.status === "draft" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-blue-600"
                          onClick={() => handlePublishLesson(lesson.id)}
                          title="Publish lesson"
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-red-600"
                        onClick={() =>
                          setLessons(lessons.filter((l) => l.id !== lesson.id))
                        }
                        title="Delete lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[lesson.status]}`}
                    >
                      {lesson.status}
                    </span>
                    <span className="text-xs text-slate-600">
                      Order: {lesson.order}
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
              <h3 className="text-2xl font-bold text-slate-900">Edit Lesson</h3>
              <button
                onClick={() => {
                  setShowEditorModal(false);
                  setEditingLessonId(null);
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
                  placeholder="Lesson title"
                  value={newLesson.title}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, title: e.target.value })
                  }
                  className="h-10"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Course
                </label>
                <select
                  value={newLesson.courseId}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, courseId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">AWS Cloud Fundamentals</option>
                  <option value="2">DevOps Essentials</option>
                </select>
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
                    placeholder="Write your lesson content here (supports Markdown)..."
                    value={newLesson.content}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, content: e.target.value })
                    }
                    rows={12}
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
                  setEditingLessonId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSaveLessonContent}
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
              Create New Lesson
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Title *
                </label>
                <Input
                  placeholder="Lesson title"
                  value={newLesson.title}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, title: e.target.value })
                  }
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Content
                </label>
                <textarea
                  placeholder="Lesson content"
                  value={newLesson.content}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, content: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Course
                </label>
                <select
                  value={newLesson.courseId}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, courseId: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="1">AWS Cloud Fundamentals</option>
                  <option value="2">DevOps Essentials</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Initial Content (Optional)
                </label>
                <textarea
                  placeholder="Start with some content..."
                  value={newLesson.content}
                  onChange={(e) =>
                    setNewLesson({ ...newLesson, content: e.target.value })
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
                onClick={handleCreateLesson}
              >
                Create Lesson
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
