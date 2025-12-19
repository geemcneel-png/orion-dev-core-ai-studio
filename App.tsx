
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { Hero } from './components/Hero';
import { Pricing } from './components/Pricing';
import { Chat } from './components/Chat';
import OrionContactForm from './components/OrionContactForm';
import { Extras } from './components/Extras';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 selection:bg-blue-500/30 overflow-x-hidden relative">
        {/* Global Star Background */}
        <div className="fixed inset-0 -z-50 opacity-[0.03] pointer-events-none bg-dot-grid"></div>
        <div className="fixed inset-0 -z-50 opacity-[0.1] pointer-events-none">
             <img 
              src="https://images.unsplash.com/photo-1506318137071-a8e063b4bc04?q=80&w=2000&auto=format&fit=crop" 
              alt="" 
              className="w-full h-full object-cover"
            />
        </div>

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-lg border-b border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <div className="font-bold text-2xl tracking-tighter flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40">
                        <span className="text-white text-xl">O</span>
                    </div>
                    <span className="hidden sm:inline text-white">Orion Dev Core</span>
                </div>
                <div className="hidden lg:flex items-center space-x-10 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    <a href="#" className="hover:text-white transition-colors">Start</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">Steps</a>
                    <a href="#packages" className="hover:text-white transition-colors">Prices</a>
                    <a href="#extras" className="hover:text-white transition-colors">Extras</a>
                    <a href="#faq" className="hover:text-white transition-colors">Learn More</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                </div>
                <a href="#chat-demo" className="bg-white text-black px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all shadow-xl hover:scale-105 active:scale-95">
                    ORION BOLT PRO
                </a>
            </div>
        </nav>

        {/* Hero Section */}
        <div className="relative">
            <Hero />
        </div>

        {/* Chat Demo Section */}
        <div id="chat-demo" className="bg-zinc-900/30 border-y border-zinc-800/50 scroll-mt-24 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-600/5 to-transparent pointer-events-none"></div>
            <div className="text-center pt-32 px-4 relative z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">
                    Orion Bolt Pro 4.0
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Your New 24/7 Partner</h2>
                <p className="text-zinc-500 mt-4 text-lg font-light">Ask any question in plain English. No complicated words allowed.</p>
            </div>
            <Chat />
        </div>

        {/* How It Works */}
        <div id="how-it-works" className="py-40 px-6 max-w-7xl mx-auto scroll-mt-20">
            <div className="text-center mb-24">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">Running Your Office is Easy</h2>
                <p className="text-zinc-500 text-xl font-light">No extra staff. No boring paperwork. Just easy work flow.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {[
                    { title: "1. Message", desc: "A customer texts you on WhatsApp or your website." },
                    { title: "2. Talk", desc: "Orion Bolt Pro replies instantly with intelligence." },
                    { title: "3. Form", desc: "We sort all the customer details for you automatically." },
                    { title: "4. Pay", desc: "The job is confirmed and the bill is paid." },
                    { title: "5. Relax", desc: "You focus on the work you love. We handle the office." }
                ].map((step, i) => (
                    <div key={i} className="bg-zinc-900/40 border border-zinc-800 p-10 rounded-[2.5rem] hover:border-blue-500/50 transition-all group relative overflow-hidden flex flex-col items-start shadow-xl">
                        <div className="absolute top-0 right-0 p-6 opacity-[0.03] text-8xl font-black group-hover:opacity-10 transition-opacity pointer-events-none">{i + 1}</div>
                        <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-2xl font-black text-blue-500 mb-8 group-hover:scale-110 transition-transform">{i + 1}</div>
                        <h3 className="font-bold text-white text-2xl mb-4 leading-tight">{step.title}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed font-light">{step.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Pricing Section */}
        <div className="bg-zinc-950 scroll-mt-20">
            <Pricing />
        </div>

        {/* FAQ / Simple Info Section */}
        <div id="faq" className="py-32 px-6 max-w-5xl mx-auto scroll-mt-20 border-t border-zinc-900/50">
            <div className="text-center mb-20">
                <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Plain English Questions</h2>
                <p className="text-zinc-500">Everything you need to know, without the big words.</p>
            </div>
            <div className="space-y-8">
                {[
                    { q: "Is this a real person answering my customers?", a: "No, it is a very smart computer program. It acts just like a professional office assistant but never gets tired, never takes a holiday, and answers instantly 24 hours a day." },
                    { q: "Do I have to know how computers work?", a: "Not at all. If you can use WhatsApp, you can use Orion. We handle all the 'magic' in the background so you can just read your list and get to work." },
                    { q: "Is my customer's information safe?", a: "Yes. We use the strongest digital locks available (the same kind banks use) and follow all the strict safety laws to keep your data private and secure." },
                    { q: "What happens if a customer sends a voice note?", a: "Orion listens to it, writes down what they said, and understands exactly what they need—just like a human would. You'll see the text version on your list." },
                    { q: "How do I get paid?", a: "Orion sends a simple link to your customer's phone. They tap it, pay with their card or phone, and the money goes straight to you. No more chasing bills." }
                ].map((item, i) => (
                    <div key={i} className="p-8 bg-zinc-900/30 border border-zinc-800 rounded-3xl">
                        <h3 className="text-xl font-bold text-white mb-3">{item.q}</h3>
                        <p className="text-zinc-400 font-light leading-relaxed">{item.a}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Add-on Extras Section */}
        <div className="bg-zinc-900/20 border-y border-zinc-900 scroll-mt-20">
            <Extras />
        </div>

        {/* Contact Section */}
        <div id="contact" className="scroll-mt-20 py-20 bg-zinc-950/50">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Ready to Scale?</h2>
                <p className="text-zinc-500 mt-4 text-lg font-light">Join the automated future with Orion Dev Core.</p>
            </div>
            <OrionContactForm />
        </div>

        {/* New Footer Requested */}
        <footer style={{ backgroundColor: '#0b0d17', color: '#aab0c0', padding: '40px 20px', fontFamily: 'sans-serif', fontSize: '12px', textAlign: 'center', borderTop: '1px solid #2a2d3e' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ marginBottom: '10px', fontWeight: 'bold', color: '#ffffff' }}>Privacy & Payments Disclaimer</p>
                <p style={{ lineHeight: '1.6' }}>
                    Orion Dev Core processes personal information in accordance with the <strong>Protection of Personal Information Act (POPIA)</strong> of South Africa. We act as an operator on behalf of our clients and do not sell or store card or banking details.
                </p>
                <p style={{ lineHeight: '1.6' }}>
                    All payments are processed securely by third-party financial partners including <strong>Apple Pay, Google Pay, Visa, and Mastercard</strong>. Orion Dev Core does not handle, process, or retain customer payment information.
                </p>
                <p style={{ marginTop: '20px', opacity: '0.5' }}>&copy; 2025 Orion Dev Core. All Systems Nominal.</p>
            </div>
        </footer>
    </div>
  );
};

export default App;
