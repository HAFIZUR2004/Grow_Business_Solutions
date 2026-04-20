'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Download, Search, RefreshCw } from 'lucide-react';

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/applications');
      const data = await res.json();
      console.log('Fetched applications:', data);
      console.log('Number of applications:', data.length);
      setApplications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error:', error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const seedData = async () => {
    if (confirm('ডেমো ডাটা যোগ করতে চান? এটি বিদ্যমান ডাটা মুছে দিবে।')) {
      setLoading(true);
      try {
        const res = await fetch('/api/seed-applications');
        const data = await res.json();
        alert(data.message);
        await fetchApplications();
      } catch (error) {
        console.error('Seed error:', error);
        alert('ডাটা যোগ করতে ব্যর্থ হয়েছে');
      } finally {
        setLoading(false);
      }
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      app.email?.toLowerCase().includes(search.toLowerCase()) ||
      app.vacancyTitle?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">সব আবেদনপত্র</h1>
          <p className="text-gray-500 mt-1">
            মোট {applications.length} টি আবেদন
          </p>
        </div>
        <div className="flex gap-2">
          {applications.length === 0 && (
            <button
              onClick={seedData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <RefreshCw size={16} /> ডেমো ডাটা যোগ করুন
            </button>
          )}
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="নাম, ইমেইল বা ভ্যাকেন্সি দিয়ে খুঁজুন..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">সব স্ট্যাটাস</option>
            <option value="pending">⏳ পেন্ডিং</option>
            <option value="reviewed">👁️ রিভিউ করা</option>
            <option value="accepted">✅ সিলেক্টেড</option>
            <option value="rejected">❌ রিজেক্টেড</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-4">নাম</th>
                <th className="text-left p-4">ভ্যাকেন্সি</th>
                <th className="text-left p-4">ইমেইল</th>
                <th className="text-left p-4">ফোন</th>
                <th className="text-left p-4">স্ট্যাটাস</th>
                <th className="text-left p-4">তারিখ</th>
                <th className="text-left p-4">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium">{app.fullName}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                      {app.vacancyTitle}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{app.email}</td>
                  <td className="p-4 text-gray-600">{app.phone || '-'}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'reviewed' ? 'bg-purple-100 text-purple-700' :
                      app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {app.status === 'pending' ? '⏳ পেন্ডিং' : 
                       app.status === 'reviewed' ? '👁️ রিভিউ করা' :
                       app.status === 'accepted' ? '✅ সিলেক্টেড' : '❌ রিজেক্টেড'}
                    </span>
                   </td>
                  <td className="p-4 text-gray-500">
                    {app.appliedAt ? new Date(app.appliedAt).toLocaleDateString('bn-BD') : '-'}
                   </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/applications/${app._id}`}
                        className="p-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                        title="বিস্তারিত দেখুন"
                      >
                        <Eye size={16} />
                      </Link>
                      {app.resumePath && (
                        <a href={app.resumePath} download className="p-2 bg-gray-100 text-gray-600 rounded hover:bg-gray-200">
                          <Download size={16} />
                        </a>
                      )}
                    </div>
                   </td>
                 </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-8 text-gray-500">
                    {applications.length === 0 ? 
                      'কোনো আবেদন নেই। "ডেমো ডাটা যোগ করুন" বাটনে ক্লিক করুন' : 
                      'কোনো আবেদন পাওয়া যায়নি'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}