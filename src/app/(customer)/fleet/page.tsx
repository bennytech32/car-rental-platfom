'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ChevronLeft,
    Search,
    Car,
    Settings,
    Fuel,
    Users,
    Star,
    ArrowRight,
    CheckCircle2,
    X,
    Eye
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

const ALL_FLEET = [
    {
        id: 1,
        name: "Toyota Land Cruiser V8",
        category: "SUV / 4x4 Safari",
        vendor: "Coastal Luxury Fleet",
        price: "TZS 350,000",
        priceValue: 350000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1469145617111-a83d73981881?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "The ultimate 4x4 for Tanzanian safaris and tough terrains. Unmatched comfort and off-road capability. Fully air-conditioned with premium leather interior.",
        transmission: "Automatic",
        fuel: "Diesel",
        seats: "7 Seats",
        rating: 4.9,
        available: true
    },
    {
        id: 2,
        name: "Toyota RAV4 New Model",
        category: "SUV / City & Site",
        vendor: "ZanWave Motors",
        price: "TZS 180,000",
        priceValue: 180000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Perfect balance of luxury and capability. Great for city meetings in Dar es Salaam and light off-road site visits. Very economical on fuel.",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: "5 Seats",
        rating: 4.8,
        available: true
    },
    {
        id: 3,
        name: "Toyota IST (Economy)",
        category: "City Hatchback",
        vendor: "Dar Express Cars",
        price: "TZS 75,000",
        priceValue: 75000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1550355191-aa06cb11e81c?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1550355191-aa06cb11e81c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Highly economical and easy to park. The perfect choice for running errands around the busy streets of Dar es Salaam city center.",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: "5 Seats",
        rating: 4.7,
        available: true
    },
    {
        id: 4,
        name: "Mercedes-Benz C-Class",
        category: "Luxury / Weddings",
        vendor: "VIP Executive Ride",
        price: "TZS 450,000",
        priceValue: 450000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Arrive in style. Premium luxury vehicle ideal for weddings, VIP airport transfers, and executive corporate travel. Impeccable cleanliness and comfort.",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: "5 Seats",
        rating: 5.0,
        available: true
    },
    {
        id: 5,
        name: "Toyota Land Cruiser Prado TX",
        category: "SUV / 4x4 Safari",
        vendor: "Coastal Luxury Fleet",
        price: "TZS 280,000",
        priceValue: 280000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "A versatile 4x4 SUV that offers a smooth ride in the city and rugged reliability for upcountry trips. Comes with a spacious trunk and modern infotainment.",
        transmission: "Automatic",
        fuel: "Diesel",
        seats: "7 Seats",
        rating: 4.9,
        available: true
    },
    {
        id: 6,
        name: "Toyota Alphard Executive",
        category: "Luxury / Family",
        vendor: "VIP Executive Ride",
        price: "TZS 300,000",
        priceValue: 300000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "The ultimate VIP mover. Perfect for airport delegations, family tours, and corporate groups. Features captain seats and dual climate control.",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: "7 Seats",
        rating: 4.9,
        available: true
    },
    {
        id: 7,
        name: "Range Rover Sport HSE",
        category: "Luxury / Weddings",
        vendor: "Apex Luxury Rentals",
        price: "TZS 520,000",
        priceValue: 520000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Commanding British luxury and performance. Air suspension, panoramic roof, and dynamic off-road modes for VIP and executive transfers.",
        transmission: "Automatic",
        fuel: "Petrol",
        seats: "5 Seats",
        rating: 5.0,
        available: true
    },
    {
        id: 8,
        name: "Hyundai Ioniq 5 EV",
        category: "City Hatchback",
        vendor: "GreenDrive East Africa",
        price: "TZS 220,000",
        priceValue: 220000,
        period: "per day",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
        images: [
            "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1550355191-aa06cb11e81c?auto=format&fit=crop&w=800&q=80"
        ],
        desc: "Cutting-edge 100% electric vehicle. Silent, zero emissions, and ultra-fast charging capability. Perfect for modern sustainable city transport.",
        transmission: "Automatic",
        fuel: "Electric",
        seats: "5 Seats",
        rating: 4.8,
        available: true
    }
];

