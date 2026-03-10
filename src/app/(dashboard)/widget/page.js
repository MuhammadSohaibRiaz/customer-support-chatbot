'use client';

import { useState } from 'react';
import { Settings2, PaintBucket, MessageSquare, Code, Copy, Check } from 'lucide-react';

export default function WidgetSettingsPage() {
    const [greeting, setGreeting] = useState('Hi! How can I help you today?');
    const [themeColor, setThemeColor] = useState('#6366f1');
    const [copied, setCopied] = useState(false);

    const embedCode = `<script>
  window.CHATBOT_CONFIG = {
    chatbotId: "demo-chatbot-id-1234",
    greeting: "${greeting}",
    themeColor: "${themeColor}"
  };
</script>
<script src="https://example.com/widget.js" defer></script>`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(embedCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="p-8 max-w-7xl mx-auto flex flex-col h-full">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center">
                    <Settings2 className="w-6 h-6 mr-3 text-indigo-400" />
                    Widget Settings
                </h1>
                <p className="text-slate-400 mt-1">Customize how the chatbot appears on your website.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                {/* Settings Panel */}
                <div className="space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6 overflow-hidden">
                        <h2 className="text-lg font-semibold text-white mb-6">Customization</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2 whitespace-nowrap flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-2 text-slate-500" />
                                    Greeting Message
                                </label>
                                <input
                                    type="text"
                                    value={greeting}
                                    onChange={(e) => setGreeting(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 hover:border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center">
                                    <PaintBucket className="w-4 h-4 mr-2 text-slate-500" />
                                    Theme Color
                                </label>
                                <div className="flex items-center space-x-3">
                                    <div className="relative rounded-lg overflow-hidden border border-slate-700 w-10 h-10 shadow-sm shrink-0">
                                        <input
                                            type="color"
                                            value={themeColor}
                                            onChange={(e) => setThemeColor(e.target.value)}
                                            className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer opacity-100"
                                        />
                                    </div>
                                    <input
                                        type="text"
                                        value={themeColor}
                                        onChange={(e) => setThemeColor(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 hover:border-slate-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-mono max-w-[140px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6 overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white flex items-center">
                                <Code className="w-5 h-5 mr-2 text-indigo-400" />
                                Embed Code
                            </h2>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-white font-medium border border-slate-700 transition-colors shadow-sm"
                            >
                                {copied ? <Check className="w-4 h-4 mr-1.5 text-emerald-400" /> : <Copy className="w-4 h-4 mr-1.5" />}
                                {copied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <p className="text-sm text-slate-400 mb-4 bg-slate-800/50 p-3 rounded-lg border border-slate-800 text-center">Paste this snippet before the <code>&lt;/body&gt;</code> tag on your website.</p>
                        <div className="relative group">
                            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-lg overflow-x-auto text-sm text-indigo-300 font-mono leading-relaxed shadow-inner">
                                {embedCode}
                            </pre>
                        </div>
                    </div>
                </div>

                {/* Live Preview Panel */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-0 overflow-hidden flex flex-col min-h-[500px] relative mt-8 lg:mt-0">
                    <div className="bg-slate-800/80 p-3 border-b border-slate-800 shrink-0 flex justify-center items-center">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                            <span className="w-2 h-2 rounded-full bg-red-400 mr-1.5"></span>
                            <span className="w-2 h-2 rounded-full bg-amber-400 mr-1.5"></span>
                            <span className="w-2 h-2 rounded-full bg-emerald-400 mr-3"></span>
                            Live Browser Preview
                        </h2>
                    </div>

                    <div className="flex-1 bg-slate-950 relative overflow-hidden">
                        {/* Mock website content background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950">
                            <div className="relative z-10 p-10 pt-16 space-y-6 opacity-30">
                                <div className="w-1/3 h-10 bg-slate-700 rounded-lg shadow-sm"></div>
                                <div className="w-3/4 h-5 bg-slate-700 rounded-md"></div>
                                <div className="w-2/3 h-5 bg-slate-700 rounded-md"></div>
                                <div className="w-1/2 h-5 bg-slate-700 rounded-md"></div>
                                <div className="w-1/4 h-12 bg-indigo-500/50 rounded-lg mt-8 border border-indigo-400/20"></div>

                                <div className="pt-12 grid grid-cols-3 gap-6">
                                    <div className="h-32 bg-slate-700 rounded-xl"></div>
                                    <div className="h-32 bg-slate-700 rounded-xl"></div>
                                    <div className="h-32 bg-slate-700 rounded-xl"></div>
                                </div>
                            </div>
                        </div>

                        {/* Chat Widget Preview */}
                        <div className="absolute bottom-6 right-6 w-[340px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all z-20">
                            <div
                                className="p-4 text-white flex items-center justify-between shadow-sm"
                                style={{ backgroundColor: themeColor }}
                            >
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-black/20 rounded-lg flex items-center justify-center">
                                        <MessageSquare className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <span className="font-semibold text-sm block">Support AI</span>
                                        <span className="text-xs text-white/80">Online</span>
                                    </div>
                                </div>
                            </div>

                            <div className="h-[280px] p-5 flex flex-col bg-slate-950 overflow-y-auto">
                                <div className="flex justify-start mb-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center mr-2 shrink-0 border border-slate-700">
                                        <BotMessageSquare className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="max-w-[85%] bg-slate-800 text-slate-200 border border-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 text-sm shadow-sm font-medium">
                                        {greeting}
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-900 border-t border-slate-800">
                                <div className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-500 shadow-inner flex items-center justify-between">
                                    <span>Type your message...</span>
                                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center">
                                        <svg className="w-3 h-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Ensure BotMessageSquare is available if missing from upper imports
import { BotMessageSquare } from 'lucide-react';
