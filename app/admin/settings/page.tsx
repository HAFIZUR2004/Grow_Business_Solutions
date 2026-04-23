'use client';
import { useState } from 'react';
import { ShieldCheck, Lock, Loader2 } from 'lucide-react';

export default function AdminSettings() {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const updatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });

      if (response.ok) {
        alert("পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!");
        setNewPassword('');
      } else {
        alert("কিছু একটা সমস্যা হয়েছে! এপিআই চেক করুন।");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("সার্ভারে কানেক্ট করা যাচ্ছে না!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-blue-50 rounded-full">
            <ShieldCheck className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">সিকিউরিটি সেটিংস</h2>
        <p className="text-gray-500 text-center mb-8 text-sm">আপনার অ্যাডমিন প্যানেলের পাসওয়ার্ড এখান থেকে পরিবর্তন করুন</p>

        <form onSubmit={updatePassword} className="space-y-5">
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">নতুন পাসওয়ার্ড</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type="password"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-black"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="মিনিমাম ৮ ক্যারেক্টার দিন"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                আপডেট হচ্ছে...
              </>
            ) : (
              'পাসওয়ার্ড আপডেট করুন'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}