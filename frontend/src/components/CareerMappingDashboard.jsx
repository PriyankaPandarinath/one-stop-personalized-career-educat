import React, { useState } from "react";
import {
    Briefcase,
    TrendingUp,
    BookOpen,
    IndianRupee,
    ChevronRight,
    Star,
    ArrowLeft,
    Lightbulb,
    Layers,
    Code,
    Palette,
    Heart,
    Building2,
    Stethoscope,
} from "lucide-react";

const careerData = {
    science: {
        icon: <Code size={24} />,
        color: "from-blue-500 to-indigo-600",
        bgLight: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
        description:
            "Science opens doors to technology, research, engineering, and innovation-driven careers.",
        careers: [
            {
                name: "Software Engineer",
                salary: "₹6–25 LPA",
                growth: "High",
                description:
                    "Design, develop, and maintain software applications. Work with cutting-edge technologies to solve complex problems.",
                skills: ["JavaScript", "Python", "System Design", "Data Structures", "Cloud Computing"],
                companies: ["Google", "Microsoft", "Amazon", "Infosys", "TCS"],
                education: "B.Tech/B.E. in CS/IT or MCA",
            },
            {
                name: "Data Scientist",
                salary: "₹8–30 LPA",
                growth: "Very High",
                description:
                    "Analyze complex data to help organizations make better decisions using ML, statistics, and visualization.",
                skills: ["Python", "Machine Learning", "Statistics", "SQL", "Deep Learning"],
                companies: ["Amazon", "Flipkart", "Google", "Mu Sigma", "Tiger Analytics"],
                education: "B.Tech + M.Tech/MS in Data Science or Statistics",
            },
            {
                name: "AI/ML Engineer",
                salary: "₹10–40 LPA",
                growth: "Very High",
                description:
                    "Build intelligent systems and algorithms that can learn and make decisions. A rapidly growing field.",
                skills: ["Deep Learning", "NLP", "TensorFlow", "PyTorch", "Computer Vision"],
                companies: ["OpenAI", "Google DeepMind", "NVIDIA", "Meta", "Microsoft"],
                education: "B.Tech + M.Tech/PhD in AI/ML",
            },
            {
                name: "Mechanical Engineer",
                salary: "₹4–15 LPA",
                growth: "Moderate",
                description:
                    "Design and develop mechanical systems from automobiles to aerospace components.",
                skills: ["CAD/CAM", "Thermodynamics", "Material Science", "FEA", "3D Printing"],
                companies: ["Tata Motors", "L&T", "Mahindra", "Boeing", "ISRO"],
                education: "B.Tech/B.E. in Mechanical Engineering",
            },
            {
                name: "Research Scientist",
                salary: "₹7–25 LPA",
                growth: "High",
                description:
                    "Conduct cutting-edge research in physics, chemistry, biology, or interdisciplinary fields to advance human knowledge.",
                skills: ["Research Methodology", "Data Analysis", "Lab Skills", "Scientific Writing", "Critical Thinking"],
                companies: ["ISRO", "DRDO", "BARC", "IISc", "CSIR Labs"],
                education: "M.Sc./PhD in relevant science field",
            },
        ],
    },
    commerce: {
        icon: <Briefcase size={24} />,
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50",
        textColor: "text-emerald-600",
        borderColor: "border-emerald-200",
        description:
            "Commerce streams lead to business, finance, management, and entrepreneurial opportunities.",
        careers: [
            {
                name: "Chartered Accountant",
                salary: "₹7–30 LPA",
                growth: "High",
                description:
                    "Handle financial auditing, taxation, and advisory services. One of the most sought-after professions in India.",
                skills: ["Accounting", "Tax Law", "Auditing", "Financial Analysis", "GST"],
                companies: ["Deloitte", "EY", "KPMG", "PwC", "BDO India"],
                education: "CA Foundation + Inter + Final from ICAI",
            },
            {
                name: "Investment Banker",
                salary: "₹10–50 LPA",
                growth: "High",
                description:
                    "Help companies raise capital, handle mergers and acquisitions, and provide strategic financial advisory.",
                skills: ["Financial Modeling", "Valuation", "M&A Advisory", "Excel", "Bloomberg"],
                companies: ["Goldman Sachs", "JP Morgan", "Morgan Stanley", "Kotak", "ICICI"],
                education: "MBA Finance or CFA Certification",
            },
            {
                name: "Financial Analyst",
                salary: "₹5–18 LPA",
                growth: "High",
                description:
                    "Analyze financial data and market trends to help businesses and individuals make investment decisions.",
                skills: ["Excel", "Financial Modeling", "Data Analysis", "Accounting", "Forecasting"],
                companies: ["HDFC", "SBI", "Bajaj Finance", "Citi", "Axis Bank"],
                education: "B.Com/BBA + MBA/CFA",
            },
            {
                name: "Business Manager",
                salary: "₹8–25 LPA",
                growth: "Moderate",
                description:
                    "Lead and manage business operations, teams, and strategy. Drive organizational growth and efficiency.",
                skills: ["Leadership", "Strategic Planning", "Communication", "Project Management", "Analytics"],
                companies: ["Hindustan Unilever", "P&G", "Amazon", "Reliance", "Tata Group"],
                education: "BBA/B.Com + MBA",
            },
        ],
    },
    arts: {
        icon: <Palette size={24} />,
        color: "from-purple-500 to-pink-500",
        bgLight: "bg-purple-50",
        textColor: "text-purple-600",
        borderColor: "border-purple-200",
        description:
            "Arts unleash creativity and communication, opening paths in design, media, writing, and performance.",
        careers: [
            {
                name: "UI/UX Designer",
                salary: "₹5–20 LPA",
                growth: "Very High",
                description:
                    "Design intuitive and beautiful user interfaces for apps and websites. Combine creativity with technology.",
                skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Thinking"],
                companies: ["Google", "Apple", "Swiggy", "Zomato", "Razorpay"],
                education: "B.Des or any degree + UX Certification",
            },
            {
                name: "Content Writer",
                salary: "₹3–12 LPA",
                growth: "High",
                description:
                    "Create compelling written content for websites, blogs, marketing, and social media platforms.",
                skills: ["Writing", "SEO", "Research", "Storytelling", "Content Strategy"],
                companies: ["Times Internet", "HubSpot", "Freshworks", "Unacademy", "Freelance"],
                education: "BA in English/Journalism/Mass Communication",
            },
            {
                name: "Journalist",
                salary: "₹4–15 LPA",
                growth: "Moderate",
                description:
                    "Investigate, report, and present news and stories. Work in print, digital, TV, or radio media.",
                skills: ["Writing", "Research", "Interviewing", "Video Editing", "Critical Thinking"],
                companies: ["NDTV", "Times of India", "Indian Express", "The Hindu", "Republic"],
                education: "BA/MA in Journalism or Mass Communication",
            },
            {
                name: "Graphic Designer",
                salary: "₹3–15 LPA",
                growth: "High",
                description:
                    "Create visual concepts using computer software to communicate ideas that inspire and inform consumers.",
                skills: ["Photoshop", "Illustrator", "Typography", "Branding", "Motion Graphics"],
                companies: ["Adobe", "Canva", "Ogilvy", "Wunderman", "Freelance"],
                education: "B.Des/BFA or Self-taught + Portfolio",
            },
        ],
    },
    medical: {
        icon: <Heart size={24} />,
        color: "from-red-500 to-rose-600",
        bgLight: "bg-red-50",
        textColor: "text-red-600",
        borderColor: "border-red-200",
        description:
            "Medical careers save lives and improve healthcare. Compassion meets science in this noble field.",
        careers: [
            {
                name: "Doctor (MBBS)",
                salary: "₹8–30 LPA",
                growth: "High",
                description:
                    "Diagnose and treat diseases, prescribe medications, and improve patient health. A highly respected profession.",
                skills: ["Clinical Skills", "Diagnosis", "Patient Care", "Surgery", "Research"],
                companies: ["AIIMS", "Apollo", "Fortis", "Max Healthcare", "Government Hospitals"],
                education: "MBBS + MD/MS Specialization",
            },
            {
                name: "Pharmacist",
                salary: "₹3–12 LPA",
                growth: "Moderate",
                description:
                    "Prepare and dispense medications, advise patients on drug usage, and ensure safe pharmaceutical practices.",
                skills: ["Pharmacology", "Drug Interaction", "Patient Counseling", "Chemistry", "Regulatory"],
                companies: ["Cipla", "Sun Pharma", "Dr. Reddy's", "Lupin", "Biocon"],
                education: "B.Pharm/M.Pharm",
            },
            {
                name: "Biotechnologist",
                salary: "₹5–18 LPA",
                growth: "High",
                description:
                    "Apply biology and technology to develop new products, improve crops, develop medicines, and solve environmental problems.",
                skills: ["Molecular Biology", "Genetics", "Bioinformatics", "Lab Techniques", "Data Analysis"],
                companies: ["Biocon", "Serum Institute", "Bharat Biotech", "Novartis", "Genentech"],
                education: "B.Tech/M.Tech in Biotechnology",
            },
            {
                name: "Medical Researcher",
                salary: "₹6–20 LPA",
                growth: "High",
                description:
                    "Conduct research to develop new treatments, drugs, and medical devices to fight diseases.",
                skills: ["Research Methods", "Clinical Trials", "Biostatistics", "Lab Skills", "Scientific Writing"],
                companies: ["ICMR", "WHO", "Pfizer", "AstraZeneca", "Govt Research Labs"],
                education: "MBBS/MD + PhD or M.Sc + PhD",
            },
        ],
    },
    architecture: {
        icon: <Building2 size={24} />,
        color: "from-amber-500 to-orange-500",
        bgLight: "bg-amber-50",
        textColor: "text-amber-600",
        borderColor: "border-amber-200",
        description:
            "Architecture merges art, engineering, and sustainability to shape the built environment.",
        careers: [
            {
                name: "Architect",
                salary: "₹5–20 LPA",
                growth: "Moderate",
                description:
                    "Design buildings and spaces that are functional, safe, and aesthetically pleasing. Shape the skyline of cities.",
                skills: ["AutoCAD", "Revit", "3D Modeling", "Sketching", "Structural Knowledge"],
                companies: ["Hafeez Contractor", "CP Kukreja", "Morphogenesis", "RSP Architects", "Freelance"],
                education: "B.Arch (5 years)",
            },
            {
                name: "Urban Planner",
                salary: "₹5–18 LPA",
                growth: "High",
                description:
                    "Plan and design communities, transportation systems, and infrastructure for sustainable city development.",
                skills: ["GIS", "Urban Design", "Policy", "Data Analysis", "Community Engagement"],
                companies: ["TCPO", "Smart City Projects", "World Bank", "CEPT", "Municipal Corps"],
                education: "B.Arch/B.Planning + M.Planning",
            },
            {
                name: "Interior Designer",
                salary: "₹4–15 LPA",
                growth: "High",
                description:
                    "Design functional and beautiful interior spaces for homes, offices, and commercial buildings.",
                skills: ["3ds Max", "SketchUp", "Material Knowledge", "Color Theory", "Space Planning"],
                companies: ["Livspace", "HomeLane", "Godrej Interio", "Design Studios", "Freelance"],
                education: "B.Des in Interior Design or B.Arch",
            },
        ],
    },
    nursing: {
        icon: <Stethoscope size={24} />,
        color: "from-cyan-500 to-teal-500",
        bgLight: "bg-cyan-50",
        textColor: "text-cyan-600",
        borderColor: "border-cyan-200",
        description:
            "Nursing is a rewarding healthcare career focused on patient care, empathy, and medical expertise.",
        careers: [
            {
                name: "Registered Nurse",
                salary: "₹3–10 LPA",
                growth: "High",
                description:
                    "Provide patient care in hospitals and clinics. Monitor health, administer medication, and support recovery.",
                skills: ["Patient Care", "Clinical Skills", "Communication", "First Aid", "Record Keeping"],
                companies: ["AIIMS", "Apollo", "Fortis", "Manipal Hospitals", "Government Hospitals"],
                education: "B.Sc Nursing (4 years)",
            },
            {
                name: "Healthcare Assistant",
                salary: "₹2–6 LPA",
                growth: "High",
                description:
                    "Assist healthcare professionals with patient care, record-keeping, and administrative tasks in medical settings.",
                skills: ["Patient Support", "Basic Medical", "Communication", "Empathy", "Teamwork"],
                companies: ["Hospitals", "Clinics", "Elderly Care", "Home Healthcare", "NGOs"],
                education: "Diploma in Nursing or ANM",
            },
            {
                name: "Nurse Practitioner",
                salary: "₹6–18 LPA",
                growth: "Very High",
                description:
                    "Advanced practice nurse who can diagnose illnesses, prescribe medications, and manage patient care independently.",
                skills: ["Advanced Clinical", "Diagnosis", "Prescription", "Leadership", "Research"],
                companies: ["Super Specialty Hospitals", "Private Practice", "International Hospitals"],
                education: "M.Sc Nursing + NP Certification",
            },
        ],
    },
};

