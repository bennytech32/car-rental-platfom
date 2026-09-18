'use client';

import React, { useState, useEffect, useRef } from 'react';
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
    ChevronLeft,
    Building2,
    Zap,
    BadgePercent,
    User,
    Eye,
    Sun,
    Moon,
    ChevronDown,
    ChevronUp,
    HelpCircle
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useTheme } from '@/context/ThemeContext';

export default function CustomerLandingPage() {
    const router = useRouter();
    const { currency, setCurrency, formatPrice } = useCurrency();
    const { theme, toggleTheme } = useTheme();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [lang, setLang] = useState<'en' | 'sw'>('en');
    const [activeHeroSlide, setActiveHeroSlide] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState('All');

    // State kwa zile sifa 3 (Click to expand)
    const [activeFeature, setActiveFeature] = useState<number | null>(null);
    // State kwa ajili ya FAQ accordion
    const [activeFaq, setActiveFaq] = useState<number | null>(0);

    // HII NDIO STATE MPYA KWA AJILI YA POP-UP MODAL YAKO
    const [selectedCarForModal, setSelectedCarForModal] = useState<any | null>(null);

    // Refs kwa ajili ya kuslide containers
    const fleetScrollRef = useRef<HTMLDivElement>(null);
    const specialHireScrollRef = useRef<HTMLDivElement>(null);

    const [searchData, setSearchData] = useState({
        location: '',
        carType: '',
        pickupDate: '',
        returnDate: ''
    });

    const scrollContainer = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
        if (ref.current) {
            const scrollAmount = direction === 'left' ? -350 : 350;
            ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Wedding & Sendoff',
            titleSw: 'Harusi na Sendoff',
            descEn: 'Make your special day perfect with our luxury cars for weddings and sendoff events.',
            descSw: 'Fanya siku yako iwe maalum kwa kutumia magari yetu ya kifahari kwa harusi na sendoff.'
        },
        {
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Airport Transfer',
            titleSw: 'Usafiri wa Uwanja wa Ndege',
            descEn: 'Reliable and on-time pickup and drop-off at the airport for a stress-free journey.',
            descSw: 'Usafiri wa uhakika na kwa wakati kufika au kutoka uwanja wa ndege bila stress.'
        },
        {
            image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Corporate Chauffeur & Self Drive',
            titleSw: 'Usafiri wa Makampuni na Kujiendesha',
            descEn: 'Professional drivers for business meetings, or drive yourself in our premium cars.',
            descSw: 'Madereva wa kitaalamu kwa mikutano ya kibiashara, au jiendeshe mwenyewe kwenye magari yetu.'
        },
        {
            image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Family Trip Chauffeur & Self Drive',
            titleSw: 'Usafiri wa Familia na Kujiendesha',
            descEn: 'Spacious and safe vehicles for your family vacations, with or without a driver.',
            descSw: 'Magari makubwa na salama kwa safari za familia yako, ukiwa na dereva au kujiendesha.'
        },
        {
            image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Photoshoot & Video Shoot',
            titleSw: 'Upigaji Picha na Video',
            descEn: 'Rent stylish and unique cars to make your music videos and photoshoots stand out.',
            descSw: 'Kodi magari ya kisasa na ya kipekee ili kunogesha video zako za muziki na picha.'
        },
        {
            image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Special Appearance',
            titleSw: 'Matukio Maalum (Special Appearance)',
            descEn: 'Arrive in style at VIP events, red carpets, and special parties.',
            descSw: 'Fika kwa hadhi ya juu kwenye matukio ya VIP, red carpet, na sherehe maalum.'
        },
        {
            image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Safaris & Tour Drive',
            titleSw: 'Safari za Mbugani na Utalii',
            descEn: 'Strong 4x4 vehicles ready for wildlife safaris and national park tours.',
            descSw: 'Magari imara ya 4x4 yaliyo tayari kwa safari za mbuga za wanyama na utalii.'
        },
        {
            image: 'https://images.unsplash.com/photo-1464036387756-3240212e3f5d?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Upcountry Trips',
            titleSw: 'Safari za Mikoani',
            descEn: 'Comfortable and well-maintained cars for long-distance travel across regions.',
            descSw: 'Magari imara na yenye faraja kwa ajili ya safari ndefu za kwenda mikoani.'
        },
        {
            image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80',
            titleEn: 'Other Custom Services',
            titleSw: 'Huduma Nyinginezo',
            descEn: 'We offer flexible car rental solutions for any other transport needs you may have.',
            descSw: 'Tunatoa huduma zinazobadilika kulingana na mahitaji yako mengine yoyote ya usafiri.'
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const fleetData = [
        {
            id: 1, name: "Toyota Land Cruiser V8", category: "SUV / 4x4", vendor: "Coastal Luxury Fleet", priceValue: 350000,
            image: "https://images.unsplash.com/photo-1594657155685-d4e51f893d5f?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Diesel", seats: "7 Seats", trips: "140+ trips", rating: 4.9
        },
        {
            id: 2, name: "Toyota RAV4 New Model", category: "SUV / 4x4", vendor: "ZanWave Motors", priceValue: 180000,
            image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Petrol", seats: "5 Seats", trips: "98 trips", rating: 4.8
        },
        {
            id: 3, name: "Toyota IST (Urban Economy)", category: "Economy", vendor: "Dar Express Cars", priceValue: 75000,
            image: "https://images.unsplash.com/photo-1550355191-aa06cb11e81c?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Petrol", seats: "5 Seats", trips: "215 trips", rating: 4.7
        },
        {
            id: 4, name: "Mercedes-Benz C-Class", category: "Luxury", vendor: "VIP Executive Ride", priceValue: 450000,
            image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Petrol", seats: "5 Seats", trips: "82 trips", rating: 5.0
        },
        {
            id: 5, name: "Range Rover Sport HSE", category: "Luxury", vendor: "Apex Luxury Rentals", priceValue: 520000,
            image: "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Petrol", seats: "5 Seats", trips: "45 trips", rating: 5.0
        },
        {
            id: 6, name: "Toyota Land Cruiser Prado TX", category: "SUV / 4x4", vendor: "Serengeti Safari Roamers", priceValue: 280000,
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Diesel", seats: "7 Seats", trips: "112 trips", rating: 4.9
        },
        {
            id: 7, name: "Toyota Alphard VIP Lounge", category: "Luxury", vendor: "Royal Concierge Fleet", priceValue: 300000,
            image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Petrol", seats: "7 Seats", trips: "76 trips", rating: 4.9
        },
        {
            id: 8, name: "Hyundai Ioniq 5 EV", category: "Electric", vendor: "GreenDrive East Africa", priceValue: 220000,
            image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Electric", seats: "5 Seats", trips: "34 trips", rating: 4.8
        }
    ];

    const specialHireData = [
        {
            id: 101, name: "Toyota Coaster 30-Seater", category: "Mini-Bus", vendor: "B-Tech Transit", priceValue: 450000,
            image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80",
            transmission: "Manual", fuel: "Diesel", seats: "30 Seats", trips: "84 trips", rating: 4.8
        },
        {
            id: 102, name: "Scania Marcopolo Coach", category: "Luxury Bus", vendor: "Tanzania Safari Lines", priceValue: 1200000,
            image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?auto=format&fit=crop&w=800&q=80",
            transmission: "Automatic", fuel: "Diesel", seats: "50 Seats", trips: "42 trips", rating: 4.9
        },
        {
            id: 103, name: "Mitsubishi Rosa 28-Seater", category: "Mini-Bus", vendor: "Safiri Salama Fleet", priceValue: 400000,
            image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
            transmission: "Manual", fuel: "Diesel", seats: "28 Seats", trips: "65 trips", rating: 4.7
        },
        {
            id: 104, name: "Toyota Hiace Commuter", category: "Van", vendor: "City Shuttles", priceValue: 200000,
            image: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?auto=format&fit=crop&w=800&q=80",
            transmission: "Manual", fuel: "Diesel", seats: "15 Seats", trips: "210 trips", rating: 4.6
        }
    ];

    const faqItems = [
        {
            qEn: "How does the Escrow payment protection work?",
            aEn: "Your 50% deposit is held securely by our escrow banking partner. The funds are only released to the vehicle host after you have physically inspected the car and digitally confirmed the handover. If there is a dispute or the vehicle doesn't match the description, you are fully refunded.",
            qSw: "Ulinzi wa malipo kupitia Escrow unafanyaje kazi?",
            aSw: "Malipo yako ya awali (50%) yanahifadhiwa salama kwenye benki yetu ya escrow. Fedha hizi humfikia mmiliki wa gari tu baada ya wewe kukagua gari na kuthibitisha kwenye mfumo umelipata. Kama gari lina shida au sivyo ulivyokodi, unarejeshewa fedha zako zote."
        },
        {
            qEn: "Are the rental cars fully insured?",
            aEn: "Yes, every vehicle listed on B-Tech Global Car Rental comes with comprehensive commercial insurance. This covers major damages, theft, and third-party liabilities, giving you total peace of mind during your journey.",
            qSw: "Je, magari ya kukodi yana bima kamili?",
            aSw: "Ndiyo, kila gari lililopo kwenye mtandao wetu lina bima kamili (Comprehensive Insurance) ya kibiashara. Hii inashughulikia ajali, wizi, na madhara kwa mtu wa tatu, kukupa amani muda wote wa safari yako."
        },
        {
            qEn: "What happens if the car breaks down during my trip?",
            aEn: "We offer 24/7 roadside assistance. In the rare event of a mechanical failure, we will dispatch a mechanic or provide a replacement vehicle of the same or higher class at no extra cost to you.",
            qSw: "Nini kinatokea gari likiharibika nikiwa safarini?",
            aSw: "Tunatoa msaada wa dharura masaa 24. Endapo gari litapata hitilafu ya kiufundi, tutatuma fundi au kukuletea gari jingine mbadala la hadhi sawa au zaidi bila gharama zozote za ziada."
        },
        {
            qEn: "Do you offer airport handover for international arrivals?",
            aEn: "Absolutely. We provide a premium fast-track airport concierge. Your host will be waiting for you at the terminal with a name sign, ready to hand over the keys as soon as you land at JNIA, JRO, or ZNZ.",
            qSw: "Mnatoa huduma ya kukabidhi gari uwanja wa ndege kwa wageni?",
            aSw: "Hakika. Tunatoa huduma maalum ya uwanja wa ndege. Mmiliki wa gari atakusubiri nje na bango lenye jina lako, tayari kukukabidhi funguo punde tu unapotua JNIA, JRO, au ZNZ."
        }
    ];

    const filteredCars = fleetData.filter(car => {
        if (selectedCategory === 'All') return true;
        return car.category.toLowerCase().includes(selectedCategory.toLowerCase());
    });

    const t = {
        en: {
            navHome: "Home", navFleet: "Fleet Catalog", navSolutions: "Mobility Solutions", navAbout: "About B-Tech", navContact: "Contact",
            myTrips: "My Trips", authBtn: "Sign In", hostCta: "Become a Host", badge: "International Multi-Vendor Mobility", globalSearch: "Search vehicles or locations...",
            findCarTitle: "Reserve Your Vehicle", pickupLocation: "Pick-up Location", carTypeLabel: "Vehicle Class", pickupDateLabel: "Pick-up Date",
            returnDateLabel: "Return Date", searchBtn: "Search Fleet", selectLocation: "-- Select Location --", selectCarType: "-- Select Class --",
            locDar: "Dar es Salaam", locZanzibar: "Zanzibar", locArusha: "Arusha", locMwanza: "Mwanza", locMbeya: "Mbeya",
            catAll: "All Vehicle Categories", catSuv: "SUV & 4x4 Safari Expeditions", catSedan: "Executive & Diplomatic Sedans",
            catEconomy: "Urban Compact / Economy", catEv: "Clean Electric Vehicles (EVs)",
            feature1Title: "Vetted Fleet Hosts", feature1Desc: "Every vehicle is verified with rigorous mechanical and interior standards from certified commercial fleet hosts.",
            feature2Title: "Secure Escrow Payment", feature2Desc: "Lock your booking with a 50% deposit held securely in escrow. Pay the remaining balance upon successful vehicle handoff.",
            feature3Title: "Global Airport Concierge", feature3Desc: "Seamless handoff at JNIA (Dar), Kilimanjaro (JRO), and Zanzibar (ZNZ) with international driver permit assistance.",
            aboutHeading: "About B-Tech Global Car Rental", aboutSubheading: "Connecting international travelers with certified local fleet hosts across Tanzania.",
            aboutText1: "With premier operational hubs across major cities, B-Tech delivers unmatched mobility. Whether you are arriving for business summits, Serengeti expeditions, or private VIP travel, our multi-vendor platform ensures inspected quality and transparent pricing.",
            aboutText2: "Our escrow protection model guarantees mutual trust: your deposit is held securely until you receive and verify your vehicle. Experience the freedom of the road with certified hosts and 24/7 bilingual support.",
            solutionsHeading: "Enterprise & Bespoke Mobility Solutions", solutionsSubheading: "Engineered for international travelers, corporate executives, and safari expeditions across East Africa.",
            learnMore: "Reserve Solution", sol1Title: "Autonomous Self-Drive", sol1Desc: "Complete privacy and independence. Transparent multi-currency pricing, unlimited mileage tiers, and 24/7 roadside backup.",
            sol2Title: "Executive Chauffeur Protocol", sol2Desc: "Discreet, bilingual professional drivers trained in diplomatic security, airport fast-track, and punctuality.",
            sol3Title: "Cross-Country & Safari 4x4", sol3Desc: "Custom-fitted 4WD cruisers built with high-clearance suspension, winches, and dual fuel tanks for national parks.",
            sol4Title: "Corporate & NGO Fleet Outsource", sol4Desc: "Scalable monthly contracts with dedicated fleet managers, maintenance coverage, and replacement vehicle guarantees.",
            sol5Title: "Direct Airport Fast-Track", sol5Desc: "Step off your flight and straight into your air-conditioned vehicle with our tarmac and terminal concierge service.",
            sol6Title: "VIP Diplomatic & Events", sol6Desc: "Immaculate premium motorcades for state delegations, international summits, and high-profile celebrations.",
            fleetHeading: "Our Trusted Fleet Showcase", fleetSubheading: "Curated vehicles listed directly by verified fleet hosts. Inspected, insured, and ready for deployment.",
            specialHireHeading: "Special Hire & Group Transit", specialHireSubheading: "Coasters, luxury coaches, and vans ready for corporate retreats, tourism groups, and mass transit.",
            faqHeading: "Frequently Asked Questions", faqSubheading: "Everything you need to know about our service, payments, and guarantees.",
            bookNow: "Book Vehicle", vendorBy: "Verified Host:", perDay: "/day",
            experienceHeading: "Seamless Global Reservation", experienceSubheading: "A transparent, enterprise-grade journey designed for global convenience and total peace of mind.",
            step1Title: "1. Select & Tailor Vehicle", step1Desc: "Browse verified fleets by category, host rating, and equipment. Choose airport delivery or hotel drop-off.",
            step2Title: "2. Secure Your Deposit", step2Desc: "Confirm your dates with protected multi-currency escrow payment (Visa, Mastercard, M-Pesa, Apple Pay). No hidden surprises.",
            step3Title: "3. Direct Contactless Handover", step3Desc: "Meet your host representative at your chosen terminal or residence. Inspect, sign off digitally, and drive.",
            ctaHeading: "Elevate your journey across Tanzania.", ctaDesc: "Join thousands of international travelers and multinational organizations who trust B-Tech for reliable mobility.",
            ctaBtn: "Explore Entire Fleet", ctaPartnerBtn: "List Your Fleet as a Host", footerDesc: "International multi-vendor car rental network providing secure escrow bookings across Dar es Salaam, Zanzibar, and East Africa.",
            quickLinks: "Platform Links", legal: "Trust & Compliance", terms: "Terms of Service", privacy: "Privacy Policy",
            escrowGuarantee: "Escrow Payment Terms", copyright: "© 2026 B-Tech Car Rental International. All rights reserved.",
            modalClose: "Close", modalContinue: "Continue to Booking" // NIMEONGEZA HAPA
        },
        sw: {
            navHome: "Nyumbani", navFleet: "Magari Yote", navSolutions: "Suluhisho za Usafiri", navAbout: "Kuhusu Sisi", navContact: "Mawasiliano",
            myTrips: "Safari Zangu", authBtn: "Ingia", hostCta: "Kuwa Mmiliki", badge: "Mfumo wa Kimataifa wa Wamiliki wa Magari", globalSearch: "Tafuta magari au maeneo...",
            findCarTitle: "Weka Nafasi ya Gari Lako", pickupLocation: "Eneo la Kuchukulia Gari", carTypeLabel: "Aina ya Gari", pickupDateLabel: "Tarehe ya Kuanza Safari",
            returnDateLabel: "Tarehe ya Kurudisha", searchBtn: "Tafuta Magari", selectLocation: "-- Chagua Eneo --", selectCarType: "-- Chagua Aina --",
            locDar: "Dar es Salaam", locZanzibar: "Zanzibar", locArusha: "Arusha", locMwanza: "Mwanza", locMbeya: "Mbeya",
            catAll: "Makatagori Yote ya Magari", catSuv: "SUV na Magari Magumu ya 4x4", catSedan: "Magari ya Kifahari na Kidiplomasia",
            catEconomy: "Magari Madogo ya Mjini", catEv: "Magari ya Kisasa ya Umeme (EVs)",
            feature1Title: "Wamiliki Waliothibitishwa", feature1Desc: "Kila gari linakaguliwa kwa viwango vikali vya ufundi na usalama kutoka kwa wamiliki wa kitaalamu.",
            feature2Title: "Malipo Salama ya Escrow", feature2Desc: "Lipa asilimia 50% tu kuthibitisha nafasi yako kwenye akaunti salama ya Escrow. Lipa iliyobaki ukikabidhiwa gari.",
            feature3Title: "Huduma Viwanja vya Ndege", feature3Desc: "Kukabidhiwa gari uwanja wa ndege (JNIA, JRO, ZNZ) kwa wageni wa kimataifa na wenye leseni za nje.",
            aboutHeading: "Kuhusu B-Tech Global Car Rental", aboutSubheading: "Kuunganisha wasafiri wa kimataifa na wamiliki wa magari walioidhinishwa Tanzania kote.",
            aboutText1: "Tukiwa na vituo vikuu katika majiji makubwa, B-Tech inatoa usafiri wa viwango vya kimataifa. Iwe unasafiri kwa ajili ya mikutano ya kibiashara, safari za Serengeti au ziara za kikazi, mtandao wetu wa wamiliki unakuhakikishia magari salama na bei za wazi.",
            aboutText2: "Mfumo wetu wa kipekee wa malipo ya Escrow unaleta ulinzi kamili: fedha zako zinashikiliwa salama hadi ukabidhiwe gari na kuridhika. Safiri kwa amani ukiwa na msaada wa masaa 24/7.",
            solutionsHeading: "Suluhisho la Usafiri wa Kiwango cha Kimataifa", solutionsSubheading: "Imeundwa mahususi kwa wageni wa kimataifa, makampuni makubwa, na safari za mbugani kote nchini.",
            learnMore: "Weka Oda ya Huduma", sol1Title: "Kujiendeshea (Self-Drive)", sol1Desc: "Uhuru na usiri kamili. Bei za wazi kwa TZS au USD, bima kamili na msaada wa dharura barabarani masaa 24.",
            sol2Title: "Huduma ya Dereva wa Hadhi", sol2Desc: "Madereva wataalamu wanaojua lugha za kigeni, waliofunzwa usalama wa kidiplomasia na utunzaji wa wakati.",
            sol3Title: "Magari ya Safari na Mbugani 4x4", sol3Desc: "Magari maalum ya 4x4 yenye mifumo imara kwa safari za mbuga za Serengeti, Ngorongoro na miradi ya mikoani.",
            sol4Title: "Kukodisha kwa Makampuni", sol4Desc: "Mikataba ya kudumu ya kila mwezi ikiwa na bima, matengenezo, na gari mbadala papo hapo likiharibika.",
            sol5Title: "Uwanja wa Ndege Moja kwa Moja", sol5Desc: "Toka ndani ya ndege na uingie moja kwa moja kwenye gari lako safi bila kusubiri wala usumbufu wowote.",
            sol6Title: "Misafara na Matukio ya VIP", sol6Desc: "Magari ya hadhi ya juu kwa ajili ya mikutano mikubwa ya kiserikali, wageni mashuhuri, na sherehe za kifahari.",
            fleetHeading: "Magari Yetu Yaliyothibitishwa", fleetSubheading: "Orodha ya magari bora kutoka kwa wamiliki waliosajiliwa. Yako safi, yamekaguliwa, na yako tayari kwa safari.",
            specialHireHeading: "Special Hire (Coaster & Mabasi)", specialHireSubheading: "Mabasi makubwa, Coaster, na Hiace kwa ajili ya misafara ya makampuni, watalii, na makundi makubwa.",
            faqHeading: "Maswali Yanayoulizwa Mara kwa Mara", faqSubheading: "Pata majibu ya maswali muhimu kuhusu huduma zetu, malipo na usalama wako.",
            bookNow: "Kodi Gari Hili", vendorBy: "Mmiliki:", perDay: "/siku",
            experienceHeading: "Uhifadhi Rahisi na Malipo Salama", experienceSubheading: "Mfumo wa kisasa wa uwazi uliojengwa kwa ajili ya kuaminiana na safari bila hofu yoyote.",
            step1Title: "1. Chagua na Urekebishe Gari", step1Desc: "Chunguza magari kulingana na kundi, sifa za mmiliki, na mahitaji yako. Chagua kufikishiwa uwanja wa ndege au hotelini.",
            step2Title: "2. Weka Amana Yako Escrow", step2Desc: "Thibitisha safari yako kwa malipo salama ya kadi au mtandao wa simu. Hakuna gharama zilizofichwa.",
            step3Title: "3. Kabidhiwa Gari Bila Usumbufu", step3Desc: "Kutana na mwakilishi wa gari sehemu uliyochagua. Kagua gari, thibitisha kidijitali, na anza safari yako.",
            ctaHeading: "Boresha safari yako leo ndani ya Tanzania.", ctaDesc: "Ungana na maelfu ya wasafiri wa kimataifa na mashirika makubwa yanayoamini B-Tech kwa usafiri wa uhakika.",
            ctaBtn: "Tazama Orodha Kamili", ctaPartnerBtn: "Jisajili Kama Mmiliki", footerDesc: "Mtandao wa kimataifa wa kukodisha magari unaounganisha wasafiri na wamiliki wa magari kwa malipo salama nchini Tanzania.",
            quickLinks: "Viungo Muhimu", legal: "Kisheria na Usalama", terms: "Vigezo na Masharti", privacy: "Sera ya Faragha",
            escrowGuarantee: "Masharti ya Malipo ya Escrow", copyright: "© 2026 B-Tech Car Rental International. Haki zote zimehifadhiwa.",
            modalClose: "Funga", modalContinue: "Endelea na Gari Hili" // NIMEONGEZA HAPA
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/fleet?location=${encodeURIComponent(searchData.location)}&type=${encodeURIComponent(searchData.carType)}`);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 font-sans selection:bg-red-600 selection:text-white transition-colors duration-300">

            <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 py-3">
                    <div className="flex justify-between items-center gap-4">
                        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
                            <div className="bg-red-600 text-white p-2 rounded-xl font-black text-xl tracking-wider transition-transform duration-300 group-hover:-rotate-2 shadow-sm">
                                BT
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">B-TECH</span>
                                <span className="text-[10px] block text-red-600 font-extrabold uppercase tracking-widest">
                                    Global Car Rental
                                </span>
                            </div>
                        </Link>

                        <div className="hidden md:flex flex-1 max-w-lg mx-4">
                            <div className="relative w-full">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder={t[lang].globalSearch}
                                    className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                            <div className="hidden lg:flex items-center gap-1.5 border-r border-slate-200 dark:border-slate-700 pr-4">
                                <button
                                    onClick={toggleTheme}
                                    className="text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                </button>
                                <button
                                    onClick={() => setCurrency(currency === 'TZS' ? 'USD' : 'TZS')}
                                    className="text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    {currency}
                                </button>
                                <button
                                    onClick={() => setLang(lang === 'en' ? 'sw' : 'en')}
                                    className="text-[11px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-1"
                                >
                                    <Globe className="w-3.5 h-3.5" />
                                    <span>{lang.toUpperCase()}</span>
                                </button>
                            </div>

                            <Link
                                href="/register?role=vendor"
                                className="hidden lg:flex items-center gap-1 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            >
                                <Building2 className="w-4 h-4" />
                                <span>{t[lang].hostCta}</span>
                            </Link>

                            <Link
                                href="/login"
                                className="p-2 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 dark:hover:text-red-400 rounded-full transition-colors flex items-center justify-center"
                            >
                                <User className="w-6 h-6" />
                            </Link>

                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
                            >
                                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    <div className="md:hidden mt-3 w-full">
                        <div className="relative w-full">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                                type="text"
                                placeholder={t[lang].globalSearch}
                                className="w-full bg-slate-100/80 dark:bg-slate-800/80 border border-transparent rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {mobileMenuOpen && (
                    <div className="lg:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-5 py-4 space-y-4 font-semibold text-sm shadow-xl">
                        <div className="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <button onClick={toggleTheme} className="flex-1 bg-slate-100 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold text-center flex items-center justify-center gap-1.5">
                                {theme === 'dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </button>
                            <button onClick={() => setCurrency(currency === 'TZS' ? 'USD' : 'TZS')} className="flex-1 bg-slate-100 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold text-center">
                                {currency}
                            </button>
                            <button onClick={() => setLang(lang === 'en' ? 'sw' : 'en')} className="flex-1 bg-slate-100 dark:bg-slate-800 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                                <Globe className="w-3.5 h-3.5" /> {lang.toUpperCase()}
                            </button>
                        </div>

                        <Link href="/" className="block text-red-600 py-1">{t[lang].navHome}</Link>
                        <Link href="/fleet" className="block text-slate-700 dark:text-slate-300 py-1">{t[lang].navFleet}</Link>
                        <Link href="#solutions" className="block text-slate-700 dark:text-slate-300 py-1">{t[lang].navSolutions}</Link>
                        <Link href="#about" className="block text-slate-700 dark:text-slate-300 py-1">{t[lang].navAbout}</Link>
                        <Link href="/register?role=vendor" className="block text-red-600 py-1">{t[lang].hostCta}</Link>
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                            <Link href="/login" className="w-1/2 text-center bg-slate-950 dark:bg-white text-white dark:text-slate-950 py-2.5 rounded-xl font-bold text-xs">
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
                {/* HERO SECTION INAYO FUNIKA MPAKA FEATURES (SIFA 3) */}
                <section className="relative bg-slate-950 text-white pb-16 lg:pb-24 overflow-hidden">
                    {/* Background Images */}
                    {heroSlides.map((slide, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeHeroSlide ? 'opacity-70' : 'opacity-0 pointer-events-none'}`}
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
                                style={{ backgroundImage: `url('${slide.image}')` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950"></div>
                        </div>
                    ))}

                    <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 lg:pt-36">

                        {/* 1. Hero Text */}
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-red-300 text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                <span>{t[lang].badge}</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 max-w-5xl mx-auto leading-tight drop-shadow-2xl text-white">
                                {lang === 'en' ? heroSlides[activeHeroSlide].titleEn : heroSlides[activeHeroSlide].titleSw}
                            </h1>
                            <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto font-medium drop-shadow-md leading-relaxed">
                                {lang === 'en' ? heroSlides[activeHeroSlide].descEn : heroSlides[activeHeroSlide].descSw}
                            </p>

                            <div className="flex justify-center gap-2 mt-8">
                                {heroSlides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveHeroSlide(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeHeroSlide ? 'w-8 bg-red-600' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                                        aria-label={`Slide ${idx + 1}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* 2. Search / Reservation Box */}
                        <div className="bg-white/10 dark:bg-slate-900/40 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-5 md:p-8 mb-8">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                                <span className="text-xs font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
                                    <Plane className="w-4 h-4 text-red-500" />
                                    <span>{t[lang].findCarTitle}</span>
                                </span>
                            </div>

                            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div className="border border-white/20 rounded-2xl p-3 bg-white/5 hover:bg-white/10 transition-colors">
                                    <label className="block text-[10px] font-black uppercase text-slate-300 mb-1">{t[lang].pickupLocation}</label>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-red-400 shrink-0" />
                                        <select
                                            value={searchData.location}
                                            onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                                            className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                                            required
                                        >
                                            <option value="" disabled>{t[lang].selectLocation}</option>
                                            <option value="Dar es Salaam">{t[lang].locDar}</option>
                                            <option value="Zanzibar">{t[lang].locZanzibar}</option>
                                            <option value="Arusha">{t[lang].locArusha}</option>
                                            <option value="Mwanza">{t[lang].locMwanza}</option>
                                            <option value="Mbeya">{t[lang].locMbeya}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="border border-white/20 rounded-2xl p-3 bg-white/5 hover:bg-white/10 transition-colors">
                                    <label className="block text-[10px] font-black uppercase text-slate-300 mb-1">{t[lang].carTypeLabel}</label>
                                    <div className="flex items-center gap-2">
                                        <Car className="w-4 h-4 text-red-400 shrink-0" />
                                        <select
                                            value={searchData.carType}
                                            onChange={(e) => setSearchData({ ...searchData, carType: e.target.value })}
                                            className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer [&>option]:bg-slate-900 [&>option]:text-white"
                                            required
                                        >
                                            <option value="" disabled>{t[lang].selectCarType}</option>
                                            <option value="All Categories">{t[lang].catAll}</option>
                                            <option value="SUV / Land Cruiser">{t[lang].catSuv}</option>
                                            <option value="Sedan / Saloon">{t[lang].catSedan}</option>
                                            <option value="Economy (IST, Raum)">{t[lang].catEconomy}</option>
                                            <option value="Electric Vehicles (EVs)">{t[lang].catEv}</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="border border-white/20 rounded-2xl p-3 bg-white/5 hover:bg-white/10 transition-colors">
                                    <label className="block text-[10px] font-black uppercase text-slate-300 mb-1">{t[lang].pickupDateLabel}</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-red-400 shrink-0" />
                                        <input
                                            type="date"
                                            value={searchData.pickupDate}
                                            onChange={(e) => setSearchData({ ...searchData, pickupDate: e.target.value })}
                                            className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer [color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="border border-white/20 rounded-2xl p-3 bg-white/5 hover:bg-white/10 transition-colors">
                                    <label className="block text-[10px] font-black uppercase text-slate-300 mb-1">{t[lang].returnDateLabel}</label>
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-red-400 shrink-0" />
                                        <input
                                            type="date"
                                            value={searchData.returnDate}
                                            onChange={(e) => setSearchData({ ...searchData, returnDate: e.target.value })}
                                            className="w-full bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer [color-scheme:dark]"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        className="w-full bg-red-600 text-white hover:bg-red-700 font-black py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-red-600/50 flex items-center justify-center gap-2 uppercase tracking-wider text-xs cursor-pointer"
                                    >
                                        <Search className="w-4 h-4" />
                                        <span>{t[lang].searchBtn}</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* 3. Features (Sifa 3) - Compact & Interactive */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: t[lang].feature1Title, desc: t[lang].feature1Desc, icon: <Building2 className="w-5 h-5 text-red-400" /> },
                                { title: t[lang].feature2Title, desc: t[lang].feature2Desc, icon: <ShieldCheck className="w-5 h-5 text-red-400" /> },
                                { title: t[lang].feature3Title, desc: t[lang].feature3Desc, icon: <Plane className="w-5 h-5 text-red-400" /> }
                            ].map((feat, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => setActiveFeature(activeFeature === idx ? null : idx)}
                                    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 cursor-pointer hover:bg-white/20 transition-all duration-300 select-none`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white/10 p-2 rounded-xl">
                                                {feat.icon}
                                            </div>
                                            <h3 className="font-extrabold text-sm text-white">{feat.title}</h3>
                                        </div>
                                        {activeFeature === idx ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                                    </div>

                                    {/* Expandable Description */}
                                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${activeFeature === idx ? 'max-h-40 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                                        <p className="text-slate-200 text-xs leading-relaxed border-t border-white/10 pt-3">
                                            {feat.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

                {/* Fleet Showcase - HORIZONTAL SCROLL (Row 1: Magari ya Kawaida) */}
                <section id="fleet" className="pt-16 pb-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest bg-red-50 dark:bg-red-950/50 px-3.5 py-1.5 rounded-full mb-3">
                                    <Car className="w-3.5 h-3.5" />
                                    <span>Verified Multi-Vendor Catalog</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                                    {t[lang].fleetHeading}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {t[lang].fleetSubheading}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                {['All', 'SUV / 4x4', 'Luxury', 'Economy', 'Electric'].map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${selectedCategory === cat
                                            ? 'bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-sm'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* HORIZONTAL SCROLL CONTAINER with Navigation Buttons */}
                        <div className="relative group/slider">
                            {/* Scroll Buttons */}
                            <button
                                onClick={() => scrollContainer(fleetScrollRef, 'left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hidden md:block hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scrollContainer(fleetScrollRef, 'right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 hidden md:block hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            <div
                                ref={fleetScrollRef}
                                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth relative z-10 touch-pan-x"
                            >
                                {filteredCars.map((car) => (
                                    <div
                                        key={car.id}
                                        className="min-w-[85vw] sm:min-w-[340px] snap-start shrink-0 bg-white dark:bg-slate-800/80 rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 dark:border-slate-700/90 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 flex flex-col group relative"
                                    >
                                        {/* HAPA NIMEBADILISHA onClick KUITANGAZA MODAL */}
                                        <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-700 cursor-pointer" onClick={() => setSelectedCarForModal(car)}>
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />

                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="bg-white text-slate-900 text-xs font-extrabold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
                                                    <Eye className="w-4 h-4 text-red-600" /> View Details
                                                </span>
                                            </div>

                                            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {car.category}
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                <span>{car.rating}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between text-[11px] mb-2">
                                                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold truncate pr-2">
                                                    <Building2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                                    <span className="truncate">{car.vendor}</span>
                                                </div>
                                                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-md shrink-0 border border-emerald-200 dark:border-emerald-800">
                                                    Verified
                                                </span>
                                            </div>

                                            <h3 className="text-base font-black text-slate-950 dark:text-white mb-3 line-clamp-1">
                                                {car.name}
                                            </h3>

                                            <div className="grid grid-cols-3 gap-1.5 py-2.5 border-y border-slate-100 dark:border-slate-700 mb-4 text-[11px] font-semibold text-slate-600 dark:text-slate-400 text-center bg-slate-50/80 dark:bg-slate-800/80 rounded-xl">
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5 border-x border-slate-200 dark:border-slate-700">
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

                                            <div className="flex items-center justify-between mt-auto pt-2">
                                                <div>
                                                    <span className="text-lg font-black text-slate-950 dark:text-white block leading-none">
                                                        {formatPrice(car.priceValue)}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-1 block">
                                                        {t[lang].perDay}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/checkout?carId=${car.id}`}
                                                    className="bg-slate-950 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-slate-950 dark:hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                                                >
                                                    <span>{t[lang].bookNow}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* Fleet Showcase - HORIZONTAL SCROLL (Row 2: Special Hire - Coaster & Mabasi) */}
                <section className="pt-8 pb-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 relative">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-6">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 text-xs font-extrabold uppercase tracking-widest bg-red-50 dark:bg-red-950/50 px-3.5 py-1.5 rounded-full mb-3">
                                    <Users className="w-3.5 h-3.5" />
                                    <span>Group Transit Solutions</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white tracking-tight mb-3">
                                    {t[lang].specialHireHeading}
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                    {t[lang].specialHireSubheading}
                                </p>
                            </div>
                        </div>

                        {/* HORIZONTAL SCROLL CONTAINER with Navigation Buttons */}
                        <div className="relative group/slider2">
                            {/* Scroll Buttons */}
                            <button
                                onClick={() => scrollContainer(specialHireScrollRef, 'left')}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-5 z-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover/slider2:opacity-100 transition-opacity duration-300 hidden md:block hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => scrollContainer(specialHireScrollRef, 'right')}
                                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-5 z-20 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 opacity-0 group-hover/slider2:opacity-100 transition-opacity duration-300 hidden md:block hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>

                            <div
                                ref={specialHireScrollRef}
                                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth relative z-10 touch-pan-x"
                            >
                                {specialHireData.map((car) => (
                                    <div
                                        key={car.id}
                                        className="min-w-[85vw] sm:min-w-[340px] snap-start shrink-0 bg-white dark:bg-slate-800/80 rounded-3xl overflow-hidden shadow-sm border border-slate-200/90 dark:border-slate-700/90 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 flex flex-col group relative"
                                    >
                                        {/* HAPA NIMEBADILISHA onClick KUITANGAZA MODAL */}
                                        <div className="relative h-52 overflow-hidden bg-slate-100 dark:bg-slate-700 cursor-pointer" onClick={() => setSelectedCarForModal(car)}>
                                            <img
                                                src={car.image}
                                                alt={car.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />

                                            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                <span className="bg-white text-slate-900 text-xs font-extrabold px-4 py-2.5 rounded-full flex items-center gap-2 shadow-lg">
                                                    <Eye className="w-4 h-4 text-red-600" /> View Details
                                                </span>
                                            </div>

                                            <div className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                                {car.category}
                                            </div>
                                            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                <span>{car.rating}</span>
                                            </div>
                                        </div>

                                        <div className="p-5 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between text-[11px] mb-2">
                                                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold truncate pr-2">
                                                    <Building2 className="w-3.5 h-3.5 text-red-600 shrink-0" />
                                                    <span className="truncate">{car.vendor}</span>
                                                </div>
                                                <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-extrabold px-2 py-0.5 rounded-md shrink-0 border border-emerald-200 dark:border-emerald-800">
                                                    Verified
                                                </span>
                                            </div>

                                            <h3 className="text-base font-black text-slate-950 dark:text-white mb-3 line-clamp-1">
                                                {car.name}
                                            </h3>

                                            <div className="grid grid-cols-3 gap-1.5 py-2.5 border-y border-slate-100 dark:border-slate-700 mb-4 text-[11px] font-semibold text-slate-600 dark:text-slate-400 text-center bg-slate-50/80 dark:bg-slate-800/80 rounded-xl">
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{car.transmission === 'Automatic' ? 'Auto' : 'Manual'}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5 border-x border-slate-200 dark:border-slate-700">
                                                    <Fuel className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{car.fuel}</span>
                                                </div>
                                                <div className="flex flex-col items-center gap-0.5">
                                                    <Users className="w-3.5 h-3.5 text-slate-400" />
                                                    <span>{car.seats}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between mt-auto pt-2">
                                                <div>
                                                    <span className="text-lg font-black text-slate-950 dark:text-white block leading-none">
                                                        {formatPrice(car.priceValue)}
                                                    </span>
                                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase mt-1 block">
                                                        {t[lang].perDay}
                                                    </span>
                                                </div>
                                                <Link
                                                    href={`/checkout?carId=${car.id}`}
                                                    className="bg-slate-950 dark:bg-white hover:bg-red-600 dark:hover:bg-red-600 text-white dark:text-slate-950 dark:hover:text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5 shadow-sm"
                                                >
                                                    <span>{t[lang].bookNow}</span>
                                                    <ArrowRight className="w-3.5 h-3.5" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="text-center mt-2">
                            <Link
                                href="/fleet?category=special"
                                className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-sm text-sm"
                            >
                                <span>View All Available Vehicles ({fleetData.length + specialHireData.length}+ Verified)</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Solutions Section */}
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

                {/* How It Works Section */}
                <section className="py-24 px-4 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
                    <div className="max-w-7xl mx-auto relative z-10">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-extrabold uppercase tracking-widest mb-4">
                                <BadgePercent className="w-3.5 h-3.5 text-red-500" />
                                <span>Secure Payment Model</span>
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

                {/* About Section */}
                <section id="about" className="py-24 px-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2 relative">
                            <div className="absolute inset-0 bg-red-600 rounded-3xl translate-x-3 translate-y-3 opacity-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=1000&q=80"
                                alt="International Fleet"
                                className="relative z-10 rounded-3xl shadow-2xl object-cover h-[480px] w-full"
                            />
                        </div>
                        <div className="w-full lg:w-1/2">
                            <span className="text-red-600 text-xs font-extrabold uppercase tracking-widest bg-red-50 dark:bg-red-950/50 px-3.5 py-1.5 rounded-full inline-block mb-4">
                                {t[lang].navAbout}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-950 dark:text-white mb-5 leading-tight">
                                {t[lang].aboutHeading}
                            </h2>
                            <h3 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-6 border-l-4 border-red-600 pl-4">
                                {t[lang].aboutSubheading}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-4">
                                {t[lang].aboutText1}
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8">
                                {t[lang].aboutText2}
                            </p>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                    <div className="text-3xl font-black text-slate-950 dark:text-white mb-1">24/7</div>
                                    <div className="text-[10px] font-extrabold text-red-600 uppercase">Support</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                    <div className="text-3xl font-black text-slate-950 dark:text-white mb-1">100+</div>
                                    <div className="text-[10px] font-extrabold text-red-600 uppercase">Verified Fleets</div>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                                    <div className="text-3xl font-black text-slate-950 dark:text-white mb-1">5+</div>
                                    <div className="text-[10px] font-extrabold text-red-600 uppercase">Regions Served</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section (Maswali Yanayoulizwa Mara kwa Mara) */}
                <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-extrabold uppercase tracking-widest mb-4">
                                <HelpCircle className="w-3.5 h-3.5 text-red-600" />
                                <span>Support & Info</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-950 dark:text-white mb-4 tracking-tight">
                                {t[lang].faqHeading}
                            </h2>
                            <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                                {t[lang].faqSubheading}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faqItems.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
                                    >
                                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white pr-4">
                                            {lang === 'en' ? faq.qEn : faq.qSw}
                                        </h3>
                                        <div className={`shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-red-600' : 'text-slate-400'}`}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <p className="p-6 pt-0 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2">
                                            {lang === 'en' ? faq.aEn : faq.aSw}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 bg-white dark:bg-slate-950">
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
                                <span>Dar es Salaam • Zanzibar • Arusha • Mwanza • Mbeya</span>
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

            {/* POP-UP MODAL KWA AJILI YA KUANGALIA GARI CHAP CHAP */}
            {selectedCarForModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
                    onClick={() => setSelectedCarForModal(null)}
                >
                    <div
                        className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative border border-slate-200 dark:border-slate-800"
                        onClick={e => e.stopPropagation()} // inazuia modal isijifunge ukiclick ndani
                    >
                        {/* Kitufe cha Kufunga (Close Button) */}
                        <button
                            onClick={() => setSelectedCarForModal(null)}
                            className="absolute top-4 right-4 z-10 bg-slate-950/50 hover:bg-slate-950/80 text-white p-2 rounded-full backdrop-blur-md transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Picha ya Gari */}
                        <div className="relative h-64 w-full bg-slate-100 dark:bg-slate-800">
                            <img
                                src={selectedCarForModal.image}
                                alt={selectedCarForModal.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 left-4 bg-slate-950/85 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                                {selectedCarForModal.category}
                            </div>
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                <span>{selectedCarForModal.rating}</span>
                            </div>
                        </div>

                        {/* Taarifa za Gari */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-black text-slate-950 dark:text-white mb-2 leading-tight">
                                        {selectedCarForModal.name}
                                    </h3>
                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
                                        <Building2 className="w-4 h-4 text-red-500 shrink-0" />
                                        <span>{selectedCarForModal.vendor}</span>
                                    </div>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    <span className="text-2xl font-black text-slate-950 dark:text-white block">
                                        {formatPrice(selectedCarForModal.priceValue)}
                                    </span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold">
                                        {t[lang].perDay}
                                    </span>
                                </div>
                            </div>

                            {/* Sifa za Gari */}
                            <div className="grid grid-cols-3 gap-2 mb-8 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl text-center">
                                <div className="flex flex-col items-center gap-1.5">
                                    <Settings className="w-5 h-5 text-slate-400" />
                                    <span>{selectedCarForModal.transmission}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5 border-x border-slate-200 dark:border-slate-700">
                                    {selectedCarForModal.fuel === 'Electric' ? <Zap className="w-5 h-5 text-emerald-500" /> : <Fuel className="w-5 h-5 text-slate-400" />}
                                    <span>{selectedCarForModal.fuel}</span>
                                </div>
                                <div className="flex flex-col items-center gap-1.5">
                                    <Users className="w-5 h-5 text-slate-400" />
                                    <span>{selectedCarForModal.seats}</span>
                                </div>
                            </div>

                            {/* Vitufe (Buttons) za Modal */}
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setSelectedCarForModal(null)}
                                    className="w-full sm:w-1/3 py-3.5 px-4 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    {t[lang].modalClose}
                                </button>
                                <Link
                                    href={`/checkout?carId=${selectedCarForModal.id}`}
                                    className="w-full sm:w-2/3 py-3.5 px-4 rounded-xl font-bold text-sm bg-red-600 hover:bg-red-700 text-white flex justify-center items-center gap-2 transition-all shadow-lg shadow-red-600/20"
                                >
                                    <span>{t[lang].modalContinue}</span>
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