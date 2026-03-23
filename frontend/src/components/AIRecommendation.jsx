import React, { useState, useRef, useEffect } from "react";
import {
    Send,
    BrainCircuit,
    Sparkles,
    MessageCircle,
    User,
    Bot,
    RefreshCcw,
} from "lucide-react";

const starters = [
    "What career suits me best?",
    "Suggest courses for engineering",
    "Compare science vs commerce",
    "How to become a data scientist?",
    "Best scholarships for students?",
    "Top colleges for medical?",
];

const responseBank = {
    "what career suits me best?": {
        text: `Great question! Based on our career advisor framework, I'd recommend taking the **Aptitude Test** in the sidebar first to get personalized results.\n\nHowever, here's a quick guide:\n\n🔬 **Science** — If you love experiments, math, and technology → Engineering, Research, AI/ML\n\n💼 **Commerce** — If you enjoy business, finance, and management → CA, MBA, Investment Banking\n\n🎨 **Arts** — If you're creative and expressive → Design, Writing, Journalism\n\n🏥 **Medical** — If you want to help people and love biology → Doctor, Pharmacist, Biotech\n\n🏛️ **Architecture** — If you love design and structures → Architect, Urban Planner\n\n🩺 **Nursing** — If you're compassionate and care for others → Registered Nurse, Healthcare\n\nTake the aptitude test for a more personalized recommendation!`,
    },
    "suggest courses for engineering": {
        text: `Here are the top engineering courses and paths in India:\n\n**🎓 Undergraduate (4 years)**\n• B.Tech/B.E. in Computer Science — Hot demand, high salary\n• B.Tech in Electronics & Communication — Semiconductors & IoT\n• B.Tech in Mechanical — Automobiles, Aerospace\n• B.Tech in Civil — Infrastructure & Construction\n• B.Tech in AI & Data Science — Newest and fastest growing\n\n**📚 Top Entrance Exams**\n• JEE Main & Advanced (IITs)\n• BITSAT (BITS Pilani)\n• VITEEE (VIT)\n• State-level CETs\n\n**🏫 Top Colleges**\n• IIT Bombay, Delhi, Madras\n• NIT Trichy, Warangal\n• BITS Pilani\n• IIIT Hyderabad\n\n**💡 Tip:** Focus on building practical skills through projects alongside your degree!`,
    },
    "compare science vs commerce": {
        text: `Here's a detailed comparison:\n\n| Aspect | 🔬 Science | 💼 Commerce |\n|--------|---------|----------|\n| **Focus** | Research, Technology, Innovation | Business, Finance, Trade |\n| **Key Skills** | Analytical, Math, Logic | Leadership, Communication |\n| **Top Careers** | Engineer, Scientist, Doctor | CA, MBA, Financial Analyst |\n| **Salary Range** | ₹4-40 LPA | ₹5-50 LPA |\n| **Job Growth** | Very High (Tech) | High (Finance) |\n| **Flexibility** | Can shift to commerce later | Harder to shift to science |\n\n**Choose Science if:** You love solving problems, experiments, and technology.\n**Choose Commerce if:** You're interested in business, finance, and management.\n\n🎯 **Pro Tip:** Science gives more flexibility — you can always move into management later via MBA. Commerce students find it harder to switch into pure science roles.`,
    },
    "how to become a data scientist?": {
        text: `Here's your roadmap to becoming a Data Scientist:\n\n**📍 Step 1: Foundation (Class 11-12)**\n• Take Science stream with Math\n• Start learning Python basics\n\n**📍 Step 2: Degree (3-4 years)**\n• B.Tech in CS/IT/Data Science from a good college\n• Or B.Sc in Statistics/Math + Online courses\n\n**📍 Step 3: Core Skills**\n• Python & R Programming\n• Statistics & Probability\n• Machine Learning & Deep Learning\n• SQL & Data Visualization\n• Tools: Pandas, NumPy, Scikit-learn, TensorFlow\n\n**📍 Step 4: Build Portfolio**\n• Kaggle competitions\n• GitHub projects\n• Blog about your work\n\n**📍 Step 5: Job/Higher Studies**\n• Entry-level: ₹6-12 LPA\n• Top companies: Google, Amazon, Flipkart, Mu Sigma\n• Optional: M.Tech/MS for research roles\n\n**⏱️ Timeline:** 2-3 years after graduation to become job-ready\n\n💡 **Key Tip:** Focus on real projects, not just certificates!`,
    },
    "best scholarships for students?": {
        text: `Here are the top scholarships you should apply for:\n\n**🏛️ Government Scholarships**\n• PM Vidyalakshmi — Up to ₹75,000/year\n• NSP Central Sector — ₹10,000-20,000/year\n• AICTE Pragati (Girls) — ₹50,000/year\n• INSPIRE — ₹80,000/year (Top 1% in 12th)\n\n**🏢 Private Scholarships**\n• Tata Trusts — Up to ₹3,00,000/year\n• Reliance Foundation — Up to ₹2,00,000/year\n• Infosys Foundation — Up to ₹1,50,000/year\n\n**🏆 Merit-Based**\n• NTSE — ₹1,250-2,000/month\n• KVPY — ₹5,000-7,000/month\n\n📌 **How to Apply:**\n1. Visit the **Scholarships** section in the sidebar\n2. Check eligibility criteria\n3. Apply before deadlines\n\n💡 **Tip:** Apply to multiple scholarships — you can hold more than one!`,
    },
    "top colleges for medical?": {
        text: `Here are India's top medical colleges:\n\n**🥇 Top 5 Government Medical Colleges**\n1. **AIIMS New Delhi** — #1 Medical (NIRF) — India's best\n2. **PGIMER Chandigarh** — Excellent post-graduate programs\n3. **JIPMER Puducherry** — Free education, INI status\n4. **CMC Vellore** — Outstanding clinical training\n5. **AIIMS Jodhpur** — Rising star among new AIIMS\n\n**📚 Entrance Exams**\n• NEET-UG — For MBBS admission (single exam for all medical colleges)\n• NEET-PG — For MD/MS specialization\n\n**📊 Key Stats**\n• MBBS Duration: 5.5 years\n• Avg AIIMS Fees: ₹1,000-5,000/year (highly subsidized)\n• Starting Salary: ₹8-15 LPA\n• Specialization Salary: ₹15-50+ LPA\n\n**💡 Tips:**\n• Start NEET prep from Class 11\n• Focus on NCERT Biology, Physics & Chemistry\n• Consider coaching but also self-study\n• Check the **Govt Colleges** section for more details!`,
    },
};

