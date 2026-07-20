import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 py-20 px-6 transition-colors">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Our Mission: Redefining Education
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Empower learners with AI-guided personalized learning paths to
            achieve mastery faster and smarter.
          </p>
        </div>

        {/* The Why (Problem & Solution) */}
        <div className="grid md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900/60 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-600 dark:text-purple-400">
              The Problem
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              Traditional education systems often rely on a{" "}
              <strong className="text-zinc-900 dark:text-zinc-100">
                one size fits all
              </strong>{" "}
              approach. Learners get stuck, lose motivation, or struggle to find
              the right resources that match their specific learning pace and
              style.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-teal-600 dark:text-teal-400">
              Our Solution
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm sm:text-base">
              Intelecture leverages advanced AI to map your unique knowledge
              gaps. We curate study plans, generate explanations, and track your
              progress so you spend less time searching and more time
              understanding.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 dark:text-zinc-100">
            What We Believe In
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {["Mastery-First", "Accessible AI", "User-Centric"].map((val) => (
              <div
                key={val}
                className="p-6 bg-white/80 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:border-purple-300 dark:hover:border-purple-500/30 transition-all"
              >
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 text-base">
                  {val}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  We design tools that prioritize long-term retention over rote
                  memorization.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
