'use client';

import { useState, useEffect } from 'react';

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

export default function VacancyManagement() {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({
    tags: '',
    title: '',
    desc: '',
    stack: '',
    salary: '',
    featured: false,
    color: '#6c5ce7',
    department: 'Engineering',
  });

  const fetchVacancies = async () => {
    try {
      const res = await fetch('/api/vacancies');
      const data = await res.json();
      setVacancies(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      tags: formData.tags.split(',').map(t => t.trim()),
      title: formData.title,
      desc: formData.desc,
      stack: formData.stack.split(',').map(s => s.trim()),
      salary: formData.salary,
      featured: formData.featured,
      color: formData.color,
      department: formData.department,
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
        setModalOpen(false);
        fetchVacancies();
        alert(editingVacancy ? '✅ ভ্যাকেন্সি আপডেট হয়েছে!' : '✅ ভ্যাকেন্সি তৈরি হয়েছে!');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('সেভ করতে ব্যর্থ হয়েছে');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('আপনি কি এই ভ্যাকেন্সি ডিলিট করতে চান?')) return;
    try {
      const response = await fetch(`/api/vacancies/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchVacancies();
        alert('✅ ভ্যাকেন্সি ডিলিট হয়েছে!');
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
          <h1 className="text-2xl font-bold text-gray-800">ভ্যাকেন্সি ম্যানেজমেন্ট</h1>
          <p className="text-gray-500 text-sm mt-1">আপনার সব ভ্যাকেন্সি এখানে দেখুন এবং পরিচালনা করুন</p>
        </div>
        <button
          onClick={() => {
            setEditingVacancy(null);
            setFormData({
              tags: '',
              title: '',
              desc: '',
              stack: '',
              salary: '',
              featured: false,
              color: '#6c5ce7',
              department: 'Engineering',
            });
            setModalOpen(true);
          }}
          className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition flex items-center gap-2"
        >
          <span className="text-xl">+</span> নতুন ভ্যাকেন্সি
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">টাইটেল</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">ডিপার্টমেন্ট</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">ট্যাগস</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">টেক স্ট্যাক</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">ফিচার্ড</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((item) => (
                <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
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
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {item.stack.slice(0, 2).map((s, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-blue-50 rounded text-blue-600">
                          {s}
                        </span>
                      ))}
                    </div>
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
                        onClick={() => {
                          setEditingVacancy(item);
                          setFormData({
                            tags: item.tags.join(', '),
                            title: item.title,
                            desc: item.desc,
                            stack: item.stack.join(', '),
                            salary: item.salary || '',
                            featured: item.featured,
                            color: item.color,
                            department: item.department,
                          });
                          setModalOpen(true);
                        }}
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

      {/* Modal - same as before */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          {/* Modal content */}
        </div>
      )}
    </div>
  );
}