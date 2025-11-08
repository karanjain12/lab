import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
  Check,
  X,
  Clock,
  Eye,
  Shield,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

interface ApprovalRequest {
  id: string;
  title: string;
  type: "lab" | "course" | "lesson";
  author: string;
  submittedAt: Date;
  status: "pending" | "approved" | "rejected";
  description: string;
  reviewNotes?: string;
}

export default function ApprovalQueue() {
  const { currentUser, hasPermission } = useAuth();
  const [approvalRequests, setApprovalRequests] = useState<ApprovalRequest[]>([
    {
      id: "1",
      title: "AWS EC2 Deployment Lab",
      type: "lab",
      author: "Sarah Writer",
      submittedAt: new Date("2024-03-20"),
      status: "pending",
      description: "Step-by-step guide for deploying applications on EC2",
    },
    {
      id: "2",
      title: "DevOps Course",
      type: "course",
      author: "Sarah Writer",
      submittedAt: new Date("2024-03-19"),
      status: "pending",
      description: "Complete DevOps fundamentals course",
    },
    {
      id: "3",
      title: "Kubernetes Introduction",
      type: "lab",
      author: "John Developer",
      submittedAt: new Date("2024-03-18"),
      status: "approved",
      description: "Introduction to Kubernetes concepts",
      reviewNotes: "Well structured and comprehensive",
    },
    {
      id: "4",
      title: "Docker Advanced",
      type: "lab",
      author: "John Developer",
      submittedAt: new Date("2024-03-15"),
      status: "rejected",
      description: "Advanced Docker topics",
      reviewNotes: "Needs more practical examples. Please revise and resubmit.",
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "pending" | "approved" | "rejected">("all");

  if (!hasPermission("approve")) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
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

  const filteredRequests = approvalRequests.filter((req) => {
    const matchesSearch =
      req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: "Pending Reviews", value: approvalRequests.filter((r) => r.status === "pending").length, color: "blue" },
    { label: "Approved", value: approvalRequests.filter((r) => r.status === "approved").length, color: "green" },
    { label: "Rejected", value: approvalRequests.filter((r) => r.status === "rejected").length, color: "red" },
    { label: "Total Requests", value: approvalRequests.length, color: "purple" },
  ];

  const handleApprove = (requestId: string) => {
    setApprovalRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: "approved", reviewNotes }
          : req,
      ),
    );
    setShowReviewModal(false);
    setReviewNotes("");
    setSelectedRequest(null);
  };

  const handleReject = (requestId: string) => {
    if (!reviewNotes.trim()) {
      alert("Please provide feedback for rejection");
      return;
    }
    setApprovalRequests((prev) =>
      prev.map((req) =>
        req.id === requestId
          ? { ...req, status: "rejected", reviewNotes }
          : req,
      ),
    );
    setShowReviewModal(false);
    setReviewNotes("");
    setSelectedRequest(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "lab":
        return "bg-blue-100 text-blue-700";
      case "course":
        return "bg-purple-100 text-purple-700";
      case "lesson":
        return "bg-orange-100 text-orange-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "rejected":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const selectedData = approvalRequests.find((r) => r.id === selectedRequest);

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const colorClasses: { [key: string]: string } = {
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                red: "bg-red-100 text-red-600",
                purple: "bg-purple-100 text-purple-600",
              };
              return (
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
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Approval Requests List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Submission Queue
                  </h2>
                  <div className="space-y-3">
                    <Input
                      placeholder="Search by title or author..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-10"
                    />
                    <div className="flex gap-2 flex-wrap">
                      {(["all", "pending", "approved", "rejected"] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => setFilterStatus(status)}
                          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                            filterStatus === status
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="divide-y divide-slate-200">
                  {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                      <button
                        key={request.id}
                        onClick={() => {
                          setSelectedRequest(request.id);
                          setReviewNotes(request.reviewNotes || "");
                        }}
                        className={`w-full text-left p-6 transition-all hover:bg-slate-50 border-l-4 ${
                          selectedRequest === request.id
                            ? "bg-blue-50 border-blue-600"
                            : "border-transparent"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3 flex-1">
                            <div className="flex-shrink-0">
                              {getStatusIcon(request.status)}
                            </div>
                            <div className="flex-1">
                              <h3 className="font-bold text-slate-900">
                                {request.title}
                              </h3>
                              <p className="text-sm text-slate-600 mt-1">
                                By {request.author}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${getTypeColor(
                              request.type,
                            )}`}
                          >
                            {request.type}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 line-clamp-2">
                          {request.description}
                        </p>
                        <p className="text-xs text-slate-500 mt-2">
                          Submitted{" "}
                          {request.submittedAt.toLocaleDateString()}
                        </p>
                      </button>
                    ))
                  ) : (
                    <div className="p-12 text-center">
                      <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600">No requests found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Review Panel */}
            <div className="lg:col-span-1">
              {selectedData ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6">
                  <div className="flex items-center gap-2 mb-4">
                    {getStatusIcon(selectedData.status)}
                    <h3 className="font-bold text-slate-900 text-lg flex-1">
                      Details
                    </h3>
                  </div>

                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">
                        Title
                      </p>
                      <p className="text-slate-900 font-medium">
                        {selectedData.title}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">
                        Type
                      </p>
                      <span
                        className={`inline-block text-xs font-semibold px-2 py-1 rounded ${getTypeColor(
                          selectedData.type,
                        )}`}
                      >
                        {selectedData.type}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">
                        Author
                      </p>
                      <p className="text-slate-900 font-medium">
                        {selectedData.author}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">
                        Submitted
                      </p>
                      <p className="text-slate-900 font-medium">
                        {selectedData.submittedAt.toLocaleDateString()} at{" "}
                        {selectedData.submittedAt.toLocaleTimeString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-slate-600 uppercase">
                        Description
                      </p>
                      <p className="text-sm text-slate-600 mt-1">
                        {selectedData.description}
                      </p>
                    </div>
                  </div>

                  {selectedData.status === "pending" ? (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowReviewModal(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setShowReviewModal(true);
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-2">
                          Review Notes
                        </p>
                        <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-sm text-slate-700">
                            {selectedData.reviewNotes || "No notes provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-6 flex flex-col items-center justify-center text-center min-h-96">
                  <Eye className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-600">Select a request to review</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && selectedData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {selectedData.status === "pending"
                ? "Review Submission"
                : "Edit Review"}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-2">
                  Review Notes / Feedback
                </label>
                <textarea
                  placeholder={
                    selectedData.status === "pending"
                      ? "Provide feedback for approval or rejection..."
                      : "Edit your review notes..."
                  }
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewNotes("");
                }}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => handleApprove(selectedData.id)}
              >
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => handleReject(selectedData.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
