<form onSubmit={handleSubmit} className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                    <div className="relative">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Message Orion Bolt Pro..."
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-5 pr-14 text-white focus:outline-none focus:border-blue-500"
                        />
                        <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 top-2 p-3 text-blue-500">
                            <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Sidebar with dynamic stats */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col space-y-6">
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">Partner Diagnostics</h4>
                <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <div className="flex items-center space-x-2 mb-3">
                        <ShieldCheckIcon className="w-4 h-4 text-blue-500" />
                        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Core Status</span>
                    </div>
                    <p className="text-xs text-white">{partner.status}</p>
                </div>
            </div>
        </div>
    );
};
