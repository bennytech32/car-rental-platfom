'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Phone,
    MapPin,
    Clock,
    Search,
    ShieldCheck,
    Car,
    Calendar,
    UserCheck,
    Globe,
    Menu,
    X,
    Compass,
    Briefcase,
    Plane,
    HeartHandshake,
    ArrowRight,
    Star,
    Fuel,
    Settings,
    Users,
    CreditCard,
    KeyRound,
    Mail,
    ChevronRight
} from 'lucide-react';

export default function CustomerLandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState<'en' | 'sw'>('en');
    const [activeHeroSlide, setActiveHeroSlide] = useState(0);

    const [searchData, setSearchData] = useState({
        location: 'JNIA Airport, Dar es Salaam',
        carType: 'All Categories',
        pickupDate: '',
        returnDate: ''
    });

    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Travel with Freedom and Reliability in Dar es Salaam',
            titleSw: 'Safiri kwa Uhuru na Uhakika Ndani ya Dar es Salaam',
            descEn: 'Enjoy total freedom and privacy driving across Dar es Salaam and beyond at your own pace with our Self-Drive option.',
            descSw: 'Furahia uhuru kamili na usiri ukisafiri Dar es Salaam na mikoani kwa kasi yako mwenyewe kupitia huduma yetu ya kujitegemea.'
        },
        {
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Professional Chauffeur-Driven Executive Travel',
            titleSw: 'Usafiri wa Kitaalamu wa Dereva kwa Wakurugenzi',
            descEn: 'Professional, vetted drivers to take you safely to meetings, corporate events, or comfortable city tours.',
            descSw: 'Madereva wataalamu na waliothibitishwa kukupeleka salama kwenye mikutano, matukio ya kibiashara au ziara za mji.'
        },
        {
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Rugged Safari & 4x4 Hire for Tough Terrain',
            titleSw: 'Magari Magumu ya 4x4 na Safari kwa Ruti Ngumu',
            descEn: 'Rugged 4x4 vehicles built for tough terrain, national parks, and remote project sites across Tanzania.',
            descSw: 'Magari magumu ya 4x4 yaliyoundwa mahususi kwa ajili ya mbuga za wanyama na ruti ngumu za site nchini kote.'
        },
        {
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Corporate & Long-Term Fleet Solutions',
            titleSw: 'Suluhisho za Magari ya Makampuni na Mikataba Mirefu',
            descEn: 'Reliable fleet solutions for businesses, NGOs, and long-term institutional projects with 50/50 transparency.',
            descSw: 'Suluhisho za magari ya kudumu kwa ajili ya mashirika, NGOs na miradi mikubwa ya muda mrefu yenye uwazi wa nusu kwa nusu.'
        },
        {
            image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Punctual Airport Transfers at JNIA',
            titleSw: 'Usafiri wa Wakati Sahihi wa Uwanja wa Ndege wa JNIA',
            descEn: 'Punctual pick-ups and drop-offs at JNIA Airport to ensure you never miss a flight or appointment.',
            descSw: 'Huduma ya kuchukua na kuacha kwenye Uwanja wa Ndege wa JNIA kwa wakati sahihi ili usikose ndege au miadi.'
        },
        {
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Luxury Cars for Special Events & Weddings',
            titleSw: 'Magari ya Kifahari kwa ajili ya Harusi na Matukio Maalum',
            descEn: 'Luxury and stylish vehicles to make your weddings, anniversaries, and VIP events memorable in Dar es Salaam.',
            descSw: 'Magari ya kifahari na ya kisasa yatakayofanya harusi, kumbukumbu na matukio yako ya VIP kuwa ya kipekee Dar es Salaam.'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const fleetData = [
        {
            id: 1,
            name: "Toyota Land Cruiser V8",
            category: "SUV / 4x4 Safari",
            vendor: "Coastal Luxury Fleet",
            price: "TZS 350,000",
            period: "per day",
            image: "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Diesel",
            seats: "7 Seats",
            rating: 4.9
        },
        {
            id: 2,
            name: "Toyota RAV4 New Model",
            category: "SUV / City & Site",
            vendor: "ZanWave Motors",
            price: "TZS 180,000",
            period: "per day",
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            rating: 4.8
        },
        {
            id: 3,
            name: "Toyota IST (Economy)",
            category: "City Hatchback",
            vendor: "Dar Express Cars",
            price: "TZS 75,000",
            period: "per day",
            image: "https://images.unsplash.com/photo-1550355191-aa06cb11e81c?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            rating: 4.7
        },
        {
            id: 4,
            name: "Mercedes-Benz C-Class",
            category: "Luxury / Weddings",
            vendor: "VIP Executive Ride",
            price: "TZS 450,000",
            period: "per day",
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            rating: 5.0
        }
    ];

    const t = {
        en: {
            hours: "Monday - Saturday: 7:00 AM - 6:00 PM",
            locationName: "Dar es Salaam, Tanzania",
            quickSupport: "Quick Support:",
            navHome: "Home",
            navFleet: "Our Fleet",
            navServices: "Services",
            navAbout: "About Us",
            navContact: "Contact",
            myTrips: "My Trips",
            authBtn: "Sign In / Register",
            badge: "Premier Service in Dar es Salaam",

            findCarTitle: "Find Your Car",
            pickupLocation: "Pick-up Location",
            carTypeLabel: "Car Type",
            pickupDateLabel: "Pick-up Date",
            searchBtn: "Find Vehicle",
            locAirport: "JNIA Airport, Dar es Salaam",
            locCity: "City Center (Posta / Kariakoo)",
            locOysterbay: "Oysterbay / Masaki",
            locMbezi: "Mbezi / Mikocheni",
            catAll: "All Categories",
            catSuv: "SUV / Land Cruiser",
            catSedan: "Sedan / Saloon",
            catEconomy: "Economy (IST, Raum)",
            catEv: "Electric Vehicles (EVs)",

            feature1Title: "Verified Rental Fleet",
            feature1Desc: "We partner strictly with experienced vendors to ensure every vehicle meets top mechanical and safety standards.",
            feature2Title: "Secure 50/50 Payments",
            feature2Desc: "Pay a 50% deposit to secure your booking instantly, and clear the balance upon successful completion of your trip.",
            feature3Title: "Anywhere City Delivery",
            feature3Desc: "Get your car delivered directly to JNIA Airport, your hotel, or office anywhere in Dar es Salaam.",

            aboutHeading: "About B-Tech Car Rental",
            aboutSubheading: "Your trusted partner for premium transportation and logistics in Tanzania.",
            aboutText1: "With years of expertise navigating the vibrant streets of Dar es Salaam and the rugged terrains of Tanzania, we provide unparalleled transportation solutions. We understand that whether you are traveling for business, a safari, or a special occasion, reliability is everything.",
            aboutText2: "Our unique 50/50 payment model ensures complete transparency and trust between us, our verified vendors, and you. Experience the freedom of the road with a partner that puts your safety and comfort first.",

            servicesHeading: "Our Professional Services",
            servicesSubheading: "Tailored transport solutions designed for individuals, corporate clients, and international travelers across Tanzania.",
            learnMore: "Book Service",

            serv1Title: "Self-Drive",
            serv1Desc: "Enjoy total freedom and privacy driving across Dar es Salaam and beyond at your own pace.",
            serv2Title: "Chauffeur-Driven",
            serv2Desc: "Professional, vetted drivers to take you safely to meetings, events, or city tours.",
            serv3Title: "Safari & 4x4 Hire",
            serv3Desc: "Rugged 4x4 vehicles built for tough terrain, national parks, and remote project sites.",
            serv4Title: "Corporate & Long-Term Leasing",
            serv4Desc: "Reliable fleet solutions for businesses, NGOs, and long-term institutional projects.",
            serv5Title: "Airport Transfers",
            serv5Desc: "Punctual pick-ups and drop-offs at JNIA Airport to ensure you never miss a flight.",
            serv6Title: "Special Events & Weddings",
            serv6Desc: "Luxury and stylish vehicles to make your weddings, anniversaries, and VIP events memorable.",

            fleetHeading: "Our Trusted Fleets",
            fleetSubheading: "Explore top-tier vehicles directly from our verified vendors in Dar es Salaam. Guaranteed clean, inspected, and ready to go.",
            bookNow: "Book Vehicle",
            vendorBy: "Verified Vendor:",

            howItWorksHeading: "How It Works",
            howItWorksSubheading: "Simple, transparent, and secure steps to get you on the road in Dar es Salaam.",
            step1Title: "1. Choose Your Vehicle",
            step1Desc: "Browse our verified fleet of SUVs, luxury cars, and economy hatchbacks tailored for your specific trip requirements.",
            step2Title: "2. Secure Booking (50%)",
            step2Desc: "Pay half upfront to lock in your reservation instantly. Our clear payment system guarantees transparency.",
            step3Title: "3. Drive & Enjoy",
            step3Desc: "Pick up your car or enjoy punctual delivery across Dar es Salaam. Pay the rest when the job is done.",

            ctaHeading: "Ready for your next journey?",
            ctaDesc: "Book your ideal vehicle today and experience the most reliable car rental service in Dar es Salaam.",
            ctaBtn: "Explore Fleet Now",
            footerDesc: "Providing top-tier, reliable, and secure car rental solutions across Dar es Salaam and Tanzania.",
            quickLinks: "Quick Links",
            legal: "Legal Info",
            terms: "Terms & Conditions",
            privacy: "Privacy Policy",
            copyright: "© 2026 B-Tech Car Rental. All rights reserved."
        },
        sw: {
            hours: "Jumatatu - Jumamosi: 1:00 Asubuhi - 12:00 Jioni",
            locationName: "Dar es Salaam, Tanzania",
            quickSupport: "Msaada Haraka:",
            navHome: "Nyumbani",
            navFleet: "Magari Yetu",
            navServices: "Huduma",
            navAbout: "Kuhusu Sisi",
            navContact: "Mawasiliano",
            myTrips: "Safari Zangu",
            authBtn: "Ingia / Jisajili",
            badge: "Huduma Bora Dar es Salaam",

            findCarTitle: "Tafuta Gari",
            pickupLocation: "Eneo la Kuchukua",
            carTypeLabel: "Aina ya Gari",
            pickupDateLabel: "Tarehe ya Kuchukua",
            searchBtn: "Tafuta Gari",
            locAirport: "JNIA Airport, Dar es Salaam",
            locCity: "City Center (Posta / Kariakoo)",
            locOysterbay: "Oysterbay / Masaki",
            locMbezi: "Mbezi / Mikocheni",
            catAll: "Makatagori Yote",
            catSuv: "SUV / Land Cruiser",
            catSedan: "Sedan / Saloon",
            catEconomy: "Economy (IST, Raum)",
            catEv: "Magari ya Umeme (EVs)",

            feature1Title: "Magari Yaliyothibitishwa",
            feature1Desc: "Tunashirikiana na wamiliki wenye uzoefu pekee kuhakikisha kila gari lina viwango vya juu vya kiufundi na usalama.",
            feature2Title: "Malipo Salama ya 50/50",
            feature2Desc: "Lipa asilimia 50% kwanza ili kukamilisha booking, na ulipe kiasi kilichobaki safari yako inapokamilika kikamilifu.",
            feature3Title: "Kufikishiwa Gari Popote",
            feature3Desc: "Pokea gari lako moja kwa moja Uwanja wa Ndege (JNIA), hotelini, au ofisini kwako popote Dar es Salaam.",

            aboutHeading: "Kuhusu B-Tech Car Rental",
            aboutSubheading: "Mshirika wako wa kuaminika kwa usafiri wa hadhi na uhakika nchini Tanzania.",
            aboutText1: "Tukiwa na uzoefu wa kutosha katika sekta ya usafiri Dar es Salaam na Tanzania kwa ujumla, tunatoa huduma zisizo na kifani. Tunaelewa kuwa iwe unasafiri kwa biashara, utalii, au tukio maalum, usalama na uhakika ndio kila kitu.",
            aboutText2: "Mfumo wetu wa kipekee wa malipo wa nusu kwa nusu (50/50) unaleta uwazi na uaminifu kati yetu, wamiliki wa magari, na wewe mteja. Furahia uhuru wa kusafiri ukiwa na mshirika anayejali faraja yako.",

            servicesHeading: "Huduma Zetu za Kitalamu",
            servicesSubheading: "Suluhisho za usafiri zilizoboreshwa kwa ajili ya watu binafsi, makampuni, na wageni wa kimataifa kote nchini Tanzania.",
            learnMore: "Weka Booking",

            serv1Title: "Kuendesha Mwenyewe (Self-Drive)",
            serv1Desc: "Furahia uhuru kamili na usiri ukisafiri Dar es Salaam na mikoani kwa kasi yako mwenyewe.",
            serv2Title: "Huduma ya Dereva (Chauffeur)",
            serv2Desc: "Madereva wataalamu na waliothibitishwa kukupeleka salama kwenye mikutano, matukio au ziara za mji.",
            serv3Title: "Magari ya Safari na 4x4",
            serv3Desc: "Magari magumu ya 4x4 yaliyoundwa mahususi kwa ajili ya mbuga za wanyama na ruti ngumu za site.",
            serv4Title: "Kukodisha kwa Makampuni",
            serv4Desc: "Suluhisho la magari ya kudumu kwa ajili ya mashirika, NGOs na miradi mikubwa ya muda mrefu.",
            serv5Title: "Usafiri wa Uwanja wa Ndege",
            serv5Desc: "Huduma ya kuchukua na kuacha kwenye Uwanja wa Ndege wa JNIA kwa wakati sahihi ili usikose ndege.",
            serv6Title: "Harusi na Matukio Maalum",
            serv6Desc: "Magari ya kifahari na ya kisasa yatakayofanya harusi, kumbukumbu na matukio yako ya VIP kuwa ya kipekee.",

            fleetHeading: "Magari Yetu",
            fleetSubheading: "Chunguza magari ya kisasa kutoka kwa wamiliki wetu wanaoaminika hapa Dar es Salaam. Yako safi, yamekaguliwa, na yako tayari kwa safari.",
            bookNow: "Kodi Gari Hili",
            vendorBy: "Mmiliki:",

            howItWorksHeading: "Jinsi Tunavyofanya Kazi",
            howItWorksSubheading: "Hatua rahisi, za wazi na salama za kukufanya uanze safari yako hapa Dar es Salaam.",
            step1Title: "1. Chagua Gari Lako",
            step1Desc: "Chunguza orodha yetu ya magari yaliyothibitishwa ya SUV, ya kifahari, na ya kawaida kulingana na hitaji lako.",
            step2Title: "2. Weka Booking (50%)",
            step2Desc: "Lipa nusu kwanza ili kuhakiki booking yako papo hapo. Mfumo wetu wa malipo ni wa wazi na salama sana.",
            step3Title: "3. Safiri na Ufurahie",
            step3Desc: "Chukua gari lako au uletewe popote Dar es Salaam. Malizia malipo yaliyobaki huduma inapokamilika.",

            ctaHeading: "Uko tayari kuanza safari yako?",
            ctaDesc: "Fanya booking ya gari lako leo na ufurahie huduma bora na ya uhakika zaidi ya kukodisha magari Dar es Salaam.",
            ctaBtn: "Tazama Magari Yetu",
            footerDesc: "Tunatoa suluhisho la uhakika, salama, na la kiwango cha juu la kukodisha magari Dar es Salaam na Tanzania nzima.",
            quickLinks: "Viungo Muhimu",
            legal: "Kisheria",
            terms: "Vigezo na Masharti",
            privacy: "Sera ya Faragha",
            copyright: "© 2026 B-Tech Car Rental. Haki zote zimehifadhiwa."
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Search parameters:", searchData);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-600 selection:text-white">

            {/* Added style specifically for hiding scrollbar in mobile app-like horizontal scroll */}
            <style>{`
                .hide-scroll::-webkit-scrollbar {
                    display: none;
                }
                .hide-scroll {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <div className="bg-red-600 text-white text-xs md:text-sm py-2 px-4 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-red-200" />
                            <span>{t[lang].hours}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-red-200" />
                            <span>{t[lang].locationName}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 font-semibold">
                            <Phone className="w-4 h-4 text-red-200" />
                            <span>{t[lang].quickSupport} +255 700 000 000</span>
                        </div>
                        <button
                            onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
                            className="bg-red-700 hover:bg-red-800 text-white px-2.5 py-1 rounded text-xs font-bold flex items-center gap-1 transition-all"
                        >
                            <Globe className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'SW' : 'EN'}</span>
                        </button>
                    </div>
                </div>
            </div>

            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-red-600 text-white p-2 rounded-lg font-black text-xl tracking-wider transition-transform duration-300 group-hover:-rotate-3 shadow-sm">
                            BT
                        </div>
                        <div>
                            <span className="text-xl font-extrabold tracking-tight text-slate-900">B-TECH</span>
                            <span className="text-xs block text-red-600 font-bold uppercase tracking-widest">Car Rental</span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm uppercase tracking-wider text-slate-600">
                        <Link href="/" className="text-red-600 hover:text-red-600 transition-colors">{t[lang].navHome}</Link>
                        <Link href="#about" className="hover:text-red-600 transition-colors">{t[lang].navAbout}</Link>
                        <Link href="#services" className="hover:text-red-600 transition-colors">{t[lang].navServices}</Link>
                        <Link href="/fleet" className="hover:text-red-600 transition-colors">{t[lang].navFleet}</Link>
                        <Link href="#contact" className="hover:text-red-600 transition-colors">{t[lang].navContact}</Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-5">
                        <Link href="/trips" className="text-sm font-semibold text-slate-700 hover:text-red-600 transition-colors">
                            {t[lang].myTrips}
                        </Link>
                        <Link href="/login" className="bg-slate-900 text-white px-6 py-2.5 rounded-md text-sm font-bold hover:bg-red-600 transition-all shadow-md">
                            {t[lang].authBtn}
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-slate-700 p-2"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3 font-medium">
                        <Link href="/" className="block text-red-600 py-2">{t[lang].navHome}</Link>
                        <Link href="#about" className="block text-slate-700 py-2">{t[lang].navAbout}</Link>
                        <Link href="#services" className="block text-slate-700 py-2">{t[lang].navServices}</Link>
                        <Link href="/fleet" className="block text-slate-700 py-2">{t[lang].navFleet}</Link>
                        <Link href="/trips" className="block text-slate-700 py-2">{t[lang].myTrips}</Link>
                        <div className="pt-4 border-t border-slate-100">
                            <Link href="/login" className="block w-full text-center bg-red-600 text-white py-3 rounded-md font-bold">
                                {t[lang].authBtn}
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <main>

                <section className="relative bg-slate-900 text-white py-32 lg:py-48 overflow-hidden">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeHeroSlide ? 'opacity-60' : 'opacity-0 pointer-events-none'}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
                                style={{ backgroundImage: `url('${slide.image}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-slate-900/20"></div>
                        </div>
                    ))}

                    <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
                        <span className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block shadow-md">
                            {t[lang].badge}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 max-w-5xl mx-auto leading-tight drop-shadow-lg">
                            {lang === 'en' ? heroSlides[activeHeroSlide].titleEn : heroSlides[activeHeroSlide].titleSw}
                        </h1>
                        <p className="text-slate-200 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium drop-shadow-md">
                            {lang === 'en' ? heroSlides[activeHeroSlide].descEn : heroSlides[activeHeroSlide].descSw}
                        </p>

                        <div className="flex justify-center gap-2">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveHeroSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeHeroSlide ? 'w-10 bg-red-600' : 'w-3 bg-white/40 hover:bg-white/70'}`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="relative z-20 max-w-6xl mx-auto px-4 -mt-16 md:-mt-24 mb-10">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-100">
                        <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                            <Car className="w-6 h-6 text-red-600" />
                            <h2 className="text-xl font-bold text-slate-900 tracking-wide">{t[lang].findCarTitle}</h2>
                        </div>

                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 hover:border-red-300 transition-colors">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">{t[lang].pickupLocation}</label>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                                    <select
                                        value={searchData.location}
                                        onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                        className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
                                    >
                                        <option>{t[lang].locAirport}</option>
                                        <option>{t[lang].locCity}</option>
                                        <option>{t[lang].locOysterbay}</option>
                                        <option>{t[lang].locMbezi}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 hover:border-red-300 transition-colors">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">{t[lang].carTypeLabel}</label>
                                <div className="flex items-center gap-2">
                                    <Car className="w-4 h-4 text-red-600 shrink-0" />
                                    <select
                                        value={searchData.carType}
                                        onChange={(e) => setSearchData({ ...searchData, carType: e.target.value })}
                                        className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
                                    >
                                        <option>{t[lang].catAll}</option>
                                        <option>{t[lang].catSuv}</option>
                                        <option>{t[lang].catSedan}</option>
                                        <option>{t[lang].catEconomy}</option>
                                        <option>{t[lang].catEv}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="bg-slate-50 text-slate-800 rounded-xl p-3 border border-slate-200 hover:border-red-300 transition-colors">
                                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">{t[lang].pickupDateLabel}</label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                                    <input
                                        type="date"
                                        value={searchData.pickupDate}
                                        onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                                        className="w-full bg-transparent text-sm font-semibold focus:outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white hover:bg-red-700 font-bold py-3.5 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wider text-sm"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>{t[lang].searchBtn}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 mb-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-slate-50 text-red-600 p-4 rounded-full shrink-0 border border-slate-100">
                                <UserCheck className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-lg text-slate-900 mb-2">{t[lang].feature1Title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{t[lang].feature1Desc}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-slate-50 text-red-600 p-4 rounded-full shrink-0 border border-slate-100">
                                <ShieldCheck className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-lg text-slate-900 mb-2">{t[lang].feature2Title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{t[lang].feature2Desc}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-slate-50 text-red-600 p-4 rounded-full shrink-0 border border-slate-100">
                                <MapPin className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-lg text-slate-900 mb-2">{t[lang].feature3Title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{t[lang].feature3Desc}</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="about" className="py-20 px-4 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-red-600 rounded-3xl translate-x-4 translate-y-4 opacity-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80"
                                alt="Corporate Transport in Dar es Salaam"
                                className="relative z-10 rounded-3xl shadow-xl object-cover h-[500px] w-full"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <span className="text-red-600 text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full inline-block mb-4">
                                {t[lang].navAbout}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-tight">
                                {t[lang].aboutHeading}
                            </h2>
                            <h3 className="text-lg font-bold text-slate-700 mb-6 border-l-4 border-red-600 pl-4">
                                {t[lang].aboutSubheading}
                            </h3>
                            <p className="text-slate-600 text-base leading-relaxed mb-5">
                                {t[lang].aboutText1}
                            </p>
                            <p className="text-slate-600 text-base leading-relaxed mb-8">
                                {t[lang].aboutText2}
                            </p>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-slate-900 mb-1">5+</div>
                                    <div className="text-[10px] font-bold text-red-600 uppercase">Years Exp.</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-slate-900 mb-1">100+</div>
                                    <div className="text-[10px] font-bold text-red-600 uppercase">Vehicles</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-slate-900 mb-1">24/7</div>
                                    <div className="text-[10px] font-bold text-red-600 uppercase">Support</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* MODIFIED SERVICES SECTION WITH PARALLAX AND MOBILE UI */}
                <section id="services" className="relative py-24 px-4 border-t border-slate-200 overflow-hidden">

                    {/* Parallax Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed z-0"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80')` }}
                    />

                    {/* Dark/Blur Overlay for Contrast */}
                    <div className="absolute inset-0 bg-slate-900/85 backdrop-blur-[3px] z-0"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
                            <span className="text-red-400 text-xs font-bold uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
                                {t[lang].navServices}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                {t[lang].servicesHeading}
                            </h2>
                            <p className="text-slate-300 text-base">
                                {t[lang].servicesSubheading}
                            </p>
                        </div>

                        {/* Mobile Swipeable (App-like) / Desktop Grid */}
                        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8 md:pb-0 snap-x snap-mandatory hide-scroll">
                            {[
                                { icon: <Car />, title: t[lang].serv1Title, desc: t[lang].serv1Desc },
                                { icon: <Users />, title: t[lang].serv2Title, desc: t[lang].serv2Desc },
                                { icon: <Compass />, title: t[lang].serv3Title, desc: t[lang].serv3Desc },
                                { icon: <Briefcase />, title: t[lang].serv4Title, desc: t[lang].serv4Desc },
                                { icon: <Plane />, title: t[lang].serv5Title, desc: t[lang].serv5Desc },
                                { icon: <HeartHandshake />, title: t[lang].serv6Title, desc: t[lang].serv6Desc }
                            ].map((service, index) => (
                                <div
                                    key={index}
                                    className="min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0 md:shrink bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] border border-white/20 hover:border-red-400 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group cursor-pointer shadow-xl relative overflow-hidden"
                                >
                                    {/* Decorative 'Kali' background element */}
                                    <div className="absolute -right-8 -top-8 bg-red-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700 ease-in-out z-0 pointer-events-none"></div>

                                    <div className="relative z-10 bg-slate-50 text-red-600 p-4 rounded-2xl w-fit mb-6 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                        {React.cloneElement(service.icon, { className: 'w-6 h-6' })}
                                    </div>
                                    <h3 className="relative z-10 text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="relative z-10 text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{service.desc}</p>
                                    <div className="relative z-10 text-red-600 font-bold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                                        <span>{t[lang].learnMore}</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="fleet" className="py-24 px-4 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                            <div className="max-w-2xl">
                                <span className="text-red-600 text-xs font-bold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full">
                                    {t[lang].navFleet}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-4 mb-4">
                                    {t[lang].fleetHeading}
                                </h2>
                                <p className="text-slate-500 text-base">
                                    {t[lang].fleetSubheading}
                                </p>
                            </div>
                            <Link href="/fleet" className="hidden md:inline-flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
                                View Entire Fleet
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {fleetData.map((car) => (
                                <div key={car.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col group">
                                    <div className="relative h-48 overflow-hidden bg-slate-100">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {car.category}
                                        </div>
                                    </div>

                                    <div className="p-5 flex flex-col flex-grow">
                                        <div className="text-[11px] text-red-600 font-bold uppercase tracking-wide mb-1">
                                            {t[lang].vendorBy} <span className="text-slate-700">{car.vendor}</span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-4 line-clamp-1">{car.name}</h3>

                                        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 mb-4 text-xs font-semibold text-slate-500 text-center bg-slate-50 rounded-lg">
                                            <div className="flex flex-col items-center gap-1">
                                                <Settings className="w-4 h-4 text-slate-400" />
                                                <span>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1 border-x border-slate-200">
                                                <Fuel className="w-4 h-4 text-slate-400" />
                                                <span>{car.fuel}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-1">
                                                <Users className="w-4 h-4 text-slate-400" />
                                                <span>{car.seats}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto">
                                            <div>
                                                <span className="text-lg font-black text-slate-900">{car.price}</span>
                                                <span className="text-[10px] text-slate-500 block uppercase font-bold">/{car.period}</span>
                                            </div>
                                            <Link href="/checkout" className="bg-slate-900 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-1">
                                                <span>{t[lang].bookNow}</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link href="/fleet" className="md:hidden mt-8 w-full flex items-center justify-center bg-slate-50 border border-slate-200 text-slate-900 font-bold px-6 py-4 rounded-xl shadow-sm">
                            View Entire Fleet
                        </Link>
                    </div>
                </section>

                <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80')` }}
                    />
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <span className="text-red-400 text-xs font-bold uppercase tracking-widest border border-slate-700 px-4 py-1.5 rounded-full inline-block mb-4 bg-slate-800/50">
                                Process
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
                                {t[lang].howItWorksHeading}
                            </h2>
                            <p className="text-slate-400 text-base">
                                {t[lang].howItWorksSubheading}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            <div className="hidden md:block absolute top-1/2 left-0 w-full h-[2px] bg-slate-800 -translate-y-1/2 z-0"></div>

                            {[
                                { step: '01', icon: <Car />, title: t[lang].step1Title, desc: t[lang].step1Desc },
                                { step: '02', icon: <CreditCard />, title: t[lang].step2Title, desc: t[lang].step2Desc },
                                { step: '03', icon: <KeyRound />, title: t[lang].step3Title, desc: t[lang].step3Desc }
                            ].map((item, index) => (
                                <div key={index} className="bg-slate-800/90 backdrop-blur-sm relative z-10 p-8 rounded-2xl border border-slate-700 text-center hover:border-red-500 transition-colors">
                                    <div className="absolute -top-4 -right-4 text-6xl font-black text-slate-700/30 select-none">
                                        {item.step}
                                    </div>
                                    <div className="bg-slate-900 text-red-500 p-4 rounded-xl w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-slate-700 shadow-inner">
                                        {React.cloneElement(item.icon, { className: 'w-7 h-7' })}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 px-4 bg-slate-50">
                    <div className="max-w-7xl mx-auto bg-red-600 rounded-[2rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center bg-fixed mix-blend-overlay opacity-20"></div>
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">{t[lang].ctaHeading}</h2>
                            <p className="text-red-100 text-lg max-w-2xl mx-auto mb-10 font-medium">{t[lang].ctaDesc}</p>
                            <Link
                                href="/fleet"
                                className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 font-bold py-4 px-10 rounded-xl transition-all shadow-lg hover:shadow-xl"
                            >
                                <span>{t[lang].ctaBtn}</span>
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <footer id="contact" className="bg-slate-950 text-slate-400 pt-20 pb-8 px-4 border-t border-slate-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="lg:pr-8">
                        <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="bg-red-600 text-white p-2 rounded-lg font-black text-xl tracking-wider">
                                BT
                            </div>
                            <div>
                                <span className="text-xl font-extrabold tracking-tight text-white">B-TECH</span>
                                <span className="text-xs block text-red-500 font-bold uppercase tracking-widest">Car Rental</span>
                            </div>
                        </Link>
                        <p className="text-sm leading-relaxed mb-6">
                            {t[lang].footerDesc}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].quickLinks}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {t[lang].navHome}</Link></li>
                            <li><Link href="#about" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {t[lang].navAbout}</Link></li>
                            <li><Link href="#services" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {t[lang].navServices}</Link></li>
                            <li><Link href="/fleet" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {t[lang].navFleet}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].legal}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/terms" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {t[lang].terms}</Link></li>
                            <li><Link href="/privacy" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {t[lang].privacy}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">{t[lang].navContact}</h4>
                        <ul className="space-y-4 text-sm">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                                <span>Dar es Salaam, Tanzania</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                                <span>+255 700 000 000</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                                <span>info@btechcarrental.co.tz</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>{t[lang].copyright}</p>
                    <div className="flex gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors font-medium">Facebook</span>
                        <span className="hover:text-white cursor-pointer transition-colors font-medium">Instagram</span>
                        <span className="hover:text-white cursor-pointer transition-colors font-medium">X (Twitter)</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}