'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
    ChevronLeft,
    MapPin,
    Star,
    ShieldCheck,
    Car,
    Users,
    Fuel,
    Settings,
    Calendar,
    CheckCircle2,
    ArrowRight,
    Camera,
    Eye,
    Lock,
    Building2,
    Phone,
    Mail,
    Share2,
    Heart
} from 'lucide-react';

// Mock data for fleet items matching previous context
const FLEET_DETAILS_DATABASE: Record<string, any> = {
    "1": {
        id: 1,
        name: "Toyota Land Cruiser V8",
        category: "SUV / 4x4 Safari",
        vendor: "Coastal Luxury Fleet",
        priceValue: 350000,
        rating: 4.9,
        trips: "140+ trips",
        transmission: "Automatic",
        fuel: "Diesel",
        seats: "7 Seats",
        location: "Dar es Salaam & JNIA Airport",
        description: "Imara na ya kifahari kwa ajili ya mikutano mikubwa, safari za mbugani, au matukio maalum. Imekaguliwa kwa viwango vya juu vya usalama na ufundi.",
        exteriorImages: [
            "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
        ],
        interiorImages: [
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["Leather Seats", "Panoramic Sunroof", "4WD Terrain Selector", "Dual Zone Climate Control", "Premium Surround Audio"]
    },
    "2": {
        id: 2,
        name: "Toyota RAV4 New Model",
        category: "SUV / 4x4",
        vendor: "ZanWave Motors",
        priceValue: 180000,
        rating: 4.8,
        trips: "98 trips",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: "5 Seats",
        location: "Zanzibar & Dar es Salaam",
        description: "Gari jipya la kisasa lenye matumizi madogo ya mafuta, nafasi ya kutosha ya mizigo, na muonekano wa kuvutia kwa safari za mjini na nje ya mji.",
        exteriorImages: [
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
        ],
        interiorImages: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80"
        ],
        features: ["Apple CarPlay / Android Auto", "Reverse Camera & Sensors", "Cruise Control", "Spacious Boot Space", "Keyless Entry"]
    }
};

