import React, { useState, useRef, useEffect } from 'react';
import { 
  PaperAirplaneIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  BeakerIcon, 
  ChartPieIcon, 
  ArrowPathIcon 
} from '@heroicons/react/24/solid';
import { chatWithMintaka, resetChat as resetGeminiSession } from '../services/gemini';

interface Message {
    role: 'user' | 'ai';
    text: string;
}

export const Chat: React.FC = () => {
    // --- PARTNER & ACCESS STATE ---
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [partner, setPartner] = useState<any>(null);
    const [bioInput, setBioInput] = useState('');

    // --- CHAT ENGINE STATE ---
    const [messages, setMessages] = useState<Message[]>([]);
    const [analysis, setAnalysis] = useState<any>(null);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    // --- ACCESS HANDLER ---
    const handleAccess = async () => {
        if (!bioInput.trim()) return;
        
        try {
            const response = await fetch('/api/verify-partner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bio_id: bioInput })
            });
            
            const result = await response.json();
            if (result.status === 'success') {
                setPartner(result);
                setIsAuthorized(true);
                setMessages([{ 
                    role: 'ai', 
                    text: `Access Granted. Welcome back, ${result.name}. I've loaded your ${result.package} modules. How can we push the project forward today? 🚀` 
                }]);
            } else {
                alert("Biometric ID not recognized by the Core.");
            }
        } catch (error) {
            alert("Connection error. Is the Flask API running?");
        }
    };

    const handleReset = () => {
        resetGeminiSession();
        setMessages([
          { role: 'ai', text: `System Reset. Standing by for instructions, ${partner?.name || 'Partner'}. 🚀` }
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
            // We pass the partner data so Mintaka knows who she's talking to
            const { text, analysis: newAnalysis } = await chatWithMintaka(userMsg, partner);
            setMessages(prev => [...prev, { role: 'ai', text }]);
            if (newAnalysis) setAnalysis(newAnalysis);
        } catch (error) {
            console.error("Chat submission error:", error);
            setMessages(prev => [...prev, { role: 'ai', text: "Something went wrong. Let's try that again!" }]);
        } finally {
            setIsTyping(false);
        }
    };

    // --- VIEW: LOCK SCREEN ---
    if (!isAuthorized) {
        return (
          <div className="py-40 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl mb-8 flex items-center justify-center shadow-2xl shadow-blue-500/20 animate-pulse">
               <ShieldCheckIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tighter">Biometric Scan Required</h2>
            <p className="text-zinc-500 mb-10 max-w-sm">Enter your Orion Access ID to initialize the terminal and sync with the Core Engine.</p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md px-6">
               <input 
                 value={bioInput}
                 onChange={(e) => setBioInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && handleAccess()}
                 placeholder="BIO-XXXX" 
                 className="flex-1 bg-zinc-900 border border-zinc-800 p-4 rounded-2xl text-white outline-none focus:border-blue-500 transition-all font-mono"
               />
               <button onClick={handleAccess} className="bg-blue-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40">
                 Unlock
               </button>
            </div>
          </div>
        );
    }

    // --- VIEW: MAIN CHAT ---
    return (
        <div id="chat" className="py-20 px-4 md:px-6 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in zoom-in-95 duration-500">
            {/* Chat Window */}
            <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden flex flex-col h-[600px] shadow-2xl relative">
                <div className="p-5 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm z-10">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">{partner.name} | Orion Core</h3>
                            <p className="text-[10px] text-blue-400 font-mono uppercase tracking-widest">{partner.package}</p>
                        </div>
                    </div>
                    <button onClick={handleReset} className="p-2 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-all">
                        <ArrowPathIcon className="w-4 h-4" />
                    </button>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-zinc-950/30">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                            <div className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                                msg.role === 'user' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/10' : 'bg-zinc-800 text-zinc-200 shadow-lg border border-zinc-700/50'
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
