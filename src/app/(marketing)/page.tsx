"use client";

import React, { useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  FiTrendingUp,
  FiBookOpen,
  FiPlusCircle,
  FiCompass,
  FiCheckCircle,
  FiChevronDown,
  FiArrowRight,
} from "react-icons/fi";
import { FaGithub, FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { HiSparkles, HiChatBubbleLeftRight } from "react-icons/hi2";

const fadeInScale: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is Intelecture?",
      a: "Intelecture is an advanced AI-powered learning assistant designed to help students and professionals master complex concepts efficiently through personalized paths and interactive conversations.",
    },
    {
      q: "How does the AI help me learn?",
      a: "Our AI analyzes your current knowledge level, breaks down difficult topics into digestible modules, recommends relevant learning tracks, and serves as a 24/7 personal tutor to answer your questions.",
    },
    {
      q: "Is it free to use?",
      a: "Intelecture offers a comprehensive free tier that includes core AI feature access and tracking. We also offer premium upgrades for unlimited deep-dive AI explanations and advanced analytics.",
    },
    {
      q: "Can I track my progress over time?",
      a: "Yes! Every topic you explore, note you create, and milestone you achieve is visually mapped out in your personalized learning dashboard.",
    },
    {
      q: "Can I import my own study materials?",
      a: "Absolutely. You can add your custom topics, paste syllabus contents, or let the AI automatically generate comprehensive concept nodes for your specific curriculum.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-purple-500 selection:text-white overflow-hidden transition-colors duration-300">
      {/* SECTION 1: HERO */}
      {/* 🌟 Tailwind Canonical ফিক্স: আন্ডারস্কোর সরিয়ে স্পেস অ্যাডজাস্ট করা হয়েছে */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center px-4 md:px-8 text-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-purple-100/40 via-white to-white dark:from-purple-950/30 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-900">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto z-10 space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 rounded-full border border-purple-200 dark:border-purple-800/50 backdrop-blur-sm">
            <HiSparkles className="w-3.5 h-3.5" /> Next-Generation AI Learning
            Platform
          </div>

          {/* 🌟 bg-gradient-to-r কে লেটেস্ট bg-linear-to-r এ রূপান্তর */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-transparent dark:bg-clip-text dark:bg-linear-to-r dark:from-slate-100 dark:via-purple-100 dark:to-purple-400">
            Learn Smarter with <br className="hidden sm:inline" /> AI Guidance
          </h1>

          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Master any subject with an adaptive AI tutor that syncs with your
            learning pace, breaks down complex topics, and dynamically generates
            tailored study paths just for you.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-500 transition-colors shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 group">
              Get Started Free{" "}
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-all">
              Explore Learning Paths
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: FEATURES */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInScale}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
            Supercharge Your Mind
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Everything you need to break down hard academic walls and understand
            topics crystal clear.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {[
            {
              icon: (
                <HiSparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              ),
              title: "AI-Powered Recommendations",
              desc: "Receive smart content nodes and critical reading steps calculated from your strengths and goals.",
            },
            {
              icon: (
                <HiChatBubbleLeftRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ),
              title: "Smart Chat Tutor",
              desc: "Stuck on a problem? Speak directly to an AI companion trained to explain theories in plain language.",
            },
            {
              icon: (
                <FiTrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              ),
              title: "Progress Tracking",
              desc: "Watch your knowledge graphs expand visually as you review concepts and hit learning milestones.",
            },
            {
              icon: (
                <FiBookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ),
              title: "Personalized Learning",
              desc: "An adaptive platform layout that shifts based on whether you are a complete beginner or advanced.",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInScale}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 hover:border-purple-300 dark:hover:border-purple-900/50 hover:bg-white dark:hover:bg-slate-900/80 transition-all group"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 group-hover:border-purple-400 transition-colors mb-5">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 3: HOW IT WORKS */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInScale}
          className="text-center max-w-2xl mx-auto mb-20 space-y-3"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
            Three Steps to Mastery
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Intelecture streamlines your study workflow without any cognitive
            friction.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 relative"
        >
          {[
            {
              step: "01",
              icon: (
                <FiPlusCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              ),
              title: "Add Your Topics",
              desc: "Type in any academic subject, upload text, or paste a complex concept you want to conquer.",
            },
            {
              step: "02",
              icon: (
                <FiCompass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              ),
              title: "AI Guides You",
              desc: "The system dynamically builds specialized modules, notes, and conversational check-ins for you.",
            },
            {
              step: "03",
              icon: (
                <FiCheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              ),
              title: "Track Your Progress",
              desc: "Verify your confidence level, see analytics shift to green, and achieve complete mastery.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInScale}
              className="relative flex flex-col items-start p-6 bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-900 rounded-2xl"
            >
              <div className="absolute top-4 right-6 text-5xl font-black text-slate-200 dark:text-slate-900 select-none">
                {item.step}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200">
                  {item.title}
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed z-10">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 4: STATS */}
      {/* 🌟 bg-gradient-to-b -> bg-linear-to-b ফিক্স */}
      <section className="py-20 px-4 md:px-8 bg-linear-to-b from-transparent to-purple-50/50 dark:to-purple-950/10 border-b border-slate-200 dark:border-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
          >
            {[
              { val: "1,000+", label: "Active Learners" },
              { val: "5,000+", label: "Concepts Mastered" },
              { val: "50K+", label: "AI Conversations" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeInScale}
                className="p-6 space-y-2"
              >
                {/* 🌟 bg-gradient-to-r -> bg-linear-to-r ফিক্স */}
                <div className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">
                  {stat.val}
                </div>
                <div className="text-sm font-medium tracking-wide text-slate-500 dark:text-slate-400 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: TESTIMONIALS */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-b border-slate-200 dark:border-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInScale}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
            Loved by Modern Thinkers
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Read how learners are leveraging Intelecture to transform their
            workflow.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              quote:
                "Intelecture completely changed how I prepare for tech interviews. The conversational AI tutor explains data structures way better than conventional docs.",
              author: "Alex Rivera",
              role: "Software Engineering Student",
            },
            {
              quote:
                "The personalized recommendation paths kept me structured. I managed to master complex data models in half the time I originally budgeted.",
              author: "Sarah Jenkins",
              role: "Data Analyst",
            },
            {
              quote:
                "I love the clean graph visualizer. Seeing my topics shift to high mastery score gives a tangible feeling of productivity and mental progress.",
              author: "David Chen",
              role: "Self-Taught Developer",
            },
          ].map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInScale}
              className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-900 flex flex-col justify-between"
            >
              {/* 🌟 ESLint HTML Entity Escape ফিক্স করা হয়েছে এখানে */}
              <p className="text-slate-700 dark:text-slate-300 italic text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <h5 className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {t.author}
                </h5>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {t.role}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="py-24 px-4 md:px-8 max-w-4xl mx-auto border-b border-slate-200 dark:border-slate-900">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInScale}
          className="text-center mb-16 space-y-3"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900 dark:text-slate-100">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Got a question? We have answers right here.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-800 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                <span>{faq.q}</span>
                <FiChevronDown
                  className={`w-4 h-4 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${openFaq === idx ? "rotate-180 text-purple-600 dark:text-purple-400" : ""}`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-950/50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: CTA SECTION */}
      {/* 🌟 Tailwind Canonical ফিক্স এখানেও করা হলো */}
      <section className="py-24 px-4 text-center bg-[radial-gradient(ellipse_at_bottom,var(--tw-gradient-stops))] from-purple-100/30 via-white to-white dark:from-purple-950/20 dark:via-slate-950 dark:to-slate-950 border-b border-slate-200 dark:border-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Start Learning Today
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto text-sm sm:text-base">
            Join thousands of active learners breaking down hard subjects and
            managing academic targets with AI.
          </p>
          <div className="pt-4">
            <button className="px-8 py-4 bg-purple-600 hover:bg-purple-500 font-semibold text-sm text-white rounded-xl shadow-xl shadow-purple-600/10 hover:shadow-purple-600/20 transition-all">
              Create Free Account
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: FOOTER */}
      <footer className="py-16 px-4 md:px-8 max-w-7xl mx-auto text-slate-500 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-800 dark:text-slate-200">
              <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center text-xs text-white">
                I
              </div>
              Intelecture
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              An intelligent companion architecture custom tailored for
              accelerated conceptual optimization.
            </p>
          </div>
          <div>
            <h6 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4">
              Product
            </h6>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-slate-300 transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-slate-300 transition-colors"
                >
                  Pricing Tracks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-slate-300 transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4">
              Company
            </h6>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-slate-300 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-slate-300 transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-purple-600 dark:hover:text-slate-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h6 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider mb-4">
              Connect With Us
            </h6>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p>Email: support@intelecture.edu</p>
              <p>Location: Innovation Lab, Suite 404</p>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
              >
                <FaXTwitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <p>
            © {new Date().getFullYear()} Intelecture Systems Inc. All rights
            reserved.
          </p>
          <p className="text-slate-400 dark:text-slate-600">
            Designed for autonomous learning efficiency.
          </p>
        </div>
      </footer>
    </div>
  );
}
