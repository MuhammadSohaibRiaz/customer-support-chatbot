'use client';

import { useState } from 'react';
import { mockLeads } from '@/lib/sampleData';
import { Download, Search, Mail, Building, Clock, ChevronDown } from 'lucide-react';

export default function LeadsPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredLeads = mockLeads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-6 flex flex-col h-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Captured Leads</h1>
                    <p className="text-slate-400 mt-1">Visitors who requested to be contacted by your team.</p>
                </div>
                <button className="flex items-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-colors shadow-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </button>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col flex-1">
                <div className="p-5 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by name, email, or company..."
                            className="w-full pl-9 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-3 text-sm text-slate-400">
                        <span className="font-medium text-slate-300">{filteredLeads.length}</span> leads found
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-900/80 border-b border-slate-800">
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Name</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Info</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Company</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Captured At</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-900">
                            {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors group">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="w-9 h-9 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold mr-3 border border-indigo-500/10">
                                                {lead.name.charAt(0)}
                                            </div>
                                            <span className="font-medium text-white">{lead.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center text-slate-300 text-sm">
                                            <Mail className="w-4 h-4 mr-2.5 text-slate-500" />
                                            {lead.email}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center text-slate-300 text-sm">
                                            <Building className="w-4 h-4 mr-2.5 text-slate-500" />
                                            {lead.company || <span className="text-slate-600 italic">Not provided</span>}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center text-slate-400 text-sm">
                                            <Clock className="w-4 h-4 mr-2.5 text-slate-500" />
                                            {lead.date}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right">
                                        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                            View Chat Log
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <Search className="w-8 h-8 text-slate-700 mb-3" />
                                            <p>No leads found matching your search.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
