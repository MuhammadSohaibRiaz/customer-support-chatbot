'use client';

import { useState } from 'react';
import { mockRecentConversations, mockMessages } from '@/lib/sampleData';
import { Search, User, Mail, Calendar, X, Send, MessageSquare } from 'lucide-react';

export default function ConversationsPage() {
    const [selectedConvId, setSelectedConvId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const selectedConv = mockRecentConversations.find(c => c.id === selectedConvId);
    const messages = selectedConvId ? (mockMessages[selectedConvId] || []) : [];

    const filteredConversations = mockRecentConversations.filter(c =>
        c.visitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.preview.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-[calc(100vh)] sm:h-screen">
            {/* Sidebar List */}
            <div className={`w-full sm:w-80 md:w-96 border-r border-slate-800 bg-slate-900/50 flex flex-col ${selectedConvId ? 'hidden sm:flex' : 'flex'}`}>
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold text-white mb-4">Conversations</h1>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search conversations..."
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredConversations.map(conv => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedConvId(conv.id)}
                            className={`p-5 border-b border-slate-800/50 cursor-pointer transition-colors hover:bg-slate-800/80 ${selectedConvId === conv.id ? 'bg-slate-800 border-l-2 border-l-indigo-500' : 'border-l-2 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-white text-sm">{conv.visitor}</span>
                                <span className="text-xs text-slate-500">{conv.time}</span>
                            </div>
                            <p className="text-sm text-slate-400 line-clamp-2 mt-1">{conv.preview}</p>
                            <div className="mt-3">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                  ${conv.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                  ${conv.status === 'lead' ? 'bg-indigo-500/10 text-indigo-400' : ''}
                  ${conv.status === 'open' ? 'bg-amber-500/10 text-amber-400' : ''}
                `}>
                                    {conv.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className={`flex-1 flex flex-col bg-slate-950 h-full ${!selectedConvId ? 'hidden sm:flex' : 'flex'}`}>
                {selectedConvId ? (
                    <>
                        {/* Chat header */}
                        <div className="h-20 shrink-0 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-6">
                            <div className="flex items-center">
                                <button
                                    className="mr-4 sm:hidden text-slate-400 hover:text-white"
                                    onClick={() => setSelectedConvId(null)}
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mr-4 text-indigo-400 font-bold">
                                    {selectedConv?.visitor.charAt(0)}
                                </div>
                                <div>
                                    <h2 className="text-white font-medium">{selectedConv?.visitor}</h2>
                                    <p className="text-xs text-slate-400 bg-slate-800 inline-block px-2 py-0.5 rounded mt-1">Visitor from Example.com</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700 shadow-sm">
                                    Mark Resolved
                                </button>
                            </div>
                        </div>

                        {/* Chat messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-950">
                            {messages.length > 0 ? messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] rounded-2xl px-5 py-3.5 shadow-sm ${msg.role === 'user'
                                            ? 'bg-indigo-600 text-white rounded-tr-sm'
                                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-sm'
                                        }`}>
                                        <p className="text-sm leading-relaxed">{msg.content}</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="flex h-full items-center justify-center text-slate-500 flex-col space-y-3">
                                    <MessageSquare className="w-12 h-12 text-slate-700" />
                                    <p>No messages found for this conversation.</p>
                                </div>
                            )}
                        </div>

                        {/* Chat input form (dummy) */}
                        <div className="p-4 bg-slate-900 border-t border-slate-800 shrink-0">
                            <div className="relative max-w-4xl mx-auto">
                                <input
                                    type="text"
                                    placeholder="Type a message to take over from AI..."
                                    className="w-full pl-4 pr-12 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white transition-colors shadow-sm">
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            <p className="text-xs text-slate-500 text-center mt-3">
                                Sending a message will pause the AI for this conversation.
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 space-y-4 bg-slate-950/50">
                        <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center shadow-inner border border-slate-800">
                            <MessageSquare className="w-10 h-10 text-slate-700" />
                        </div>
                        <p className="text-lg font-medium text-slate-400">Select a conversation to view detailed thread</p>
                    </div>
                )}
            </div>
        </div>
    );
}
