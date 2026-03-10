'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, BotMessageSquare, Minus } from 'lucide-react';

export default function ChatWidget({ chatbotId, greeting, themeColor }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, role: 'assistant', content: greeting || 'Hi! How can I help you today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const primaryColor = themeColor || '#6366f1';

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    // Signal iframe to resize based on open state
    useEffect(() => {
        if (typeof window !== 'undefined' && window.parent) {
            window.parent.postMessage({ type: 'CHATBOT_RESIZE', isOpen }, '*');
        }
    }, [isOpen]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = { id: Date.now(), role: 'user', content: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulated API call for UI testing. Production app would use fetch to /api/chat
        setTimeout(() => {
            setIsTyping(false);
            const botResponse = {
                id: Date.now() + 1,
                role: 'assistant',
                content: "Thanks for your message! Our AI is processing your request. Please note this is a demo environment."
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1500);
    };

    if (!isOpen) {
        return (
            <div className="absolute bottom-6 right-6">
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-110 transition-transform overflow-hidden group z-50 animate-bounce-slow"
                    style={{ backgroundColor: primaryColor }}
                >
                    <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </button>
            </div>
        );
    }

    return (
        <div className="absolute bottom-6 right-6 w-[360px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-2rem)] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-200 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">

            {/* Header */}
            <div
                className="p-4 text-white flex items-center justify-between shadow-sm shrink-0"
                style={{ backgroundColor: primaryColor }}
            >
                <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 bg-black/20 rounded-xl flex items-center justify-center shadow-inner">
                        <BotMessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm leading-tight text-white mb-0">Support AI</h3>
                        <p className="text-xs text-white/80 leading-tight mt-0.5 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse"></span>
                            Usually replies instantly
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-black/20 text-white transition-colors"
                    >
                        <Minus className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Window */}
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div
                            className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[15px] shadow-sm leading-relaxed ${msg.role === 'user'
                                    ? 'text-white rounded-br-sm'
                                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-sm'
                                }`}
                            style={msg.role === 'user' ? { backgroundColor: primaryColor } : {}}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex items-center space-x-1">
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-3 bg-white border-t border-slate-100 shrink-0">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-300 transition-shadow text-[15px]"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim()}
                        className="absolute right-2 p-1.5 rounded-lg text-white transition-transform disabled:opacity-50 disabled:scale-100 active:scale-95"
                        style={{ backgroundColor: primaryColor }}
                    >
                        <Send className="w-4 h-4 ml-0.5" />
                    </button>
                </form>
                <div className="mt-2 text-center text-[11px] text-slate-400 h-4 flex items-center justify-center font-sans tracking-wide">
                    Powered by <span className="font-semibold text-slate-500 ml-1">SupportAI Platform</span>
                </div>
            </div>
        </div>
    );
}
