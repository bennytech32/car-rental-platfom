'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    MapPin,
    Calendar,
    User,
    CreditCard,
    CheckCircle,
    ShieldCheck,
    Car,
    UploadCloud,
    FileText,
    Info,
    Sparkles,
    ArrowRight
} from 'lucide-react';

const MOCK_SELECTED_CAR = {
    id: 1,
    name: "Toyota Land Cruiser V8",
    category: "SUV / 4x4 Safari",
    pricePerDay: 350000,
    image: "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80",
};

export default function CheckoutPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingComplete, setBookingComplete] = useState(false);
    const [bookingRef, setBookingRef] = useState('BT-84920');

    const [formData, setFormData] = useState({
        serviceType: 'wedding_sendoff',
        pickupLocation: 'Dar es Salaam',
        dropoffLocation: 'Dar es Salaam',
        pickupDate: '',
        pickupTime: '10:00',
        dropoffDate: '',
        dropoffTime: '10:00',

        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: 'local', // 'local' or 'international'

        localLicenseFile: '',
        passportFile: '',
        internationalLicenseFile: '',

        specialRequests: '',
        paymentMethod: 'mobile_money',
        agreeToTerms: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
        if (e.target.files && e.target.files[0]) {
            setFormData(prev => ({ ...prev, [fieldName]: e.target.files![0].name }));
        }
    };

    const nextStep = () => {
        if (currentStep < 3) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(prev => prev - 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setBookingRef(`BT-${Math.floor(10000 + Math.random() * 90000)}`);
            setBookingComplete(true);
        }, 2000);
    };

    const calculateDays = () => {
        if (!formData.pickupDate || !formData.dropoffDate) return 1;
        const start = new Date(formData.pickupDate);
        const end = new Date(formData.dropoffDate);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? 1 : diffDays;
    };

    const totalDays = calculateDays();
    const baseRate = MOCK_SELECTED_CAR.pricePerDay;
    const subtotal = baseRate * totalDays;
    const grandTotal = subtotal; // VAT Imeondolewa kabisa
    const upfrontPayment = grandTotal / 2;

    if (bookingComplete) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl text-center border border-slate-100 transform animate-in zoom-in-95 duration-500">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/10">
                        <CheckCircle className="w-10 h-10 animate-bounce" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                        Your booking reference is <strong className="text-slate-900">#{bookingRef}</strong>.
                        We have sent the 50% escrow payment instructions to your phone and email.
                    </p>
                    <Link
                        href="/"
                        className="block w-full bg-red-600 text-white font-bold py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 text-sm uppercase tracking-wider"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 pb-28 md:pb-20 font-sans selection:bg-red-600 selection:text-white">

            {/* Header */}
            <header className="bg-slate-950/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors text-xs md:text-sm">
                        <ChevronLeft className="w-5 h-5 text-red-500" />
                        <span>Back to Fleet</span>
                    </Link>
                    <div className="flex items-center gap-2.5">
                        <div className="bg-red-600 text-white p-1.5 rounded-xl font-black text-xs tracking-wider shadow-md shadow-red-600/30">BT</div>
                        <span className="font-extrabold tracking-tight text-white text-sm md:text-base">Secure Checkout</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 mt-6 md:mt-10">
                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Form Area */}
                    <div className="w-full lg:w-2/3">
                        <div className="bg-slate-950/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 p-5 sm:p-8 md:p-10 relative overflow-hidden">

                            {/* Ambient background glow */}
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

                            {/* Progress Bar with smooth animations */}
                            <div className="flex items-center justify-between mb-8 md:mb-10 relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-800 z-0 rounded-full"></div>
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-red-600 to-rose-500 z-0 rounded-full transition-all duration-700 ease-out"
                                    style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                                ></div>

                                {[
                                    { step: 1, icon: <MapPin />, label: "Trip Details" },
                                    { step: 2, icon: <User />, label: "Personal Info" },
                                    { step: 3, icon: <CreditCard />, label: "Payment" }
                                ].map((item) => (
                                    <div key={item.step} className="relative z-10 flex flex-col items-center gap-2 bg-slate-950 px-2">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center font-bold border transition-all duration-300 ${currentStep >= item.step
                                            ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/40 scale-105'
                                            : 'bg-slate-900 border-slate-700 text-slate-500'
                                            }`}>
                                            {currentStep > item.step ? <CheckCircle className="w-5 h-5 text-white" /> : React.cloneElement(item.icon, { className: 'w-4 h-4 md:w-5 md:h-5' })}
                                        </div>
                                        <span className={`text-[10px] md:text-xs font-extrabold uppercase tracking-wider ${currentStep >= item.step ? 'text-white' : 'text-slate-500'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>

                                {/* STEP 1: TRIP DETAILS */}
                                {currentStep === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
                                            <Sparkles className="w-5 h-5 text-red-500" />
                                            <h2 className="text-xl md:text-2xl font-black text-white">Select Service & Trip Plan</h2>
                                        </div>

                                        {/* Added All 9 New Services */}
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Choose Service Type</label>
                                            <select
                                                name="serviceType"
                                                value={formData.serviceType}
                                                onChange={handleInputChange}
                                                className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-600/20 font-bold bg-slate-900 text-white text-base md:text-sm transition-all"
                                            >
                                                <option value="wedding_sendoff">Wedding & Sendoff</option>
                                                <option value="airport_transfer">Airport Transfer</option>
                                                <option value="corporate_drive">Corporate Chauffeur & Self Drive</option>
                                                <option value="family_drive">Family Trip Chauffeur & Self Drive</option>
                                                <option value="photoshoot">Photoshoot & Video Shoot</option>
                                                <option value="special_appearance">Special Appearance</option>
                                                <option value="safari_tour">Safaris & Tour Drive (4x4)</option>
                                                <option value="upcountry_trips">Upcountry Trips</option>
                                                <option value="custom_services">Other Custom Services</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Pick-up Location</label>
                                                <select
                                                    name="pickupLocation"
                                                    value={formData.pickupLocation}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium transition-all"
                                                >
                                                    <option value="Dar es Salaam">Dar es Salaam</option>
                                                    <option value="Zanzibar">Zanzibar</option>
                                                    <option value="Arusha">Arusha</option>
                                                    <option value="Mwanza">Mwanza</option>
                                                    <option value="Mbeya">Mbeya</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Drop-off Location</label>
                                                <select
                                                    name="dropoffLocation"
                                                    value={formData.dropoffLocation}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium transition-all"
                                                >
                                                    <option value="Same as Pick-up">Same as Pick-up</option>
                                                    <option value="Dar es Salaam">Dar es Salaam</option>
                                                    <option value="Zanzibar">Zanzibar</option>
                                                    <option value="Arusha">Arusha</option>
                                                    <option value="Mwanza">Mwanza</option>
                                                    <option value="Mbeya">Mbeya</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Pick-up Date & Time</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="date"
                                                        name="pickupDate"
                                                        value={formData.pickupDate}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-2/3 border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                    />
                                                    <input
                                                        type="time"
                                                        name="pickupTime"
                                                        value={formData.pickupTime}
                                                        onChange={handleInputChange}
                                                        className="w-1/3 border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Drop-off Date & Time</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="date"
                                                        name="dropoffDate"
                                                        value={formData.dropoffDate}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-2/3 border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                    />
                                                    <input
                                                        type="time"
                                                        name="dropoffTime"
                                                        value={formData.dropoffTime}
                                                        onChange={handleInputChange}
                                                        className="w-1/3 border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL INFO & DOCUMENTS */}
                                {currentStep === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
                                            <User className="w-5 h-5 text-red-500" />
                                            <h2 className="text-xl md:text-2xl font-black text-white">Personal Information</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="e.g. Benjamin"
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="e.g. Maudy"
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="benjamin@btech.co.tz"
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="+255 700 000 000"
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-slate-800">
                                            <div className="flex items-center gap-2 mb-4">
                                                <ShieldCheck className="w-5 h-5 text-red-500" />
                                                <h3 className="text-base font-bold text-white">Verification & License</h3>
                                            </div>

                                            <div className="space-y-4 mb-6">
                                                <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Nationality Status</label>
                                                <select
                                                    name="nationality"
                                                    value={formData.nationality}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium"
                                                >
                                                    <option value="local">Tanzanian Citizen / Resident (Local)</option>
                                                    <option value="international">International Visitor</option>
                                                </select>
                                            </div>

                                            {formData.nationality === 'local' && (
                                                <div className="space-y-2">
                                                    <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Upload Valid Driver&apos;s License</label>
                                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-2xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-all group">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            {formData.localLicenseFile ? <FileText className="w-8 h-8 text-emerald-400 mb-2" /> : <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors mb-2" />}
                                                            <p className="text-xs text-slate-400 font-medium px-4 text-center">
                                                                {formData.localLicenseFile || "Tap or click to upload Driver's License scan"}
                                                            </p>
                                                        </div>
                                                        <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'localLicenseFile')} />
                                                    </label>
                                                </div>
                                            )}

                                            {formData.nationality === 'international' && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Upload Passport</label>
                                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-2xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-all group">
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                {formData.passportFile ? <FileText className="w-8 h-8 text-emerald-400 mb-2" /> : <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors mb-2" />}
                                                                <p className="text-xs text-slate-400 font-medium text-center px-4 line-clamp-1">
                                                                    {formData.passportFile || "Upload Passport Copy"}
                                                                </p>
                                                            </div>
                                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'passportFile')} />
                                                        </label>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Int. Driving Permit</label>
                                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-700 border-dashed rounded-2xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 transition-all group">
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                {formData.internationalLicenseFile ? <FileText className="w-8 h-8 text-emerald-400 mb-2" /> : <UploadCloud className="w-8 h-8 text-slate-500 group-hover:text-red-500 transition-colors mb-2" />}
                                                                <p className="text-xs text-slate-400 font-medium text-center px-4 line-clamp-1">
                                                                    {formData.internationalLicenseFile || "Upload Int. License"}
                                                                </p>
                                                            </div>
                                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'internationalLicenseFile')} />
                                                        </label>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3: PAYMENT & POLICIES */}
                                {currentStep === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
                                            <CreditCard className="w-5 h-5 text-red-500" />
                                            <h2 className="text-xl md:text-2xl font-black text-white">Payment & Secure Escrow</h2>
                                        </div>

                                        <div className="bg-red-950/30 border border-red-500/30 p-5 rounded-2xl flex items-start gap-4 mb-6 backdrop-blur-sm">
                                            <ShieldCheck className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-red-400 mb-1">50/50 Secure Escrow Protection</h4>
                                                <p className="text-red-200/70 text-xs md:text-sm leading-relaxed">
                                                    Lock your booking with 50% deposit securely held in escrow. Pay the remaining 50% upon successful vehicle handoff.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="flex items-center justify-between p-4 border border-slate-800 rounded-2xl cursor-pointer hover:border-red-600 bg-slate-900/60 hover:bg-slate-900 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="mobile_money"
                                                        checked={formData.paymentMethod === 'mobile_money'}
                                                        onChange={handleInputChange}
                                                        className="w-4 h-4 text-red-600 accent-red-600"
                                                    />
                                                    <span className="font-bold text-white text-sm">Mobile Money (M-Pesa / Tigo Pesa / Airtel)</span>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between p-4 border border-slate-800 rounded-2xl cursor-pointer hover:border-red-600 bg-slate-900/60 hover:bg-slate-900 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="bank_transfer"
                                                        checked={formData.paymentMethod === 'bank_transfer'}
                                                        onChange={handleInputChange}
                                                        className="w-4 h-4 text-red-600 accent-red-600"
                                                    />
                                                    <span className="font-bold text-white text-sm">Bank Transfer / Swift</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="space-y-2 mt-6">
                                            <label className="text-[11px] font-black uppercase tracking-wider text-slate-400">Special Requests / Notes</label>
                                            <textarea
                                                name="specialRequests"
                                                value={formData.specialRequests}
                                                onChange={handleInputChange}
                                                rows={3}
                                                placeholder="Flight numbers, specific drop-off details, or extra equipment..."
                                                className="w-full border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-red-600 bg-slate-900 text-white text-base md:text-sm font-medium resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="mt-8 pt-6 border-t border-slate-800">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="checkbox"
                                                        name="agreeToTerms"
                                                        checked={formData.agreeToTerms}
                                                        onChange={handleInputChange}
                                                        className="w-5 h-5 border-slate-700 bg-slate-900 rounded text-red-600 focus:ring-red-600 cursor-pointer"
                                                    />
                                                </div>
                                                <div className="text-xs md:text-sm">
                                                    <p className="font-semibold text-white mb-1 group-hover:text-red-400 transition-colors">
                                                        I agree to the Terms and Conditions
                                                    </p>
                                                    <p className="text-slate-400 text-xs leading-relaxed">
                                                        I verify that the information and documents provided are genuine and comply with B-Tech Car Rental policies.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Desktop Navigation Buttons */}
                                <div className="hidden md:flex items-center justify-between pt-8 mt-8 border-t border-slate-800">
                                    {currentStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="text-slate-400 font-bold hover:text-white transition-colors px-6 py-3 text-sm"
                                        >
                                            Back
                                        </button>
                                    ) : <div></div>}

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-red-600/30 text-sm flex items-center gap-2"
                                        >
                                            <span>Next Step</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.agreeToTerms}
                                            className="bg-red-600 text-white font-black px-8 py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm uppercase tracking-wider"
                                        >
                                            {isSubmitting ? (
                                                <span>Processing Secure Escrow...</span>
                                            ) : (
                                                <span>Confirm & Pay 50%</span>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Mobile Sticky Bottom Navigation Bar for High Conversion */}
                                <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-4 z-50 flex items-center justify-between gap-3 shadow-2xl">
                                    {currentStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="bg-slate-900 text-slate-300 font-bold px-4 py-3.5 rounded-xl text-xs border border-slate-800"
                                        >
                                            Back
                                        </button>
                                    ) : <div />}

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex-1 bg-red-600 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-red-600/30 flex items-center justify-center gap-1.5"
                                        >
                                            <span>Next Step</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.agreeToTerms}
                                            className="flex-1 bg-red-600 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md shadow-red-600/30 disabled:opacity-50 flex items-center justify-center gap-1.5"
                                        >
                                            {isSubmitting ? 'Processing...' : 'Confirm & Pay 50%'}
                                        </button>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* Right Sidebar: Order Summary (No VAT) */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-slate-950/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-800 overflow-hidden sticky top-28">
                            <div className="h-44 overflow-hidden relative">
                                <img
                                    src={MOCK_SELECTED_CAR.image}
                                    alt={MOCK_SELECTED_CAR.name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-slate-700">
                                    {MOCK_SELECTED_CAR.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-black text-white mb-2">{MOCK_SELECTED_CAR.name}</h3>

                                <div className="inline-flex items-center gap-1.5 bg-red-950/40 text-red-400 px-3 py-1 rounded-lg text-xs font-bold mb-6 border border-red-900/50">
                                    <Car className="w-3.5 h-3.5" />
                                    <span className="capitalize">{formData.serviceType.replace('_', ' ')}</span>
                                </div>

                                <div className="space-y-4 mb-6 text-xs">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-white">Rental Dates</p>
                                            <p className="text-slate-400">
                                                {formData.pickupDate ? new Date(formData.pickupDate).toLocaleDateString() : 'Select date'} → {formData.dropoffDate ? new Date(formData.dropoffDate).toLocaleDateString() : 'Select date'}
                                            </p>
                                            <p className="text-[11px] text-red-400 font-extrabold mt-0.5">{totalDays} Day(s) Total</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-bold text-white">Route Locations</p>
                                            <p className="text-slate-400">Pickup: {formData.pickupLocation}</p>
                                            <p className="text-slate-400">Dropoff: {formData.dropoffLocation}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-800 pt-6 space-y-3 text-xs">
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Daily Rate</span>
                                        <span className="font-bold text-white">TZS {baseRate.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-slate-400">Subtotal ({totalDays} days)</span>
                                        <span className="font-bold text-white">TZS {subtotal.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-800 mt-5 pt-5">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-bold text-slate-300 text-sm">Grand Total</span>
                                        <span className="text-xl font-black text-white">TZS {grandTotal.toLocaleString()}</span>
                                    </div>

                                    <div className="bg-gradient-to-br from-red-600 to-rose-700 text-white p-4 rounded-2xl relative overflow-hidden shadow-xl shadow-red-600/20">
                                        <div className="flex justify-between items-center mb-1 relative z-10">
                                            <span className="text-xs font-bold text-red-100 uppercase tracking-wider">Due Now (50% Escrow)</span>
                                            <span className="text-lg font-black text-white">TZS {upfrontPayment.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[10px] text-red-200 relative z-10">Remaining 50% payable upon secure vehicle handoff.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}