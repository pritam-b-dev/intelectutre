"use client";

import * as React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { FaBrain, FaGoogle, FaSpinner, FaUserCheck } from "react-icons/fa6";

export default function SignInPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  // 🌟 catch (err) এর জায়গায় শুধু catch (_) করে দিন
  const handleDemoLogin = async () => {
    const demoEmail = "demo@intelecture.com";
    const demoPassword = "Password123";

    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLoading(true);

    try {
      await authClient.signIn.email({
        email: demoEmail,
        password: demoPassword,
        callbackURL: "/dashboard",
      });
      toast.success("Logged in as Demo User!");
    } catch {
      toast.error("Demo login failed");
      setIsLoading(false);
    }
  };
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }

    setIsLoading(true);
    await authClient.signIn.email({
      email,
      password,
      callbackURL: "/dashboard",
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Invalid email or password");
          setIsLoading(false);
        },

        onSuccess: () => {
          toast.success("Welcome back to Intelecture!");
        },
      },
    });
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}/callback`,
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Google sign in failed");
          setIsGoogleLoading(false);
        },
      },
    });
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center mx-auto px-4">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] border border-zinc-800 p-6 rounded-xl bg-zinc-900/50 shadow-xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex flex-col space-y-2 text-center">
          <FaBrain className="mx-auto h-8 w-8 text-purple-500 animate-pulse" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome Back
          </h1>
          <p className="text-sm text-zinc-400">
            Sign in to continue your learning journey
          </p>
        </div>

        {/* Credentials Form */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-200"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isGoogleLoading}
              required
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="text-sm font-medium text-zinc-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || isGoogleLoading}
              required
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm py-2 rounded-lg gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || isGoogleLoading}
          >
            {isLoading ? (
              <FaSpinner className="h-4 w-4 animate-spin" />
            ) : (
              "Sign In with Email"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <span className="absolute w-full border-t border-zinc-800" />
          <span className="relative bg-zinc-900 px-2 text-[10px] text-zinc-400 uppercase tracking-wider">
            Or continue with
          </span>
        </div>

        {/* 🌟 ২. রিকোয়ার্ড ডেমো লগইন বাটন যুক্ত করা হলো */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-dashed border-purple-500/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDemoLogin}
          disabled={isLoading || isGoogleLoading}
        >
          <FaUserCheck className="h-4 w-4 text-purple-400" />
          Explore with Demo Account
        </button>

        {/* Social Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-zinc-800 bg-transparent hover:bg-zinc-800 text-zinc-200 text-sm font-medium py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
        >
          {isGoogleLoading ? (
            <FaSpinner className="h-4 w-4 animate-spin" />
          ) : (
            <FaGoogle className="h-4 w-4 text-red-500" />
          )}
          Continue with Google
        </button>

        {/* Footer Link */}
        <p className="px-8 text-center text-sm text-zinc-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="hover:text-purple-400 underline underline-offset-4 font-medium text-zinc-200"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
