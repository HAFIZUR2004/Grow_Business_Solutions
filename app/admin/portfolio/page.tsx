'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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

export default function PortfolioManagement() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Portfolio | null>(null);
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

  useEffect(() => {
    fetchPortfolios();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      category: formData.category,
      description: formData.description,
      tech: formData.tech.split(',').map(t => t.trim()),
      colorKey: formData.colorKey,
      stats: formData.stats,
      image: formData.image.trim(),
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

      if (response.ok) {
        setModalOpen(false);
        fetchPortfolios();
        alert(editingItem ? '✅ প্রজেক্ট আপডেট হয়েছে!' : '✅ প্রজেক্ট তৈরি হয়েছে!');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('সেভ করতে ব্যর্থ হয়েছে');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি এই প্রজেক্ট ডিলিট করতে চান?')) return;
    try {
      const response = await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchPortfolios();
        alert('✅ প্রজেক্ট ডিলিট হয়েছে!');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('ডিলিট করতে ব্যর্থ হয়েছে');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">পোর্টফোলিও ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার সব প্রজেক্ট এখানে দেখুন এবং পরিচালনা করুন</p>
        </div>
        <button
          onClick={() => openModal()}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> নতুন প্রজেক্ট
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">ইমেজ</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">টাইটেল</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">ক্যাটাগরি</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">টেকনোলজি</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((item) => (
                <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
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
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">{item.description}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      item.colorKey === 'purple' ? 'bg-purple-100 text-purple-600' :
                      item.colorKey === 'cyan' ? 'bg-cyan-100 text-cyan-600' :
                      'bg-blue-100 text-blue-600'
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
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openModal(item)}
                        className="px-3 py-1.5 bg-amber-500 text-white rounded-lg text-sm hover:bg-amber-600"
                      >
                        এডিট
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1.5 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
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
      </div>

      {/* Modal remains same as before */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {/* Modal content - same as your existing modal */}
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* ... your modal form ... */}
          </div>
        </div>
      )}
    </div>
  );
}