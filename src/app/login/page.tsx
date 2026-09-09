'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ShieldCheck,
    Eye,
    EyeOff,
    ArrowRight,
    Lock,
    Mail,
    ChevronLeft,
    CheckCircle2,
    Globe,
    Building2,
    UserCheck,
    Sparkles
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function LoginPage() {
    const router = useRouter();
    const { currency, setCurrency } = useCurrency();
    const [role, setRole] = useState<'traveler' | 'vendor'>('traveler');
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setToastMessage(`Signed in successfully as ${role === 'vendor' ? 'Fleet Partner' : 'Traveler'}!`);
            setTimeout(() => {
                if (role === 'vendor') {
                    router.push('/fleet');
                } else {
                    router.push('/');
                }
            }, 1200);
        }, 1000);
    };

    const handleQuickDemo = (selectedRole: 'traveler' | 'vendor') => {
        setRole(selectedRole);
        if (selectedRole === 'vendor') {
            setEmail('partner@coastalluxuryfleet.co.tz');
            setPassword('FleetPartner2026!');
        } else {
            setEmail('traveler@international.com');
            setPassword('TravelerSecret2026!');
        }
        setToastMessage(`Loaded demo credentials for ${selectedRole === 'vendor' ? 'Fleet Partner' : 'Traveler'}`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white relative overflow-hidden">
            {/* Background Glow Elements */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-red-800/15 rounded-full blur-[128px] pointer-events-none"></div>

            {/* Navigation Header */}
            <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl border border-white/10"
                >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Platform</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setCurrency(currency === 'TZS' ? 'USD' : 'TZS')}
                        className="bg-white/10 hover:bg-white/15 text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10 transition-colors flex items-center gap-1.5"
                    >
                        <Globe className="w-3.5 h-3.5 text-red-400" />
                        <span>{currency}</span>
                    </button>
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-red-600 text-white p-1.5 rounded-lg font-black text-lg">BT</div>
                        <span className="font-extrabold tracking-tight text-white hidden sm:inline">B-TECH</span>
                    </Link>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 max-w-5xl mx-auto w-full px-4 py-8 flex items-center justify-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    
                    {/* Left Branding / Value Proposition Box */}
                    <div className="hidden lg:flex lg:col-span-5 flex-col justify-between p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl h-full shadow-2xl">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Global Mobility Portal</span>
                            </div>
                            <h2 className="text-3xl font-black text-white leading-tight mb-4">
                                {role === 'vendor' ? 'Empowering Fleet Partners Across East Africa' : 'Premium Vehicles, Anywhere in Tanzania'}
                            </h2>
                            <p className="text-slate-400 text-sm leading-relaxed mb-8">
                                {role === 'vendor'
                                    ? 'Access your unified vendor console, manage reservations, track live fleet availability, and receive secure payouts with our 50/50 escrow platform.'
                                    : 'Rent vetted luxury SUVs, rugged 4x4 safari expedition vehicles, or executive sedans with international payment protection and airport handoff.'}
                            </p>

                            <div className="space-y-4 text-xs font-medium text-slate-300">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>50/50 Secure Escrow Protection Guarantee</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>Airport Meet & Greet (JNIA, JRO, Zanzibar)</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                    <span>24/7 Dedicated Concierge & Roadside Support</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Demo Fill Buttons */}
                        <div className="pt-8 border-t border-white/10 mt-8">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-3">
                                Quick Demo Access:
                            </span>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleQuickDemo('traveler')}
                                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold py-2 px-3 rounded-xl transition-all text-center"
                                >
                                    Traveler Demo
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickDemo('vendor')}
                                    className="bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 text-red-400 text-xs font-semibold py-2 px-3 rounded-xl transition-all text-center"
                                >
                                    Partner Demo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Login Form Box */}
                    <div className="lg:col-span-7 bg-slate-900/90 border border-white/15 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-2xl">
                        {toastMessage && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <span>{toastMessage}</span>
                            </div>
                        )}

                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                                Welcome Back
                            </h1>
                            <p className="text-slate-400 text-sm">
                                Sign in to manage your bookings or fleet operations.
                            </p>
                        </div>

                        {/* Dual Role Switcher */}
                        <div className="bg-slate-950 p-1.5 rounded-2xl border border-white/10 grid grid-cols-2 gap-1 mb-8">
                            <button
                                type="button"
                                onClick={() => setRole('traveler')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                                    role === 'traveler'
                                        ? 'bg-red-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <UserCheck className="w-4 h-4" />
                                <span>Traveler</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('vendor')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                                    role === 'vendor'
                                        ? 'bg-red-600 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                <Building2 className="w-4 h-4" />
                                <span>Fleet Partner</span>
                            </button>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                    {role === 'vendor' ? 'Business Email / Account ID' : 'Email Address'}
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder={role === 'vendor' ? 'partner@fleet.co.tz' : 'you@example.com'}
                                        className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3.5 pl-12 pr-4 text-white text-sm placeholder-slate-600 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => alert('Please check your registered email for password reset instructions.')}
                                        className="text-xs text-red-400 hover:text-red-300 font-semibold"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                                        <Lock className="w-5 h-5" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••••••"
                                        className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3.5 pl-12 pr-12 text-white text-sm placeholder-slate-600 transition-all font-medium"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs pt-1">
                                <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="rounded bg-slate-950 border-white/20 text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                                    />
                                    <span>Keep me signed in</span>
                                </label>
                                <span className="text-slate-500 text-[11px] flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                                    256-bit Encrypted
                                </span>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 cursor-pointer"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>Sign In as {role === 'vendor' ? 'Partner' : 'Traveler'}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Social Login Options */}
                        <div className="mt-8 pt-6 border-t border-white/10">
                            <div className="relative flex justify-center text-xs uppercase mb-6">
                                <span className="bg-slate-900 px-3 text-slate-500 font-bold tracking-wider">
                                    Or Continue With
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleQuickDemo('traveler')}
                                    className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-all"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                                        />
                                    </svg>
                                    <span>Google</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleQuickDemo('traveler')}
                                    className="flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-semibold transition-all"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 170 170">
                                        <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.7-7.85-12.01-14.44-6.43-9.84-11.45-21.05-15.06-33.62-3.61-12.57-5.42-24.32-5.42-35.25 0-14.44 3.73-26.68 11.19-36.71 7.46-10.04 17.06-15.22 28.79-15.54 4.58 0 9.87 1.25 15.87 3.75 6 2.5 9.73 3.8 11.19 3.9 1.83-.2 5.79-1.57 11.88-4.11 6.09-2.54 11.37-3.71 15.85-3.51 12.39.63 22.39 5.34 29.98 14.13-10.88 6.64-16.19 15.75-15.93 27.33.26 9.17 3.81 16.92 10.65 23.25 6.84 6.33 14.99 10.06 24.45 11.19-2.3 6.96-5.26 14.54-8.88 22.75zM119.22 33.15c0-7.39 2.68-14.34 8.04-20.85 5.36-6.51 12-10.74 19.92-12.7 1.09 7.6-1.51 14.86-7.8 21.79-6.29 6.93-13.01 10.85-20.16 11.76z" />
                                    </svg>
                                    <span>Apple</span>
                                </button>
                            </div>
                        </div>

                        {/* Link to Register */}
                        <div className="mt-8 text-center text-xs text-slate-400">
                            Don&apos;t have an account yet?{' '}
                            <Link
                                href={`/register?role=${role}`}
                                className="text-red-400 hover:text-red-300 font-bold ml-1 hover:underline"
                            >
                                {role === 'vendor' ? 'Register as Fleet Partner' : 'Create Traveler Account'}
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10 py-6 px-4 text-center text-xs text-slate-500">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
                    <p>© 2026 B-Tech Car Rental International. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/terms" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</Link>
                        <Link href="/" className="hover:text-slate-300 transition-colors">Support</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
