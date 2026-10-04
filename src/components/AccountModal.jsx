import React, { useState } from 'react';
import { X, User, Mail, Phone, Lock, LogOut, CheckCircle2, Package } from 'lucide-react';
import { useUIModal } from '../context/UIModalContext';
import { useToast } from '../context/ToastContext';

export const AccountModal = ({ onNavigateOrders }) => {
  const { isAccountOpen, setIsAccountOpen, user, loginUser, logoutUser } = useUIModal();
  const { addToast } = useToast();

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  if (!isAccountOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email) return;

    const userData = {
      name: formData.name || formData.email.split('@')[0],
      email: formData.email,
      phone: formData.phone || '+91 98765 00000',
      joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
    };

    loginUser(userData);
    addToast({
      title: isRegister ? 'Account Created' : 'Welcome Back!',
      message: `Signed in as ${userData.name}. Enjoy shopping with Saideep Collection!`,
      type: 'success',
    });
    setIsAccountOpen(false);
  };

  const handleLogout = () => {
    logoutUser();
    addToast({
      title: 'Signed Out',
      message: 'You have been signed out successfully.',
      type: 'info',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-brand-darker/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-gray-100 my-8">
        
        {/* Header */}
        <div className="bg-brand-dark p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-red/20 text-brand-gold flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">
                {user ? `Hello, ${user.name}` : isRegister ? 'Create Account' : 'Welcome Back'}
              </h3>
              <p className="text-xs text-gray-400">
                {user ? user.email : 'Access your orders & saved address'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAccountOpen(false)}
            className="text-gray-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {user ? (
            <div className="space-y-6">
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200/80 space-y-2 text-xs text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Name:</span>
                  <span className="font-bold text-brand-dark">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email:</span>
                  <span className="font-bold text-brand-dark">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Member Since:</span>
                  <span className="font-bold text-brand-gold">{user.joinedAt}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setIsAccountOpen(false);
                    onNavigateOrders();
                  }}
                  className="w-full bg-brand-dark hover:bg-brand-surface text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Package className="w-4 h-4 text-brand-gold" />
                  <span>My Orders & Tracking</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full border border-red-200 text-brand-red hover:bg-red-50 text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full text-xs p-3 border border-gray-200 rounded-xl focus:border-brand-red focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full text-xs pl-9 pr-3 py-3 border border-gray-200 rounded-xl focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              {isRegister && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs pl-9 pr-3 py-3 border border-gray-200 rounded-xl focus:border-brand-red focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full text-xs pl-9 pr-3 py-3 border border-gray-200 rounded-xl focus:border-brand-red focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-brand-red/30 transition-colors mt-2"
              >
                {isRegister ? 'Create Account' : 'Sign In'}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-xs text-gray-500 hover:text-brand-dark"
                >
                  {isRegister
                    ? 'Already have an account? Sign In'
                    : "Don't have an account? Create one"}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
