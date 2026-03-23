import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { current_user } from "./authentication/Service";
import {
  BarChart3,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  TrendingUp,
  Award,
  Clock,
  Target,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const quotes = [
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
  },
  {
    text: "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    author: "Steve Jobs",
  },
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
  },
];

const recentActivity = [
  {
    icon: "📝",
    text: "Completed Science Aptitude Test",
    time: "2 hours ago",
    color: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🎯",
    text: "Matched with Software Engineering career",
    time: "1 day ago",
    color: "bg-green-100 text-green-700",
  },
  {
    icon: "🏫",
    text: "Saved IIT Bombay to favorites",
    time: "2 days ago",
    color: "bg-purple-100 text-purple-700",
  },
  {
    icon: "💰",
    text: "Found 3 new scholarship matches",
    time: "3 days ago",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: "🤖",
    text: "AI recommended Data Science path",
    time: "5 days ago",
    color: "bg-pink-100 text-pink-700",
  },
];

function DashboardHome({ onNavigate }) {
  const { getToken } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [quoteIndex] = useState(Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = await getToken({ template: "myTokenTemplate" });
        if (!token) return;
        const data = await current_user(token);
        setCurrentUser(data);
      } catch (err) {
        console.error(err);
      }
    };
    getUser();
  }, [getToken]);

  const quickActions = [
    {
      label: "Take Aptitude Test",
      icon: <BookOpen size={24} />,
      color: "from-blue-500 to-indigo-600",
      key: "test",
    },
    {
      label: "Find Colleges",
      icon: <GraduationCap size={24} />,
      color: "from-emerald-500 to-teal-600",
      key: "college",
    },
    {
      label: "Explore Careers",
      icon: <TrendingUp size={24} />,
      color: "from-orange-500 to-red-500",
      key: "career",
    },
    {
      label: "AI Advisor",
      icon: <BrainCircuit size={24} />,
      color: "from-purple-500 to-pink-500",
      key: "ai",
    },
  ];

  const stats = [
    {
      label: "Tests Taken",
      value: "4",
      icon: <BarChart3 size={20} />,
      bg: "bg-blue-50",
      color: "text-blue-600",
      border: "border-blue-200",
    },
    {
      label: "Career Matches",
      value: "6",
      icon: <Target size={20} />,
      bg: "bg-green-50",
      color: "text-green-600",
      border: "border-green-200",
    },
    {
      label: "Colleges Saved",
      value: "8",
      icon: <GraduationCap size={20} />,
      bg: "bg-purple-50",
      color: "text-purple-600",
      border: "border-purple-200",
    },
    {
      label: "Scholarships",
      value: "12",
      icon: <Award size={20} />,
      bg: "bg-amber-50",
      color: "text-amber-600",
      border: "border-amber-200",
    },
  ];

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#ff5532] to-[#ff8a65] rounded-2xl p-6 text-white shadow-lg">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute right-20 bottom-0 h-32 w-32 rounded-full bg-white/5 blur-xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            {currentUser?.picture && (
              <img
                src={currentUser.picture}
                alt="avatar"
                className="h-14 w-14 rounded-full border-2 border-white/50 object-cover shadow-md"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                Welcome back, {currentUser?.name || "Student"} 👋
              </h1>
              <p className="text-white/80 text-sm mt-1">
                Continue your journey to discover the perfect career path
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Quick Actions
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.key}
              onClick={() => onNavigate && onNavigate(action.key)}
              className={`group relative overflow-hidden bg-gradient-to-br ${action.color} text-white p-5 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer flex flex-col items-start gap-3`}
            >
              <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-white/10 blur-lg group-hover:scale-150 transition-transform duration-500" />
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                {action.icon}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{action.label}</span>
                <ArrowRight
                  size={14}
                  className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Your Progress
        </h2>
        <div className="grid grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`${stat.bg} ${stat.border} border rounded-xl p-4 flex flex-col gap-2 hover:shadow-md transition-shadow`}
            >
              <div className={`${stat.color} flex items-center gap-2`}>
                {stat.icon}
                <span className="text-xs font-medium text-gray-500">
                  {stat.label}
                </span>
              </div>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-5">
        {/* Recent Activity */}
        <div className="col-span-3 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-gray-400" />
            Recent Activity
          </h2>
          <div className="flex flex-col gap-3">
            {recentActivity.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">{item.icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">
                    {item.text}
                  </p>
                  <p className="text-xs text-gray-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="col-span-2 bg-gradient-to-br from-[#fccc42] to-[#f5b400] rounded-xl p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={18} className="text-white" />
              <h2 className="text-lg font-semibold text-white">
                Daily Inspiration
              </h2>
            </div>
            <p className="text-lg font-medium text-gray-800 italic leading-relaxed">
              "{quotes[quoteIndex].text}"
            </p>
            <p className="text-sm text-gray-700 mt-3 font-medium">
              — {quotes[quoteIndex].author}
            </p>
          </div>
          <div className="mt-6 flex gap-1">
            {quotes.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full ${
                  i === quoteIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                } transition-all`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
