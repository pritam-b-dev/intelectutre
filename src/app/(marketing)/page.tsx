"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaRobot,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCrown,
} from "react-icons/fa";
import { checkBackendHealth } from "@/lib/api/client";

export default function HomePage() {
  const [status, setStatus] = useState<string>("Checking...");

  useEffect(() => {
    checkBackendHealth()
      .then((res) => {
        setStatus(`Online (${res.status})`);
        toast.success("Successfully connected to B2 Backend!");
      })
      .catch(() => {
        setStatus("Offline / Disconnected");
        toast.error("Could not connect to B2 Backend!");
      });
  }, []);

  return (
    <main className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <FaRobot className="text-4xl text-[#91008D]" />
        <h1 className="text-4xl font-bold text-[#00E0BA]">
          Intellecture Design System
        </h1>
      </div>

      <p className="text-zinc-400">
        Fonts Loaded: Space Grotesk (Headings), Inter (Body), JetBrains Mono
        (Data).
      </p>

      {/* Backend Status Card */}
      <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
        <span className="text-zinc-400">Backend Connection (B2):</span>
        <span className="font-mono font-semibold text-[#00E0BA] flex items-center gap-2">
          {status}
        </span>
      </div>

      {/* Design System Colors + React Icons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#00E0BA] text-zinc-950 font-bold flex flex-col justify-between h-28">
          <div className="flex justify-between items-center">
            <span>Primary</span>
            <FaCheckCircle className="text-xl" />
          </div>
          <span className="font-mono text-sm">#00E0BA</span>
        </div>

        <div className="p-4 rounded-xl bg-[#91008D] text-white font-bold flex flex-col justify-between h-28">
          <div className="flex justify-between items-center">
            <span>AI Tutor</span>
            <FaRobot className="text-xl" />
          </div>
          <span className="font-mono text-sm">#91008D</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FF3483] text-white font-bold flex flex-col justify-between h-28">
          <div className="flex justify-between items-center">
            <span>Alert</span>
            <FaExclamationTriangle className="text-xl" />
          </div>
          <span className="font-mono text-sm">#FF3483</span>
        </div>

        <div className="p-4 rounded-xl bg-[#FFCF00] text-zinc-950 font-bold flex flex-col justify-between h-28">
          <div className="flex justify-between items-center">
            <span>Premium</span>
            <FaCrown className="text-xl" />
          </div>
          <span className="font-mono text-sm">#FFCF00</span>
        </div>
      </div>
    </main>
  );
}
