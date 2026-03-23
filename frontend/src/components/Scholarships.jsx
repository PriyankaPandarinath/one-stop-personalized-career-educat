import React, { useState } from "react";
import {
    Award,
    Calendar,
    IndianRupee,
    Search,
    ExternalLink,
    BookOpen,
    Users,
    CheckCircle2,
    Filter,
} from "lucide-react";

const scholarships = [
    {
        id: 1,
        name: "PM Vidyalakshmi Scholarship",
        provider: "Government of India",
        amount: "₹75,000/year",
        deadline: "March 31, 2026",
        category: "government",
        eligibility: "Students from families with annual income below ₹8 LPA",
        description:
            "A comprehensive central government scholarship supporting meritorious students from economically weaker sections to pursue higher education in recognized institutions.",
        appliedCount: 2500000,
        link: "https://www.vidyalakshmi.co.in",
    },
    {
        id: 2,
        name: "INSPIRE Scholarship",
        provider: "Dept. of Science & Technology",
        amount: "₹80,000/year",
        deadline: "April 15, 2026",
        category: "merit",
        eligibility: "Top 1% in Class 12 Board Exams pursuing B.Sc/M.Sc",
        description:
            "Innovation in Science Pursuit for Inspired Research (INSPIRE) program to attract meritorious students to pursue science courses.",
        appliedCount: 350000,
        link: "https://online-inspire.gov.in",
    },
    {
        id: 3,
        name: "Post Matric Scholarship for SC/ST",
        provider: "Ministry of Social Justice",
        amount: "Full Tuition + ₹5,500/month",
        deadline: "December 31, 2025",
        category: "need",
        eligibility: "SC/ST students with family income below ₹2.5 LPA",
        description:
            "Financial assistance to SC/ST students studying at post-matriculation or post-secondary level to enable them to complete their education.",
        appliedCount: 8000000,
        link: "https://scholarships.gov.in",
    },
    {
        id: 4,
        name: "Kishore Vaigyanik Protsahan Yojana (KVPY)",
        provider: "Dept. of Science & Technology",
        amount: "₹5,000–7,000/month + Contingency",
        deadline: "August 31, 2025",
        category: "merit",
        eligibility: "Students in Class 11/12 or 1st year of B.Sc in basic sciences",
        description:
            "A prestigious national fellowship program in basic sciences to encourage students to take up research careers. Includes monthly stipend and annual contingency grant.",
        appliedCount: 100000,
        link: "https://kvpy.iisc.ac.in",
    },
    {
        id: 5,
        name: "Tata Trusts Scholarship",
        provider: "Tata Trusts",
        amount: "Up to ₹3,00,000/year",
        deadline: "July 31, 2025",
        category: "private",
        eligibility: "Students enrolled in specific UG/PG programs with financial need",
        description:
            "Need-based scholarship by Tata Group covering tuition fees, hostel charges, and living expenses for students at partner institutions.",
        appliedCount: 50000,
        link: "https://www.tatatrusts.org",
    },
    {
        id: 6,
        name: "AICTE Pragati Scholarship for Girls",
        provider: "AICTE",
        amount: "₹50,000/year",
        deadline: "November 30, 2025",
        category: "government",
        eligibility: "Girl students in AICTE-approved technical institutions, family income <₹8 LPA",
        description:
            "Scholarship to encourage girl students to pursue technical education in AICTE-approved colleges. Covers tuition, books, and equipment.",
        appliedCount: 400000,
        link: "https://www.aicte-india.org",
    },
    {
        id: 7,
        name: "NSP Central Sector Scholarship",
        provider: "MHRD, Government of India",
        amount: "₹10,000–20,000/year",
        deadline: "October 31, 2025",
        category: "government",
        eligibility: "Students who scored above 80th percentile in Class 12",
        description:
            "Central government scholarship for college and university students who have scored above the 80th percentile in their Class 12 board exams.",
        appliedCount: 850000,
        link: "https://scholarships.gov.in",
    },
    {
        id: 8,
        name: "Reliance Foundation UG Scholarship",
        provider: "Reliance Foundation",
        amount: "Up to ₹2,00,000/year",
        deadline: "September 15, 2025",
        category: "private",
        eligibility: "Students in UG STEM programs with family income <₹15 LPA",
        description:
            "Merit-cum-need based scholarship for Indian students pursuing undergraduate degrees in STEM fields from recognized institutions across India.",
        appliedCount: 180000,
        link: "https://www.reliancefoundation.org",
    },
    {
        id: 9,
        name: "NTSE Scholarship",
        provider: "NCERT",
        amount: "₹1,250–2,000/month",
        deadline: "August 31, 2025",
        category: "merit",
        eligibility: "Students who qualify NTSE at national level",
        description:
            "National Talent Search Examination scholarship for exceptionally talented students to pursue sciences and social sciences at undergraduate and postgraduate levels.",
        appliedCount: 500000,
        link: "https://www.ncert.nic.in",
    },
    {
        id: 10,
        name: "Minority Communities Scholarship",
        provider: "Ministry of Minority Affairs",
        amount: "Full Tuition + ₹10,000/year",
        deadline: "October 15, 2025",
        category: "need",
        eligibility: "Students from notified minority communities with income <₹2 LPA",
        description:
            "Scholarship for students belonging to minority communities to pursue professional and technical courses at undergraduate and postgraduate levels.",
        appliedCount: 2000000,
        link: "https://scholarships.gov.in",
    },
    {
        id: 11,
        name: "Infosys Foundation Scholarship",
        provider: "Infosys Foundation",
        amount: "Up to ₹1,50,000/year",
        deadline: "June 30, 2025",
        category: "private",
        eligibility: "Engineering students from economically disadvantaged backgrounds",
        description:
            "Financial support for meritorious students from disadvantaged backgrounds to complete their engineering education at recognized institutions.",
        appliedCount: 30000,
        link: "https://www.infosys.com/infosys-foundation",
    },
    {
        id: 12,
        name: "ISHAN UDAY Scholarship (NE Region)",
        provider: "UGC",
        amount: "₹5,400/month + ₹20,000 Contingency",
        deadline: "November 30, 2025",
        category: "government",
        eligibility: "Students from NE states with family income <₹4.5 LPA",
        description:
            "Special area scholarship for students from North Eastern states, designed to encourage young talent from the region to pursue higher education.",
        appliedCount: 95000,
        link: "https://www.ugc.ac.in",
    },
];

