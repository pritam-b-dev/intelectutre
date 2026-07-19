"use client";

import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { FaGoogle, FaLock, FaEnvelope, FaLaptopCode } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    setLoading(true);
    try {
      await signIn.email({
        email,
        password,
        callbackURL: "/dashboard",
      });
      toast.success("Welcome back!");
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Invalid credentials. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signIn.social({
        provider: "google",
        callbackURL: `${window.location.origin}/callback`,
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Google authentication failed";
      toast.error(errorMessage);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@intelecture.com");
    setPassword("DemoPassword123");
    toast.success("Demo credentials loaded! Click Sign In.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4 py-12 transition-colors duration-200">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 space-y-6 shadow-xl transition-colors duration-200">
        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-teal-brand font-heading">
            Welcome Back
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-body">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-xl border border-zinc-200 dark:border-zinc-700 transition duration-200 cursor-pointer"
        >
          <FaGoogle className="text-rose-500 text-lg" />
          <span className="font-heading text-sm">Continue with Google</span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-4 text-xs text-zinc-400 dark:text-zinc-500 uppercase before:flex-1 before:border-t before:border-zinc-200 before:dark:border-zinc-800 before:mr-3 after:flex-1 after:border-t after:border-zinc-200 after:dark:border-zinc-800 after:ml-3 font-mono">
          Or with credentials
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-heading">
              Email Address
            </label>
            <div className="relative flex items-center">
              <FaEnvelope className="absolute left-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-teal-brand dark:focus:border-teal-brand transition text-sm font-body"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 font-heading">
              Password
            </label>
            <div className="relative flex items-center">
              <FaLock className="absolute left-4 text-zinc-400 dark:text-zinc-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-teal-brand dark:focus:border-teal-brand transition text-sm font-body"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-teal-brand text-zinc-950 font-bold rounded-xl hover:bg-[#00c4a3] transition duration-200 disabled:opacity-50 font-heading cursor-pointer shadow-md shadow-teal-brand/10"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Demo Login Button */}
        <button
          onClick={handleDemoLogin}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-transparent border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-teal-brand dark:hover:border-teal-brand text-zinc-600 dark:text-zinc-300 hover:text-teal-brand dark:hover:text-teal-brand font-medium text-sm rounded-xl transition duration-200 cursor-pointer"
        >
          <FaLaptopCode />
          <span className="font-heading">Auto-fill Demo Account</span>
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 font-body">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-teal-brand hover:underline font-semibold"
          >
            Sign up free
          </Link>
        </p>
      </div>
    </div>
  );
}
