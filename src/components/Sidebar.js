'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard,
    MessageSquare,
    Users,
    Database,
    Settings,
    BarChart3,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Conversations', href: '/conversations', icon: MessageSquare },
    { name: 'Leads', href: '/leads', icon: Users },
    { name: 'Training Data', href: '/training', icon: Database },
    { name: 'Widget Settings', href: '/widget', icon: Settings },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            toast.error(error.message);
        } else {
            router.push('/login');
        }
    };

    return (
        <>
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 z-40">
                <div className="flex items-center">
                    <Logo className="w-8 h-8 mr-2" />
                    <span className="text-lg font-bold text-white tracking-tight">SupportAI</span>
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 -mr-2 text-slate-400 hover:text-white"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-slate-950/80 z-40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar (Desktop static, Mobile slide-over) */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-50
                flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="hidden md:flex h-16 shrink-0 items-center px-6 border-b border-slate-800">
                    <Logo className="w-8 h-8 mr-3" />
                    <span className="text-lg font-bold text-white tracking-tight">SupportAI</span>
                </div>

                <div className="flex flex-1 flex-col overflow-y-auto mt-2 md:mt-0">
                    {/* Mobile Only Header inside Drawer */}
                    <div className="md:hidden flex h-16 shrink-0 items-center px-6 border-b border-slate-800 mb-2">
                        <Logo className="w-8 h-8 mr-3" />
                        <span className="text-lg font-bold text-white tracking-tight">SupportAI</span>
                    </div>

                    <nav className="flex-1 space-y-2 px-4 py-6">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-indigo-500/10 text-indigo-400'
                                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                                        }`}
                                >
                                    <item.icon
                                        className={`mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200 ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                                            }`}
                                        aria-hidden="true"
                                    />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex shrink-0 border-t border-slate-800 p-4">
                    <button
                        onClick={handleLogout}
                        className="group flex w-full items-center px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-slate-800/50 hover:text-slate-200 transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5 text-slate-500 group-hover:text-slate-300" />
                        Sign out
                    </button>
                </div>
            </div>
        </>
    );
}
