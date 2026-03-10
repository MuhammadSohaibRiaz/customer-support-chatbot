import Link from 'next/link';
import Logo from '@/components/Logo';
import { ArrowRight, Zap, Shield, BarChart3, MessageSquare, CheckCircle2, Globe, FileText, ChevronRight, User } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-white hidden sm:block">SupportAI</span>
          </div>
          <div className="flex items-center space-x-4 sm:space-x-8">
            <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">
              Pricing
            </Link>
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-24 sm:pt-32 sm:pb-40 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-indigo-600/20 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-sky-500/10 rounded-full blur-[60px] sm:blur-[100px] pointer-events-none"></div>

        <div className="relative z-10 px-4">
          <div className="inline-flex items-center px-3 py-1 text-xs sm:text-sm font-medium text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 mr-2 animate-pulse"></span>
            SupportAI v1.0 is now live
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 sm:mb-8 leading-tight">
            Automate customer support <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
              with AI trained on your data.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 mb-8 sm:mb-10 leading-relaxed px-2">
            Create a custom GPT-powered chatbot in minutes. Embed it on your website, capture leads, and resolve queries 24/7 without human intervention.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full px-4 sm:px-0">
            <Link
              href="/signup"
              className="w-full sm:w-auto px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center text-lg"
            >
              Start for free <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 border border-slate-700 transition-colors flex items-center justify-center text-lg"
            >
              View Demo Dashboard
            </Link>
          </div>

          <div className="mt-10 sm:mt-16 flex items-center justify-center space-x-6 text-sm text-slate-500 font-medium">
            <div className="flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> No credit card required</div>
            <div className="hidden sm:flex items-center"><CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" /> 14-day free trial</div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="border-t border-slate-800/60 bg-slate-900/20 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything you need to scale support</h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">Stop answering repetitive questions manually. Let our intelligent wrapper handle your customer queries instantly.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-indigo-500/30 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform">
                <Zap className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Instant Responses</h3>
              <p className="text-slate-400 leading-relaxed">
                Powered by advanced LLMs, your chatbot analyzes your docs and provides instant, accurate answers to specific customer questions 24/7.
              </p>
            </div>

            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-sky-500/30 transition-colors group">
              <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center mb-6 border border-sky-500/20 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-sky-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Secure Knowledge Base</h3>
              <p className="text-slate-400 leading-relaxed">
                Simply upload PDFs, paste website URLs, or add FAQs. It immediately understands your business context and safeguards your proprietary data.
              </p>
            </div>

            <div className="p-8 bg-slate-900/50 border border-slate-800 rounded-2xl backdrop-blur-sm hover:border-emerald-500/30 transition-colors group">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 border border-emerald-500/20 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Actionable Insights</h3>
              <p className="text-slate-400 leading-relaxed">
                Capture leads offline, track conversation success rates, and identify your most common customer pain points automatically on the dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Step-by-Step */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Train your AI agent in exactly <span className="text-indigo-400">three steps.</span></h2>

            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">1</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white mb-2">Upload your data</h4>
                  <p className="text-slate-400">Provide SupportAI with your website links, Help Center articles, or PDF documents. It ingests your company knowledge securely.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">2</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white mb-2">Customize the widget</h4>
                  <p className="text-slate-400">Match the chat widget to your brand. Set the theme colors, greeting messages, and lead capture preferences.</p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">3</div>
                </div>
                <div className="ml-4">
                  <h4 className="text-xl font-semibold text-white mb-2">Embed on your site</h4>
                  <p className="text-slate-400">Copy and paste a simple JavaScript snippet into your website&apos;s HTML tag. You are live in seconds.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-bl-full blur-2xl"></div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-400" />
                </div>
                <div className="bg-slate-800 text-slate-200 p-4 rounded-2xl rounded-tl-none border border-slate-700 text-sm">
                  Hi, what is your refund policy?
                </div>
              </div>
              <div className="flex items-start space-x-4 flex-row-reverse space-x-reverse">
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                  <Logo className="w-5 h-5 text-white" />
                </div>
                <div className="bg-indigo-600 text-white p-4 rounded-2xl rounded-tr-none text-sm shadow-sm">
                  We offer a 30-day money-back guarantee on all our plans! If you&apos;re not satisfied, just email our billing team and we&apos;ll process it within 24 hours. Does that help?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / CTA Section */}
      <section id="pricing" className="border-t border-slate-800/60 bg-gradient-to-b from-slate-900/20 to-slate-950 py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Ready to transform your customer support?</h2>
          <p className="text-lg sm:text-xl text-slate-400 mb-10">Join thousands of businesses saving hours of manual support time every week.</p>
          <Link
            href="/signup"
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-1 text-lg"
          >
            Start your free trial <ChevronRight className="w-5 h-5 ml-1" />
          </Link>
          <p className="mt-6 text-slate-500 text-sm">Includes 1,000 AI messages / month. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo className="w-6 h-6 grayscale opacity-70" />
            <span className="font-semibold text-slate-400">SupportAI © 2026</span>
          </div>
          <div className="flex space-x-6 text-sm text-slate-500">
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
