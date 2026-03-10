'use client';

import {
    MessageSquare,
    Users,
    Zap,
    Clock,
    ArrowUpRight,
    MoreHorizontal
} from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { mockKpis, mockChartData, mockRecentConversations } from '@/lib/sampleData';
import Link from 'next/link';

export default function DashboardOverview() {
    const kpiCards = [
        { name: 'Total Chats', value: mockKpis.totalChats, icon: MessageSquare, change: '+12%', trend: 'up' },
        { name: 'Leads Captured', value: mockKpis.totalLeads, icon: Users, change: '+8%', trend: 'up' },
        { name: 'AI Response Rate', value: mockKpis.responseRate, icon: Zap, change: '0%', trend: 'neutral' },
        { name: 'Avg Response Time', value: mockKpis.avgResponseTime, icon: Clock, change: '-10%', trend: 'up' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-slate-400 mt-1">Here is what is happening with your chatbot today.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((kpi) => (
                    <div key={kpi.name} className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-slate-400">{kpi.name}</p>
                            <div className="p-2 bg-indigo-500/10 rounded-lg">
                                <kpi.icon className="w-5 h-5 text-indigo-400" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline">
                            <p className="text-3xl font-semibold text-white">{kpi.value}</p>
                            <span className={`ml-2 text-sm font-medium ${kpi.trend === 'up' ? 'text-emerald-400' : 'text-slate-500'}`}>
                                {kpi.change}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="col-span-1 lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Chat Volume (7 Days)</h2>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={mockChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#818cf8' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="chats"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#6366f1', strokeWidth: 0 }}
                                    activeDot={{ r: 6, fill: '#818cf8' }}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Conversations */}
                <div className="col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-semibold text-white">Recent Conversations</h2>
                        <Link href="/conversations" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                            View all
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {mockRecentConversations.map((conv) => (
                            <div key={conv.id} className="group relative flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700/50 cursor-pointer">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-sm font-medium text-white truncate">{conv.visitor}</p>
                                        <span className="text-xs text-slate-500 whitespace-nowrap ml-2">{conv.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-400 truncate">{conv.preview}</p>

                                    <div className="mt-2 flex items-center">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium
                      ${conv.status === 'resolved' ? 'bg-emerald-500/10 text-emerald-400' : ''}
                      ${conv.status === 'lead' ? 'bg-indigo-500/10 text-indigo-400' : ''}
                      ${conv.status === 'open' ? 'bg-amber-500/10 text-amber-400' : ''}
                    `}>
                                            {conv.status.charAt(0).toUpperCase() + conv.status.slice(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