export default function FleetDetailPage() {
    const params = useParams();
    const router = useRouter();
    const carId = (params?.id as string) || "2";

    // Fallback to car ID 2 if not found
    const car = FLEET_DETAILS_DATABASE[carId] || FLEET_DETAILS_DATABASE["2"];

    const [activeTab, setActiveTab] = useState<'exterior' | 'interior'>('exterior');
    const [selectedImage, setSelectedImage] = useState<string>(car.exteriorImages[0]);
    const [isFavorite, setIsFavorite] = useState(false);

    // Switch active image array when changing tabs
    const handleTabChange = (tab: 'exterior' | 'interior') => {
        setActiveTab(tab);
        setSelectedImage(tab === 'exterior' ? car.exteriorImages[0] : car.interiorImages[0]);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-20 font-sans selection:bg-red-600 selection:text-white">

            {/* Header Navigation */}
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
                    <Link href="/fleet" className="flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors text-xs md:text-sm">
                        <ChevronLeft className="w-5 h-5 text-red-500" />
                        <span>Back to Fleet Catalog</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 hover:border-red-500/50 transition-colors"
                            aria-label="Save to favorites"
                        >
                            <Heart className={`w-4 h-4 ${isFavorite ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} />
                        </button>
                        <div className="bg-red-600 text-white p-1.5 rounded-xl font-black text-xs tracking-wider shadow-md shadow-red-600/30">BT</div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 pt-6 md:pt-10">

                {/* Top Title & Vendor Info (Mobile Optimized) */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-950/60 border border-red-500/30 text-red-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                                {car.category}
                            </span>
                            <span className="bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold px-3 py-1 rounded-full flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3" /> Verified Host
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">{car.name}</h1>
                        <p className="text-slate-400 text-xs sm:text-sm mt-1 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-red-500" /> {car.location} • Hosted by <strong className="text-slate-200">{car.vendor}</strong>
                        </p>
                    </div>

                    <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl">
                        <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Daily Rate</span>
                            <span className="text-xl sm:text-2xl font-black text-white">TZS {car.priceValue.toLocaleString()}</span>
                        </div>
                        <div className="h-8 w-[1px] bg-slate-800"></div>
                        <div className="flex items-center gap-1 text-amber-400 font-black text-sm">
                            <Star className="w-4 h-4 fill-amber-400" />
                            <span>{car.rating}</span>
                            <span className="text-xs text-slate-500 font-normal">({car.trips})</span>
                        </div>
                    </div>
                </div>

                {/* Interactive Gallery Showcase (Interior / Exterior Toggle + Plate Hidden Badge) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

                    <div className="lg:col-span-2 space-y-4">
                        {/* Main Image Container */}
                        <div className="relative h-[300px] sm:h-[450px] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl group">
                            <img
                                src={selectedImage}
                                alt={car.name}
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            />

                            {/* Privacy Plate Hidden Badge */}
                            <div className="absolute top-4 left-4 bg-slate-950/85 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[11px] font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-2 shadow-lg">
                                <Lock className="w-3.5 h-3.5" />
                                <span className="uppercase tracking-wider">Plate Number Hidden for Privacy</span>
                            </div>

                            {/* View Mode Switcher Overlay */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-2xl border border-slate-800 flex gap-2 shadow-2xl">
                                <button
                                    onClick={() => handleTabChange('exterior')}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'exterior'
                                            ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
                                            : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <Car className="w-4 h-4" /> Exterior View
                                </button>
                                <button
                                    onClick={() => handleTabChange('interior')}
                                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${activeTab === 'interior'
                                            ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
                                            : 'text-slate-400 hover:text-white'
                                        }`}
                                >
                                    <Eye className="w-4 h-4" /> Interior View
                                </button>
                            </div>
                        </div>

                        {/* Thumbnail Selector */}
                        <div className="grid grid-cols-2 gap-4">
                            {(activeTab === 'exterior' ? car.exteriorImages : car.interiorImages).map((imgUrl: string, idx: number) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(imgUrl)}
                                    className={`relative h-24 rounded-2xl overflow-hidden border-2 transition-all ${selectedImage === imgUrl ? 'border-red-600 shadow-lg shadow-red-600/30 scale-[1.02]' : 'border-slate-800 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Booking Card (Desktop & Sticky Mobile Action) */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6">

                            <div className="border-b border-slate-800 pb-4">
                                <h3 className="text-lg font-black text-white mb-1">Ready to book this vehicle?</h3>
                                <p className="text-slate-400 text-xs">Secured by B-Tech 50/50 Escrow Protection Model.</p>
                            </div>

                            {/* Quick Specs Grid */}
                            <div className="grid grid-cols-3 gap-2 py-3 bg-slate-950/60 rounded-2xl border border-slate-800/80 text-center text-xs font-bold text-slate-300">
                                <div className="flex flex-col items-center gap-1">
                                    <Settings className="w-4 h-4 text-red-500" />
                                    <span>{car.transmission}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1 border-x border-slate-800">
                                    <Fuel className="w-4 h-4 text-red-500" />
                                    <span>{car.fuel}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1">
                                    <Users className="w-4 h-4 text-red-500" />
                                    <span>{car.seats}</span>
                                </div>
                            </div>

                            {/* Escrow Guarantee Highlight */}
                            <div className="space-y-3 text-xs text-slate-300">
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>50% Deposit held safely in Escrow</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>Free Airport Handoff (JNIA, ZNZ, JRO)</span>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                    <span>24/7 Roadside Assistance & Insurance</span>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={() => router.push(`/checkout?car=${car.id}`)}
                                className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-6 rounded-2xl transition-all shadow-xl shadow-red-600/30 flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer"
                            >
                                <span>Proceed to Secure Checkout</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Detailed Specifications & Description */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pb-16 border-t border-slate-800 pt-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-xl font-black text-white mb-3">Vehicle Overview</h2>
                            <p className="text-slate-300 text-sm leading-relaxed">{car.description}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-black text-white mb-4">Key Features & Amenities</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {car.features.map((feature: string, idx: number) => (
                                    <div key={idx} className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl flex items-center gap-3 text-xs font-bold text-slate-200">
                                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Host Support Card */}
                    <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-4">
                        <h3 className="text-sm font-black uppercase tracking-wider text-slate-400">Host Contact & Support</h3>
                        <div className="flex items-center gap-3">
                            <div className="bg-red-600/20 text-red-500 p-3 rounded-2xl border border-red-500/30">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-extrabold text-white text-sm">{car.vendor}</h4>
                                <p className="text-slate-400 text-xs">Verified Commercial Fleet Partner</p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-slate-800 space-y-2 text-xs text-slate-300">
                            <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-red-500" />
                                <span>+255 700 000 000 (B-Tech Concierge)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-red-500" />
                                <span>concierge@btechcarrental.com</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            {/* Mobile Fixed Bottom Booking Bar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-4 z-50 flex items-center justify-between gap-4 shadow-2xl">
                <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Rate</span>
                    <span className="text-base font-black text-white">TZS {car.priceValue.toLocaleString()} <span className="text-[10px] text-slate-400 font-normal">/day</span></span>
                </div>
                <button
                    onClick={() => router.push(`/checkout?car=${car.id}`)}
                    className="bg-red-600 hover:bg-red-700 text-white font-black px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 flex items-center gap-1.5"
                >
                    <span>Book Vehicle</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>

        </div>
    );
}