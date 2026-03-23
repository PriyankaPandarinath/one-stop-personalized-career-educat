import "./LandPage.css";
import React, { useEffect, useRef, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Person1 from "../../assets/person1.png";
import Person2 from "../../assets/person2.png";
import Person3 from "../../assets/person3.png";
import Person4 from "../../assets/person4.png";
import Pencil from "../../assets/girl_pencil.png";
import Star from "../../assets/star.png";
import card1 from "../../assets/card_image_1.png";
import card2 from "../../assets/card_image_2.png";
import card3 from "../../assets/card_image_3.png";
import card4 from "../../assets/card_image_4.png";
import card5 from "../../assets/card_image_5.png";
import Hand from "../../assets/section3_hand.png";
import { useNavigate } from "react-router-dom";

const LandPage = () => {
  const navigate = useNavigate();
  const cardsRef = useRef();
  const [activeFilter, setActiveFilter] = useState("New Courses");

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const ref = cardsRef.current;
    ref.addEventListener("wheel", handleWheel);
    return () => ref.removeEventListener("wheel", handleWheel);
  }, []);

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navSections = {
    About: "about-section",
    FAQ: "subjects-section",
    Subjects: "subjects-section",
    Courses: "courses-section",
    Degrees: "skills-section",
    ForBusiness: "skills-section",
  };

  const components = {
    nav: ["About", "FAQ", "Subjects", "Courses", "Degrees", "ForBusiness"],
    auth: ["Login", "SignUp"],
    stats: [
      { field: "Education", title: "subjects", plus: "+40" },
      { field: "Online", title: "courses", plus: "+300" },
      { field: "5 star", title: "learner reviews", plus: "+180k" },
    ],
    section2: {
      buttons: ["New Courses", "Recommended", "Most Popular"],
    },
    section4: {
      buttons: [
        "Arts & Humanities",
        "Business",
        "Computer Science",
        "Data Science",
        "Health",
        "Math & Logic",
        "Personal Development",
        "Physical Science & Engineering",
        "Social Sciences",
      ],
    },
  };

  return (
    <div className="[position:inherit] bg-[#f7f7f5] " style={{ fontFamily: "'Kodchasan', sans-serif" }}>
      <nav className="z-1 m-0 p-5 pl-7 pr-7 items-center justify-between w-[100%] bg-[#f7f7f5]  fixed box-border flex">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="text-[#ff5532]">Learn</span>ify
        </h1>
        <ul className=" font-medium  p-5 pt-2 pb-2 flex items-center gap-15">
          {components.nav.map((item) => (
            <li
              className="cursor-pointer hover:text-[#ff5532] transition-colors"
              key={item}
              onClick={() => scrollToSection(navSections[item])}
            >
              {item}
            </li>
          ))}
        </ul>

        <ul className="flex items-center gap-6 font-medium">
          <SignedOut>
            <SignInButton className="text-[#000] p-3 pt-[6px] pb-[6px] bg-[#fff] border-[#00000012] border-1 rounded-md hover:bg-[#e0e0e0] cursor-pointer">
              Sign up
            </SignInButton>
            <SignInButton className="text-[#fff] p-3 pt-[6px] pb-[6px] border-[#00000071] border-1 bg-[#ff5532] rounded-md hover:bg-[#f7431f] cursor-pointer">
              Login
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <button
              onClick={goToDashboard}
              className="text-[#fff] p-3 pt-[6px] pb-[6px] border-[#00000071] border-1 bg-[#ff5532] rounded-md hover:bg-[#f7431f] cursor-pointer"
            >
              Dashboard
            </button>
            <UserButton />
          </SignedIn>
        </ul>
      </nav>

      {/* Hero Section */}
      <div id="about-section" className="flex flex-col bg-[#f7f7f5] h-screen w-full p-7 pt-[100px]">
        <h1 className="text-[90px] p-0 m-0 flex flex-col font-semibold">
          <p>Find the right</p>
          <p className=" block relative bottom-7">
            <span className="text-[#ff5532]">careers</span> for you
          </p>
        </h1>
        <p className="text-[18px] font-medium block relative bottom-7">
          See your personalised recommendations <br /> based on your interests and goals
        </p>
        <img src={Pencil} alt="" className="absolute right-28 bottom-1 h-[70%]" />
        <img src={Star} alt="" className="absolute h-[6%] right-150 top-80 rotate-15" />
        <img src={Star} alt="" className="absolute h-[3%] right-20 bottom-20 rotate-25" />
        <div className="absolute right-1 top-35 flex">
          <img src={Person1} alt="" className="h-[60px] w-[60px] object-cover rounded-[50%]" />
          <img src={Person2} alt="" className="h-[60px] relative right-3 w-[60px] object-cover rounded-[50%]" />
          <img src={Person3} alt="" className="h-[60px] w-[60px] relative right-6  object-cover rounded-[50%]" />
          <img src={Person4} alt="" className="h-[60px] w-[60px]  relative right-9 object-cover rounded-[50%]" />
          <div className="h-[60px] w-[60px] rounded-[50%] border-1 relative right-12 bg-[#fccc42] font-bold items-center flex justify-center">
            +150
          </div>
        </div>
        <div className="gap-7 flex relative top-4">
          <button
            onClick={() => scrollToSection("courses-section")}
            className="border-1 border-[#00000045] pt-[10px] pb-[10px] pl-[20px] pr-[20px] rounded-xl cursor-pointer font-medium bg-[#ff5532] text-[#fff] hover:bg-[#f7431f] transition-colors"
          >
            Find course
          </button>
          <button
            onClick={() => scrollToSection("subjects-section")}
            className="text-md text-[#ff5532] cursor-pointer font-medium hover:text-[#d4411f] transition-colors"
          >
            View our blog ↗
          </button>
        </div>
        <div className="flex relative top-25  gap-8">
          <div className="border-1 flex flex-col justify-start items-start gap-2 rounded-3xl w-[200px] p-4">
            <span className="bg-[#be94f5] border-[#00000077] text-white border-1 p-1 pl-2 pr-2 rounded-xl">
              Education
            </span>
            <p className="font-medium text-[14px]">subjects</p>
            <h2 className="text-3xl font-bold">+40</h2>
          </div>
          <div className="border-1 bg-[#be94f5] flex justify-start items-start flex-col gap-2 rounded-3xl w-[200px] p-4">
            <span className="border-1 p-1 pl-2 pr-2 rounded-xl bg-[#fccc42]">Online</span>
            <p className="font-medium text-[14px]">opportunity</p>
            <h2 className="text-3xl font-bold">+120</h2>
          </div>
          <div className="border-1 bg-[#fccc42] flex flex-col justify-start items-start gap-2 rounded-3xl w-[200px] p-4">
            <span className="border-1 bg-[#fff] p-1 pl-2 pr-2 rounded-xl">Ratings 5.0</span>
            <p className="font-medium text-[14px]">learner reviews</p>
            <h2 className="text-3xl font-bold">+180k</h2>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div id="courses-section" className="h-screen bg-[#f7f7f5] relative top-[30px] p-7">
        <div>
          <h1 className="text-[80px] flex flex-col">
            <p className="font-semibold">
              Take your <span className="text-[#ff5532]">Knowledge</span>
            </p>
            <p className="relative bottom-8 font-semibold">a degree further</p>
          </h1>

          <div className="flex gap-5">
            {components.section2.buttons.map((button, index) => (
              <button
                className={`border-1 p-4 pt-2 pb-2 rounded-md cursor-pointer transition-colors ${activeFilter === button
                    ? "bg-[#ff5532] text-white border-[#ff5532]"
                    : "hover:bg-[#f0f0f0]"
                  }`}
                key={index}
                onClick={() => setActiveFilter(button)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
        <div className="absolute top-25 right-5 flex flex-col gap-5 justify-start items-start w-[25%]">
          <p className="border-1 p-2 rounded-mdb bg-[#fccc42] rounded-md">our courses</p>
          <p className="">Make education work for you with flexible online courses from leading schools</p>
        </div>
        <div className="relative top-10 flex flex-row gap-8  ">
          {[
            { img: card1, title: "Creative Writing for Beginners" },
            { img: card2, title: "Digital Marketing Masterclass" },
            { img: card3, title: "Introduction to Data Science" },
            { img: card4, title: "Web Development Bootcamp" },
            { img: card5, title: "Business Management Essentials" },
          ].map((card, index) => (
            <div key={index} className="border-1 border-[#00000073] rounded-xl p-2 flex flex-col gap-3 hover:shadow-lg transition-shadow">
              <img src={card.img} alt={card.title} className="h-[250px] rounded-xl" />
              <h3>{card.title}</h3>
              <button
                onClick={goToDashboard}
                className="border-1 p-1 rounded-md bg-[#ff5734] text-white border-[#0000006d] cursor-pointer hover:bg-[#e0471e] transition-colors"
              >
                more details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      <div id="skills-section" className="h-[80vh] p-8">
        <img src={Hand} alt="" className="absolute right-20 h-[490px]" />
        <div className="border-1 border-[#0000003d] h-[91%] bg-[#fccc42] pl-10 p-6 flex rounded-2xl flex-col gap-6 items-start">
          <h1 className="text-[50px] font-semibold">
            Upgrade your <span className="text-white">skills</span>
            <br />with <span className="text-white">FREE</span> online courses
            <br />
          </h1>
          <p className="w-[50%] font-medium">
            Discover free courses, scholarships, and personalized career guidance.
            Take our aptitude test and unlock AI-powered career recommendations
            tailored just for you.
          </p>
          <button
            onClick={goToDashboard}
            className="relative top-20 p-2 pr-4 pl-4 rounded-xl bg-black text-white cursor-pointer hover:bg-[#333] transition-colors"
          >
            Start now
          </button>
        </div>
      </div>

      {/* Subjects Section */}
      <div id="subjects-section" className="h-[90vh] p-8 pt-0">
        <div>
          <div className="flex justify-between">
            <h1 className="font-bold text-[70px]">
              Explore
              <br /> top <span className="text-[#ff5532]">subjects</span>
            </h1>
            <div className=" flex flex-col items-start gap-5 w-[30%]">
              <button className="border-1 p-1 rounded-md bg-[#fccc42]">Our Subjects</button>
              <p className="">We have the largest selection of subjects to study with our online courses</p>
            </div>
          </div>
          <div className="relative top-10 flex gap-4" ref={cardsRef}>
            {components.section4.buttons.map((button, index) => (
              <button
                className="border-1 p-2 rounded-2xl cursor-pointer hover:bg-[#ff5532] hover:text-white hover:border-[#ff5532] transition-all"
                key={index}
                onClick={goToDashboard}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
        <div className="flex relative gap-5 top-[80px] items-center justify-between ">
          <div className="flex flex-col gap-6 mt-[50px] pb-5 ">
            <p className="w-[40%] text-[20px]">
              Take our personalized aptitude test and let AI guide you to your perfect career.
              Explore top government colleges, discover scholarships, and build your roadmap to success.
            </p>
            <div className="flex gap-7">
              <button
                onClick={goToDashboard}
                className="p-2 bg-[#ff5532] rounded-md text-white cursor-pointer hover:bg-[#f7431f] transition-colors"
              >
                Explore courses
              </button>
              <button
                onClick={goToDashboard}
                className="bg-[#fff] pr-2 pl-2 rounded-md border-1 cursor-pointer hover:bg-[#f0f0f0] transition-colors"
              >
                view all subjects
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LandPage;
