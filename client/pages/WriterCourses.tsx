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
  BookOpen,
  Send,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

interface Lesson {
  id: string;
  title: string;
  order: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: "AWS" | "Azure" | "GCP" | "DevOps" | "Development";
  lessons: Lesson[];
  status: "draft" | "pending_approval" | "approved" | "published";
  createdAt: Date;
  updatedAt: Date;
}

export default function WriterCourses() {
  const { hasPermission } = useAuth();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "AWS Cloud Fundamentals",
      description: "Complete AWS fundamentals course",
      category: "AWS",
      lessons: [
        { id: "l1", title: "Introduction to AWS", order: 1 },
        { id: "l2", title: "EC2 Instances", order: 2 },
        { id: "l3", title: "S3 Storage", order: 3 },
      ],
      status: "published",
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-03-01"),
    },
    {
      id: "2",
      title: "DevOps Essentials",
      description: "Learn DevOps practices and tools",
      category: "DevOps",
      lessons: [
        { id: "l4", title: "CI/CD Pipelines", order: 1 },
        { id: "l5", title: "Docker Basics", order: 2 },
      ],
      status: "pending_approval",
      createdAt: new Date("2024-03-05"),
      updatedAt: new Date("2024-03-15"),
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set(),
  );
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "AWS" as const,
  });
  const [newLesson, setNewLesson] = useState({ title: "" });
  const [addingLessonTo, setAddingLessonTo] = useState<string | null>(null);

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
            <p className="text-slate-600">Only writers can create courses</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateCourse = () => {
    if (newCourse.title.trim()) {
      setCourses([
        ...courses,
        {
          id: `course-${Date.now()}`,
          ...newCourse,
          lessons: [],
          status: "draft",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      setNewCourse({
        title: "",
        description: "",
        category: "AWS",
      });
      setShowCreateModal(false);
    }
  };

  const handleAddLesson = (courseId: string) => {
    if (newLesson.title.trim()) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === courseId
            ? {
                ...course,
                lessons: [
                  ...course.lessons,
                  {
                    id: `lesson-${Date.now()}`,
                    title: newLesson.title,
                    order: course.lessons.length + 1,
                  },
                ],
                updatedAt: new Date(),
              }
            : course,
        ),
      );
      setNewLesson({ title: "" });
      setAddingLessonTo(null);
    }
  };

  const handleDeleteLesson = (courseId: string, lessonId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              lessons: course.lessons.filter((l) => l.id !== lessonId),
              updatedAt: new Date(),
            }
          : course,
      ),
    );
  };

  const handlePublishCourse = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, status: "pending_approval", updatedAt: new Date() }
          : course,
      ),
    );
  };

  const toggleCourseExpanded = (courseId: string) => {
    setExpandedCourses((prev) => {
      const next = new Set(prev);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
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
              Course Management
            </h1>
            <p className="text-slate-600">Create and manage your courses</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Your Courses
                </h2>
                <Input
                  placeholder="Search courses..."
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
                New Course
              </Button>
            </div>

            <div className="divide-y divide-slate-200">
              {filteredCourses.map((course) => (
                <div key={course.id} className="hover:bg-slate-50 transition-colors">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <button
                          onClick={() => toggleCourseExpanded(course.id)}
                          className="flex items-center gap-2 mb-2"
                        >
                          {expandedCourses.has(course.id) ? (
                            <ChevronDown className="w-4 h-4 text-slate-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600" />
                          )}
                          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                            {course.title}
                          </h3>
                        </button>
                        <p className="text-slate-600 text-sm mt-1 ml-6">
                          {course.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        {course.status === "draft" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 text-blue-600"
                            onClick={() => handlePublishCourse(course.id)}
                            title="Submit for approval"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 text-red-600"
                          onClick={() =>
                            setCourses(
                              courses.filter((c) => c.id !== course.id),
                            )
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-3 ml-6">
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-purple-100 text-purple-700">
                        {course.category}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${statusColors[course.status]}`}
                      >
                        {course.status.replace("_", " ")}
                      </span>
                      <span className="text-xs text-slate-600">
                        {course.lessons.length} lesson
                        {course.lessons.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Lessons List */}
                  {expandedCourses.has(course.id) && (
                    <div className="bg-slate-50 border-t border-slate-200 p-6 ml-6 space-y-3">
                      <h4 className="font-semibold text-slate-900 mb-4">
                        Lessons
                      </h4>
                      {course.lessons.length > 0 ? (
                        <div className="space-y-2">
                          {course.lessons.map((lesson) => (
                            <div
                              key={lesson.id}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200"
                            >
                              <div className="flex-1">
                                <p className="font-medium text-slate-900">
                                  {lesson.order}. {lesson.title}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteLesson(course.id, lesson.id)
                                }
                                className="p-2 hover:bg-red-50 rounded text-red-600"
                                title="Delete lesson"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-600">
                          No lessons yet
                        </p>
                      )}

                      {addingLessonTo === course.id ? (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-200">
                          <Input
                            placeholder="Lesson title"
                            value={newLesson.title}
                            onChange={(e) =>
                              setNewLesson({
                                title: e.target.value,
                              })
                            }
                            className="h-10 flex-1"
                          />
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleAddLesson(course.id)}
                          >
                            Add
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setAddingLessonTo(null);
                              setNewLesson({ title: "" });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-4"
                          onClick={() => setAddingLessonTo(course.id)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Lesson
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Create New Course
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Title *
                </label>
                <Input
                  placeholder="Course title"
                  value={newCourse.title}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, title: e.target.value })
                  }
                  className="h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Description
                </label>
                <textarea
                  placeholder="Course description"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Category
                </label>
                <select
                  value={newCourse.category}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      category: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg"
                >
                  <option value="AWS">AWS</option>
                  <option value="Azure">Azure</option>
                  <option value="GCP">GCP</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Development">Development</option>
                </select>
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
                onClick={handleCreateCourse}
              >
                Create Course
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
