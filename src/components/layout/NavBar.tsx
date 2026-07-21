"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  FaBrain,
  FaSun,
  FaMoon,
  FaRightFromBracket,
  FaBars,
  FaXmark,
} from "react-icons/fa6";

export default function NavBar() {
  const { data: session, isPending } = authClient.useSession();
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/";
        },
      },
    });
  };

  const currentTheme = mounted ? resolvedTheme : "dark";

  const linkStyle = (path: string) =>
    `text-sm font-medium transition-colors hover:text-purple-500 flex items-center gap-1.5 ${
      pathname === path
        ? "text-purple-600 dark:text-purple-400 font-semibold"
        : "text-zinc-600 dark:text-zinc-400"
    }`;

  const mobileLinkStyle = (path: string) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
      pathname === path
        ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400"
        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur supports-backdrop-filter:bg-white/60 dark:supports-backdrop-filter:bg-zinc-950/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* লোগো */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-3xl font-bold bg-linear-to-r from-purple-600 to-indigo-500 dark:from-purple-400 dark:to-indigo-300 bg-clip-text text-transparent">
            Intelecture
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className={linkStyle("/")}>
            Home
          </Link>
          <Link href="/topics" className={linkStyle("/topics")}>
            Explore Topics
          </Link>

          {session && (
            <>
              <Link href="/dashboard" className={linkStyle("/dashboard")}>
                Dashboard
                <FaBrain className="h-3 w-3 text-purple-500 animate-pulse" />
              </Link>
              <Link
                href="/topics/manage"
                className={linkStyle("/topics/manage")}
              >
                Manage Topics
              </Link>
              <Link href="/chat" className={linkStyle("/chat")}>
                Chat
                <FaBrain className="h-3 w-3 text-purple-500 animate-pulse" />
              </Link>
              <Link
                href="/dashboard/analytics"
                className={linkStyle("/dashboard/analytics")}
              >
                Analytics
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {currentTheme === "dark" ? (
              <FaSun className="h-4 w-4 text-amber-500" />
            ) : (
              <FaMoon className="h-4 w-4 text-purple-600" />
            )}
          </button>

          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          ) : session ? (
            <div className="hidden sm:flex items-center space-x-3">
              <span className="hidden sm:inline-block text-sm max-w-30 truncate font-medium text-zinc-700 dark:text-zinc-300">
                {session.user.name}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-xs font-medium text-red-500 dark:text-red-400 border border-red-500/20 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <FaRightFromBracket className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          ) : (
            <Link href="/signin" className="hidden sm:block">
              <button className="flex items-center bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium text-xs px-4 py-2 rounded-lg gap-2 transition-colors cursor-pointer shadow-lg shadow-purple-500/20">
                Sign In
                <FaBrain className="h-3.5 w-3.5" />
              </button>
            </Link>
          )}

          {/* Hamburger — শুধু মোবাইলে দেখাবে */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaXmark className="h-4 w-4" />
            ) : (
              <FaBars className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 space-y-1">
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/"
            className={mobileLinkStyle("/")}
          >
            Home
          </Link>
          <Link
            onClick={() => setMobileMenuOpen(false)}
            href="/topics"
            className={mobileLinkStyle("/topics")}
          >
            Explore Topics
          </Link>

          {session && (
            <>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard"
                className={mobileLinkStyle("/dashboard")}
              >
                <FaBrain className="h-3 w-3 text-purple-500" /> Dashboard
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/topics/manage"
                className={mobileLinkStyle("/topics/manage")}
              >
                Manage Topics
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/chat"
                className={mobileLinkStyle("/chat")}
              >
                <FaBrain className="h-3 w-3 text-purple-500" /> Chat
              </Link>
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/dashboard/analytics"
                className={mobileLinkStyle("/dashboard/analytics")}
              >
                Analytics
              </Link>
            </>
          )}

          <div className="pt-3 mt-2 border-t border-zinc-200 dark:border-zinc-800">
            {session ? (
              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-500 dark:text-red-400 border border-red-500/20 hover:bg-red-500/10 px-4 py-2.5 rounded-lg transition-colors"
              >
                <FaRightFromBracket className="h-4 w-4" /> Sign Out
              </button>
            ) : (
              <Link
                onClick={() => setMobileMenuOpen(false)}
                href="/signin"
                className="block"
              >
                <button className="w-full flex items-center justify-center bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm px-4 py-2.5 rounded-lg gap-2">
                  Sign In <FaBrain className="h-3.5 w-3.5" />
                </button>
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
