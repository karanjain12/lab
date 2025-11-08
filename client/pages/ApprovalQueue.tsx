import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Check, X, MessageSquare, Eye } from "lucide-react";
import { useState } from "react";

interface PendingContent {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  submittedAt: Date;
  status: "pending" | "approved" | "rejected";
  content: string;
}

export default function ApprovalQueue() {
  const { hasPermission } = useAuth();
  const [pendingContents, setPendingContents] = useState<PendingContent[]>([
    {
      id: "1",
      title: "Docker Containerization",
      description: "Introduction to Docker and containers",
      category: "DevOps",
      author: "Sarah Writer",
      submittedAt: new Date("2024-03-10"),
      status: "pending",
      content: "This is a comprehensive guide to Docker containerization...",
    },
    {
      id: "2",
      title: "Kubernetes Advanced Topics",
      description: "Deep dive into Kubernetes cluster management",
      category: "DevOps",
      author: "Sarah Writer",
      submittedAt: new Date("2024-03-09"),
      status: "pending",
      content: "Learn advanced Kubernetes concepts including operators...",
    },
    {
      id: "3",
      title: "Azure Storage Solutions",
      description: "Understanding Azure storage options",
      category: "Azure",
      author: "John Developer",
      submittedAt: new Date("2024-03-08"),
      status: "pending",
      content:
        "Compare different Azure storage solutions and when to use them...",
    },
  ]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [showCommentForm, setShowCommentForm] = useState<string | null>(null);

  if (!hasPermission("approve")) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Access Denied
            </h1>
            <p className="text-slate-600">
              Only approvers can access this panel
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleApprove = (id: string) => {
    setPendingContents((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "approved" } : item,
      ),
    );
    setSelectedId(null);
  };

  const handleReject = (id: string) => {
    setPendingContents((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: "rejected" } : item,
      ),
    );
    setSelectedId(null);
  };

  const pendingItems = pendingContents.filter((c) => c.status === "pending");
  const approvedItems = pendingContents.filter((c) => c.status === "approved");
  const rejectedItems = pendingContents.filter((c) => c.status === "rejected");

  const stats = [
    { label: "Pending Review", value: pendingItems.length, color: "yellow" },
    { label: "Approved", value: approvedItems.length, color: "green" },
    { label: "Rejected", value: rejectedItems.length, color: "red" },
  ];

  const colorClasses: Record<string, string> = {
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    red: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Content Approval Queue
            </h1>
            <p className="text-slate-600">
              Review and approve content submissions from writers
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-xl shadow-sm border border-slate-200 ${
                  colorClasses[stat.color]
                }`}
              >
                <p className="text-sm font-medium mb-1 opacity-75">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Pending Items */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">
              Pending Submissions ({pendingItems.length})
            </h2>

            {pendingItems.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
                <p className="text-slate-600 text-lg">
                  No pending submissions to review
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingItems.map((content) => (
                  <div
                    key={content.id}
                    className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() =>
                        setSelectedId(
                          selectedId === content.id ? null : content.id,
                        )
                      }
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900">
                            {content.title}
                          </h3>
                          <p className="text-slate-600 text-sm mt-1">
                            {content.description}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                          Pending
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-slate-600">
                        <span>By: {content.author}</span>
                        <span>Category: {content.category}</span>
                        <span>
                          Submitted: {content.submittedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {selectedId === content.id && (
                      <div className="border-t border-slate-200 p-6 bg-slate-50">
                        <div className="mb-6">
                          <h4 className="font-bold text-slate-900 mb-3">
                            Content Preview
                          </h4>
                          <div className="bg-white p-4 rounded border border-slate-300">
                            <p className="text-slate-700">{content.content}</p>
                          </div>
                        </div>

                        {showCommentForm === content.id && (
                          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h4 className="font-bold text-slate-900 mb-3">
                              Add Review Notes
                            </h4>
                            <textarea
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              placeholder="Enter your feedback or reason for rejection..."
                              rows={4}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => setShowCommentForm(null)}
                              >
                                Done
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setShowCommentForm(null);
                                  setReviewComment("");
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-3">
                          <Button
                            onClick={() => handleApprove(content.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2"
                          >
                            <Check className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(content.id)}
                            className="flex-1 bg-red-600 hover:bg-red-700 flex items-center justify-center gap-2"
                          >
                            <X className="w-4 h-4" />
                            Reject
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() =>
                              setShowCommentForm(
                                showCommentForm === content.id
                                  ? null
                                  : content.id,
                              )
                            }
                            className="flex items-center justify-center gap-2"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Add Notes
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Approved & Rejected Sections */}
          <div className="mt-12 space-y-6">
            {approvedItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Approved ({approvedItems.length})
                </h2>
                <div className="space-y-3">
                  {approvedItems.map((content) => (
                    <div
                      key={content.id}
                      className="bg-white rounded-lg p-4 border border-green-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {content.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            By: {content.author}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
                          Approved
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {rejectedItems.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Rejected ({rejectedItems.length})
                </h2>
                <div className="space-y-3">
                  {rejectedItems.map((content) => (
                    <div
                      key={content.id}
                      className="bg-white rounded-lg p-4 border border-red-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-slate-900">
                            {content.title}
                          </h4>
                          <p className="text-sm text-slate-600 mt-1">
                            By: {content.author}
                          </p>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                          Rejected
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