export default function FleetPage() {
    const { formatPrice } = useCurrency();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Modal State
    const [selectedCar, setSelectedCar] = useState<(typeof ALL_FLEET)[0] | null>(null);
    const [activeCarImage, setActiveCarImage] = useState(0);

    const categories = ['All', 'SUV / 4x4 Safari', 'City Hatchback', 'Luxury / Weddings', 'Luxury / Family'];

    const filteredFleet = ALL_FLEET.filter(car => {
        const matchesCategory = selectedCategory === 'All' || car.category.includes(selectedCategory);
        const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || car.vendor.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 relative">

            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-medium transition-colors">
                        <ChevronLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-red-600 text-white p-1.5 rounded-md font-black text-sm tracking-wider">BT</div>
                        <span className="font-extrabold tracking-tight text-slate-900 hidden sm:block">B-Tech Fleet Catalog</span>
                    </div>
                </div>
            </header>

            {/* Hero Banner */}
            <section className="bg-slate-900 text-white py-16 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <span className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4 inline-block shadow-md">
                        Our Verified Collection
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Explore Our Complete Fleet</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base">
                        Choose from our wide selection of thoroughly inspected, insured, and reliable vehicles ready for your journey across Dar es Salaam and Tanzania.
                    </p>
                </div>
            </section>

            {/* Filter & Search Section */}
            <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20 mb-12">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Categories Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${selectedCategory === cat
                                    ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search car model or vendor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Fleet Grid (Imebadilishwa kuwa grid-cols-4 kwenye Desktop) */}
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredFleet.map((car) => (
                        <div
                            key={car.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                            onClick={() => { setSelectedCar(car); setActiveCarImage(0); }}
                        >

                            <div className="relative h-48 overflow-hidden bg-slate-100">
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider z-10">
                                    {car.category}
                                </div>
                                <div className="absolute top-3 right-3 bg-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm z-10">
                                    <CheckCircle2 className="w-3 h-3" /> Available
                                </div>

                                {/* Hover Overlay for "View Details" */}
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-0">
                                    <div className="bg-white/95 text-slate-900 px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                                        <Eye className="w-4 h-4" /> View Details
                                    </div>
                                </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <div className="text-[11px] text-red-600 font-bold uppercase tracking-wide mb-1">
                                    Vendor: <span className="text-slate-700">{car.vendor}</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-4 group-hover:text-red-600 transition-colors line-clamp-1">{car.name}</h3>

                                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-5 text-[11px] font-semibold text-slate-500 text-center bg-slate-50 rounded-xl group-hover:bg-red-50 transition-colors">
                                    <div className="flex flex-col items-center gap-1">
                                        <Settings className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400" />
                                        <span>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1 border-x border-slate-200">
                                        <Fuel className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400" />
                                        <span>{car.fuel}</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-1">
                                        <Users className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400" />
                                        <span>{car.seats}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between mt-auto">
                                    <div>
                                        <span className="text-lg font-black text-slate-900">{formatPrice(car.priceValue)}</span>
                                        <span className="text-[10px] text-slate-500 block uppercase font-bold">/{car.period}</span>
                                    </div>
                                    <Link
                                        href={`/checkout?carId=${car.id}`}
                                        onClick={(e) => e.stopPropagation()} // inazuia modal isifunguke ukiclick hapa
                                        className="bg-slate-900 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-md flex items-center gap-1"
                                    >
                                        <span>Book</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredFleet.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 max-w-2xl mx-auto mt-8">
                        <Car className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No vehicles found</h3>
                        <p className="text-slate-500 text-sm">Try adjusting your search criteria or category filter.</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-4 text-red-600 font-bold text-sm hover:underline">
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>

            {/* CAR DETAILS MODAL (POP-UP) */}
            {selectedCar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300 max-h-[90vh]">

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedCar(null)}
                            className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-red-600 hover:text-white backdrop-blur-md text-slate-800 p-2 rounded-full transition-all shadow-sm"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Image Gallery */}
                        <div className="w-full md:w-1/2 bg-slate-100 flex flex-col">
                            <div className="h-64 md:h-80 w-full relative">
                                <img
                                    src={selectedCar.images[activeCarImage]}
                                    alt={selectedCar.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-4 left-4 bg-slate-900/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase shadow-md">
                                    {selectedCar.category}
                                </div>
                            </div>
                            <div className="flex p-4 gap-3 overflow-x-auto bg-slate-50 border-t border-slate-200">
                                {selectedCar.images.map((img: string, idx: number) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveCarImage(idx)}
                                        className={`h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeCarImage === idx ? 'border-red-600 opacity-100 scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Car Details & Specifications */}
                        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col overflow-y-auto">
                            <div className="text-xs text-red-600 font-bold uppercase tracking-wide mb-2">
                                Vendor: {selectedCar.vendor}
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-4">{selectedCar.name}</h2>

                            <p className="text-slate-600 text-sm leading-relaxed mb-6 pb-6 border-b border-slate-100">
                                {selectedCar.desc}
                            </p>

                            <h4 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wider flex items-center gap-2">
                                <Settings className="w-4 h-4 text-red-600" /> Specifications
                            </h4>
                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <Settings className="w-5 h-5 text-red-600" />
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Transmission</div>
                                        <div className="text-sm font-semibold text-slate-900">{selectedCar.transmission}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <Fuel className="w-5 h-5 text-red-600" />
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Fuel Type</div>
                                        <div className="text-sm font-semibold text-slate-900">{selectedCar.fuel}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <Users className="w-5 h-5 text-red-600" />
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Capacity</div>
                                        <div className="text-sm font-semibold text-slate-900">{selectedCar.seats}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <Star className="w-5 h-5 text-amber-500" />
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Rating</div>
                                        <div className="text-sm font-semibold text-slate-900">{selectedCar.rating} / 5.0</div>
                                    </div>
                                </div>
                            </div>

                            {/* Price & Action Button */}
                            <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                                <div>
                                    <span className="text-2xl font-black text-slate-900">{formatPrice(selectedCar.priceValue)}</span>
                                    <span className="text-xs text-slate-500 block uppercase font-bold">/{selectedCar.period}</span>
                                </div>
                                <Link
                                    href={`/checkout?carId=${selectedCar.id}`}
                                    className="bg-red-600 hover:bg-red-700 hover:-translate-y-1 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                                >
                                    <span>Book Vehicle</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
}