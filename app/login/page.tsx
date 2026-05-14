"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  useRouter,
} from "next/navigation";

import {
  Lock,
  Mail,
  ArrowRight,
} from "lucide-react";

import { motion } from "framer-motion";

import { auth } from "../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin =
    async () => {
      if (!email || !password) {
        alert(
          "Isi email dan password"
        );
        return;
      }

      try {
        setLoading(true);

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        router.push("/admin");
      } catch (error) {
        console.error(error);

        alert(
          "Email atau password salah"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#EFF6FF] via-[#F8FAFC] to-[#DBEAFE] overflow-hidden relative flex items-center justify-center px-5 py-10">
      {/* BLUR EFFECT */}
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] rounded-full bg-blue-300/30 blur-3xl" />

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] rounded-full bg-blue-200/40 blur-3xl" />

      {/* CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.7,
        }}
        className="relative w-full max-w-md"
      >
        {/* GLOW */}
        <div className="absolute inset-0 bg-[#2563EB]/20 blur-3xl rounded-[50px]" />

        <div className="relative bg-white/80 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[40px] p-8 md:p-10">
          {/* TOP */}
          <div className="text-center mb-10">
            <motion.div
              initial={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                delay: 0.2,
              }}
              className="relative inline-block"
            >
              <div className="absolute inset-0 bg-[#2563EB]/30 blur-2xl rounded-full" />

              <img
                src="/logo.png"
                alt="logo"
                className="relative w-28 h-28 rounded-full object-cover border-[5px] border-white shadow-2xl mx-auto"
              />
            </motion.div>

            <p className="text-[#2563EB] font-medium tracking-[0.2em] uppercase text-sm mt-6 mb-3">
              Warkop Biru Bunga
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-[#1E293B] leading-tight">
              Admin
              <span className="text-[#2563EB]">
                {" "}
                Login
              </span>
            </h1>

            <p className="text-slate-500 mt-4 leading-relaxed text-sm md:text-base">
              Kelola pesanan realtime,
              dashboard cafe, dan kitchen display.
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">
            <label className="text-sm font-semibold text-[#1E293B] block mb-3">
              Email Address
            </label>

            <div className="bg-white border border-blue-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm focus-within:border-[#2563EB] transition">
              <Mail className="text-[#2563EB]" />

              <input
                type="email"
                placeholder="admin@wbb.com"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="bg-transparent outline-none w-full text-[#1E293B] placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-8">
            <label className="text-sm font-semibold text-[#1E293B] block mb-3">
              Password
            </label>

            <div className="bg-white border border-blue-100 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-sm focus-within:border-[#2563EB] transition">
              <Lock className="text-[#2563EB]" />

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                className="bg-transparent outline-none w-full text-[#1E293B] placeholder:text-slate-400"
              />
            </div>
          </div>

          {/* BUTTON */}
          <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white py-4 rounded-2xl font-semibold shadow-xl transition flex items-center justify-center gap-3"
          >
            {loading
              ? "Loading..."
              : "Masuk Dashboard"}

            {!loading && (
              <ArrowRight size={20} />
            )}
          </motion.button>

          {/* FOOTER */}
          <div className="mt-8 text-center text-sm text-slate-500">
            © 2025 Warkop Biru Bunga
          </div>
        </div>
      </motion.div>
    </main>
  );
}
