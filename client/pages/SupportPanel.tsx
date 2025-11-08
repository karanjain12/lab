import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import {
  MessageCircle,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle,
  Send,
  Eye,
  Mail,
  Phone,
  Plus,
  X,
} from "lucide-react";
import { useState } from "react";

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  category: "technical" | "billing" | "account" | "course" | "other";
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdAt: Date;
  updatedAt: Date;
  messages: TicketMessage[];
}

interface TicketMessage {
  id: string;
  sender: string;
  senderType: "user" | "support";
  message: string;
  timestamp: Date;
}

export default function SupportPanel() {
  const { currentUser, hasPermission } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      userId: "5",
      userName: "Alice User",
      userEmail: "alice@example.com",
      subject: "Cannot access AWS lab",
      category: "technical",
      priority: "high",
      status: "open",
      createdAt: new Date("2024-03-20T10:00:00"),
      updatedAt: new Date("2024-03-20T10:00:00"),
      messages: [
        {
          id: "m1",
          sender: "Alice User",
          senderType: "user",
          message:
            "I'm unable to access the AWS EC2 lab. Getting a 403 error.",
          timestamp: new Date("2024-03-20T10:00:00"),
        },
      ],
    },
    {
      id: "2",
      userId: "5",
      userName: "Alice User",
      userEmail: "alice@example.com",
      subject: "Question about billing",
      category: "billing",
      priority: "medium",
      status: "in_progress",
      createdAt: new Date("2024-03-19T14:30:00"),
      updatedAt: new Date("2024-03-20T09:15:00"),
      messages: [
        {
          id: "m2",
          sender: "Alice User",
          senderType: "user",
          message: "Why am I being charged twice for the same course?",
          timestamp: new Date("2024-03-19T14:30:00"),
        },
        {
          id: "m3",
          sender: "Support Agent",
          senderType: "support",
          message: "We're looking into this. Can you provide your invoice number?",
          timestamp: new Date("2024-03-19T15:45:00"),
        },
      ],
    },
    {
      id: "3",
      userId: "5",
      userName: "Alice User",
      userEmail: "alice@example.com",
      subject: "Certificate not received",
      category: "course",
      priority: "medium",
      status: "resolved",
      createdAt: new Date("2024-03-18T11:20:00"),
      updatedAt: new Date("2024-03-19T13:00:00"),
      messages: [
        {
          id: "m4",
          sender: "Alice User",
          senderType: "user",
          message:
            "I completed the AWS course but haven't received my certificate yet.",
          timestamp: new Date("2024-03-18T11:20:00"),
        },
        {
          id: "m5",
          sender: "Support Agent",
          senderType: "support",
          message: "Certificates are issued within 24 hours. Let me check your account.",
          timestamp: new Date("2024-03-18T12:30:00"),
        },
        {
          id: "m6",
          sender: "Support Agent",
          senderType: "support",
          message: "Certificate has been issued and sent to your email.",
          timestamp: new Date("2024-03-19T13:00:00"),
        },
      ],
    },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "open" | "in_progress" | "resolved" | "closed">("all");
  const [filterPriority, setFilterPriority] = useState<"all" | "low" | "medium" | "high">("all");

  if (!hasPermission("supportChat")) {
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
              Only support staff can access this panel
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority = filterPriority === "all" || ticket.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const stats = [
    { label: "Open Tickets", value: tickets.filter((t) => t.status === "open").length, color: "red" },
    { label: "In Progress", value: tickets.filter((t) => t.status === "in_progress").length, color: "orange" },
    { label: "Resolved", value: tickets.filter((t) => t.status === "resolved").length, color: "green" },
    { label: "Total Tickets", value: tickets.length, color: "blue" },
  ];

  const handleSendMessage = (ticketId: string) => {
    if (!newMessage.trim()) return;

    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  id: `m${Date.now()}`,
                  sender: currentUser?.name || "Support Agent",
                  senderType: "support",
                  message: newMessage,
                  timestamp: new Date(),
                },
              ],
              updatedAt: new Date(),
              status: ticket.status === "open" ? "in_progress" : ticket.status,
            }
          : ticket,
      ),
    );
    setNewMessage("");
  };

  const handleUpdateStatus = (ticketId: string, newStatus: "open" | "in_progress" | "resolved" | "closed") => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus, updatedAt: new Date() }
          : ticket,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-700";
      case "in_progress":
        return "bg-orange-100 text-orange-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-blue-100 text-blue-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-red-100 text-red-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const selectedData = tickets.find((t) => t.id === selectedTicket);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Support Panel
            </h1>
            <p className="text-slate-600">
              Manage user support tickets and inquiries
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => {
              const colorClasses: { [key: string]: string } = {
                blue: "bg-blue-100 text-blue-600",
                red: "bg-red-100 text-red-600",
                orange: "bg-orange-100 text-orange-600",
                green: "bg-green-100 text-green-600",
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
            {/* Tickets List */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  Tickets
                </h2>
                <div className="space-y-3">
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10"
                  />
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 block">
                      Status
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-600 block">
                      Priority
                    </label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm"
                    >
                      <option value="all">All Priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="divide-y divide-slate-200 overflow-y-auto flex-1">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <button
                      key={ticket.id}
                      onClick={() => setSelectedTicket(ticket.id)}
                      className={`w-full text-left p-4 transition-all hover:bg-slate-50 border-l-4 ${
                        selectedTicket === ticket.id
                          ? "bg-blue-50 border-blue-600"
                          : "border-transparent"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        <div className="flex-shrink-0">
                          {getStatusIcon(ticket.status)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-slate-900 truncate text-sm">
                            {ticket.subject}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {ticket.userName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-2">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                            ticket.status,
                          )}`}
                        >
                          {ticket.status.replace("_", " ")}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(
                            ticket.priority,
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <MessageCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-sm text-slate-600">No tickets found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Ticket Details & Chat */}
            <div className="lg:col-span-2">
              {selectedData ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[600px]">
                  {/* Ticket Header */}
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {selectedData.subject}
                        </h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Ticket #{selectedData.id} • Created{" "}
                          {selectedData.createdAt.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-2 mb-2">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                              selectedData.status,
                            )}`}
                          >
                            {selectedData.status.replace("_", " ")}
                          </span>
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${getPriorityColor(
                              selectedData.priority,
                            )}`}
                          >
                            {selectedData.priority}
                          </span>
                        </div>
                        <select
                          value={selectedData.status}
                          onChange={(e) =>
                            handleUpdateStatus(
                              selectedData.id,
                              e.target.value as any,
                            )
                          }
                          className="text-xs px-2 py-1 border border-slate-300 rounded"
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-200">
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          From
                        </p>
                        <p className="text-sm text-slate-900 font-medium">
                          {selectedData.userName}
                        </p>
                        <p className="text-xs text-slate-600">
                          {selectedData.userEmail}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase">
                          Category
                        </p>
                        <p className="text-sm text-slate-900 font-medium capitalize">
                          {selectedData.category}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {selectedData.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${
                          msg.senderType === "user"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-xs px-4 py-3 rounded-lg ${
                            msg.senderType === "user"
                              ? "bg-slate-100 text-slate-900"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          <p className="font-semibold text-xs mb-1">
                            {msg.sender}
                          </p>
                          <p className="text-sm">{msg.message}</p>
                          <p
                            className={`text-xs mt-2 ${
                              msg.senderType === "user"
                                ? "text-slate-600"
                                : "text-blue-100"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  {selectedData.status !== "closed" && (
                    <div className="border-t border-slate-200 p-4 bg-slate-50">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Type your response..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              handleSendMessage(selectedData.id);
                            }
                          }}
                          className="h-10 flex-1"
                        />
                        <Button
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                          onClick={() => handleSendMessage(selectedData.id)}
                        >
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex flex-col items-center justify-center text-center h-[600px]">
                  <MessageCircle className="w-12 h-12 text-slate-300 mb-4" />
                  <p className="text-slate-600">Select a ticket to view details</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
