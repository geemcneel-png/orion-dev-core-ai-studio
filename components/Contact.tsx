
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import { EnvelopeIcon, PhoneIcon, CheckCircleIcon, SparklesIcon } from '@heroicons/react/24/outline';

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyz0BZwkSRgDCteiK2GMx4Pn8LUs2tCusdqnodoz7scJW0Hj9euHfdbIIsx4J_J0Brx/exec";

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      await fetch(WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-zinc-900 border border-zinc-800 rounded-[3rem] p-8 md:p-16 shadow-[0_0_50px_rgba(59,130,246,0.1)] relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
              <div className="w-24 h-24 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mb-8">
                <CheckCircleIcon className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-4xl font-bold text-white mb-4">Message Sent!</h3>
              <p className="text-zinc-400 max-w-md mx-auto mb-10 text-lg">
                Orion Bolt Pro is reviewing your request. We'll be in touch very soon.
              </p>
              <button 
                onClick={() => setStatus('idle')}
                className="px-10 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full font-bold transition-all uppercase tracking-widest text-xs"
              >
                Send Another
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 relative z-10">
              <div className="space-y-10">
                <div>
                  <h2 className="text-5xl font-bold text-white mb-8 leading-tight tracking-tighter">
                    Let's Build Your <br/><span className="text-blue-500">Business Engine</span>
                  </h2>
                  <p className="text-zinc-400 text-xl leading-relaxed font-light">
                    Stop worrying about the admin. Tell us what you need, and we'll handle the rest. Simple, fast, and automated.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <a href="https://wa.me/27780920145" target="_blank" rel="noopener noreferrer" className="flex items-center p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl hover:border-green-500/50 transition-all group">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mr-5">
                      <PhoneIcon className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mb-1">Direct Chat</p>
                      <p className="text-white font-bold text-lg">+27 78 092 0145</p>
                    </div>
                  </a>
                  
                  <a href="mailto:grahamschubach@yahoo.com" className="flex items-center p-6 bg-zinc-950/50 border border-zinc-800 rounded-2xl hover:border-blue-500/50 transition-all group">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mr-5">
                      <EnvelopeIcon className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mb-1">Project Inquiry</p>
                      <p className="text-white font-bold text-lg">grahamschubach@yahoo.com</p>
                    </div>
                  </a>
                </div>

                <div className="pt-6 border-t border-zinc-800">
                  <p className="text-[10px] text-zinc-500 flex items-center font-mono uppercase tracking-widest">
                    <SparklesIcon className="w-4 h-4 mr-3 text-blue-500" />
                    System Secure & Online
                  </p>
                </div>
              </div>

              <div className="bg-zinc-950/50 p-8 md:p-10 rounded-[2.5rem] border border-zinc-800 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-2">Name or Business</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="e.g. Acme Co." 
                            required
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-2">Best Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="you@email.com" 
                            required
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-2">Select Your Package</label>
                        <div className="relative">
                            <select 
                                name="package" 
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
                            >
                                <option value="Orion's Gift-Mpho">Orion's Gift-Mpho ($149)</option>
                                <option value="Orion - Joyful Mandisa">Orion - Joyful Mandisa ($399)</option>
                                <option value="Orion Universe">Orion Universe ($999)</option>
                            </select>
                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-600">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest ml-2">What can we automate?</label>
                        <textarea 
                            name="message" 
                            placeholder="Tell us what you do and what's slowing you down..."
                            rows={3}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700 resize-none"
                        ></textarea>
                    </div>
                    
                    <button 
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-6 rounded-2xl transition-all flex items-center justify-center space-x-4 disabled:opacity-70 group shadow-lg shadow-blue-900/30 active:scale-[0.98]"
                    >
                        {status === 'loading' ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span className="uppercase tracking-widest text-xs">Launching...</span>
                            </>
                        ) : (
                            <>
                                <span className="uppercase tracking-[0.3em] text-xs">Get Started Now</span>
                                <SparklesIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            </>
                        )}
                    </button>
                    
                    {status === 'error' && (
                        <p className="text-center text-red-400 text-[10px] font-mono uppercase tracking-widest animate-pulse">Connection Error. Use WhatsApp instead.</p>
                    )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
