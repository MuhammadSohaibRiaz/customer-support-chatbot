'use client';

import {
    BarChart3, Users, MessageSquare, TrendingUp, Clock, Calendar
} from 'lucide-react';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { mockChartData, mockLeadsChartData, mockCommonQuestions, mockKpis } from '@/lib/sampleData';

export default function AnalyticsPage() {
    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <BarChart3 className="w-6 h-6 mr-3 text-indigo-400" />
                        Analytics & Insights
                    </h1>
                    <p className="text-slate-400 mt-1">Deep dive into your chatbot&apos;s performance and user interactions.</p>
                </div>
                <div className="flex items-center px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-lg shadow-sm text-slate-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                    Last 7 Days
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-slate-400 text-sm font-medium">Total Conversations</h3>
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-bold text-white">{mockKpis.totalChats}</p>
                        <span className="text-sm font-medium text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 rounded">
                            <TrendingUp className="w-3 h-3 mr-1" /> 12%
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-slate-400 text-sm font-medium">Leads Generated</h3>
                        <Users className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-bold text-white">{mockKpis.totalLeads}</p>
                        <span className="text-sm font-medium text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 rounded">
                            <TrendingUp className="w-3 h-3 mr-1" /> 8%
                        </span>
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm hover:border-slate-700 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-slate-400 text-sm font-medium">Resolution Rate</h3>
                        <Clock className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="flex items-baseline space-x-2">
                        <p className="text-3xl font-bold text-white">{mockKpis.responseRate}</p>
                        <span className="text-sm font-medium text-slate-400 flex items-center border border-slate-700 px-1.5 rounded">
                            Target: 95%
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Chat Volume Chart */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6 overflow-hidden">
                    <h2 className="text-lg font-semibold text-white mb-6">Conversation Volume</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={mockChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorChats" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#818cf8' }}
                                    cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '3 3' }}
                                />
                                <Area type="monotone" dataKey="chats" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorChats)" isAnimationActive={false} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Leads Generated Chart */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6 overflow-hidden">
                    <h2 className="text-lg font-semibold text-white mb-6">Leads Generated</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={mockLeadsChartData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#10b981' }}
                                    cursor={{ fill: '#1e293b' }}
                                />
                                <Bar dataKey="leads" fill="#10b981" radius={[4, 4, 0, 0]} isAnimationActive={false} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Most Common Questions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">Most Common Questions</h2>
                    <div className="space-y-3">
                        {mockCommonQuestions.map((q, index) => (
                            <div key={q.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/50 border border-transparent hover:border-slate-800 transition-colors group">
                                <div className="flex items-center space-x-3">
                                    <span className="w-6 h-6 rounded bg-slate-800 text-slate-400 font-medium text-xs flex items-center justify-center border border-slate-700 group-hover:bg-slate-700 transition-colors">
                                        {index + 1}
                                    </span>
                                    <p className="text-slate-200 text-sm font-medium">{q.text}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-950 text-slate-400 rounded-md border border-slate-700">
                                        {q.count} times
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Feature Usage / More insights */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-white mb-6">AI Confidence & Escalation</h2>
                    <div className="space-y-8">
                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="text-slate-300 font-medium whitespace-nowrap">Successfully Resolved by AI</span>
                                <span className="text-emerald-400 font-medium font-mono text-xs bg-emerald-500/10 px-1.5 py-0.5 rounded">78%</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden shadow-inner">
                                <div className="bg-emerald-500 h-full rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: '78%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="text-slate-300 font-medium">Escalated to Human Agent</span>
                                <span className="text-amber-400 font-medium font-mono text-xs bg-amber-500/10 px-1.5 py-0.5 rounded">15%</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden shadow-inner">
                                <div className="bg-amber-500 h-full rounded-r-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" style={{ width: '15%' }}></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-sm mb-2.5">
                                <span className="text-slate-300 font-medium">Captured as Lead (Offline)</span>
                                <span className="text-indigo-400 font-medium font-mono text-xs bg-indigo-500/10 px-1.5 py-0.5 rounded">7%</span>
                            </div>
                            <div className="w-full bg-slate-950 rounded-full h-2.5 border border-slate-800 overflow-hidden shadow-inner">
                                <div className="bg-indigo-500 h-full rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: '7%' }}></div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-sm mt-4">
                            <span className="text-slate-400 font-medium">Average Session Length</span>
                            <span className="font-semibold text-white bg-slate-800 px-2 py-1 rounded-md border border-slate-700">4m 12s</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
