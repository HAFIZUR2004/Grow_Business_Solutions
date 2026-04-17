'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Portfolio {
  _id: string;
  id: string;
  title: string;
  category: string;
  description: string;
  tech: string[];
  colorKey: string;
  stats: string;
  image: string;
  imageAlt: string;
  github?: string;
  liveUrl?: string;
}

interface Vacancy {
  _id?: string;
  id: string;
  tags: string[];
  title: string;
  desc: string;
  stack: string[];
  salary?: string;
  featured: boolean;
  color: string;
  department: string;
}

export default function DashboardPage() {
  // Portfolio States
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
  
  // Vacancy States
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [vacancyModalOpen, setVacancyModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'vacancies'>('portfolio');
  
  // Portfolio Form Data
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    tech: '',
    colorKey: 'purple',
    stats: '',
    image: '',
    imageAlt: '',
    github: '',
    liveUrl: '',
  });

  // Vacancy Form Data
  const [vacancyFormData, setVacancyFormData] = useState({
    tags: '',
    title: '',
    desc: '',
    stack: '',
    salary: '',
    featured: false,
    color: '#6c5ce7',
    department: 'Engineering',
  });

  // Stats
  const totalProjects = portfolios.length;
  const totalVacancies = vacancies.length;
  const totalVisitors = 12345;

  // ========== PORTFOLIO FUNCTIONS ==========
  const fetchPortfolios = async () => {
    try {
      const res = await fetch('/api/portfolio');
      const data = await res.json();
      setPortfolios(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ========== VACANCY FUNCTIONS ==========
  const fetchVacancies = async () => {
    try {
      const res = await fetch('/api/vacancies');
      const data = await res.json();
      setVacancies(data);
    } catch (error) {
      console.error('Error fetching vacancies:', error);
    }
  };

  useEffect(() => {
    fetchPortfolios();
    fetchVacancies();
  }, []);

  // Portfolio Modal
  const openModal = (item?: Portfolio) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        tech: item.tech.join(', '),
        colorKey: item.colorKey,
        stats: item.stats,
        image: item.image,
        imageAlt: item.imageAlt,
        github: item.github || '',
        liveUrl: item.liveUrl || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: '',
        category: '',
        description: '',
        tech: '',
        colorKey: 'purple',
        stats: '',
        image: '',
        imageAlt: '',
        github: '',
        liveUrl: '',
      });
    }
    setModalOpen(true);
  };

  // Vacancy Modal
  const openVacancyModal = (vacancy?: Vacancy) => {
    if (vacancy) {
      setEditingVacancy(vacancy);
      setVacancyFormData({
        tags: vacancy.tags.join(', '),
        title: vacancy.title,
        desc: vacancy.desc,
        stack: vacancy.stack.join(', '),
        salary: vacancy.salary || '',
        featured: vacancy.featured,
        color: vacancy.color,
        department: vacancy.department,
      });
    } else {
      setEditingVacancy(null);
      setVacancyFormData({
        tags: '',
        title: '',
        desc: '',
        stack: '',
        salary: '',
        featured: false,
        color: '#6c5ce7',
        department: 'Engineering',
      });
    }
    setVacancyModalOpen(true);
  };

  // Portfolio Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedImage = formData.image.trim();
    
    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()),
      colorKey: formData.colorKey,
      stats: formData.stats,
      image: trimmedImage,
      imageAlt: formData.imageAlt,
      github: formData.github?.trim() || '',
      liveUrl: formData.liveUrl?.trim() || '',
    };

    try {
      let response;
      if (editingItem) {
        response = await fetch(`/api/portfolio/${editingItem.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Operation failed');
      }
      
      setModalOpen(false);
      await fetchPortfolios();
      alert(editingItem ? '✅ Project updated successfully!' : '✅ Project created successfully!');
      
    } catch (error: any) {
      console.error('❌ Submit error:', error);
      alert('Failed to save: ' + error.message);
    }
  };

  // Vacancy Submit
  const handleVacancySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      tags: vacancyFormData.tags.split(',').map(t => t.trim()),
      title: vacancyFormData.title,
      desc: vacancyFormData.desc,
      stack: vacancyFormData.stack.split(',').map(s => s.trim()),
      salary: vacancyFormData.salary,
      featured: vacancyFormData.featured,
      color: vacancyFormData.color,
      department: vacancyFormData.department,
    };

    try {
      let response;
      if (editingVacancy) {
        response = await fetch(`/api/vacancies/${editingVacancy.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload, id: editingVacancy.id }),
        });
      } else {
        response = await fetch('/api/vacancies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (response.ok) {
        setVacancyModalOpen(false);
        fetchVacancies();
        alert(editingVacancy ? '✅ Vacancy updated!' : '✅ Vacancy created!');
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Failed to save vacancy');
    }
  };

  // Portfolio Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      const response = await fetch(`/api/portfolio/${id}`, { 
        method: 'DELETE' 
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Delete failed');
      }
      
      await fetchPortfolios();
      alert('✅ Project deleted successfully!');
      
    } catch (error: any) {
      console.error('❌ Delete error:', error);
      alert('Delete failed: ' + error.message);
    }
  };

  // Vacancy Delete
  const handleVacancyDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this vacancy?')) return;
    
    try {
      const response = await fetch(`/api/vacancies/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchVacancies();
        alert('✅ Vacancy deleted!');
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete vacancy');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-xl text-gray-800">কোম্পানি ড্যাশবোর্ড</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition">
                হোম
              </Link>
              <Link href="/portfolio" className="text-gray-600 hover:text-gray-900 transition">
                পোর্টফোলিও
              </Link>
              <Link href="/careers" className="text-gray-600 hover:text-gray-900 transition">
                ক্যারিয়ার
              </Link>
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-600">A</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">ড্যাশবোর্ড</h1>
            <p className="text-gray-500 text-sm sm:text-base mt-1">আপনার কোম্পানির সবকিছু এখান থেকে নিয়ন্ত্রণ করুন</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium">মোট ভিজিটর</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">{totalVisitors.toLocaleString()}</p>
              <p className="text-green-500 text-xs sm:text-sm mt-2">↑ 12% এই মাসে</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium">প্রকল্প</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">{totalProjects}</p>
              <p className="text-blue-500 text-xs sm:text-sm mt-2">সবগুলি সক্রিয়</p>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <h3 className="text-gray-500 text-xs sm:text-sm font-medium">ভ্যাকেন্সি</h3>
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-2">{totalVacancies}</p>
              <p className="text-purple-500 text-xs sm:text-sm mt-2">ওপেন পজিশন</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            <div className="flex border-b border-gray-200">
              <button
                onClick={() => setActiveTab('portfolio')}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === 'portfolio'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                পোর্টফোলিও প্রজেক্টস
              </button>
              <button
                onClick={() => setActiveTab('vacancies')}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === 'vacancies'
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                ভ্যাকেন্সি
              </button>
            </div>
          </div>

          {/* Portfolio Section */}
          {activeTab === 'portfolio' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">পোর্টফোলিও প্রজেক্টস</h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">আপনার সব প্রজেক্ট এখানে দেখুন এবং পরিচালনা করুন</p>
                  </div>
                  <button
                    onClick={() => openModal()}
                    className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span className="text-xl">+</span> নতুন প্রজেক্ট যোগ করুন
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {portfolios.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-sm sm:text-base">কোনো প্রজেক্ট নেই। উপরের বাটনে ক্লিক করে নতুন প্রজেক্ট যোগ করুন।</p>
                  </div>
                ) : (
                  <>
                    {/* Mobile View */}
                    <div className="block md:hidden space-y-4">
                      {portfolios.map((item) => (
                        <div key={item._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <div className="flex gap-3 mb-3">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                              <Image
                                src={item.image?.trim() || ''}
                                alt={item.imageAlt}
                                fill
                                className="object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://placehold.co/200x200/1a1a2e/ffffff?text=No+Image';
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-800">{item.title}</h3>
                              <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.description}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`text-xs px-2 py-1 rounded ${
                              item.colorKey === 'purple' ? 'bg-purple-100 text-purple-600' :
                              item.colorKey === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                              item.colorKey === 'blue' ? 'bg-blue-100 text-blue-600' :
                              'bg-emerald-100 text-emerald-600'
                            }`}>
                              {item.category}
                            </span>
                            {item.tech.slice(0, 2).map((t, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600">
                                {t}
                              </span>
                            ))}
                            {item.tech.length > 2 && (
                              <span className="text-xs px-2 py-1 bg-gray-200 rounded text-gray-600">
                                +{item.tech.length - 2}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={() => openModal(item)}
                              className="flex-1 py-2 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                            >
                              এডিট
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
                              className="flex-1 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                            >
                              ডিলিট
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full min-w-[600px]">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">ইমেজ</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">টাইটেল</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">ক্যাটাগরি</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">টেকনোলজি</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">অ্যাকশন</th>
                          </tr>
                        </thead>
                        <tbody>
                          {portfolios.map((item) => (
                            <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                              <td className="py-3 px-4">
                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                                  <Image
                                    src={item.image?.trim() || ''}
                                    alt={item.imageAlt}
                                    fill
                                    className="object-cover"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.src = 'https://placehold.co/200x200/1a1a2e/ffffff?text=No+Image';
                                    }}
                                  />
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div>
                                  <p className="font-medium text-gray-800">{item.title}</p>
                                  <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  item.colorKey === 'purple' ? 'bg-purple-100 text-purple-600' :
                                  item.colorKey === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                                  item.colorKey === 'blue' ? 'bg-blue-100 text-blue-600' :
                                  'bg-emerald-100 text-emerald-600'
                                }`}>
                                  {item.category}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex flex-wrap gap-1">
                                  {item.tech.slice(0, 2).map((t, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                                      {t}
                                    </span>
                                  ))}
                                  {item.tech.length > 2 && (
                                    <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                                      +{item.tech.length - 2}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openModal(item)}
                                    className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                                  >
                                    এডিট
                                  </button>
                                  <button
                                    onClick={() => handleDelete(item.id)}
                                    className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                                  >
                                    ডিলিট
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Vacancies Section */}
          {activeTab === 'vacancies' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">ভ্যাকেন্সি</h2>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">আপনার সব ভ্যাকেন্সি এখানে দেখুন এবং পরিচালনা করুন</p>
                  </div>
                  <button
                    onClick={() => openVacancyModal()}
                    className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <span className="text-xl">+</span> নতুন ভ্যাকেন্সি যোগ করুন
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {vacancies.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-gray-500 text-sm sm:text-base">কোনো ভ্যাকেন্সি নেই। উপরের বাটনে ক্লিক করে নতুন ভ্যাকেন্সি যোগ করুন।</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">টাইটেল</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">ডিপার্টমেন্ট</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">ট্যাগস</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">টেক স্ট্যাক</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">সেলারি</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">ফিচার্ড</th>
                          <th className="text-left py-3 px-4 text-gray-600 font-medium">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody>
                        {vacancies.map((item) => (
                          <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                            <td className="py-3 px-4">
                              <p className="font-medium text-gray-800">{item.title}</p>
                              <p className="text-xs text-gray-400 line-clamp-1">{item.desc}</p>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-xs px-2 py-1 rounded bg-purple-100 text-purple-600">
                                {item.department}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {item.tags.slice(0, 2).map((t, i) => (
                                  <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                                    {t}
                                  </span>
                                ))}
                                {item.tags.length > 2 && (
                                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">
                                    +{item.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex flex-wrap gap-1">
                                {item.stack.slice(0, 2).map((s, i) => (
                                  <span key={i} className="text-xs px-2 py-0.5 bg-blue-50 rounded text-blue-600">
                                    {s}
                                  </span>
                                ))}
                                {item.stack.length > 2 && (
                                  <span className="text-xs px-2 py-0.5 bg-blue-50 rounded text-blue-600">
                                    +{item.stack.length - 2}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <span className="text-xs text-gray-600">{item.salary || 'N/A'}</span>
                            </td>
                            <td className="py-3 px-4">
                              {item.featured && (
                                <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-600">
                                  Featured
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => openVacancyModal(item)}
                                  className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600 transition"
                                >
                                  এডিট
                                </button>
                                <button
                                  onClick={() => handleVacancyDelete(item.id)}
                                  className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition"
                                >
                                  ডিলিট
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Portfolio Modal */}
      {modalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {editingItem ? 'প্রজেক্ট এডিট করুন' : 'নতুন প্রজেক্ট যোগ করুন'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:rotate-90"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-6 custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">প্রজেক্ট টাইটেল *</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-black"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">ক্যাটাগরি *</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-black"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">বিবরণ *</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-black"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">টেকনোলজি * (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base text-black"
                    value={formData.tech}
                    onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">কালার থিম</label>
                    <select
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-black"
                      value={formData.colorKey}
                      onChange={(e) => setFormData({ ...formData, colorKey: e.target.value })}
                    >
                      <option value="purple">Purple</option>
                      <option value="cyan">Cyan</option>
                      <option value="blue">Blue</option>
                      <option value="emerald">Emerald</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">স্ট্যাটস *</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-black"
                      value={formData.stats}
                      onChange={(e) => setFormData({ ...formData, stats: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">ইমেজ URL *</label>
                  <input
                    type="url"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-black"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    required
                  />
                  {formData.image && (
                    <div className="mt-2 relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <Image 
                        src={formData.image.trim()}
                        alt="Preview" 
                        fill 
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://placehold.co/200x200/1a1a2e/ffffff?text=Invalid+URL';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">ইমেজ Alt Text *</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm sm:text-base text-black"
                    value={formData.imageAlt}
                    onChange={(e) => setFormData({ ...formData, imageAlt: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">GitHub লিংক (optional)</label>
                    <input
                      type="url"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-black"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">লাইভ লিংক (optional)</label>
                    <input
                      type="url"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-black"
                      value={formData.liveUrl}
                      onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    />
                  </div>
                </div>

                                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-medium"
                  >
                    {editingItem ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Vacancy Modal */}
      {vacancyModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVacancyModalOpen(false);
          }}
        >
          <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 p-4 sm:p-6 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                {editingVacancy ? 'ভ্যাকেন্সি এডিট করুন' : 'নতুন ভ্যাকেন্সি যোগ করুন'}
              </h2>
              <button
                onClick={() => setVacancyModalOpen(false)}
                className="text-white/80 hover:text-white bg-white/20 hover:bg-white/30 rounded-full w-8 h-8 flex items-center justify-center transition-all duration-200 hover:rotate-90"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-4 sm:p-6">
              <form onSubmit={handleVacancySubmit} className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">ভ্যাকেন্সি টাইটেল *</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base text-black"
                      value={vacancyFormData.title}
                      onChange={(e) => setVacancyFormData({ ...vacancyFormData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">ডিপার্টমেন্ট *</label>
                    <select
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm sm:text-base text-black"
                      value={vacancyFormData.department}
                      onChange={(e) => setVacancyFormData({ ...vacancyFormData, department: e.target.value })}
                      required
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                      <option value="HR">HR</option>
                      <option value="Design">Design</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">বিবরণ *</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base text-black"
                    value={vacancyFormData.desc}
                    onChange={(e) => setVacancyFormData({ ...vacancyFormData, desc: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">ট্যাগস * (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base text-black"
                    value={vacancyFormData.tags}
                    onChange={(e) => setVacancyFormData({ ...vacancyFormData, tags: e.target.value })}
                    placeholder="Remote, Full-time, Urgent"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">উদাহরণ: Remote, Full-time, Internship</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-black mb-1">টেক স্ট্যাক * (কমা দিয়ে আলাদা করুন)</label>
                  <input
                    type="text"
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm sm:text-base text-black"
                    value={vacancyFormData.stack}
                    onChange={(e) => setVacancyFormData({ ...vacancyFormData, stack: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">উদাহরণ: React, Python, AWS</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">সেলারি (optional)</label>
                    <input
                      type="text"
                      className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm sm:text-base text-black"
                      value={vacancyFormData.salary}
                      onChange={(e) => setVacancyFormData({ ...vacancyFormData, salary: e.target.value })}
                      placeholder="$50k - $70k"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-black mb-1">কালার কোড</label>
                    <input
                      type="color"
                      className="w-full h-10 px-2 py-1 border border-gray-300 rounded-lg cursor-pointer"
                      value={vacancyFormData.color}
                      onChange={(e) => setVacancyFormData({ ...vacancyFormData, color: e.target.value })}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    checked={vacancyFormData.featured}
                    onChange={(e) => setVacancyFormData({ ...vacancyFormData, featured: e.target.checked })}
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-black">
                    ফিচার্ড ভ্যাকেন্সি হিসেবে চিহ্নিত করুন
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setVacancyModalOpen(false)}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
                  >
                    বাতিল করুন
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition font-medium"
                  >
                    {editingVacancy ? 'আপডেট করুন' : 'সংরক্ষণ করুন'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
}