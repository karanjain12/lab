import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { Send, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";

interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: Date;
}

export default function SupportPanel() {
  const { currentUser, hasPermission } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: "1",
      userId: "5",
      userName: "Alice User",
      subject: "Lab access issue",
      description: "Cannot access the AWS EC2 lab",
      status: "open",
      priority: "high",
      createdAt: new Date("2024-03-10"),
      updatedAt: new Date("2024-03-10"),
      messages: [
        {
          id: "m1",
          senderId: "5",
          senderName: "Alice User",
          senderRole: "user",
          text: "I'm unable to access the AWS EC2 lab. Getting a 403 error.",
          timestamp: new Date("2024-03-10 10:00"),
        },
      ],
    },
    {
      id: "2",
      userId: "1",
      userName: "Karan Jain",
      subject: "Certificate verification",
      description: "Need to verify my certificate",
      status: "in_progress",
      priority: "medium",
      createdAt: new Date("2024-03-09"),
      updatedAt: new Date("2024-03-10"),
      messages: [
        {
          id: "m2",
          senderId: "1",
          senderName: "Karan Jain",
          senderRole: "user",
          text: "How can I verify my AWS certification?",
          timestamp: new Date("2024-03-09 14:30"),
        },
        {
          id: "m3",
          senderId: "4",
          senderName: "Mike Support",
          senderRole: "support",
          text: "You can verify certificates through your dashboard under Achievements.",
          timestamp: new Date("2024-03-09 15:15"),
        },
      ],
    },
    {
      id: "3",
      userId: "2",
      userName: "Sarah Writer",
      subject: "Content approval delay",
      description: "Waiting for approval on my latest content",
      status: "resolved",
      priority: "low",
      createdAt: new Date("2024-03-08"),
      updatedAt: new Date("2024-03-09"),
      messages: [],
    },
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId);

  const handleReply = () => {
    if (!selectedTicket || !replyText.trim()) return;

    setTickets((tickets) =>
      tickets.map((ticket) =>
        ticket.id === selectedTicketId
          ? {
              ...ticket,
              messages: [
                ...ticket.messages,
                {
                  id: `m${Date.now()}`,
                  senderId: currentUser?.id || "0",
                  senderName: currentUser?.name || "Unknown",
                  senderRole: currentUser?.role || "user",
                  text: replyText,
                  timestamp: new Date(),
                },
              ],
              updatedAt: new Date(),
            }
          : ticket,
      ),
    );
    setReplyText("");
  };

  const handleStatusChange = (ticketId: string, newStatus: string) => {
    setTickets((tickets) =>
      tickets.map((ticket) =>
        ticket.id === ticketId
          ? { ...ticket, status: newStatus as SupportTicket["status"] }
          : ticket,
      ),
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "resolved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-100 text-red-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "resolved":
        return "bg-green-100 text-green-700";
      case "closed":
        return "bg-slate-100 text-slate-700";
      default:
        return "";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        <div className="bg-gradient-to-br from-blue-50 to-slate-50 py-12 px-4 border-b">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Support System
            </h1>
            <p className="text-slate-600">
              Manage and respond to user support tickets
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tickets List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-4 border-b border-slate-200">
                  <h2 className="font-bold text-slate-900">Support Tickets</h2>
                </div>

                <div className="divide-y divide-slate-200 max-h-[600px] overflow-y-auto">
                  {tickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`p-4 cursor-pointer transition-colors ${
                        selectedTicketId === ticket.id
                          ? "bg-blue-50 border-l-4 border-blue-600"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-2">
                        {getStatusIcon(ticket.status)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 text-sm line-clamp-2">
                            {ticket.subject}
                          </h4>
                          <p className="text-xs text-slate-600 mt-1">
                            {ticket.userName}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
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
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Ticket Details */}
            <div className="lg:col-span-2">
              {selectedTicket ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                  {/* Ticket Header */}
                  <div className="p-6 border-b border-slate-200">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {selectedTicket.subject}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">
                          ID: #{selectedTicket.id} • From:{" "}
                          {selectedTicket.userName}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <select
                          value={selectedTicket.status}
                          onChange={(e) =>
                            handleStatusChange(
                              selectedTicket.id,
                              e.target.value,
                            )
                          }
                          className="px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium"
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-slate-600 mb-3">
                      {selectedTicket.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span>
                        Created: {selectedTicket.createdAt.toLocaleDateString()}
                      </span>
                      <span
                        className={`font-semibold px-3 py-1 rounded text-xs ${getPriorityColor(
                          selectedTicket.priority,
                        )}`}
                      >
                        {selectedTicket.priority} priority
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50">
                    {selectedTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderRole === "support"
                            ? "justify-start"
                            : "justify-end"
                        }`}
                      >
                        <div
                          className={`max-w-xs p-4 rounded-lg ${
                            message.senderRole === "support"
                              ? "bg-white border border-slate-200"
                              : "bg-blue-600 text-white"
                          }`}
                        >
                          <p className="text-xs font-semibold mb-1">
                            {message.senderName} ({message.senderRole})
                          </p>
                          <p className="text-sm">{message.text}</p>
                          <p
                            className={`text-xs mt-2 ${
                              message.senderRole === "support"
                                ? "text-slate-500"
                                : "text-blue-100"
                            }`}
                          >
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reply Form */}
                  <div className="p-6 border-t border-slate-200">
                    <div className="flex gap-3">
                      <Input
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your response..."
                        onKeyPress={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleReply();
                          }
                        }}
                      />
                      <Button
                        onClick={handleReply}
                        className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 flex items-center justify-center h-full">
                  <p className="text-slate-600 text-lg">
                    Select a ticket to view details
                  </p>
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
