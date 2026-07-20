import React from "react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold tracking-tight text-white">
            Our Mission: Redefining Education
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Empower learners with AI-guided personalized learning paths to
            achieve mastery faster and smarter.
          </p>
        </div>

        {/* The Why */}
        <div className="grid md:grid-cols-2 gap-8 bg-zinc-900 p-8 rounded-3xl border border-zinc-800">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-purple-400">
              The Problem
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Traditional education systems often rely on a{" "}
              <strong>one size fits all</strong>
              approach. Learners get stuck, lose motivation, or struggle to find
              the right resources that match their specific learning pace and
              style.
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-teal-400">
              Our Solution
            </h2>
            <p className="text-zinc-300 leading-relaxed">
              Intelecture leverages advanced AI to map your unique knowledge
              gaps. We curate study plans, generate explanations, and track your
              progress so you spend less time searching and more time
              understanding.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">What We Believe In</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {["Mastery-First", "Accessible AI", "User-Centric"].map((val) => (
              <div
                key={val}
                className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl"
              >
                <h3 className="font-semibold text-white mb-2">{val}</h3>
                <p className="text-zinc-500 text-sm">
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
