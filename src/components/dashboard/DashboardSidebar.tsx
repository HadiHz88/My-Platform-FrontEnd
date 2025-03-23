
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  BookOpen,
  GraduationCap,
  User,
  BarChart,
  FileBox,
  LogOut,
  Menu,
  FileEdit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    toast.success("Logged out successfully");
    navigate('/login');
  };

  const menuItems = [
    {
      title: "Overview",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Projects",
      path: "/dashboard/projects",
      icon: Package,
    },
    {
      title: "Courses",
      path: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Blog Posts",
      path: "/dashboard/blogs",
      icon: FileEdit,
    },
    {
      title: "Materials",
      path: "/dashboard/materials",
      icon: FileBox,
    },
    {
      title: "Experience & Education",
      path: "/dashboard/entries",
      icon: GraduationCap,
    },
    {
      title: "Personal Info",
      path: "/dashboard/profile",
      icon: User,
    },
    {
      title: "Analytics",
      path: "/dashboard/analytics",
      icon: BarChart,
    },
  ];

  return (
    <>
      {/* Mobile Trigger Button (Outside the Sidebar) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button variant="outline" size="icon" asChild>
          <SidebarTrigger>
            <Menu className="h-5 w-5" />
          </SidebarTrigger>
        </Button>
      </div>

      {/* The Main Sidebar */}
      <Sidebar className="fixed left-0 top-0 h-full border-r">
        <SidebarHeader className="py-4">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-bold">Portfolio Dashboard</h2>
            <SidebarTrigger className="md:hidden">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={currentPath === item.path}
                    >
                      <Link to={item.path} className="flex items-center gap-2 w-full">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Shortcuts</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link to="/" className="flex items-center gap-2 w-full">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                      <span>View Website</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <div className="px-4 py-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};

export default DashboardSidebar;
