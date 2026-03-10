'use client';

import { useState } from 'react';
import { mockTrainingData } from '@/lib/sampleData';
import {
    Database, Plus, Trash2, FileText, Globe, MessageCircleQuestion, RefreshCw, Layers
} from 'lucide-react';

export default function TrainingDataPage() {
    const [activeTab, setActiveTab] = useState('all');

    const filteredData = activeTab === 'all'
        ? mockTrainingData
        : mockTrainingData.filter(d => d.type === activeTab);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'faq': return <MessageCircleQuestion className="w-5 h-5 text-amber-500" />;
            case 'document': return <FileText className="w-5 h-5 text-indigo-500" />;
            case 'website': return <Globe className="w-5 h-5 text-emerald-500" />;
            default: return <Database className="w-5 h-5 text-slate-500" />;
        }
    };

    const getStatusBadge = (status) => {
        if (status === 'trained') {
            return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Trained</span>;
        }
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">Processing</span>;
    };

    return (
        <div className="p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center">
                        <Layers className="w-6 h-6 mr-3 text-indigo-400" />
                        Training Data
                    </h1>
                    <p className="text-slate-400 mt-1">Manage the knowledge base your AI uses to answer questions.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg border border-slate-700 transition-colors shadow-sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retrain AI
                    </button>
                    <button className="flex items-center px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors shadow-md shadow-indigo-500/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Data
                    </button>
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl shadow-sm overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-slate-800 bg-slate-900/50 px-2 pt-2">
                    {['all', 'website', 'document', 'faq'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                    ? 'border-indigo-500 text-white'
                                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
                                }`}
                        >
                            {tab === 'all' ? 'All Data Sources' : `${tab}s`}
                        </button>
                    ))}
                </div>

                <div className="p-0 overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-900 border-b border-slate-800">
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Source Type</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Title / Path</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                            {filteredData.length > 0 ? filteredData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors group">
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        <div className="flex items-center space-x-3">
                                            <div className="p-2 bg-slate-800 rounded-lg border border-slate-700">
                                                {getTypeIcon(item.type)}
                                            </div>
                                            <span className="font-medium text-slate-300 capitalize">{item.type}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <p className="font-medium text-white">{item.title}</p>
                                        <p className="text-sm text-slate-500 truncate max-w-md mt-0.5">{item.content}</p>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        {getStatusBadge(item.status)}
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap text-right">
                                        <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-500">
                                        <Database className="w-8 h-8 mx-auto text-slate-600 mb-3" />
                                        <p>No training data found for this category.</p>
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
