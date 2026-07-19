"use client";

import * as React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-hot-toast";
import { FaBrain, FaSpinner } from "react-icons/fa6";

export default function SignUpPage() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.error("Please fill in all fields");
    }
    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long");
    }

    setIsLoading(true);
    await authClient.signUp.email({
      email,
      password,
      name,
      callbackURL: "/dashboard",
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message || "Registration failed. Try again.");
          setIsLoading(false);
        },

        onSuccess: () => {
          toast.success(
            "Account created successfully! Welcome to Intelecture.",
          );
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
            Create an Account
          </h1>
          <p className="text-sm text-zinc-400">
            Get started with your customized AI learning engine
          </p>
        </div>

        {/* SignUp Form */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-zinc-200">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-zinc-200"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
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
              disabled={isLoading}
              required
              className="w-full px-3 py-2 rounded-lg border border-zinc-800 bg-zinc-950 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-medium text-sm py-2 rounded-lg gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <FaSpinner className="h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="px-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="hover:text-purple-400 underline underline-offset-4 font-medium text-zinc-200"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
