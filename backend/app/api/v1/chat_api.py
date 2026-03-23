from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/v1/chat", tags=["AI Chat"])


RESPONSE_BANK = {
    "what career suits me best": (
        "Great question! Based on our career advisor framework, I'd recommend taking the **Aptitude Test** "
        "in the sidebar first to get personalized results.\n\n"
        "However, here's a quick guide:\n\n"
        "🔬 **Science** — If you love experiments, math, and technology → Engineering, Research, AI/ML\n\n"
        "💼 **Commerce** — If you enjoy business, finance, and management → CA, MBA, Investment Banking\n\n"
        "🎨 **Arts** — If you're creative and expressive → Design, Writing, Journalism\n\n"
        "🏥 **Medical** — If you want to help people and love biology → Doctor, Pharmacist, Biotech\n\n"
        "🏛️ **Architecture** — If you love design and structures → Architect, Urban Planner\n\n"
        "🩺 **Nursing** — If you're compassionate and care for others → Registered Nurse, Healthcare\n\n"
        "Take the aptitude test for a more personalized recommendation!"
    ),
    "suggest courses for engineering": (
        "Here are the top engineering courses and paths in India:\n\n"
        "**🎓 Undergraduate (4 years)**\n"
        "• B.Tech/B.E. in Computer Science — Hot demand, high salary\n"
        "• B.Tech in Electronics & Communication — Semiconductors & IoT\n"
        "• B.Tech in Mechanical — Automobiles, Aerospace\n"
        "• B.Tech in Civil — Infrastructure & Construction\n"
        "• B.Tech in AI & Data Science — Newest and fastest growing\n\n"
        "**📚 Top Entrance Exams**\n"
        "• JEE Main & Advanced (IITs)\n"
        "• BITSAT (BITS Pilani)\n"
        "• VITEEE (VIT)\n"
        "• State-level CETs\n\n"
        "**🏫 Top Colleges**\n"
        "• IIT Bombay, Delhi, Madras\n"
        "• NIT Trichy, Warangal\n"
        "• BITS Pilani\n"
        "• IIIT Hyderabad\n\n"
        "**💡 Tip:** Focus on building practical skills through projects alongside your degree!"
    ),
    "compare science vs commerce": (
        "Here's a detailed comparison:\n\n"
        "| Aspect | 🔬 Science | 💼 Commerce |\n"
        "|--------|---------|----------|\n"
        "| **Focus** | Research, Technology, Innovation | Business, Finance, Trade |\n"
        "| **Key Skills** | Analytical, Math, Logic | Leadership, Communication |\n"
        "| **Top Careers** | Engineer, Scientist, Doctor | CA, MBA, Financial Analyst |\n"
        "| **Salary Range** | ₹4-40 LPA | ₹5-50 LPA |\n"
        "| **Job Growth** | Very High (Tech) | High (Finance) |\n"
        "| **Flexibility** | Can shift to commerce later | Harder to shift to science |\n\n"
        "**Choose Science if:** You love solving problems, experiments, and technology.\n"
        "**Choose Commerce if:** You're interested in business, finance, and management.\n\n"
        "🎯 **Pro Tip:** Science gives more flexibility — you can always move into management later via MBA. "
        "Commerce students find it harder to switch into pure science roles."
    ),
    "how to become a data scientist": (
        "Here's your roadmap to becoming a Data Scientist:\n\n"
        "**📍 Step 1: Foundation (Class 11-12)**\n"
        "• Take Science stream with Math\n"
        "• Start learning Python basics\n\n"
        "**📍 Step 2: Degree (3-4 years)**\n"
        "• B.Tech in CS/IT/Data Science from a good college\n"
        "• Or B.Sc in Statistics/Math + Online courses\n\n"
        "**📍 Step 3: Core Skills**\n"
        "• Python & R Programming\n"
        "• Statistics & Probability\n"
        "• Machine Learning & Deep Learning\n"
        "• SQL & Data Visualization\n"
        "• Tools: Pandas, NumPy, Scikit-learn, TensorFlow\n\n"
        "**📍 Step 4: Build Portfolio**\n"
        "• Kaggle competitions\n"
        "• GitHub projects\n"
        "• Blog about your work\n\n"
        "**📍 Step 5: Job/Higher Studies**\n"
        "• Entry-level: ₹6-12 LPA\n"
        "• Top companies: Google, Amazon, Flipkart, Mu Sigma\n"
        "• Optional: M.Tech/MS for research roles\n\n"
        "**⏱️ Timeline:** 2-3 years after graduation to become job-ready\n\n"
        "💡 **Key Tip:** Focus on real projects, not just certificates!"
    ),
    "best scholarships for students": (
        "Here are the top scholarships you should apply for:\n\n"
        "**🏛️ Government Scholarships**\n"
        "• PM Vidyalakshmi — Up to ₹75,000/year\n"
        "• NSP Central Sector — ₹10,000-20,000/year\n"
        "• AICTE Pragati (Girls) — ₹50,000/year\n"
        "• INSPIRE — ₹80,000/year (Top 1% in 12th)\n\n"
        "**🏢 Private Scholarships**\n"
        "• Tata Trusts — Up to ₹3,00,000/year\n"
        "• Reliance Foundation — Up to ₹2,00,000/year\n"
        "• Infosys Foundation — Up to ₹1,50,000/year\n\n"
        "**🏆 Merit-Based**\n"
        "• NTSE — ₹1,250-2,000/month\n"
        "• KVPY — ₹5,000-7,000/month\n\n"
        "📌 **How to Apply:**\n"
        "1. Visit the **Scholarships** section in the sidebar\n"
        "2. Check eligibility criteria\n"
        "3. Apply before deadlines\n\n"
        "💡 **Tip:** Apply to multiple scholarships — you can hold more than one!"
    ),
    "top colleges for medical": (
        "Here are India's top medical colleges:\n\n"
        "**🥇 Top 5 Government Medical Colleges**\n"
        "1. **AIIMS New Delhi** — #1 Medical (NIRF) — India's best\n"
        "2. **PGIMER Chandigarh** — Excellent post-graduate programs\n"
        "3. **JIPMER Puducherry** — Free education, INI status\n"
        "4. **CMC Vellore** — Outstanding clinical training\n"
        "5. **AIIMS Jodhpur** — Rising star among new AIIMS\n\n"
        "**📚 Entrance Exams**\n"
        "• NEET-UG — For MBBS admission (single exam for all medical colleges)\n"
        "• NEET-PG — For MD/MS specialization\n\n"
        "**📊 Key Stats**\n"
        "• MBBS Duration: 5.5 years\n"
        "• Avg AIIMS Fees: ₹1,000-5,000/year (highly subsidized)\n"
        "• Starting Salary: ₹8-15 LPA\n"
        "• Specialization Salary: ₹15-50+ LPA\n\n"
        "**💡 Tips:**\n"
        "• Start NEET prep from Class 11\n"
        "• Focus on NCERT Biology, Physics & Chemistry\n"
        "• Consider coaching but also self-study\n"
        "• Check the **Govt Colleges** section for more details!"
    ),
}

DEFAULT_REPLY = (
    "That's a great question! While I'm a demo AI advisor, here are some things I can help with:\n\n"
    "• **Career recommendations** based on your interests\n"
    "• **Course suggestions** for different streams\n"
    "• **Stream comparisons** (science vs commerce, etc.)\n"
    "• **Career roadmaps** (how to become X)\n"
    "• **Scholarship information**\n"
    "• **College recommendations**\n\n"
    "Try asking me one of these topics!"
)


class ChatMessage(BaseModel):
    message: str


@router.post("")
def chat(data: ChatMessage):
    user_msg = data.message.lower().strip().rstrip("?!.")

    # Try to find a matching response
    for key, response in RESPONSE_BANK.items():
        key_clean = key.rstrip("?")
        if key_clean in user_msg or user_msg in key_clean or any(
            word in user_msg for word in key_clean.split() if len(word) > 4
        ):
            return {"reply": response}

    return {"reply": DEFAULT_REPLY}
