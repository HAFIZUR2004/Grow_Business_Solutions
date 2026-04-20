'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, FolderOpen, Briefcase, MessageSquare, Users, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsRes, vacsRes] = await Promise.all([
        fetch('/api/applications'),
        fetch('/api/vacancies')
      ]);
      const apps = await appsRes.json();
      const vacs = await vacsRes.json();
      setApplications(Array.isArray(apps) ? apps : []);
      setVacancies(Array.isArray(vacs) ? vacs : []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    total: applications.length,
    pending: applications.filter((a: any) => a.status === 'pending').length,
    reviewed: applications.filter((a: any) => a.status === 'reviewed').length,
    accepted: applications.filter((a: any) => a.status === 'accepted').length,
    rejected: applications.filter((a: any) => a.status === 'rejected').length,
    vacancies: vacancies.length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ড্যাশবোর্ড</h1>
        <p className="text-gray-500 mt-1">স্বাগতম! আপনার প্ল্যাটফর্মের সামারি এখানে দেখুন</p>
      </div>

      {/* স্ট্যাটাস কার্ড */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">মোট আবেদন</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <Users className="text-blue-500" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">পেন্ডিং</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="text-yellow-500" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">রিভিউ করা</p>
              <p className="text-2xl font-bold text-purple-600">{stats.reviewed}</p>
            </div>
            <Eye className="text-purple-500" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">সিলেক্টেড</p>
              <p className="text-2xl font-bold text-green-600">{stats.accepted}</p>
            </div>
            <CheckCircle className="text-green-500" size={28} />
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">রিজেক্টেড</p>
              <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            </div>
            <XCircle className="text-red-500" size={28} />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">ভ্যাকেন্সি</p>
              <p className="text-2xl font-bold text-gray-800">{stats.vacancies}</p>
            </div>
            <Briefcase className="text-orange-500" size={28} />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">দ্রুত অ্যাকশন</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/admin/vacancies" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition">
            <Briefcase size={24} className="mx-auto mb-2" />
            <p className="font-medium">নতুন ভ্যাকেন্সি</p>
          </Link>
          <Link href="/admin/applications" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition">
            <Users size={24} className="mx-auto mb-2" />
            <p className="font-medium">সব আবেদন</p>
          </Link>
          <Link href="/admin/portfolio" className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition">
            <FolderOpen size={24} className="mx-auto mb-2" />
            <p className="font-medium">পোর্টফোলিও</p>
          </Link>
          <Link href="/admin/messages" className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition">
            <MessageSquare size={24} className="mx-auto mb-2" />
            <p className="font-medium">মেসেজ</p>
          </Link>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">সর্বশেষ আবেদন</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3 text-gray-600">নাম</th>
                <th className="text-left p-3 text-gray-600">ভ্যাকেন্সি</th>
                <th className="text-left p-3 text-gray-600">স্ট্যাটাস</th>
                <th className="text-left p-3 text-gray-600">তারিখ</th>
                <th className="text-left p-3 text-gray-600">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {applications.slice(0, 5).map((app: any) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{app.fullName}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">{app.vacancyTitle}</span>
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'reviewed' ? 'bg-purple-100 text-purple-700' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {app.status === 'pending' ? 'পেন্ডিং' : app.status === 'reviewed' ? 'রিভিউ করা' : app.status === 'accepted' ? 'সিলেক্টেড' : 'রিজেক্টেড'}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">{new Date(app.appliedAt).toLocaleDateString('bn-BD')}</td>
                  <td className="p-3">
                    <Link href={`/admin/applications/${app._id}`} className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600">
                      দেখুন
                    </Link>
                  </td>
                </tr>
              ))}
              {applications.length === 0 && (
                <tr><td colSpan={5} className="text-center p-8 text-gray-500">কোনো আবেদন নেই</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}