
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { CheckIcon, ChatBubbleLeftRightIcon, MicrophoneIcon } from '@heroicons/react/24/solid';

const pricingData = [
  {
    name: "Orion's Gift-Mpho",
    setup: "$149",
    monthly: "$19",
    target: "Small Projects",
    features: [
      "A beautiful page for your brand",
      "Saves WhatsApp messages to a list",
      "Take payments with Apple/Google Pay",
      "Works with all credit cards",
      "Automatic emails sent for you"
    ],
    cta: "Start Your Business",
    premium: false,
    label: "Simple Start",
    showPayments: true
  },
  {
    name: "Orion - Joyful Mandisa",
    setup: "$399",
    monthly: "$59",
    target: "Growing Business",
    features: [
      "Everything in the Start package",
      "Answers your WhatsApp for you",
      "Understands voice notes & text",
      "Smart replies to common questions",
      "Books your calendar automatically"
    ],
    cta: "Make Life Easier",
    premium: true,
    label: "Most Helpful",
    showVoice: true
  },
  {
    name: "Orion Universe",
    setup: "$999",
    monthly: "$149",
    target: "Full Companies",
    features: [
      "Everything in Mandisa",
      "Custom build for your whole team",
      "Connects all your tools together",
      "Expert help whenever you need it",
      "A custom 'brain' for your office"
    ],
    cta: "Run Your Whole Office",
    premium: false,
    label: "Total Power",
    highlight: true
  }
];

const PaymentLogos = ({ compact = false }: { compact?: boolean }) => (
  <div className={`flex flex-wrap items-center gap-3 ${compact ? 'mt-8 justify-start' : 'mt-10 justify-center opacity-90'}`}>
    <div className="bg-white/95 px-3 py-1.5 rounded-md flex items-center justify-center h-8 w-14 shadow-sm border border-zinc-200">
      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b0/Apple_Pay_logo.svg" alt="Apple Pay" className="h-4" />
    </div>
    <div className="bg-white/95 px-3 py-1.5 rounded-md flex items-center justify-center h-8 w-14 shadow-sm border border-zinc-200">
      <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-4" />
    </div>
    <div className="bg-white/95 px-3 py-1.5 rounded-md flex items-center justify-center h-8 w-14 shadow-sm border border-zinc-200">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
    </div>
    <div className="bg-white/95 px-3 py-1.5 rounded-md flex items-center justify-center h-8 w-14 shadow-sm border border-zinc-200">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
    </div>
    <div className="bg-white/95 px-3 py-1.5 rounded-md flex items-center justify-center h-8 w-14 shadow-sm border border-zinc-200">
      <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-4" />
    </div>
  </div>
);

const Tier = ({ name, setup, monthly, target, features, cta, premium, label, highlight, showPayments, showVoice }: any) => (
  <div className={`p-8 rounded-[2rem] border transition-all duration-500 hover:scale-[1.02] group flex flex-col relative ${
    premium ? 'border-blue-500 bg-zinc-900 shadow-2xl shadow-blue-900/20' : 
    highlight ? 'border-purple-500/50 bg-zinc-900 shadow-2xl shadow-purple-900/10' : 
    'border-zinc-800 bg-zinc-900/50'
  }`}>
    {label && (
      <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
        <span className={`text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl ${
          premium ? 'bg-blue-600' : highlight ? 'bg-purple-600' : 'bg-zinc-700'
        }`}>
          {label}
        </span>
      </div>
    )}
    
    <div className="flex justify-between items-start mb-2 pt-4">
        <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{name}</h3>
        {showVoice && <MicrophoneIcon className="w-6 h-6 text-blue-400 animate-pulse" />}
    </div>
    
    <p className="text-zinc-500 text-sm mb-6 font-mono uppercase tracking-widest">{target}</p>
    
    <div className="mb-8">
      <div className="flex items-baseline">
        <span className="text-5xl font-bold text-white tracking-tighter">{setup}</span>
        <span className="text-zinc-500 text-xs ml-2 uppercase font-bold tracking-widest">once</span>
      </div>
      <div className="text-xl text-zinc-300 mt-1 font-medium">{monthly}<span className="text-sm text-zinc-500 font-normal">/month</span></div>
    </div>

    <div className="h-px bg-zinc-800 w-full mb-8"></div>

    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-start text-zinc-300 text-sm leading-snug">
          {f.includes("WhatsApp") ? (
              <ChatBubbleLeftRightIcon className={`w-4 h-4 mr-3 mt-0.5 shrink-0 ${premium ? 'text-blue-500' : 'text-green-500'}`} />
          ) : (
              <CheckIcon className={`w-4 h-4 mr-3 mt-0.5 shrink-0 ${premium ? 'text-blue-500' : highlight ? 'text-purple-500' : 'text-zinc-600'}`} />
          )}
          <span>{f}</span>
        </li>
      ))}
    </ul>

    {showPayments && <PaymentLogos compact />}
    
    <a href="#contact" className={`mt-8 w-full py-5 rounded-2xl font-black text-center text-sm uppercase tracking-widest transition-all ${
      premium ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30' : 
      highlight ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/30' : 
      'bg-zinc-800 hover:bg-zinc-700 text-white'
    }`}>
      {cta}
    </a>
  </div>
);

export const Pricing: React.FC = () => {
  return (
    <section id="packages" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <div className="inline-block px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-6">
          Straightforward Pricing
        </div>
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">Choose Your Package</h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
          Simple monthly prices. No confusing words. Everything you need to run your office from your pocket.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {pricingData.map((plan, index) => <Tier key={index} {...plan} />)}
      </div>

      <div className="mt-24 text-center border-t border-zinc-900/50 pt-16">
        <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold mb-8">We Accept All Major Payments</p>
        <PaymentLogos />
      </div>
    </section>
  );
};
