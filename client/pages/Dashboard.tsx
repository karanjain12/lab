import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  BarChart3,
  BookOpen,
  Trophy,
  Clock,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  FileText,
  CheckCircle,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { currentUser, customRoles } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const getRoleDisplayName = (): string => {
    if (!currentUser) return "";
    const role = customRoles.find((r) => r.id === currentUser.role);
    return role ? role.name : currentUser.role;
  };

  const stats = [
    { label: "Labs Completed", value: "12", icon: BookOpen, color: "blue" },
    { label: "Current Streak", value: "7 days", icon: Clock, color: "orange" },
    { label: "Certifications", value: "2", icon: Trophy, color: "purple" },
    { label: "Total Hours", value: "48h", icon: BarChart3, color: "green" },
  ];

  const enrolledCourses = [
    {
      id: 1,
      title: "AWS Solutions Architect",
      progress: 65,
      labs: "12/18",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Kubernetes Advanced",
      progress: 40,
      labs: "6/15",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Azure Administrator",
      progress: 100,
      labs: "10/10",
      status: "Completed",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Completed Lab: EC2 Deployment",
      date: "Today",
      time: "2:30 PM",
    },
    {
      id: 2,
      title: "Earned Badge: Quick Learner",
      date: "Yesterday",
      time: "11:45 AM",
    },
    {
      id: 3,
      title: "Completed Course: Azure Basics",
      date: "Mar 15",
      time: "4:20 PM",
    },
    {
      id: 4,
      title: "Started Lab: Kubernetes Setup",
      date: "Mar 14",
      time: "9:15 AM",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-0"
          } bg-slate-900 text-white transition-all duration-300 overflow-hidden`}
        >
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                {currentUser?.avatar}
              </div>
              <div>
                <p className="font-semibold">{currentUser?.name}</p>
                <p className="text-sm text-slate-400">{getRoleDisplayName()}</p>
              </div>
            </div>
          </div>

          <nav className="p-6 space-y-2">
            {(() => {
              const baseItems = [
                {
                  icon: "📊",
                  label: "Dashboard",
                  path: "/dashboard",
                  active: true,
                },
                { icon: "📚", label: "My Courses", path: "/labs" },
                { icon: "🎯", label: "Learning Paths", path: "/dashboard" },
                { icon: "🏆", label: "Achievements", path: "/dashboard" },
                { icon: "💬", label: "Messages", path: "/dashboard" },
              ];

              const roleItems = [];

              if (
                currentUser?.permissions.manageUsers ||
                currentUser?.permissions.manageRoles
              ) {
                roleItems.push(
                  {
                    icon: "🛡️",
                    label: "Admin Panel",
                    path: "/admin",
                    active: false,
                  },
                  {
                    icon: "👥",
                    label: "Manage Users",
                    path: "/admin",
                    active: false,
                  },
                );
              }

              if (
                currentUser?.permissions.create ||
                currentUser?.permissions.publish
              ) {
                roleItems.push(
                  {
                    icon: "📝",
                    label: "Content Manager",
                    path: "/content",
                    active: false,
                  },
                  {
                    icon: "✍️",
                    label: "My Content",
                    path: "/content",
                    active: false,
                  },
                );
              }

              if (currentUser?.permissions.approve) {
                roleItems.push(
                  {
                    icon: "✓",
                    label: "Approval Queue",
                    path: "/approval",
                    active: false,
                  },
                  {
                    icon: "📋",
                    label: "Pending Reviews",
                    path: "/approval",
                    active: false,
                  },
                );
              }

              if (currentUser?.permissions.supportChat) {
                roleItems.push(
                  {
                    icon: "🆘",
                    label: "Support Tickets",
                    path: "/support",
                    active: false,
                  },
                  {
                    icon: "💬",
                    label: "User Messages",
                    path: "/support",
                    active: false,
                  },
                );
              }

              return [...baseItems, ...roleItems].map((item, idx) => (
                <Link key={idx} to={item.path}>
                  <button
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                      item.active
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </button>
                </Link>
              ));
            })()}
            <button className="w-full text-left px-4 py-3 rounded-lg font-medium transition-colors text-slate-300 hover:bg-slate-800">
              <span className="mr-3">⚙️</span>
              Settings
            </button>
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-slate-800">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors font-medium">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {/* Header with Sidebar Toggle */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold text-slate-900">
                  Welcome back, {currentUser?.name.split(" ")[0]}!
                </h1>
                <p className="text-slate-600 mt-1">
                  {currentUser?.permissions.manageUsers ||
                  currentUser?.permissions.manageRoles
                    ? "Manage your platform"
                    : currentUser?.permissions.create ||
                        currentUser?.permissions.publish
                      ? "Create and manage content"
                      : currentUser?.permissions.approve
                        ? "Review pending content"
                        : currentUser?.permissions.supportChat
                          ? "Respond to user tickets"
                          : "Here's your learning progress for this week"}
                </p>
              </div>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 hover:bg-slate-200 rounded-lg"
              >
                {sidebarOpen ? <X /> : <Menu />}
              </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                const colorClasses: { [key: string]: string } = {
                  blue: "bg-blue-100 text-blue-600",
                  orange: "bg-orange-100 text-orange-600",
                  purple: "bg-purple-100 text-purple-600",
                  green: "bg-green-100 text-green-600",
                };
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl p-6 shadow-sm border border-slate-200"
                  >
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                        colorClasses[stat.color]
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Enrolled Courses */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">
                    Enrolled Courses
                  </h2>

                  <div className="space-y-4">
                    {enrolledCourses.map((course) => (
                      <div
                        key={course.id}
                        className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900">
                              {course.title}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {course.labs} labs completed
                            </p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              course.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>

                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-600 mt-2">
                          {course.progress}% Complete
                        </p>
                      </div>
                    ))}
                  </div>

                  <Link to="/labs">
                    <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700">
                      Browse More Courses
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Recent Activity
                </h2>

                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="border-b border-slate-200 pb-4 last:border-b-0"
                    >
                      <p className="font-medium text-slate-900 text-sm">
                        {activity.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                        <span>{activity.date}</span>
                        <span>•</span>
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-6">
                  View All Activity
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
