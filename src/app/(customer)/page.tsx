'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    ChevronRight,
    Building2,
    Zap,
    BadgePercent
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function CustomerLandingPage() {
    const router = useRouter();
    const { currency, setCurrency, formatPrice } = useCurrency();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState<'en' | 'sw'>('en');
    const [activeHeroSlide, setActiveHeroSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');

    const [searchData, setSearchData] = useState({
        location: 'JNIA Airport, Dar es Salaam',
        carType: 'All Categories',
        pickupDate: '',
        returnDate: ''
    });

    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'International Mobility & Multi-Vendor Fleet Platform',
            titleSw: 'Jukwaa la Kimataifa la Magari ya Wamiliki Mbalimbali',
            descEn: 'Connect with verified fleet hosts across Tanzania. Experience seamless airport delivery, multi-currency payments, and 50/50 escrow protection.',
            descSw: 'Ungana na wamiliki wa magari waliothibitishwa nchini kote. Pokea gari lako uwanja wa ndege, lipa kwa USD au TZS, na ufurahie ulinzi wa 50/50.'
        },
        {
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Executive Chauffeur & Diplomatic VIP Protocol',
            titleSw: 'Usafiri wa Hadhi ya Juu wa Kidiplomasia na Wakurugenzi',
            descEn: 'Vetted bilingual chauffeurs and discreet luxury transportation for corporate summits, executives, and international delegates.',
            descSw: 'Madereva wataalamu wanaozungumza lugha nyingi kwa ajili ya mikutano ya kimataifa, viongozi na wageni wa heshima.'
        },
        {
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Expedition-Ready 4x4 Safari Fleet',
            titleSw: 'Magari Magumu ya 4x4 kwa Ajili ya Safari na Utalii',
            descEn: 'Reinforced 4x4 vehicles built for Serengeti expeditions, Ngorongoro trails, and remote technical project sites.',
            descSw: 'Magari magumu ya 4x4 yaliyoundwa mahususi kwa safari za Serengeti, Ngorongoro na miradi ya mikoani.'
        },
        {
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Enterprise & Long-Term Fleet Leasing',
            titleSw: 'Mikataba ya Magari ya Mashirika na Makampuni',
            descEn: 'Turnkey fleet management with replacement vehicle guarantees for multinational NGOs, embassies, and engineering firms.',
            descSw: 'Usimamizi kamili wa magari ya makampuni na NGOs yenye uhakika wa kubadilishiwa gari mara moja bila usumbufu.'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // 8 Vehicles (2 full rows of 4) representing a true multi-vendor platform
    const fleetData = [
        {
            id: 1,
            name: "Toyota Land Cruiser V8",
            category: "SUV / 4x4",
            vendor: "Coastal Luxury Fleet",
            priceValue: 350000,
            image: "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Diesel",
            seats: "7 Seats",
            trips: "140+ trips",
            rating: 4.9
        },
        {
            id: 2,
            name: "Toyota RAV4 New Model",
            category: "SUV / 4x4",
            vendor: "ZanWave Motors",
            priceValue: 180000,
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            trips: "98 trips",
            rating: 4.8
        },
        {
            id: 3,
            name: "Toyota IST (Urban Economy)",
            category: "Economy",
            vendor: "Dar Express Cars",
            priceValue: 75000,
            image: "https://images.unsplash.com/photo-1550355191-aa06cb11e81c?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            trips: "215 trips",
            rating: 4.7
        },
        {
            id: 4,
            name: "Mercedes-Benz C-Class",
            category: "Luxury",
            vendor: "VIP Executive Ride",
            priceValue: 450000,
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            trips: "82 trips",
            rating: 5.0
        },
        {
            id: 5,
            name: "Range Rover Sport HSE",
            category: "Luxury",
            vendor: "Apex Luxury Rentals",
            priceValue: 520000,
            image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "5 Seats",
            trips: "45 trips",
            rating: 5.0
        },
        {
            id: 6,
            name: "Toyota Land Cruiser Prado TX",
            category: "SUV / 4x4",
            vendor: "Serengeti Safari Roamers",
            priceValue: 280000,
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Diesel",
            seats: "7 Seats",
            trips: "112 trips",
            rating: 4.9
        },
        {
            id: 7,
            name: "Toyota Alphard VIP Lounge",
            category: "Luxury",
            vendor: "Royal Concierge Fleet",
            priceValue: 300000,
            image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Petrol",
            seats: "7 Seats",
            trips: "76 trips",
            rating: 4.9
        },
        {
            id: 8,
            name: "Hyundai Ioniq 5 EV",
            category: "Electric",
            vendor: "GreenDrive East Africa",
            priceValue: 220000,
            image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic",
            fuel: "Electric",
            seats: "5 Seats",
            trips: "34 trips",
            rating: 4.8
        }
    ];

    const filteredCars = fleetData.filter(car => {
        if (selectedCategory === 'All') return true;
        return car.category.toLowerCase().includes(selectedCategory.toLowerCase());
    });

    const t = {
        en: {
            hours: "24/7 International Concierge Support",
            locationName: "Dar es Salaam • Zanzibar • Arusha",
            quickSupport: "Priority Desk:",
            navHome: "Home",
            navFleet: "Fleet Catalog",
            navSolutions: "Mobility Solutions",
            navAbout: "About B-Tech",
            navContact: "Contact",
            myTrips: "My Trips",
            authBtn: "Sign In",
            hostCta: "Become a Host",
            badge: "International Multi-Vendor Mobility",

            findCarTitle: "Reserve Your Vehicle",
            pickupLocation: "Pick-up Location / Airport",
            carTypeLabel: "Vehicle Class",
            pickupDateLabel: "Pick-up Date",
            searchBtn: "Search Fleet",
            locAirport: "JNIA Airport (DAR) - VIP Meet & Greet",
            locZanzibar: "Zanzibar Airport (ZNZ) / Stone Town",
            locArusha: "Kilimanjaro Airport (JRO) / Arusha",
            locCity: "Dar es Salaam Central Business District",
            locOysterbay: "Oysterbay / Masaki Diplomatic Zone",
            catAll: "All Vehicle Categories",
            catSuv: "SUV & 4x4 Safari Expeditions",
            catSedan: "Executive & Diplomatic Sedans",
            catEconomy: "Urban Compact / Economy",
            catEv: "Clean Electric Vehicles (EVs)",

            feature1Title: "Vetted Fleet Hosts",
            feature1Desc: "Every vehicle is verified with rigorous mechanical and interior standards from certified commercial fleet hosts.",
            feature2Title: "50/50 Escrow Security",
            feature2Desc: "Lock your booking with 50% deposit held securely in escrow. Pay the remaining 50% upon successful vehicle handoff.",
            feature3Title: "Global Airport Concierge",
            feature3Desc: "Seamless handoff at JNIA (Dar), Kilimanjaro (JRO), and Zanzibar (ZNZ) with international driver permit assistance.",

            aboutHeading: "About B-Tech Global Car Rental",
            aboutSubheading: "Connecting international travelers with certified local fleet hosts across Tanzania.",
            aboutText1: "With premier operational hubs at JNIA Airport, Zanzibar, and Arusha, B-Tech delivers unmatched mobility. Whether you are arriving for business summits, Serengeti expeditions, or private VIP travel, our multi-vendor platform ensures inspected quality and transparent pricing.",
            aboutText2: "Our hallmark 50/50 escrow protection model guarantees mutual trust: your deposit is held securely until you receive and verify your vehicle. Experience the freedom of the road with certified hosts and 24/7 bilingual support.",

            solutionsHeading: "Enterprise & Bespoke Mobility Solutions",
            solutionsSubheading: "Engineered for international travelers, corporate executives, and safari expeditions across East Africa.",
            learnMore: "Reserve Solution",

            sol1Title: "Autonomous Self-Drive",
            sol1Desc: "Complete privacy and independence. Transparent multi-currency pricing, unlimited mileage tiers, and 24/7 roadside backup.",
            sol2Title: "Executive Chauffeur Protocol",
            sol2Desc: "Discreet, bilingual professional drivers trained in diplomatic security, airport fast-track, and punctuality.",
            sol3Title: "Cross-Country & Safari 4x4",
            sol3Desc: "Custom-fitted 4WD cruisers built with high-clearance suspension, winches, and dual fuel tanks for national parks.",
            sol4Title: "Corporate & NGO Fleet Outsource",
            sol4Desc: "Scalable monthly contracts with dedicated fleet managers, maintenance coverage, and replacement vehicle guarantees.",
            sol5Title: "Direct Airport Fast-Track",
            sol5Desc: "Step off your flight and straight into your air-conditioned vehicle with our tarmac and terminal concierge service.",
            sol6Title: "VIP Diplomatic & Events",
            sol6Desc: "Immaculate premium motorcades for state delegations, international summits, and high-profile celebrations.",

            fleetHeading: "Our Trusted Fleet Showcase",
            fleetSubheading: "Curated vehicles listed directly by verified fleet hosts across Tanzania. Inspected, insured, and ready for immediate deployment.",
            bookNow: "Book Vehicle",
            vendorBy: "Verified Host:",
            perDay: "/day",

            experienceHeading: "Frictionless Global Reservation",
            experienceSubheading: "A transparent, enterprise-grade journey designed for global convenience and total peace of mind.",
            step1Title: "1. Select & Tailor Vehicle",
            step1Desc: "Browse verified fleets by category, host rating, and equipment. Choose airport delivery or hotel drop-off.",
            step2Title: "2. Secure 50% Escrow Deposit",
            step2Desc: "Confirm your dates with protected multi-currency escrow (Visa, Mastercard, M-Pesa, Apple Pay). No hidden surprises.",
            step3Title: "3. Direct Contactless Handover",
            step3Desc: "Meet your host representative at your chosen terminal or residence. Inspect, sign off digitally, and drive.",

            ctaHeading: "Elevate your journey across Tanzania.",
            ctaDesc: "Join thousands of international travelers and multinational organizations who trust B-Tech for reliable mobility.",
            ctaBtn: "Explore Entire Fleet",
            ctaPartnerBtn: "List Your Fleet as a Host",
            footerDesc: "International multi-vendor car rental network providing secure 50/50 escrow bookings across Dar es Salaam, Zanzibar, and East Africa.",
            quickLinks: "Platform Links",
            legal: "Trust & Compliance",
            terms: "Terms of Service",
            privacy: "Privacy Policy",
            escrowGuarantee: "50/50 Escrow Terms",
            copyright: "© 2026 B-Tech Car Rental International. All rights reserved."
        },
        sw: {
            hours: "Huduma kwa Wateja wa Kimataifa Masaa 24/7",
            locationName: "Dar es Salaam • Zanzibar • Arusha",
            quickSupport: "Dawati la Dharura:",
            navHome: "Nyumbani",
            navFleet: "Magari Yote",
            navSolutions: "Suluhisho za Usafiri",
            navAbout: "Kuhusu Sisi",
            navContact: "Mawasiliano",
            myTrips: "Safari Zangu",
            authBtn: "Ingia",
            hostCta: "Kuwa Mmiliki (Host)",
            badge: "Mfumo wa Kimataifa wa Wamiliki wa Magari",

            findCarTitle: "Weka Nafasi ya Gari Lako",
            pickupLocation: "Eneo la Kuchukulia / Uwanja wa Ndege",
            carTypeLabel: "Aina ya Gari",
            pickupDateLabel: "Tarehe ya Kuanza Safari",
            searchBtn: "Tafuta Magari",
            locAirport: "Uwanja wa Ndege wa JNIA (DAR) - Mapokezi ya VIP",
            locZanzibar: "Uwanja wa Ndege wa Zanzibar (ZNZ) / Mjini",
            locArusha: "Uwanja wa Ndege wa KIA (JRO) / Arusha",
            locCity: "Katikati ya Jiji la Dar es Salaam (Posta/Kariakoo)",
            locOysterbay: "Oysterbay / Masaki Eneo la Kidiplomasia",
            catAll: "Makatagori Yote ya Magari",
            catSuv: "SUV na Magari Magumu ya 4x4 ya Safari",
            catSedan: "Magari ya Kifahari na Kidiplomasia",
            catEconomy: "Magari Madogo ya Mjini / Economy",
            catEv: "Magari ya Kisasa ya Umeme (EVs)",

            feature1Title: "Wamiliki Waliothibitishwa",
            feature1Desc: "Kila gari linakaguliwa kwa viwango vikali vya ufundi na usalama kutoka kwa wamiliki wa kitaalamu.",
            feature2Title: "Ulinzi Salama wa Malipo ya 50/50",
            feature2Desc: "Lipa asilimia 50% tu kuthibitisha nafasi yako kwenye akaunti salama ya Escrow. Lipa asilimia 50% iliyobaki ukikabidhiwa gari.",
            feature3Title: "Huduma Viwanja vya Ndege",
            feature3Desc: "Kukabidhiwa gari uwanja wa ndege (JNIA, JRO, ZNZ) kwa wageni wa kimataifa na wenye leseni za nje.",

            aboutHeading: "Kuhusu B-Tech Global Car Rental",
            aboutSubheading: "Kuunganisha wasafiri wa kimataifa na wamiliki wa magari walioidhinishwa Tanzania kote.",
            aboutText1: "Tukiwa na vituo vikuu Uwanja wa Ndege wa JNIA (Dar), Zanzibar na Arusha, B-Tech inatoa usafiri wa viwango vya kimataifa. Iwe unasafiri kwa ajili ya mikutano ya kibiashara, safari za Serengeti au ziara za kikazi, mtandao wetu wa wamiliki unakuhakikishia magari salama na bei za wazi.",
            aboutText2: "Mfumo wetu wa kipekee wa malipo wa nusu kwa nusu (50/50) kwenye Escrow unaleta ulinzi kamili: fedha zako zinashikiliwa salama hadi ukabidhiwe gari na kuridhika. Safiri kwa amani ukiwa na msaada wa masaa 24/7.",

            solutionsHeading: "Suluhisho la Usafiri wa Kiwango cha Kimataifa",
            solutionsSubheading: "Imeundwa mahususi kwa wageni wa kimataifa, makampuni makubwa, na safari za mbugani kote nchini.",
            learnMore: "Weka Oda ya Huduma",

            sol1Title: "Kujiendeshea (Self-Drive)",
            sol1Desc: "Uhuru na usiri kamili. Bei za wazi kwa TZS au USD, bima kamili na msaada wa dharura barabarani masaa 24.",
            sol2Title: "Huduma ya Dereva wa Hadhi (Chauffeur)",
            sol2Desc: "Madereva wataalamu wanaojua lugha za kigeni, waliofunzwa usalama wa kidiplomasia na utunzaji wa wakati.",
            sol3Title: "Magari ya Safari na Mbugani 4x4",
            sol3Desc: "Magari maalum ya 4x4 yenye mifumo imara kwa safari za mbuga za Serengeti, Ngorongoro na miradi ya mikoani.",
            sol4Title: "Kukodisha kwa Makampuni na Mashirika",
            sol4Desc: "Mikataba ya kudumu ya kila mwezi ikiwa na bima, matengenezo, na gari mbadala papo hapo likiharibika.",
            sol5Title: "Uwanja wa Ndege Moja kwa Moja",
            sol5Desc: "Toka ndani ya ndege na uingie moja kwa moja kwenye gari lako safi bila kusubiri wala usumbufu wowote.",
            sol6Title: "Misafara na Matukio Maalum ya VIP",
            sol6Desc: "Magari ya hadhi ya juu kwa ajili ya mikutano mikubwa ya kiserikali, wageni mashuhuri, na sherehe za kifahari.",

            fleetHeading: "Magari Yetu Yaliyothibitishwa",
            fleetSubheading: "Orodha ya magari bora kutoka kwa wamiliki waliosajiliwa Tanzania nzima. Yako safi, yamekaguliwa, na yako tayari kwa safari.",
            bookNow: "Kodi Gari Hili",
            vendorBy: "Mmiliki Aliyethibitishwa:",
            perDay: "/siku",

            experienceHeading: "Uhifadhi Rahisi na Malipo Salama ya 50/50",
            experienceSubheading: "Mfumo wa kisasa wa uwazi uliojengwa kwa ajili ya kuaminiana na safari bila hofu yoyote.",
            step1Title: "1. Chagua na Urekebishe Gari Lako",
            step1Desc: "Chunguza magari kulingana na kundi, sifa za mmiliki, na mahitaji yako. Chagua kufikishiwa uwanja wa ndege au hotelini.",
            step2Title: "2. Weka Amana ya 50% Kwenye Escrow",
            step2Desc: "Thibitisha safari yako kwa malipo salama ya kadi au mtandao wa simu. Hakuna gharama zilizofichwa.",
            step3Title: "3. Kabidhiwa Gari Bila Usumbufu",
            step3Desc: "Kutana na mwakilishi wa gari sehemu uliyochagua. Kagua gari, thibitisha kidijitali, na anza safari yako.",

            ctaHeading: "Boresha safari yako leo ndani ya Tanzania.",
            ctaDesc: "Ungana na maelfu ya wasafiri wa kimataifa na mashirika makubwa yanayoamini B-Tech kwa usafiri wa uhakika.",
            ctaBtn: "Tazama Orodha Kamili",
            ctaPartnerBtn: "Jisajili Kama Mmiliki wa Magari",
            footerDesc: "Mtandao wa kimataifa wa kukodisha magari unaounganisha wasafiri na wamiliki wa magari kwa malipo salama ya 50/50 nchini Tanzania.",
            quickLinks: "Viungo Muhimu",
            legal: "Kisheria na Usalama",
            terms: "Vigezo na Masharti",
            privacy: "Sera ya Faragha",
            escrowGuarantee: "Ulinzi wa Malipo ya 50/50",
            copyright: "© 2026 B-Tech Car Rental International. Haki zote zimehifadhiwa."
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/fleet?location=${encodeURIComponent(searchData.location)}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-red-600 selection:text-white">

            {/* Top Announcement & Multi-Currency Bar */}
            <div className="bg-slate-950 text-slate-300 text-xs py-2.5 px-4 border-b border-slate-800 transition-all duration-300">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-red-500" />
                            <span>{t[lang].hours}</span>
                        </div>
                        <div className="hidden md:flex items-center gap-2 text-slate-400">
                            <MapPin className="w-3.5 h-3.5 text-red-500" />
                            <span>{t[lang].locationName}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* International Currency Switcher */}
                        <div className="flex items-center bg-slate-900 rounded-lg p-0.5 border border-slate-800">
                            <button
                                onClick={() => setCurrency('TZS')}
                                className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all ${
                                    currency === 'TZS' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                TZS
                            </button>
                            <button
                                onClick={() => setCurrency('USD')}
                                className={`px-2 py-0.5 rounded text-[11px] font-extrabold transition-all ${
                                    currency === 'USD' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                USD ($)
                            </button>
                        </div>

                        {/* Language Switcher */}
                        <button
                            onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
                            className="bg-slate-900 hover:bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-800 transition-all"
                        >
                            <Globe className="w-3.5 h-3.5 text-red-400" />
                            <span>{lang === 'en' ? 'SW' : 'EN'}</span>
                        </button>

                        {/* Partner Link */}
                        <Link
                            href="/register?role=vendor"
                            className="hidden lg:flex items-center gap-1 text-[11px] font-bold text-red-400 hover:text-red-300 transition-colors"
                        >
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{t[lang].hostCta}</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Navigation Header */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="bg-red-600 text-white p-2 rounded-xl font-black text-xl tracking-wider transition-transform duration-300 group-hover:-rotate-2 shadow-sm">
                            BT
                        </div>
                        <div>
                            <span className="text-xl font-black tracking-tight text-slate-950">B-TECH</span>
                            <span className="text-[10px] block text-red-600 font-extrabold uppercase tracking-widest">
                                Global Car Rental
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden lg:flex items-center gap-7 font-bold text-xs uppercase tracking-wider text-slate-600">
                        <Link href="/" className="text-red-600 hover:text-red-600 transition-colors">{t[lang].navHome}</Link>
                        <Link href="/fleet" className="hover:text-red-600 transition-colors">{t[lang].navFleet}</Link>
                        <Link href="#solutions" className="hover:text-red-600 transition-colors">{t[lang].navSolutions}</Link>
                        <Link href="#about" className="hover:text-red-600 transition-colors">{t[lang].navAbout}</Link>
                        <Link href="#contact" className="hover:text-red-600 transition-colors">{t[lang].navContact}</Link>
                    </nav>

                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/register?role=vendor"
                            className="text-xs font-bold text-slate-700 hover:text-red-600 transition-colors border border-slate-200 hover:border-red-400 px-3.5 py-2 rounded-xl"
                        >
                            {t[lang].hostCta}
                        </Link>
                        <Link
                            href="/login"
                            className="bg-slate-950 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-red-600 transition-all shadow-md flex items-center gap-1.5"
                        >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>{t[lang].authBtn}</span>
                        </Link>
                    </div>

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden text-slate-700 p-2"
                        aria-label="Toggle Navigation Menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 space-y-3 font-semibold text-sm">
                        <Link href="/" className="block text-red-600 py-1.5">{t[lang].navHome}</Link>
                        <Link href="/fleet" className="block text-slate-700 py-1.5">{t[lang].navFleet}</Link>
                        <Link href="#solutions" className="block text-slate-700 py-1.5">{t[lang].navSolutions}</Link>
                        <Link href="#about" className="block text-slate-700 py-1.5">{t[lang].navAbout}</Link>
                        <Link href="/register?role=vendor" className="block text-red-600 py-1.5">{t[lang].hostCta}</Link>
                        <div className="pt-3 border-t border-slate-100 flex gap-2">
                            <Link href="/login" className="w-1/2 text-center bg-slate-950 text-white py-2.5 rounded-xl font-bold text-xs">
                                {t[lang].authBtn}
                            </Link>
                            <Link href="/register" className="w-1/2 text-center bg-red-600 text-white py-2.5 rounded-xl font-bold text-xs">
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            <main>

                {/* Hero Section */}
                <section className="relative bg-slate-950 text-white py-28 lg:py-44 overflow-hidden">
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeHeroSlide ? 'opacity-65' : 'opacity-0 pointer-events-none'}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
                                style={{ backgroundImage: `url('${slide.image}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30"></div>
                        </div>
                    ))}

                    <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
                        <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{t[lang].badge}</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 max-w-5xl mx-auto leading-tight drop-shadow-xl">
                            {lang === 'en' ? heroSlides[activeHeroSlide].titleEn : heroSlides[activeHeroSlide].titleSw}
                        </h1>
                        <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto mb-10 font-normal drop-shadow-md leading-relaxed">
                            {lang === 'en' ? heroSlides[activeHeroSlide].descEn : heroSlides[activeHeroSlide].descSw}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 mb-10">
                            <Link
                                href="/fleet"
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all flex items-center gap-2 text-sm"
                            >
                                <span>{t[lang].ctaBtn}</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/register?role=vendor"
                                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-3.5 px-6 rounded-xl backdrop-blur-md transition-all flex items-center gap-2 text-sm"
                            >
                                <Building2 className="w-4 h-4 text-red-400" />
                                <span>{t[lang].ctaPartnerBtn}</span>
                            </Link>
                        </div>

                        {/* Slider dots */}
                        <div className="flex justify-center gap-2">
                            {heroSlides.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveHeroSlide(idx)}
                                    className={`h-2 rounded-full transition-all duration-300 ${idx === activeHeroSlide ? 'w-10 bg-red-600' : 'w-2.5 bg-white/40 hover:bg-white/70'}`}
                                    aria-label={`Slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* International Booking / Search Bar Widget */}
                <section className="max-w-7xl mx-auto px-4 -mt-14 relative z-20 mb-16">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-5 md:p-8 backdrop-blur-lg">
                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                                <Plane className="w-4 h-4 text-red-600" />
                                <span>{t[lang].findCarTitle}</span>
                            </span>
                            <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                                50/50 Protected Escrow • Free Airport Handoff
                            </span>
                        </div>

                        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-red-500 transition-colors">
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">{t[lang].pickupLocation}</label>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                                    <select
                                        value={searchData.location}
                                        onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                        className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                                    >
                                        <option value="JNIA Airport, Dar es Salaam">{t[lang].locAirport}</option>
                                        <option value="Zanzibar Airport (ZNZ)">{t[lang].locZanzibar}</option>
                                        <option value="Kilimanjaro Airport (JRO)">{t[lang].locArusha}</option>
                                        <option value="City Center (Posta / Kariakoo)">{t[lang].locCity}</option>
                                        <option value="Oysterbay / Masaki">{t[lang].locOysterbay}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-red-500 transition-colors">
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">{t[lang].carTypeLabel}</label>
                                <div className="flex items-center gap-2">
                                    <Car className="w-4 h-4 text-red-600 shrink-0" />
                                    <select
                                        value={searchData.carType}
                                        onChange={(e) => setSearchData({ ...searchData, carType: e.target.value })}
                                        className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                                    >
                                        <option value="All Categories">{t[lang].catAll}</option>
                                        <option value="SUV / Land Cruiser">{t[lang].catSuv}</option>
                                        <option value="Sedan / Saloon">{t[lang].catSedan}</option>
                                        <option value="Economy (IST, Raum)">{t[lang].catEconomy}</option>
                                        <option value="Electric Vehicles (EVs)">{t[lang].catEv}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-2xl p-3 bg-slate-50/70 hover:bg-white focus-within:bg-white focus-within:border-red-500 transition-colors">
                                <label className="block text-[10px] font-black uppercase text-slate-500 mb-1">{t[lang].pickupDateLabel}</label>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-red-600 shrink-0" />
                                    <input
                                        type="date"
                                        value={searchData.pickupDate}
                                        onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                                        className="w-full bg-transparent text-xs font-bold text-slate-900 focus:outline-none cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="w-full bg-red-600 text-white hover:bg-red-700 font-black py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-red-600/30 flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer"
                                >
                                    <Search className="w-4 h-4" />
                                    <span>{t[lang].searchBtn}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Trust Pillar Highlights */}
                <section className="max-w-7xl mx-auto px-4 mb-20 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-red-50 text-red-600 p-3.5 rounded-2xl shrink-0 border border-red-100">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-base text-slate-900 mb-1.5">{t[lang].feature1Title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{t[lang].feature1Desc}</p>
                            </div>
                        </div>

                        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-red-50 text-red-600 p-3.5 rounded-2xl shrink-0 border border-red-100">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-base text-slate-900 mb-1.5">{t[lang].feature2Title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{t[lang].feature2Desc}</p>
                            </div>
                        </div>

                        <div className="bg-white p-7 rounded-3xl shadow-sm border border-slate-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                            <div className="bg-red-50 text-red-600 p-3.5 rounded-2xl shrink-0 border border-red-100">
                                <Plane className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-extrabold text-base text-slate-900 mb-1.5">{t[lang].feature3Title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">{t[lang].feature3Desc}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* OUR TRUSTED FLEET - EXPANDED TO 8 VEHICLES (2 ROWS OF 4) WITH DYNAMIC CURRENCY */}
                <section id="fleet" className="py-20 px-4 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-1.5 text-red-600 text-xs font-extrabold uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full mb-3">
                                    <Car className="w-3.5 h-3.5" />
                                    <span>Verified Multi-Vendor Catalog</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-950 tracking-tight mb-3">
                                    {t[lang].fleetHeading}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {t[lang].fleetSubheading}
                                </p>
                            </div>

                            {/* Category Filter Chips & Currency Indicator */}
                            <div className="flex flex-wrap items-center gap-2">
                                {['All', 'SUV / 4x4', 'Luxury', 'Economy', 'Electric'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                                            selectedCategory === cat
                                                ? 'bg-slate-950 text-white shadow-sm'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 8 Cars Grid (2 Rows x 4 Columns on desktop) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredCars.map((car) => (
                                <div
                                    key={car.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 hover:shadow-2xl hover:border-slate-300 transition-all duration-300 flex flex-col group"
                                >
                                    {/* Vehicle Image and Badges */}
                                    <div className="relative h-52 overflow-hidden bg-slate-100">
                                        <img
                                            src={car.image}
                                            alt={car.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                            {car.category}
                                        </div>
                                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                            <span>{car.rating}</span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-5 flex flex-col flex-grow">
                                        {/* Multi-Vendor Indicator */}
                                        <div className="flex items-center justify-between text-[11px] mb-2">
                                            <div className="flex items-center gap-1 text-slate-600 font-semibold truncate">
                                                <Building2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                                <span className="truncate">{car.vendor}</span>
                                            </div>
                                            <span className="text-[10px] bg-emerald-50 text-emerald-700 font-extrabold px-2 py-0.5 rounded-md shrink-0 border border-emerald-200">
                                                Verified
                                            </span>
                                        </div>

                                        <h3 className="text-base font-black text-slate-950 mb-3 line-clamp-1">
                                            {car.name}
                                        </h3>

                                        {/* Key Specs */}
                                        <div className="grid grid-cols-3 gap-1.5 py-2.5 border-y border-slate-100 mb-4 text-[11px] font-semibold text-slate-600 text-center bg-slate-50/80 rounded-xl">
                                            <div className="flex flex-col items-center gap-0.5">
                                                <Settings className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-0.5 border-x border-slate-200">
                                                {car.fuel === 'Electric' ? (
                                                    <Zap className="w-3.5 h-3.5 text-emerald-500" />
                                                ) : (
                                                    <Fuel className="w-3.5 h-3.5 text-slate-400" />
                                                )}
                                                <span>{car.fuel}</span>
                                            </div>
                                            <div className="flex flex-col items-center gap-0.5">
                                                <Users className="w-3.5 h-3.5 text-slate-400" />
                                                <span>{car.seats}</span>
                                            </div>
                                        </div>

                                        {/* Pricing & Booking CTA */}
                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div>
                                                <span className="text-lg font-black text-slate-950 block leading-none">
                                                    {formatPrice(car.priceValue)}
                                                </span>
                                                <span className="text-[10px] text-slate-500 font-bold uppercase mt-1 block">
                                                    {t[lang].perDay}
                                                </span>
                                            </div>
                                            <Link
                                                href="/checkout"
                                                className="bg-slate-950 hover:bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                                            >
                                                <span>{t[lang].bookNow}</span>
                                                <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* View All Fleet Link */}
                        <div className="text-center mt-12">
                            <Link
                                href="/fleet"
                                className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-sm text-sm"
                            >
                                <span>View All Available Vehicles ({fleetData.length}+ Verified)</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* BESPOKE MOBILITY SOLUTIONS (REPLACING OLD TACKY "SERVICES" HEADER) */}
                <section id="solutions" className="relative py-24 px-4 bg-slate-950 text-white overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-15"
                        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=80')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 z-0"></div>

                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-extrabold uppercase tracking-widest mb-4">
                                <Briefcase className="w-3.5 h-3.5" />
                                <span>Global Executive Standards</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                                {t[lang].solutionsHeading}
                            </h2>
                            <p className="text-slate-400 text-base leading-relaxed">
                                {t[lang].solutionsSubheading}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                { icon: <Car className="w-6 h-6" />, title: t[lang].sol1Title, desc: t[lang].sol1Desc },
                                { icon: <Users className="w-6 h-6" />, title: t[lang].sol2Title, desc: t[lang].sol2Desc },
                                { icon: <Compass className="w-6 h-6" />, title: t[lang].sol3Title, desc: t[lang].sol3Desc },
                                { icon: <Building2 className="w-6 h-6" />, title: t[lang].sol4Title, desc: t[lang].sol4Desc },
                                { icon: <Plane className="w-6 h-6" />, title: t[lang].sol5Title, desc: t[lang].sol5Desc },
                                { icon: <HeartHandshake className="w-6 h-6" />, title: t[lang].sol6Title, desc: t[lang].sol6Desc }
                            ].map((solution, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 hover:border-red-500/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                                >
                                    <div className="bg-white/5 group-hover:bg-red-600 text-red-400 group-hover:text-white p-3.5 rounded-2xl w-fit mb-6 transition-colors border border-white/10">
                                        {solution.icon}
                                    </div>
                                    <h3 className="text-lg font-black text-white mb-3 tracking-tight">
                                        {solution.title}
                                    </h3>
                                    <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
                                        {solution.desc}
                                    </p>
                                    <Link
                                        href="/fleet"
                                        className="text-red-400 group-hover:text-red-300 font-bold text-xs flex items-center gap-1.5 transition-all mt-auto"
                                    >
                                        <span>{t[lang].learnMore}</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FRICTIONLESS GLOBAL RESERVATION & ESCROW (REPLACING TACKY "PROCESS" HEADER) */}
                <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-extrabold uppercase tracking-widest mb-4">
                                <BadgePercent className="w-3.5 h-3.5 text-red-500" />
                                <span>50/50 Escrow Model</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                                {t[lang].experienceHeading}
                            </h2>
                            <p className="text-slate-400 text-base leading-relaxed">
                                {t[lang].experienceSubheading}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                            {[
                                { step: '01', icon: <Car className="w-6 h-6" />, title: t[lang].step1Title, desc: t[lang].step1Desc },
                                { step: '02', icon: <CreditCard className="w-6 h-6" />, title: t[lang].step2Title, desc: t[lang].step2Desc },
                                { step: '03', icon: <KeyRound className="w-6 h-6" />, title: t[lang].step3Title, desc: t[lang].step3Desc }
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-950/70 backdrop-blur-md p-8 rounded-3xl border border-white/10 hover:border-red-500/40 transition-all flex flex-col relative"
                                >
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="bg-red-600/10 text-red-500 p-3.5 rounded-2xl border border-red-500/20">
                                            {item.icon}
                                        </div>
                                        <span className="text-4xl font-black text-slate-800 select-none">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-black text-white mb-2.5">{item.title}</h3>
                                    <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About & Trust Metrics Section */}
                <section id="about" className="py-24 px-4 bg-white border-t border-slate-100">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-red-600 rounded-3xl translate-x-3 translate-y-3 opacity-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80"
                                alt="International Fleet in Dar es Salaam"
                                className="relative z-10 rounded-3xl shadow-2xl object-cover h-[480px] w-full"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <span className="text-red-600 text-xs font-extrabold uppercase tracking-widest bg-red-50 px-3.5 py-1.5 rounded-full inline-block mb-4">
                                {t[lang].navAbout}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-950 mb-5 leading-tight">
                                {t[lang].aboutHeading}
                            </h2>
                            <h3 className="text-base font-bold text-slate-700 mb-6 border-l-4 border-red-600 pl-4">
                                {t[lang].aboutSubheading}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {t[lang].aboutText1}
                            </p>
                            <p className="text-slate-600 text-sm leading-relaxed mb-8">
                                {t[lang].aboutText2}
                            </p>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-slate-950 mb-1">50/50</div>
                                    <div className="text-[10px] font-extrabold text-red-600 uppercase">Escrow Secure</div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-slate-950 mb-1">100+</div>
                                    <div className="text-[10px] font-extrabold text-red-600 uppercase">Verified Fleets</div>
                                </div>
                                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                                    <div className="text-3xl font-black text-slate-950 mb-1">3</div>
                                    <div className="text-[10px] font-extrabold text-red-600 uppercase">Airports Served</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* International Call to Action */}
                <section className="py-20 px-4 bg-slate-50">
                    <div className="max-w-7xl mx-auto bg-slate-950 rounded-[2.5rem] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10"></div>
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <span className="text-red-400 text-xs font-bold uppercase tracking-widest bg-red-500/15 border border-red-500/20 px-4 py-1.5 rounded-full inline-block mb-6">
                                Direct Booking & Host Onboarding
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">{t[lang].ctaHeading}</h2>
                            <p className="text-slate-300 text-base mb-10 font-normal leading-relaxed">{t[lang].ctaDesc}</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/fleet"
                                    className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg text-sm"
                                >
                                    <span>{t[lang].ctaBtn}</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/register?role=vendor"
                                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-xl transition-all text-sm"
                                >
                                    <Building2 className="w-4 h-4 text-red-400" />
                                    <span>{t[lang].ctaPartnerBtn}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>

            {/* International Footer */}
            <footer id="contact" className="bg-slate-950 text-slate-400 pt-20 pb-8 px-4 border-t border-slate-900">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    <div className="lg:pr-6">
                        <Link href="/" className="flex items-center gap-2 mb-6 group w-fit">
                            <div className="bg-red-600 text-white p-2 rounded-xl font-black text-xl tracking-wider">
                                BT
                            </div>
                            <div>
                                <span className="text-xl font-extrabold tracking-tight text-white">B-TECH</span>
                                <span className="text-[10px] block text-red-500 font-bold uppercase tracking-widest">
                                    Global Car Rental
                                </span>
                            </div>
                        </Link>
                        <p className="text-xs leading-relaxed mb-6">
                            {t[lang].footerDesc}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                            <ShieldCheck className="w-4 h-4" />
                            <span>ISO-Compliant & Verified Hosts</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-xs">{t[lang].quickLinks}</h4>
                        <ul className="space-y-3 text-xs">
                            <li><Link href="/" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> {t[lang].navHome}</Link></li>
                            <li><Link href="/fleet" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> {t[lang].navFleet}</Link></li>
                            <li><Link href="#solutions" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> {t[lang].navSolutions}</Link></li>
                            <li><Link href="/login" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> Traveler Login</Link></li>
                            <li><Link href="/register?role=vendor" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> Fleet Host Onboarding</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-xs">{t[lang].legal}</h4>
                        <ul className="space-y-3 text-xs">
                            <li><Link href="/terms" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> {t[lang].terms}</Link></li>
                            <li><Link href="/privacy" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> {t[lang].privacy}</Link></li>
                            <li><Link href="/terms" className="hover:text-red-400 transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-slate-600" /> {t[lang].escrowGuarantee}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-extrabold mb-5 uppercase tracking-wider text-xs">{t[lang].navContact}</h4>
                        <ul className="space-y-3.5 text-xs">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <span>Dar es Salaam • Zanzibar • Arusha</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <span>+255 700 000 000 / +255 754 000 000</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                                <span>concierge@btechcarrental.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px]">
                    <p>{t[lang].copyright}</p>
                    <div className="flex gap-6 text-slate-500">
                        <span className="hover:text-white cursor-pointer transition-colors font-medium">LinkedIn</span>
                        <span className="hover:text-white cursor-pointer transition-colors font-medium">Instagram</span>
                        <span className="hover:text-white cursor-pointer transition-colors font-medium">X (Twitter)</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}