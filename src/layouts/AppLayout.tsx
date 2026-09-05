import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import AIAssistant from '@/components/AIAssistant';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 lg:p-6 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
      <AIAssistant />
    </div>
  );
}
