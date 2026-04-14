// src/app/(protected)/layout.tsx
import { ReactNode } from 'react';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ড্যাশবোর্ডের শেয়ার্ড Navbar */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between">
          <h1 className="text-xl font-bold">কোম্পানি পোর্টফোলিও</h1>
          <div className="space-x-4">
            <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
            <a href="/analytics" className="hover:text-blue-600">Analytics</a>
            <a href="/settings" className="hover:text-blue-600">Settings</a>
          </div>
        </div>
      </nav>
      
      {/* কন্টেন্ট */}
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}