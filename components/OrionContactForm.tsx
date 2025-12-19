/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

// New constants as requested
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby8Ll0pOI4UztWST-z-w2ddjGzvgrMDR357WNp4Vmhg0R-VgaD-PSjgWclysxY9XbQY4A/exec";
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1451321313065959628/YnEG_wS5lR5hJ-lP1ULXytThJOt0MxGv22jvBmfmWvCgmv24zTGIDEVD7k23zSFjJf7b";

const OrionContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    package: "Orion's Gifted-Mpho",
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  // Use the local Flask API endpoint for secure proxying
  const API_ENDPOINT = "/api/contact";

  const packages = [
    { value: "Orion's Gifted-Mpho", label: "Orion's Gifted-Mpho ($149 + $19/mo)", emoji: '🎁' },
    { value: 'Orion - Joyful Mandisa', label: 'Orion - Joyful Mandisa ($399 + $59/mo)', emoji: '✨' },
    { value: 'Orion Universe', label: 'Orion Universe ($999 + $149/mo)', emoji: '🪐' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Create FormData from the form as requested in the instructions
      const form = e.currentTarget;
      const data = new FormData(form);
      
      // Optionally append the constants if the backend script requires them in the payload
      // data.append('google_script_url', GOOGLE_SCRIPT_URL);
      // data.append('discord_webhook', DISCORD_WEBHOOK);

      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        setStatus({
          type: 'success',
          message: '✅ Signal Received! Welcome to Orion HQ.'
        });

        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          package: "Orion's Gifted-Mpho",
          message: ''
        });
        form.reset();
      } else {
        throw new Error('Signal lost during transmission');
      }

    } catch (error) {
      console.error('❌ Lead Capture Error:', error);
      setStatus({
        type: 'error',
        message: '❌ Something went wrong. Please WhatsApp us at +27 72 497 1810'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-[2rem] max-w-3xl mx-4 sm:mx-auto p-6 sm:p-10 md:p-12 my-12 shadow-2xl transition-all duration-300">
      <div className="mb-10 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
          🪐 Book Your Demo
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base font-light">
          Let Orion transform your front office into a 24/7 engine.
        </p>
      </div>

      {/* Status Messages */}
      {status.message && (
        <div className={`mb-8 p-5 rounded-2xl text-sm leading-relaxed border animate-in fade-in slide-in-from-top-4 ${
          status.type === 'success' 
            ? 'bg-green-500/10 border-green-500/30 text-green-300' 
            : 'bg-red-500/10 border-red-500/30 text-red-300'
        }`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8 text-left">
        {/* Row 1: Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl 
                       text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 
                       focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
              placeholder="Graham McNeil"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl 
                       text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 
                       focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
              placeholder="graham@example.com"
            />
          </div>
        </div>

        {/* Row 2: Phone & Package */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-5 py-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl 
                       text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 
                       focus:ring-1 focus:ring-blue-500/20 transition-all text-sm"
              placeholder="+27 72 497 1810"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="package" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
              Interested In *
            </label>
            <div className="relative">
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                required
                className="w-full px-5 py-4 bg-zinc-950 border border-zinc-800 rounded-2xl 
                         text-white focus:outline-none focus:border-blue-500 
                         focus:ring-1 focus:ring-blue-500/20 transition-all cursor-pointer text-sm appearance-none"
              >
                {packages.map(pkg => (
                  <option key={pkg.value} value={pkg.value} className="bg-zinc-950">
                    {pkg.emoji} {pkg.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">
            Tell Us About Your Business
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-5 py-4 bg-zinc-950/50 border border-zinc-800 rounded-2xl 
                     text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 
                     focus:ring-1 focus:ring-blue-500/20 transition-all resize-none text-sm leading-relaxed"
            placeholder="What service do you provide? What are your biggest admin headaches?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 px-8 bg-gradient-to-r from-blue-600 to-purple-600 
                   hover:from-blue-500 hover:to-purple-500 text-white font-black 
                   rounded-2xl transition-all duration-300 transform active:scale-95
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                   shadow-xl shadow-blue-900/20 uppercase tracking-[0.2em] text-[11px]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Launching Request...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              🚀 Book My Demo Call
            </span>
          )}
        </button>

        {/* Privacy Note */}
        <p className="text-[10px] text-zinc-600 text-center font-mono leading-relaxed px-4">
          By submitting, you agree to our <span className="text-zinc-500">POPIA-compliant</span> data processing. 
          Your information is encrypted and never shared with third parties.
        </p>
      </form>
    </div>
  );
};

export default OrionContactForm;