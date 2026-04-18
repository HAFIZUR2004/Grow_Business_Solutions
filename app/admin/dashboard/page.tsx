'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  FolderOpen, 
  Briefcase, 
  MessageSquare,
  TrendingUp,
  Eye
} from 'lucide-react';

interface Stats {
  totalPortfolios: number;
  totalVacancies: number;
  totalMessages: number;
  unreadMessages: number;
  totalVisitors: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalPortfolios: 0,
    totalVacancies: 0,
    totalMessages: 0,
    unreadMessages: 0,
    totalVisitors: 12345
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [portfoliosRes, vacanciesRes, messagesRes] = await Promise.all([
          fetch('/api/portfolio'),
          fetch('/api/vacancies'),
          fetch('/api/contact')
        ]);
        
        const portfolios = await portfoliosRes.json();
        const vacancies = await vacanciesRes.json();
        const messages = await messagesRes.json();
        
        setStats({
          totalPortfolios: portfolios.length,
          totalVacancies: vacancies.length,
          totalMessages: messages.data?.length || 0,
          unreadMessages: messages.data?.filter((m: any) => m.status === 'unread').length || 0,
          totalVisitors: 12345
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  const statCards = [
    { title: 'মোট ভিজিটর', value: stats.totalVisitors.toLocaleString(), icon: Eye, color: 'from-blue-500 to-cyan-500', change: '+12%' },
    { title: 'প্রকল্প', value: stats.totalPortfolios, icon: FolderOpen, color: 'from-purple-500 to-pink-500', change: 'সক্রিয়' },
    { title: 'ভ্যাকেন্সি', value: stats.totalVacancies, icon: Briefcase, color: 'from-orange-500 to-red-500', change: 'ওপেন' },
    { title: 'মেসেজ', value: stats.totalMessages, icon: MessageSquare, color: 'from-emerald-500 to-teal-500', change: `${stats.unreadMessages}টি আনরিড` },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">ড্যাশবোর্ড</h1>
        <p className="text-gray-500 mt-1">স্বাগতম! আপনার প্ল্যাটফর্মের সামারি এখানে দেখুন</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{card.value}</p>
                  <p className={`text-xs mt-2 ${card.change.includes('+') ? 'text-green-500' : 'text-gray-400'}`}>
                    {card.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color}`}>
                  <Icon size={20} className="text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">দ্রুত অ্যাকশন</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/admin/portfolio" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition"
          >
            <FolderOpen size={24} className="mx-auto mb-2" />
            <p className="font-medium">নতুন প্রজেক্ট যোগ করুন</p>
          </a>
          <a 
            href="/admin/vacancies" 
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition"
          >
            <Briefcase size={24} className="mx-auto mb-2" />
            <p className="font-medium">নতুন ভ্যাকেন্সি পোস্ট করুন</p>
          </a>
          <a 
            href="/admin/messages" 
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-xl text-center hover:shadow-lg transition"
          >
            <MessageSquare size={24} className="mx-auto mb-2" />
            <p className="font-medium">মেসেজ চেক করুন</p>
          </a>
        </div>
      </div>
    </div>
  );
}