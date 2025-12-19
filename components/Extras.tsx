
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { ShieldCheckIcon, FingerPrintIcon, BellAlertIcon, CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

export const Extras: React.FC = () => {
  return (
    <section id="extras" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Added Extras</h2>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg leading-relaxed font-light">
          Need more? Add these simple tools to keep your business safe and organized.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Prescription Shield */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheckIcon className="w-32 h-32 text-blue-500" />
          </div>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
              <ShieldCheckIcon className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">The Deadline Shield</h3>
          </div>

          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-[10px] font-mono text-blue-400 uppercase tracking-[0.2em] mb-3">Focus: Never Miss a Date</p>
              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-start space-x-4">
                <BellAlertIcon className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <p className="text-zinc-300 text-sm leading-relaxed">
                  <span className="font-bold text-white">Our Promise:</span> We will remind you about taxes, licenses, or renewals 1 year, 6 months, and 30 days before they are due.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">What it does</p>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">We set up your payment links and building simple reports that show how your business is doing.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">The Result</p>
                <p className="text-zinc-400 text-sm flex items-center font-light">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                  You will never miss a deadline again.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex items-start space-x-3">
              <InformationCircleIcon className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                Important Note: We handle the reminders and the data, but you are still the one responsible for filing your legal paperwork on time.
              </p>
            </div>
          </div>
        </div>

        {/* ID Checking */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <FingerPrintIcon className="w-32 h-32 text-purple-500" />
          </div>
          
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
              <FingerPrintIcon className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-2xl font-bold text-white">Safe ID Checking</h3>
          </div>

          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-[10px] font-mono text-purple-400 uppercase tracking-[0.2em] mb-3">Focus: Knowing Your Customers</p>
              <div className="p-5 bg-zinc-950 rounded-2xl border border-zinc-800 flex items-start space-x-4">
                <FingerPrintIcon className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
                <p className="text-zinc-300 text-sm leading-relaxed">
                  <span className="font-bold text-white">How it works:</span> We use secure Google tools to check customer IDs so you know they are real people before you start working.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">What it does</p>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">We connect your WhatsApp to a smart system that sorts your messages and handles customers 24/7.</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">The Result</p>
                <p className="text-zinc-400 text-sm flex items-center font-light">
                  <CheckCircleIcon className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                  No human staff needed for new customers.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex items-start space-x-3">
              <InformationCircleIcon className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
              <p className="text-[10px] text-zinc-500 italic leading-relaxed">
                Security Note: Customer ID info is very sensitive. We keep it locked away behind strong digital locks and follow all safety laws.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
