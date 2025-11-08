import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Labs from "./pages/Labs";
import Certifications from "./pages/Certifications";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Training from "./pages/Training";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import WriterPanel from "./pages/WriterPanel";
import WriterLabs from "./pages/WriterLabs";
import WriterCourses from "./pages/WriterCourses";
import WriterLessons from "./pages/WriterLessons";
import ApprovalQueue from "./pages/ApprovalQueue";
import SupportPanel from "./pages/SupportPanel";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/certifications" element={<Certifications />} />
            <Route path="/training" element={<Training />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/content" element={<WriterPanel />} />
            <Route path="/writer/labs" element={<WriterLabs />} />
            <Route path="/writer/courses" element={<WriterCourses />} />
            <Route path="/writer/lessons" element={<WriterLessons />} />
            <Route path="/approval" element={<ApprovalQueue />} />
            <Route path="/support" element={<SupportPanel />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-choose-us" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