const categories = [
    { key: "all", label: "All Scholarships", icon: <Award size={16} /> },
    { key: "merit", label: "Merit-Based", icon: <CheckCircle2 size={16} /> },
    { key: "need", label: "Need-Based", icon: <Users size={16} /> },
    { key: "government", label: "Government", icon: <BookOpen size={16} /> },
    { key: "private", label: "Private", icon: <Filter size={16} /> },
];

function Scholarships() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [search, setSearch] = useState("");

    const filtered = scholarships.filter((s) => {
        const matchCat =
            activeCategory === "all" || s.category === activeCategory;
        const matchSearch =
            s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.provider.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    const getCategoryColor = (cat) => {
        switch (cat) {
            case "merit":
                return "bg-blue-100 text-blue-700";
            case "need":
                return "bg-orange-100 text-orange-700";
            case "government":
                return "bg-green-100 text-green-700";
            case "private":
                return "bg-purple-100 text-purple-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="flex flex-col gap-5 pb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <Award size={28} />
                    <h1 className="text-2xl font-bold">Scholarships & Financial Aid</h1>
                </div>
                <p className="text-white/80 text-sm">
                    Discover scholarships to fund your education — merit, need-based,
                    government & private
                </p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search scholarships by name or provider..."
                    className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/30 shadow-sm"
                />
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2">
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${activeCategory === cat.key
                                ? "bg-amber-500 text-white shadow-md"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Results Count */}
            <p className="text-sm text-gray-500">
                Found{" "}
                <span className="font-semibold text-gray-700">{filtered.length}</span>{" "}
                scholarship{filtered.length !== 1 ? "s" : ""}
            </p>

            {/* Scholarship Cards */}
            <div className="grid grid-cols-2 gap-4">
                {filtered.map((sch) => (
                    <div
                        key={sch.id}
                        className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                                    {sch.name}
                                </h3>
                                <p className="text-xs text-gray-500 mt-0.5">{sch.provider}</p>
                            </div>
                            <span
                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCategoryColor(
                                    sch.category
                                )}`}
                            >
                                {sch.category}
                            </span>
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-2">
                            {sch.description}
                        </p>

                        <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                                <IndianRupee size={12} />
                                {sch.amount}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {sch.deadline}
                            </span>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-2.5">
                            <p className="text-xs text-gray-600">
                                <span className="font-medium">Eligibility:</span>{" "}
                                {sch.eligibility}
                            </p>
                        </div>

                        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
                            <span className="text-xs text-gray-400">
                                {sch.appliedCount.toLocaleString()}+ applicants
                            </span>
                            <a
                                href={sch.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline"
                            >
                                Apply Now
                                <ExternalLink size={13} />
                            </a>
                        </div>
                    </div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-gray-400">
                        <Award size={48} className="mx-auto mb-3 opacity-50" />
                        <p className="text-lg font-medium">No scholarships found</p>
                        <p className="text-sm">Try different search terms or category</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Scholarships;
