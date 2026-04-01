"use client";

import React from "react";
import Link from "next/link";
import { Github, Mail, ArrowLeft } from "lucide-react";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B0D17] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#FF6B6B]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-[440px] z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          Back to home
        </Link>

        <div className="bg-[#161925] border border-white/5 rounded-3xl p-8 md:p-10 shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400">Enter your details to access your dashboard</p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl transition-all font-medium">
              <Github size={20} /> Github
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 rounded-xl transition-all font-medium">
              <Mail size={20} /> Google
            </button>
          </div>

          <div className="relative mb-8 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <span className="relative px-4 bg-[#161925] text-xs text-slate-500 uppercase tracking-widest">Or continue with</span>
          </div>

          <LoginForm />

          <p className="mt-8 text-center text-slate-400 text-sm">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#FFB347] hover:underline font-medium">
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}