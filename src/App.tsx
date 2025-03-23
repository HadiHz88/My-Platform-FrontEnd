
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Courses from "./pages/Courses";
import CoursePreview from "./pages/CoursePreview";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Dashboard routes
import DashboardOverview from "./pages/dashboard/DashboardOverview";
import DashboardProjects from "./pages/dashboard/DashboardProjects";
import ProjectForm from "./pages/dashboard/ProjectForm";
import DashboardCourses from "./pages/dashboard/DashboardCourses";
import CourseForm from "./pages/dashboard/CourseForm";
import DashboardEntries from "./pages/dashboard/DashboardEntries";
import EntryForm from "./pages/dashboard/EntryForm";
import ProfilePage from "./pages/dashboard/ProfilePage";
import AnalyticsPage from "./pages/dashboard/AnalyticsPage";
import MaterialsPage from "./pages/dashboard/MaterialsPage";
import MaterialForm from "./pages/dashboard/MaterialForm";
import DashboardBlogs from "./pages/dashboard/DashboardBlogs";
import BlogFormPage from "./pages/dashboard/BlogForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:id" element={<CoursePreview />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/overview" element={<DashboardOverview />} />
            <Route path="/dashboard/projects" element={<DashboardProjects />} />
            <Route path="/dashboard/projects/new" element={<ProjectForm />} />
            <Route path="/dashboard/projects/edit/:id" element={<ProjectForm />} />
            <Route path="/dashboard/courses" element={<DashboardCourses />} />
            <Route path="/dashboard/courses/new" element={<CourseForm />} />
            <Route path="/dashboard/courses/edit/:id" element={<CourseForm />} />
            <Route path="/dashboard/entries" element={<DashboardEntries />} />
            <Route path="/dashboard/entries/new" element={<EntryForm />} />
            <Route path="/dashboard/entries/edit/:id" element={<EntryForm />} />
            <Route path="/dashboard/blogs" element={<DashboardBlogs />} />
            <Route path="/dashboard/blogs/new" element={<BlogFormPage />} />
            <Route path="/dashboard/blogs/edit/:id" element={<BlogFormPage />} />
            <Route path="/dashboard/profile" element={<ProfilePage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/materials" element={<MaterialsPage />} />
            <Route path="/dashboard/materials/new" element={<MaterialForm />} />
            <Route path="/dashboard/materials/edit/:id" element={<MaterialForm />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
