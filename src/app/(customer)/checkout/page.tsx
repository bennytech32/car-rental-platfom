'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    MapPin,
    Calendar,
    Clock,
    User,
    CreditCard,
    CheckCircle,
    ShieldCheck,
    Car,
    UploadCloud,
    FileText,
    Info
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

    const [formData, setFormData] = useState({
        serviceType: 'self_drive',
        pickupLocation: 'JNIA Airport',
        dropoffLocation: 'JNIA Airport',
        pickupDate: '',
        pickupTime: '10:00',
        dropoffDate: '',
        dropoffTime: '10:00',

        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationality: 'local', // 'local' or 'international'

        // Document Upload states (simulated as strings for this UI)
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

    // Handler for simulated file uploads
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

    // Add logic if Chauffeur is selected (e.g., extra $30/day), for simplicity keeping it base here
    const baseRate = MOCK_SELECTED_CAR.pricePerDay;
    const subtotal = baseRate * totalDays;
    const vat = subtotal * 0.18;
    const grandTotal = subtotal + vat;
    const upfrontPayment = grandTotal / 2;

    if (bookingComplete) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-slate-100">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
                    <p className="text-slate-500 mb-8">
                        Your booking reference is <strong className="text-slate-900">#BT-{Math.floor(Math.random() * 100000)}</strong>.
                        We have sent the 50% payment instructions and policy guidelines to your email.
                    </p>
                    <Link
                        href="/"
                        className="block w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 pb-20 font-sans">

            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Fleet</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white p-1.5 rounded-md font-black text-sm tracking-wider">BT</div>
                        <span className="font-extrabold tracking-tight text-slate-900 hidden sm:block">Secure Checkout</span>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 mt-8">
                <div className="flex flex-col lg:flex-row gap-8">

                    <div className="w-full lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">

                            {/* Progress Bar */}
                            <div className="flex items-center justify-between mb-10 relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
                                <div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-red-600 z-0 rounded-full transition-all duration-500"
                                    style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}
                                ></div>

                                {[
                                    { step: 1, icon: <MapPin />, label: "Trip Details" },
                                    { step: 2, icon: <User />, label: "Personal Info" },
                                    { step: 3, icon: <CreditCard />, label: "Payment" }
                                ].map((item) => (
                                    <div key={item.step} className="relative z-10 flex flex-col items-center gap-2 bg-white px-2">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-2 transition-colors ${currentStep >= item.step
                                            ? 'bg-red-600 border-red-600 text-white shadow-md'
                                            : 'bg-white border-slate-200 text-slate-400'
                                            }`}>
                                            {currentStep > item.step ? <CheckCircle className="w-6 h-6" /> : React.cloneElement(item.icon, { className: 'w-5 h-5' })}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${currentStep >= item.step ? 'text-slate-900' : 'text-slate-400'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSubmit}>

                                {/* STEP 1: TRIP DETAILS */}
                                {currentStep === 1 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">Trip Details</h2>

                                        {/* Added Service Type Selection */}
                                        <div className="space-y-2 mb-6">
                                            <label className="text-xs font-bold uppercase text-slate-500">Type of Service</label>
                                            <select
                                                name="serviceType"
                                                value={formData.serviceType}
                                                onChange={handleInputChange}
                                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-bold bg-slate-50 text-slate-900"
                                            >
                                                <option value="self_drive">Self-Drive</option>
                                                <option value="chauffeur">Chauffeur-Driven (Driver included)</option>
                                                <option value="airport_transfer">Airport Transfer</option>
                                                <option value="safari">Safari & 4x4 Hire</option>
                                                <option value="special_event">Special Event / Wedding</option>
                                            </select>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Pick-up Location</label>
                                                <select
                                                    name="pickupLocation"
                                                    value={formData.pickupLocation}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-medium bg-slate-50"
                                                >
                                                    <option>JNIA Airport</option>
                                                    <option>City Center (Posta/Kariakoo)</option>
                                                    <option>Oysterbay / Masaki</option>
                                                    <option>Custom Location (Add in notes)</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Drop-off Location</label>
                                                <select
                                                    name="dropoffLocation"
                                                    value={formData.dropoffLocation}
                                                    onChange={handleInputChange}
                                                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-medium bg-slate-50"
                                                >
                                                    <option>Same as Pick-up</option>
                                                    <option>JNIA Airport</option>
                                                    <option>City Center</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Pick-up Date & Time</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="date"
                                                        name="pickupDate"
                                                        value={formData.pickupDate}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-2/3 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 font-medium bg-slate-50"
                                                    />
                                                    <input
                                                        type="time"
                                                        name="pickupTime"
                                                        value={formData.pickupTime}
                                                        onChange={handleInputChange}
                                                        className="w-1/3 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 font-medium bg-slate-50"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Drop-off Date & Time</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="date"
                                                        name="dropoffDate"
                                                        value={formData.dropoffDate}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="w-2/3 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 font-medium bg-slate-50"
                                                    />
                                                    <input
                                                        type="time"
                                                        name="dropoffTime"
                                                        value={formData.dropoffTime}
                                                        onChange={handleInputChange}
                                                        className="w-1/3 border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 font-medium bg-slate-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2: PERSONAL INFO & DOCUMENTS */}
                                {currentStep === 2 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">Personal Information</h2>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">First Name</label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="e.g. John"
                                                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 bg-slate-50 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="e.g. Doe"
                                                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 bg-slate-50 font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Email Address</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="john@example.com"
                                                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 bg-slate-50 font-medium"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold uppercase text-slate-500">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="+255 700 000 000"
                                                    className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 bg-slate-50 font-medium"
                                                />
                                            </div>
                                        </div>

                                        {/* Added conditional documents logic for Self-Drive */}
                                        {formData.serviceType === 'self_drive' && (
                                            <div className="mt-8 pt-6 border-t border-slate-100">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <ShieldCheck className="w-5 h-5 text-red-600" />
                                                    <h3 className="text-lg font-bold text-slate-900">Verification Documents (Self-Drive)</h3>
                                                </div>

                                                <div className="space-y-4 mb-6">
                                                    <label className="text-xs font-bold uppercase text-slate-500">Nationality</label>
                                                    <select
                                                        name="nationality"
                                                        value={formData.nationality}
                                                        onChange={handleInputChange}
                                                        className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 font-medium bg-slate-50"
                                                    >
                                                        <option value="local">Tanzanian Citizen / Resident (Local)</option>
                                                        <option value="international">International Visitor</option>
                                                    </select>
                                                </div>

                                                {/* Local Documents */}
                                                {formData.nationality === 'local' && (
                                                    <div className="space-y-2">
                                                        <label className="text-xs font-bold uppercase text-slate-500">Upload Valid Driver's License</label>
                                                        <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                {formData.localLicenseFile ? <FileText className="w-8 h-8 text-green-500 mb-2" /> : <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />}
                                                                <p className="text-sm text-slate-500 font-medium">
                                                                    {formData.localLicenseFile || "Click to upload Driver's License"}
                                                                </p>
                                                            </div>
                                                            <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'localLicenseFile')} />
                                                        </label>
                                                    </div>
                                                )}

                                                {/* International Documents */}
                                                {formData.nationality === 'international' && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold uppercase text-slate-500">Upload Passport</label>
                                                            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    {formData.passportFile ? <FileText className="w-8 h-8 text-green-500 mb-2" /> : <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />}
                                                                    <p className="text-sm text-slate-500 font-medium text-center px-4 line-clamp-1">
                                                                        {formData.passportFile || "Upload Passport Copy"}
                                                                    </p>
                                                                </div>
                                                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'passportFile')} />
                                                            </label>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold uppercase text-slate-500">Int. Driving Permit</label>
                                                            <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                                                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                                    {formData.internationalLicenseFile ? <FileText className="w-8 h-8 text-green-500 mb-2" /> : <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />}
                                                                    <p className="text-sm text-slate-500 font-medium text-center px-4 line-clamp-1">
                                                                        {formData.internationalLicenseFile || "Upload Int. License"}
                                                                    </p>
                                                                </div>
                                                                <input type="file" className="hidden" onChange={(e) => handleFileUpload(e, 'internationalLicenseFile')} />
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* STEP 3: PAYMENT & POLICIES */}
                                {currentStep === 3 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                                        <h2 className="text-2xl font-black text-slate-900 border-b border-slate-100 pb-4 mb-6">Payment & Policies</h2>

                                        <div className="bg-red-50 border border-red-100 p-5 rounded-2xl flex items-start gap-4 mb-6">
                                            <ShieldCheck className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-bold text-red-900 mb-1">50/50 Secure Payment Plan</h4>
                                                <p className="text-red-700 text-sm leading-relaxed">
                                                    You only need to pay 50% upfront to secure this booking. The remaining balance is paid upon successful service delivery.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-red-500 hover:bg-slate-50 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="mobile_money"
                                                        checked={formData.paymentMethod === 'mobile_money'}
                                                        onChange={handleInputChange}
                                                        className="w-4 h-4 text-red-600 accent-red-600"
                                                    />
                                                    <span className="font-bold text-slate-900">Mobile Money (M-Pesa / Tigo Pesa)</span>
                                                </div>
                                            </label>
                                            <label className="flex items-center justify-between p-4 border border-slate-200 rounded-xl cursor-pointer hover:border-red-500 hover:bg-slate-50 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="paymentMethod"
                                                        value="bank_transfer"
                                                        checked={formData.paymentMethod === 'bank_transfer'}
                                                        onChange={handleInputChange}
                                                        className="w-4 h-4 text-red-600 accent-red-600"
                                                    />
                                                    <span className="font-bold text-slate-900">Bank Transfer</span>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="space-y-2 mt-6">
                                            <label className="text-xs font-bold uppercase text-slate-500">Special Requests / Notes</label>
                                            <textarea
                                                name="specialRequests"
                                                value={formData.specialRequests}
                                                onChange={handleInputChange}
                                                rows={3}
                                                placeholder="Flight numbers, specific drop-off details, or extra requirements..."
                                                className="w-full border border-slate-200 rounded-xl px-4 py-3.5 focus:outline-none focus:border-red-500 bg-slate-50 font-medium resize-none"
                                            ></textarea>
                                        </div>

                                        {/* Added Terms & Conditions Checkbox */}
                                        <div className="mt-8 pt-6 border-t border-slate-100">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="checkbox"
                                                        name="agreeToTerms"
                                                        checked={formData.agreeToTerms}
                                                        onChange={handleInputChange}
                                                        className="w-5 h-5 border-slate-300 rounded text-red-600 focus:ring-red-600 cursor-pointer"
                                                    />
                                                </div>
                                                <div className="text-sm">
                                                    <p className="font-semibold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">
                                                        I agree to the Terms and Conditions
                                                    </p>
                                                    <p className="text-slate-500 text-xs leading-relaxed">
                                                        I acknowledge that I have read and agree to B-Tech Car Rental's <a href="/terms" className="text-red-600 hover:underline">Terms of Service</a>, <a href="/policy" className="text-red-600 hover:underline">Cancellation Policy</a>, and verify that the documents provided are legally valid.
                                                    </p>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
                                    {currentStep > 1 ? (
                                        <button
                                            type="button"
                                            onClick={prevStep}
                                            className="text-slate-500 font-bold hover:text-slate-900 transition-colors px-6 py-3"
                                        >
                                            Back
                                        </button>
                                    ) : <div></div>}

                                    {currentStep < 3 ? (
                                        <button
                                            type="button"
                                            onClick={nextStep}
                                            className="bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-red-600 transition-all shadow-md"
                                        >
                                            Next Step
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            disabled={isSubmitting || !formData.agreeToTerms}
                                            className="bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-red-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center gap-2">Processing...</span>
                                            ) : (
                                                <span>Confirm & Pay 50%</span>
                                            )}
                                        </button>
                                    )}
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* RIGHT SIDEBAR: ORDER SUMMARY */}
                    <div className="w-full lg:w-1/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-28">
                            <div className="h-48 overflow-hidden relative">
                                <img
                                    src={MOCK_SELECTED_CAR.image}
                                    alt={MOCK_SELECTED_CAR.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                    {MOCK_SELECTED_CAR.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-black text-slate-900 mb-2">{MOCK_SELECTED_CAR.name}</h3>

                                {/* Dynamic Service Type Badge */}
                                <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 px-2.5 py-1 rounded-md text-xs font-bold mb-6 border border-red-100">
                                    <Car className="w-3.5 h-3.5" />
                                    <span>
                                        {formData.serviceType === 'self_drive' ? 'Self-Drive Selected' :
                                            formData.serviceType === 'chauffeur' ? 'Chauffeur-Driven Selected' :
                                                formData.serviceType === 'airport_transfer' ? 'Airport Transfer' :
                                                    formData.serviceType === 'safari' ? 'Safari & 4x4 Hire' : 'Special Event / Wedding'}
                                    </span>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900">Dates</p>
                                            <p className="text-slate-500">
                                                {formData.pickupDate ? new Date(formData.pickupDate).toLocaleDateString() : 'Select date'} - {formData.dropoffDate ? new Date(formData.dropoffDate).toLocaleDateString() : 'Select date'}
                                            </p>
                                            <p className="text-xs text-red-600 font-bold mt-0.5">{totalDays} Day(s)</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                                        <div className="text-sm">
                                            <p className="font-bold text-slate-900">Locations</p>
                                            <p className="text-slate-500">Pick-up: {formData.pickupLocation}</p>
                                            <p className="text-slate-500">Drop-off: {formData.dropoffLocation}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 pt-6 space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Rate per day</span>
                                        <span className="font-bold text-slate-900">TZS {baseRate.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">Subtotal ({totalDays} days)</span>
                                        <span className="font-bold text-slate-900">TZS {subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">VAT (18%)</span>
                                        <span className="font-bold text-slate-900">TZS {vat.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="border-t border-slate-100 mt-4 pt-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-slate-900">Total Price</span>
                                        <span className="text-xl font-black text-slate-900">TZS {grandTotal.toLocaleString()}</span>
                                    </div>

                                    <div className="bg-slate-900 text-white p-4 rounded-xl mt-4 relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 bg-red-600 w-16 h-16 rounded-bl-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                                        <div className="flex justify-between items-center mb-1 relative z-10">
                                            <span className="text-sm font-bold text-slate-300">Amount Due Now (50%)</span>
                                            <span className="text-lg font-black text-white">TZS {upfrontPayment.toLocaleString()}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-400 relative z-10">Remaining 50% payable upon service completion.</p>
                                    </div>
                                </div>

                                {!formData.agreeToTerms && currentStep === 3 && (
                                    <div className="mt-4 flex items-start gap-2 text-amber-600 bg-amber-50 p-3 rounded-lg border border-amber-100">
                                        <Info className="w-4 h-4 shrink-0 mt-0.5" />
                                        <p className="text-[11px] font-medium leading-tight">
                                            You must agree to the Terms & Conditions before confirming your booking.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}