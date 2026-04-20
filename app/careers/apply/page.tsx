'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Vacancy {
  _id?: string;
  id: string;
  title: string;
  desc: string;
  tags: string[];
  stack: string[];
  salary?: string;
  featured: boolean;
  color: string;
  department: string;
}

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const vacancyId = searchParams.get('vacancy');
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    currentCompany: '',
    portfolio: '',
    linkedin: '',
    github: '',
    coverLetter: '',
    resume: null as File | null,
  });

  // ভ্যাকেন্সি ডিটেইলস লোড করুন
  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const res = await fetch('/api/vacancies');
        const data = await res.json();
        const found = data.find((v: Vacancy) => v.id === vacancyId || v._id === vacancyId);
        setVacancy(found || null);
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      } finally {
        setLoading(false);
      }
    };

    if (vacancyId) {
      fetchVacancy();
    } else {
      setLoading(false);
    }
  }, [vacancyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ভ্যালিডেশন
    if (!formData.fullName || !formData.email) {
      alert('দয়া করে নাম এবং ইমেইল দিন');
      return;
    }
    
    if (!formData.resume) {
      alert('দয়া করে আপনার রেসিউম আপলোড করুন');
      return;
    }
    
    setSubmitting(true);

    // ফর্ম ডাটা তৈরি করুন
    const submitData = new FormData();
    submitData.append('fullName', formData.fullName);
    submitData.append('email', formData.email);
    submitData.append('phone', formData.phone);
    submitData.append('experience', formData.experience);
    submitData.append('currentCompany', formData.currentCompany);
    submitData.append('portfolio', formData.portfolio);
    submitData.append('linkedin', formData.linkedin);
    submitData.append('github', formData.github);
    submitData.append('coverLetter', formData.coverLetter);
    submitData.append('vacancyId', vacancyId || '');
    submitData.append('vacancyTitle', vacancy?.title || '');
    if (formData.resume) {
      submitData.append('resume', formData.resume);
    }

    try {
      const response = await fetch('/api/careers/apply', {
        method: 'POST',
        body: submitData,
      });

      if (response.ok) {
        alert('✅ আপনার আবেদন সফলভাবে জমা হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।');
        // সফল হলে ক্যারিয়ার পেজে রিডাইরেক্ট করুন
        router.push('/CareerPage');
      } else {
        const error = await response.json();
        alert(error.error || 'আবেদন জমা দিতে ব্যর্থ হয়েছে।');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('আবেদন জমা দিতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // ফাইল সাইজ চেক (৫MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('ফাইল সাইজ ৫MB এর বেশি হতে পারবে না');
        return;
      }
      setFormData({ ...formData, resume: file });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6c5ce7]"></div>
      </div>
    );
  }

  if (!vacancy && vacancyId) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-white mb-4">ভ্যাকেন্সি পাওয়া যায়নি</h1>
          <Link
            href="/CareerPage"
            className="inline-block px-6 py-2 bg-[#6c5ce7] text-white rounded-lg hover:bg-[#5a4bd1] transition"
          >
            ক্যারিয়ার পেজে ফিরে যান
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* ব্যাক বাটন - Link ব্যবহার করে */}
        <Link
          href="/CareerPage"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition mb-6"
        >
          ← ব্যাক টু ক্যারিয়ার
        </Link>

        {/* হেডার */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Apply for{' '}
            <span className="bg-gradient-to-r from-[#6c5ce7] to-[#00cec9] bg-clip-text text-transparent">
              {vacancy?.title}
            </span>
          </h1>
          <p className="text-white/40">
            {vacancy?.department} • {vacancy?.salary && `Salary: ${vacancy.salary}`}
          </p>
        </motion.div>

        {/* অ্যাপ্লিকেশন ফর্ম */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-[#11111e] border border-white/10 rounded-2xl p-6 md:p-8 space-y-6"
        >
          {/* ব্যক্তিগত তথ্য */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
              ব্যক্তিগত তথ্য
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  পূর্ণ নাম <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="জন Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  ইমেইল <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  ফোন নম্বর
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="+880 1234 567890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  অভিজ্ঞতা (বছর)
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                >
                  <option value="">সিলেক্ট করুন</option>
                  <option value="0-1">০-১ বছর</option>
                  <option value="1-3">১-৩ বছর</option>
                  <option value="3-5">৩-৫ বছর</option>
                  <option value="5-8">৫-৮ বছর</option>
                  <option value="8+">৮+ বছর</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  বর্তমান কোম্পানি
                </label>
                <input
                  type="text"
                  value={formData.currentCompany}
                  onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="কোম্পানির নাম"
                />
              </div>
            </div>
          </div>

          {/* লিংকসমূহ */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
              প্রোফাইল লিংক
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  পোর্টফোলিও/ওয়েবসাইট
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  লিংকডইন
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  গিটহাব
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="https://github.com/username"
                />
              </div>
            </div>
          </div>

          {/* রেসিউম ও কভার লেটার */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 border-b border-white/10 pb-2">
              ডকুমেন্টস
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  রেসিউম/সিভি <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-[#6c5ce7] file:text-white hover:file:bg-[#5a4bd1] cursor-pointer"
                />
                <p className="text-xs text-white/40 mt-1">PDF, DOC, DOCX (ম্যাক্স ৫MB)</p>
                {formData.resume && (
                  <p className="text-xs text-green-400 mt-1">✓ {formData.resume.name} আপলোড হয়েছে</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  কভার লেটার
                </label>
                <textarea
                  rows={5}
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-white/20 rounded-lg text-white focus:border-[#6c5ce7] focus:outline-none"
                  placeholder="আপনার অভিজ্ঞতা, দক্ষতা এবং কেন আপনি এই পদের জন্য উপযুক্ত তা লিখুন..."
                />
              </div>
            </div>
          </div>

          {/* সাবমিট বাটন */}
          <div className="flex gap-4 pt-4">
            <Link
              href="/CareerPage"
              className="flex-1 px-6 py-3 border border-white/20 rounded-lg text-white/80 hover:bg-white/10 transition text-center"
            >
              বাতিল করুন
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-[#6c5ce7] to-[#a29bfe] rounded-lg text-white font-bold hover:shadow-lg transition disabled:opacity-50"
            >
              {submitting ? 'জমা দেওয়া হচ্ছে...' : 'আবেদন জমা দিন →'}
            </button>
          </div>
        </motion.form>
      </div>
    </main>
  );
}