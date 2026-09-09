'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
    Eye,
    EyeOff,
    ArrowRight,
    ChevronLeft,
    CheckCircle2,
    Globe,
    Building2,
    UserCheck,
    Sparkles
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

function RegisterForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRole = searchParams.get('role') === 'vendor' ? 'vendor' : 'traveler';
    const { currency, setCurrency } = useCurrency();

    const [role, setRole] = useState<'traveler' | 'vendor'>(initialRole);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // Traveler Form State
    const [travelerData, setTravelerData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: 'Tanzania',
        password: '',
        preferredCurrency: currency,
        agreeTerms: false
    });

    // Vendor / Host Form State
    const [vendorData, setVendorData] = useState({
        companyName: '',
        contactPerson: '',
        businessEmail: '',
        phone: '',
        cityHub: 'Dar es Salaam (JNIA & City Center)',
        fleetSize: '4-10 Vehicles',
        vehicleCategories: 'SUV & 4x4 Safari',
        password: '',
        agreeTerms: false
    });

    const handleTravelerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!travelerData.agreeTerms) {
            alert('Please agree to the Terms of Service & Privacy Policy.');
            return;
        }
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setToastMessage('Traveler account created successfully! Redirecting...');
            setTimeout(() => {
                router.push('/');
            }, 1200);
        }, 1000);
    };

    const handleVendorSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!vendorData.agreeTerms) {
            alert('Please accept the Multi-Vendor Partner Agreement.');
            return;
        }
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setToastMessage('Fleet Partner registered! Your verified vendor portal is active.');
            setTimeout(() => {
                router.push('/fleet');
            }, 1200);
        }, 1200);
    };

    const handleDemoFill = () => {
        if (role === 'traveler') {
            setTravelerData({
                fullName: 'Alexander Wright',
                email: 'alex.wright@globaltravel.com',
                phone: '+1 415 890 2314',
                country: 'United States',
                password: 'GlobalTraveler2026!',
                preferredCurrency: 'USD',
                agreeTerms: true
            });
        } else {
            setVendorData({
                companyName: 'Serengeti Safari Roamers Ltd',
                contactPerson: 'David Mrosso',
                businessEmail: 'operations@serengetiroamers.co.tz',
                phone: '+255 754 889 900',
                cityHub: 'Arusha / Kilimanjaro Hub',
                fleetSize: '10-25 Vehicles',
                vehicleCategories: 'SUV & 4x4 Safari, VIP Mover',
                password: 'PartnerSecure2026!',
                agreeTerms: true
            });
        }
        setToastMessage(`Auto-filled demo data for ${role === 'vendor' ? 'Fleet Partner' : 'Traveler'}!`);
        setTimeout(() => setToastMessage(null), 3000);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-red-600 selection:text-white relative overflow-hidden">
            {/* Background Glow Elements */}
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600/20 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-800/15 rounded-full blur-[128px] pointer-events-none"></div>

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

            {/* Main Content */}
            <main className="relative z-10 max-w-5xl mx-auto w-full px-4 py-8 flex items-center justify-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Info Column */}
                    <div className="hidden lg:flex lg:col-span-4 flex-col justify-between p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl sticky top-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-6">
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Multi-Vendor Ecosystem</span>
                            </div>

                            <h2 className="text-2xl font-black text-white leading-tight mb-4">
                                {role === 'vendor' ? 'Monetize & Scale Your Rental Fleet' : 'Join Global Travelers on B-Tech'}
                            </h2>

                            <p className="text-slate-400 text-xs leading-relaxed mb-6">
                                {role === 'vendor'
                                    ? 'Connect your vehicles with verified international delegates, safari tourists, and local businesses. Enjoy guaranteed 50/50 escrow payments with transparent commission.'
                                    : 'Experience seamless mobility across Dar es Salaam, Zanzibar, and national parks. Instant booking, transparent pricing in USD/TZS, and contactless airport delivery.'}
                            </p>

                            <div className="space-y-3.5 text-xs font-medium text-slate-300">
                                <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{role === 'vendor' ? 'Direct Fleet Payouts upon Trip Sign-Off' : '50% Deposit to Book, Balance on Arrival'}</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{role === 'vendor' ? 'Automated Booking & Driver Allocation' : 'International Driving Permits Accepted'}</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                    </div>
                                    <span>{role === 'vendor' ? 'Verified Host Badging & High Visibility' : 'Airport Delivery at JNIA, JRO & Zanzibar'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 mt-8">
                            <button
                                type="button"
                                onClick={handleDemoFill}
                                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold py-2.5 px-3 rounded-xl transition-all text-center flex items-center justify-center gap-2"
                            >
                                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                                <span>Fill Demo Data</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Form Card */}
                    <div className="lg:col-span-8 bg-slate-900/90 border border-white/15 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-2xl">
                        {toastMessage && (
                            <div className="mb-6 p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-sm font-semibold flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 shrink-0" />
                                <span>{toastMessage}</span>
                            </div>
                        )}

                        <div className="mb-6">
                            <h1 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight">
                                Create an Account
                            </h1>
                            <p className="text-slate-400 text-sm">
                                Choose your account type to get started with B-Tech International.
                            </p>
                        </div>

                        {/* Dual Role Selector */}
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
                                <span>Traveler Account</span>
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
                                <span>Fleet Partner (Host)</span>
                            </button>
                        </div>

                        {/* Traveler Registration Form */}
                        {role === 'traveler' ? (
                            <form onSubmit={handleTravelerSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={travelerData.fullName}
                                            onChange={(e) => setTravelerData({ ...travelerData, fullName: e.target.value })}
                                            placeholder="John Doe"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={travelerData.email}
                                            onChange={(e) => setTravelerData({ ...travelerData, email: e.target.value })}
                                            placeholder="john@example.com"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Phone / WhatsApp
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={travelerData.phone}
                                            onChange={(e) => setTravelerData({ ...travelerData, phone: e.target.value })}
                                            placeholder="+255 700 000 000"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Country of Residence
                                        </label>
                                        <input
                                            type="text"
                                            value={travelerData.country}
                                            onChange={(e) => setTravelerData({ ...travelerData, country: e.target.value })}
                                            placeholder="Tanzania / International"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Create Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={travelerData.password}
                                                onChange={(e) => setTravelerData({ ...travelerData, password: e.target.value })}
                                                placeholder="••••••••••••"
                                                className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-slate-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Preferred Currency
                                        </label>
                                        <select
                                            value={travelerData.preferredCurrency}
                                            onChange={(e) => {
                                                const val = e.target.value as 'TZS' | 'USD';
                                                setTravelerData({ ...travelerData, preferredCurrency: val });
                                                setCurrency(val);
                                            }}
                                            className="w-full bg-slate-950 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm"
                                        >
                                            <option value="TZS">TZS - Tanzanian Shilling</option>
                                            <option value="USD">USD - United States Dollar ($)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 hover:text-slate-300">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={travelerData.agreeTerms}
                                            onChange={(e) => setTravelerData({ ...travelerData, agreeTerms: e.target.checked })}
                                            className="rounded bg-slate-950 border-white/20 text-red-600 focus:ring-red-500 w-4 h-4 mt-0.5 cursor-pointer"
                                        />
                                        <span>
                                            I accept B-Tech&apos;s{' '}
                                            <Link href="/terms" className="text-red-400 hover:underline">Terms of Service</Link>{' '}
                                            and{' '}
                                            <Link href="/privacy" className="text-red-400 hover:underline">Privacy Policy</Link>.
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 cursor-pointer mt-4"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Create Traveler Account</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            /* Fleet Partner / Host Registration Form */
                            <form onSubmit={handleVendorSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Fleet / Company Name
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={vendorData.companyName}
                                            onChange={(e) => setVendorData({ ...vendorData, companyName: e.target.value })}
                                            placeholder="e.g. Apex Luxury Rentals Ltd"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Authorized Representative
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={vendorData.contactPerson}
                                            onChange={(e) => setVendorData({ ...vendorData, contactPerson: e.target.value })}
                                            placeholder="Managing Director / Owner"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Business Email
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={vendorData.businessEmail}
                                            onChange={(e) => setVendorData({ ...vendorData, businessEmail: e.target.value })}
                                            placeholder="fleet@company.co.tz"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Business Phone / Dispatch
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={vendorData.phone}
                                            onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })}
                                            placeholder="+255 700 000 000"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Primary Operating City / Hub
                                        </label>
                                        <select
                                            value={vendorData.cityHub}
                                            onChange={(e) => setVendorData({ ...vendorData, cityHub: e.target.value })}
                                            className="w-full bg-slate-950 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm"
                                        >
                                            <option value="Dar es Salaam (JNIA & City Center)">Dar es Salaam (JNIA & City Center)</option>
                                            <option value="Arusha / Kilimanjaro Hub">Arusha / Kilimanjaro Hub</option>
                                            <option value="Zanzibar Island (ZNZ Airport & Stone Town)">Zanzibar Island (ZNZ Airport & Stone Town)</option>
                                            <option value="Dodoma Capital Region">Dodoma Capital Region</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Fleet Size
                                        </label>
                                        <select
                                            value={vendorData.fleetSize}
                                            onChange={(e) => setVendorData({ ...vendorData, fleetSize: e.target.value })}
                                            className="w-full bg-slate-950 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm"
                                        >
                                            <option value="1-3 Vehicles">1-3 Vehicles (Independent Host)</option>
                                            <option value="4-10 Vehicles">4-10 Vehicles (Commercial Fleet)</option>
                                            <option value="10-25 Vehicles">10-25 Vehicles (Enterprise Partner)</option>
                                            <option value="25+ Vehicles">25+ Vehicles (National Operator)</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Primary Vehicle Types
                                        </label>
                                        <input
                                            type="text"
                                            value={vendorData.vehicleCategories}
                                            onChange={(e) => setVendorData({ ...vendorData, vehicleCategories: e.target.value })}
                                            placeholder="e.g. Land Cruiser V8, Prado, Rav4, EVs"
                                            className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                                            Create Partner Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                required
                                                value={vendorData.password}
                                                onChange={(e) => setVendorData({ ...vendorData, password: e.target.value })}
                                                placeholder="••••••••••••"
                                                className="w-full bg-slate-950/80 border border-white/10 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl py-3 pl-4 pr-10 text-white text-sm placeholder-slate-600"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-400 hover:text-slate-300">
                                        <input
                                            type="checkbox"
                                            required
                                            checked={vendorData.agreeTerms}
                                            onChange={(e) => setVendorData({ ...vendorData, agreeTerms: e.target.checked })}
                                            className="rounded bg-slate-950 border-white/20 text-red-600 focus:ring-red-500 w-4 h-4 mt-0.5 cursor-pointer"
                                        />
                                        <span>
                                            I agree to the{' '}
                                            <Link href="/terms" className="text-red-400 hover:underline">Multi-Vendor Fleet Agreement</Link>{' '}
                                            and confirm vehicle safety & commercial insurance compliance.
                                        </span>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 uppercase tracking-wider text-sm disabled:opacity-50 cursor-pointer mt-4"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            <span>Register as Fleet Partner</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Switch to Login */}
                        <div className="mt-8 text-center text-xs text-slate-400 border-t border-white/10 pt-6">
                            Already have an account?{' '}
                            <Link
                                href="/login"
                                className="text-red-400 hover:text-red-300 font-bold ml-1 hover:underline"
                            >
                                Sign In here
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

export default function RegisterPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-sm">Loading Registration Portal...</div>}>
            <RegisterForm />
        </Suspense>
    );
}
