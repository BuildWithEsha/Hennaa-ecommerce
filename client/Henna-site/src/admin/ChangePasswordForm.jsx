import React, { useState } from 'react';

export default function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    const token = localStorage.getItem('adminToken');
    if (!token) {
      setError('Not authenticated. Please log in again.');
      return;
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      if (res.ok) {
        setSuccess('Password changed successfully!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        const data = await res.json();
        setError(data.message || 'Failed to change password');
      }
    } catch (err) {
      setError('Error communicating with server');
    }
  }

  return (
    <div className="min-h-screen flex items-start justify-center pt-20 p-6 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#FBE4DB] p-10 rounded-2xl shadow-xl"
      >
        <h3 className="text-3xl font-bold mb-8 text-center text-[#854F6C]">
          Change Password
        </h3>

        {error && (
          <p className="mb-4 text-red-600 text-sm text-center font-medium">{error}</p>
        )}
        {success && (
          <p className="mb-4 text-green-600 text-sm text-center font-medium">{success}</p>
        )}

        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full mb-5 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="w-full mb-5 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full mb-8 p-3 border border-[#DFB6B2] rounded-xl bg-white placeholder-[#854F6C] text-[#854F6C] focus:outline-none focus:ring-2 focus:ring-[#DFB6B2]"
        />

        <button
          type="submit"
          className="w-50 mx-auto block bg-[#854F6C] hover:bg-[#6b3c55] text-white font-semibold py-4 rounded-full transition-all duration-300 shadow-md"
        >
          Update Password
        </button>
      </form>
    </div>
  );
}