function AIRecommendation() {
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hello! 👋 I'm your **AI Career Advisor**. I can help you explore career paths, suggest courses, compare streams, and provide personalized guidance.\n\nTry asking me something, or click one of the quick questions below!",
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = (text) => {
        const userMessage = text || input.trim();
        if (!userMessage) return;

        setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
        setInput("");
        setIsTyping(true);

        const lowerMsg = userMessage.toLowerCase().trim().replace(/[?!.]+$/, "") + "?";
        const matchedKey = Object.keys(responseBank).find(
            (key) =>
                lowerMsg.includes(key.replace("?", "")) ||
                key.replace("?", "").includes(lowerMsg.replace("?", "").slice(0, 15))
        );

        setTimeout(() => {
            const botReply = matchedKey
                ? responseBank[matchedKey].text
                : `That's a great question! While I'm a demo AI advisor, here are some things I can help with:\n\n• **Career recommendations** based on your interests\n• **Course suggestions** for different streams\n• **Stream comparisons** (science vs commerce, etc.)\n• **Career roadmaps** (how to become X)\n• **Scholarship information**\n• **College recommendations**\n\nTry clicking one of the suggested questions above, or ask me about any of these topics!`;

            setMessages((prev) => [...prev, { role: "bot", text: botReply }]);
            setIsTyping(false);
        }, 1200 + Math.random() * 800);
    };

    const handleReset = () => {
        setMessages([
            {
                role: "bot",
                text: "Hello! 👋 I'm your **AI Career Advisor**. I can help you explore career paths, suggest courses, compare streams, and provide personalized guidance.\n\nTry asking me something, or click one of the quick questions below!",
            },
        ]);
    };

    const formatMessage = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br/>')
            .replace(/• /g, '&bull; ');
    };

    return (
        <div className="flex flex-col h-[calc(100vh-2.6rem)] gap-0">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-t-2xl p-5 text-white shadow-lg flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                        <BrainCircuit size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">AI Career Advisor</h1>
                        <p className="text-white/70 text-xs flex items-center gap-1">
                            <Sparkles size={12} />
                            Powered by Learnify AI
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleReset}
                    className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors cursor-pointer"
                    title="Reset conversation"
                >
                    <RefreshCcw size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-5 flex flex-col gap-4 border-x border-gray-200">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""
                            }`}
                    >
                        <div
                            className={`shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white ${msg.role === "user"
                                    ? "bg-[#ff5532]"
                                    : "bg-gradient-to-br from-purple-500 to-pink-500"
                                }`}
                        >
                            {msg.role === "user" ? (
                                <User size={16} />
                            ) : (
                                <Bot size={16} />
                            )}
                        </div>
                        <div
                            className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-[#ff5532] text-white rounded-br-md"
                                    : "bg-white border border-gray-200 text-gray-700 rounded-bl-md shadow-sm"
                                }`}
                            dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }}
                        />
                    </div>
                ))}

                {isTyping && (
                    <div className="flex gap-3">
                        <div className="shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-pink-500">
                            <Bot size={16} />
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex gap-1.5">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Quick Starters */}
            {messages.length <= 2 && (
                <div className="bg-white border-x border-gray-200 px-5 py-3 flex gap-2 flex-wrap shrink-0">
                    {starters.map((s, i) => (
                        <button
                            key={i}
                            onClick={() => handleSend(s)}
                            className="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all cursor-pointer"
                        >
                            <MessageCircle size={11} className="inline mr-1 relative -top-px" />
                            {s}
                        </button>
                    ))}
                </div>
            )}

            {/* Input Area */}
            <div className="bg-white border border-gray-200 rounded-b-2xl p-4 flex items-center gap-3 shrink-0">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask me about careers, courses, colleges..."
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/30"
                    disabled={isTyping}
                />
                <button
                    onClick={() => handleSend()}
                    disabled={isTyping || !input.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2.5 rounded-xl hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
}

export default AIRecommendation;
