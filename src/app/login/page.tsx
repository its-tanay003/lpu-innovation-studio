"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").endsWith("@lpu.in", "Only @lpu.in emails are allowed"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
        setIsLoading(false);
      } else {
        router.push(callbackUrl);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base px-4">
      {/* Circuit Background */}
      <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
      
      {/* Animated Glows */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-purple/20 rounded-full blur-[120px] animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass-dark p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center mb-4 shadow-neon-cyan">
              <Zap className="w-8 h-8 text-accent-cyan fill-accent-cyan" />
            </div>
            <h1 className="font-orbitron font-black text-2xl text-white tracking-tight uppercase">
              INNOVATION <span className="text-accent-cyan">STUDIO</span>
            </h1>
            <p className="font-exo2 text-white/40 text-xs tracking-[0.3em] uppercase mt-1">
              Lovely Professional University
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ x: -10 }}
              animate={{ x: 0 }}
              className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-xl mb-6 text-center font-exo2"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">
                LPU EMAIL
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="your.email@lpu.in"
                className={`w-full bg-white/5 border ${
                  errors.email ? "border-red-500/50" : "border-white/10"
                } rounded-xl px-4 py-3 text-white font-exo2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all`}
              />
              {errors.email && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">
                  PASSWORD
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[10px] font-bold text-accent-cyan/70 hover:text-accent-cyan uppercase tracking-wider transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full bg-white/5 border ${
                    errors.password ? "border-red-500/50" : "border-white/10"
                  } rounded-xl px-4 py-3 text-white font-exo2 focus:outline-none focus:ring-2 focus:ring-accent-cyan/50 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider ml-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 mt-4 font-orbitron font-black tracking-widest uppercase"
              leftIcon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            >
              {isLoading ? "AUTHENTICATING..." : "SIGN IN"}
            </Button>
          </form>

          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-white/40 text-xs font-exo2">
              New to the Studio?{" "}
              <Link
                href="/register"
                className="text-accent-cyan font-bold hover:underline transition-all"
              >
                Register as Student
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
