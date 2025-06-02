
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StudentRegistration from "./pages/StudentRegistration";
import WalletCardPreview from "./pages/WalletCardPreview";
import ReceptionistCheckin from "./pages/ReceptionistCheckin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentsList from "./pages/StudentsList";
import StudentDetail from "./pages/StudentDetail";
import AttendanceLogs from "./pages/AttendanceLogs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<StudentRegistration />} />
          <Route path="/wallet-preview/:studentId" element={<WalletCardPreview />} />
          <Route path="/checkin" element={<ReceptionistCheckin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/students" element={<StudentsList />} />
          <Route path="/admin/students/:studentId" element={<StudentDetail />} />
          <Route path="/admin/attendance" element={<AttendanceLogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