const streams = [
    { key: "science", label: "Science", emoji: "🔬" },
    { key: "commerce", label: "Commerce", emoji: "💼" },
    { key: "arts", label: "Arts", emoji: "🎨" },
    { key: "medical", label: "Medical", emoji: "🏥" },
    { key: "architecture", label: "Architecture", emoji: "🏛️" },
    { key: "nursing", label: "Nursing", emoji: "🩺" },
];

function CareerMappingDashboard() {
    const [selectedStream, setSelectedStream] = useState(null);
    const [selectedCareer, setSelectedCareer] = useState(null);

    const streamData = selectedStream ? careerData[selectedStream] : null;

    const getGrowthColor = (growth) => {
        switch (growth) {
            case "Very High":
                return "text-green-600 bg-green-100";
            case "High":
                return "text-blue-600 bg-blue-100";
            case "Moderate":
                return "text-amber-600 bg-amber-100";
            default:
                return "text-gray-600 bg-gray-100";
        }
    };

    return (
        <div className="flex flex-col gap-5 pb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#ff5532] to-[#ff8a65] rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                    <Layers size={28} />
                    <h1 className="text-2xl font-bold">Career Mapping</h1>
                </div>
                <p className="text-white/80 text-sm">
                    Explore career paths across different streams — from skills required to salary expectations
                </p>
            </div>

            {!selectedStream ? (
                /* Stream Selection */
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Choose a stream to explore career paths
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        {streams.map((stream) => {
                            const data = careerData[stream.key];
                            return (
                                <button
                                    key={stream.key}
                                    onClick={() => setSelectedStream(stream.key)}
                                    className={`group relative overflow-hidden bg-gradient-to-br ${data.color} text-white p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer text-left`}
                                >
                                    <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-white/10 blur-lg group-hover:scale-150 transition-transform duration-500" />
                                    <div className="relative z-10">
                                        <span className="text-3xl mb-3 block">
                                            {stream.emoji}
                                        </span>
                                        <h3 className="text-xl font-bold mb-1">{stream.label}</h3>
                                        <p className="text-white/70 text-sm mb-3">
                                            {data.careers.length} career paths
                                        </p>
                                        <div className="flex items-center gap-1 text-sm text-white/80">
                                            Explore <ChevronRight size={14} />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : !selectedCareer ? (
                /* Career List for Selected Stream */
                <div>
                    <button
                        onClick={() => setSelectedStream(null)}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Back to streams
                    </button>

                    <div className={`${streamData.bgLight} ${streamData.borderColor} border rounded-xl p-5 mb-5`}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`${streamData.textColor}`}>
                                {streamData.icon}
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 capitalize">
                                {selectedStream} Careers
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600">{streamData.description}</p>
                    </div>

                    <div className="flex flex-col gap-4">
                        {streamData.careers.map((career, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedCareer(career)}
                                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left cursor-pointer group"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#ff5532] transition-colors">
                                            {career.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                                            {career.description}
                                        </p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className="flex items-center gap-1 text-sm text-gray-600">
                                                <IndianRupee size={14} />
                                                {career.salary}
                                            </span>
                                            <span
                                                className={`text-xs font-medium px-2 py-0.5 rounded-full ${getGrowthColor(
                                                    career.growth
                                                )}`}
                                            >
                                                {career.growth} Growth
                                            </span>
                                        </div>
                                    </div>
                                    <ChevronRight
                                        size={20}
                                        className="text-gray-300 group-hover:text-[#ff5532] transition-colors mt-1"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                /* Career Detail View */
                <div>
                    <button
                        onClick={() => setSelectedCareer(null)}
                        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 cursor-pointer"
                    >
                        <ArrowLeft size={16} />
                        Back to {selectedStream} careers
                    </button>

                    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                        {/* Career Header */}
                        <div className={`bg-gradient-to-r ${streamData.color} p-6 text-white`}>
                            <h2 className="text-2xl font-bold">{selectedCareer.name}</h2>
                            <p className="text-white/80 mt-2">{selectedCareer.description}</p>
                            <div className="flex items-center gap-6 mt-4">
                                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                                    <IndianRupee size={14} />
                                    {selectedCareer.salary}
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                                    <TrendingUp size={14} />
                                    {selectedCareer.growth} Growth
                                </span>
                                <span className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg text-sm">
                                    <BookOpen size={14} />
                                    {selectedCareer.education}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex flex-col gap-6">
                            {/* Skills Required */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Lightbulb size={18} className="text-yellow-500" />
                                    Skills Required
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCareer.skills.map((skill, i) => (
                                        <span
                                            key={i}
                                            className={`${streamData.bgLight} ${streamData.textColor} ${streamData.borderColor} border text-sm font-medium px-3 py-1.5 rounded-lg`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Top Employers */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <Star size={18} className="text-amber-500" />
                                    Top Employers
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCareer.companies.map((company, i) => (
                                        <span
                                            key={i}
                                            className="bg-gray-100 text-gray-700 border border-gray-200 text-sm px-3 py-1.5 rounded-lg"
                                        >
                                            {company}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Education Path */}
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <BookOpen size={18} className="text-blue-500" />
                                    Education Path
                                </h3>
                                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                    <p className="text-sm text-gray-700 font-medium">
                                        {selectedCareer.education}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CareerMappingDashboard;
