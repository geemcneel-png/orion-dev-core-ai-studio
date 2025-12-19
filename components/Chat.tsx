
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export const Chat: React.FC = () => {
  // --- NEW ACCESS LOGIC ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [partner, setPartner] = useState<any>(null);
  const [bioInput, setBioInput] = useState('');

  const handleAccess = async () => {
    // Calling your Flask API (/main.py)
    const response = await fetch('/api/verify-partner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bio_id: bioInput })
    });
    
    const result = await response.json();
    if (result.status === 'success') {
      setPartner(result);
      setIsAuthorized(true);
      // Brief the AI with the spreadsheet data immediately
      setMessages([{ 
        role: 'ai', 
        text: `Access Granted. Welcome back, ${result.name}. I've loaded your ${result.package} modules. How can we push the project forward today? 🚀` 
      }]);
    } else {
      alert("Biometric ID not recognized.");
    }
  };

  // --- YOUR EXISTING CHAT STATE ---
  const [messages, setMessages] = useState<Message[]>([]);
  // ... rest of your state ...

  if (!isAuthorized) {
    return (
      <div className="py-40 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl mb-6 flex items-center justify-center animate-pulse">
           <ShieldCheckIcon className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Biometric Scan Required</h2>
        <p className="text-zinc-500 mb-8">Please enter your Orion Access ID to initialize the terminal.</p>
        <div className="flex space-x-2">
           <input 
             value={bioInput}
             onChange={(e) => setBioInput(e.target.value)}
             placeholder="BIO-XXXX" 
             className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl text-white outline-none focus:border-blue-500"
           />
           <button onClick={handleAccess} className="bg-blue-600 px-6 py-3 rounded-xl font-bold text-white hover:bg-blue-500 transition-all">
             Unlock
           </button>
        </div>
      </div>
    );
  }

  // ... REST OF YOUR BEAUTIFUL CHAT UI CODE ...
// Inside your React Component
const [isAuthorized, setIsAuthorized] = useState(false);
const [partner, setPartner] = useState(null);

const handleAccess = async (inputBioId) => {
  const response = await fetch('/api/verify-partner', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bio_id: inputBioId })
  });
  
  const result = await response.json();
  if (result.status === 'success') {
    setPartner(result);
    setIsAuthorized(true);
    alert(`Welcome back, ${result.name}! System Initialized.`);
  } else {
    alert("Access Denied. Bio-ID invalid.");
  }
};
import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, SparklesIcon, ShieldCheckIcon, BeakerIcon, ChartPieIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { chatWithMintaka, resetChat as resetGeminiSession } from '../services/gemini';

interface Message {
    role: 'user' | 'ai';
    text: string;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm Orion Bolt Pro. Tell me about your business—I'd love to help you save time and handle the boring stuff! 🚀" }
  ]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleReset = () => {
    resetGeminiSession();
    setMessages([
      { role: 'ai', text: "Chat cleared! I'm ready to start over. How can I help you automate your business today? 🚀" }
    ]);
    setAnalysis(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
        const { text, analysis: newAnalysis } = await chatWithMintaka(userMsg);
        setMessages(prev => [...prev, { role: 'ai', text }]);
        if (newAnalysis) setAnalysis(newAnalysis);
    } catch (error) {
        console.error("Chat submission error:", error);
        setMessages(prev => [...prev, { role: 'ai', text: "Something went wrong. Let's try that again!" }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div id="chat" className="py-20 px-4 md:px-6 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Window */}
        <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
            <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <SparklesIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Orion Bolt Pro</h3>
                        <p className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">Active Partner</p>
                    </div>
                </div>
                <button 
                    onClick={handleReset}
                    className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
                    title="Reset Conversation"
                >
                    <ArrowPathIcon className="w-4 h-4" />
                </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                            msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-200 shadow-lg'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800 rounded-2xl px-5 py-3 flex space-x-1.5 shadow-lg">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                <div className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask Orion Bolt Pro anything..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-5 pr-14 text-white placeholder-zinc-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition-all"
                    />
                    <button 
                        type="submit" 
                        disabled={!input.trim() || isTyping}
                        className="absolute right-2 top-2 p-3 text-blue-500 hover:text-blue-400 disabled:text-zinc-700 transition-colors"
                    >
                        <PaperAirplaneIcon className="w-6 h-6" />
                    </button>
                </div>
            </form>
        </div>

        {/* Simplified Sidebar */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col space-y-6">
            <div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Partner Analysis</h4>
                <div className="space-y-6">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                        <div className="flex items-center space-x-2 mb-3">
                            <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Shield Status</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-blue-500 transition-all duration-1000 ease-out ${analysis?.needs_prescriptions_shield === 'detected' ? 'w-full' : 'w-1/4'}`}></div>
                        </div>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                        <div className="flex items-center space-x-2 mb-3">
                            <BeakerIcon className="w-4 h-4 text-purple-500" />
                            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Security Sync</span>
                        </div>
                        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                            <div className={`h-full bg-purple-500 transition-all duration-1000 ease-out ${analysis?.needs_biometrics === 'detected' ? 'w-full' : 'w-1/10'}`}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-auto pt-6 border-t border-zinc-800">
                <div className="flex items-center space-x-2 mb-3">
                    <ChartPieIcon className="w-4 h-4 text-zinc-600" />
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Best fit</span>
                </div>
                <p className="text-xs text-zinc-400 italic leading-relaxed">
                    {analysis?.package_match || "Keep chatting so I can find the best automation orbit for you!"}
                </p>
            </div>
        </div>
    </div>
  );
};
