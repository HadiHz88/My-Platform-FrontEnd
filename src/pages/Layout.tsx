
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationButton from '@/components/DonationButton';
import CursorEffect from '@/components/CursorEffect';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isDashboard) {
    return (
      <SidebarProvider>
        <div className="flex flex-col min-h-screen w-full">
          <CursorEffect />
          <div className="flex flex-1 w-full">
            <DashboardSidebar />
            <SidebarInset className="p-6 w-full">
              {children}
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <CursorEffect />
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      <div className="fixed bottom-6 right-6 z-50">
        <DonationButton />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
