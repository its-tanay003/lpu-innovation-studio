"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Camera, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Loader2,
  Zap,
  BookOpen,
  Calendar
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const step1Schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email").endsWith("@lpu.in", "Only @lpu.in emails are allowed"),
  lpuId: z.string().regex(/^\d+$/, "LPU ID must be numeric"),
  branch: z.string().min(2, "Branch is required"),
  year: z.string().min(1, "Year is required"),
});

const step2Schema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const step3Schema = z.object({
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  image: z.string().optional(),
});

type FormData = z.infer<typeof step1Schema> & z.infer<typeof step2Schema> & z.infer<typeof step3Schema>;

const STEPS = [
  { id: 1, title: "Identity", icon: User },
  { id: 2, title: "Security", icon: Lock },
  { id: 3, title: "Profile", icon: Camera },
  { id: 4, title: "Confirm", icon: Check },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(
      currentStep === 1 ? step1Schema : currentStep === 2 ? step2Schema : step3Schema
    ),
    mode: "onChange",
  });

  const formData = watch();

  const nextStep = async () => {
    const fields = currentStep === 1 
      ? ["name", "email", "lpuId", "branch", "year"] 
      : currentStep === 2 
      ? ["password", "confirmPassword"] 
      : ["bio"];
    
    const isValid = await trigger(fields as any);
    if (isValid) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-base px-4 py-12">
      {/* Circuit Background */}
      <div className="absolute inset-0 bg-circuit opacity-10 pointer-events-none" />
      
      <div className="w-full max-w-2xl relative z-10">
        <div className="glass-dark p-8 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-12 h-12 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center mb-4 shadow-neon-cyan">
              <Zap className="w-6 h-6 text-accent-cyan fill-accent-cyan" />
            </div>
            <h1 className="font-orbitron font-black text-xl text-white tracking-tight uppercase">
              STUDENT <span className="text-accent-cyan">REGISTRATION</span>
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-white/5 -translate-y-1/2" />
            <motion.div 
              className="absolute top-1/2 left-0 h-[2px] bg-accent-cyan -translate-y-1/2 shadow-neon-cyan"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
            <div className="relative flex justify-between">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                      currentStep >= step.id 
                        ? "bg-accent-cyan border-accent-cyan text-bg-base shadow-neon-cyan scale-110" 
                        : "bg-bg-surface border-white/10 text-white/30"
                    }`}
                  >
                    <step.icon size={18} />
                  </div>
                  <span className={`text-[10px] font-orbitron font-bold uppercase tracking-widest mt-2 transition-colors ${
                    currentStep >= step.id ? "text-accent-cyan" : "text-white/20"
                  }`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-xl mb-6 text-center font-exo2">
              {error}
            </div>
          )}

          {/* Form Steps */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">FULL NAME</label>
                      <input {...register("name")} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none" />
                      {errors.name && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">LPU EMAIL</label>
                      <input {...register("email")} placeholder="john.123@lpu.in" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none" />
                      {errors.email && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">LPU ID</label>
                      <input {...register("lpuId")} placeholder="12104567" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none" />
                      {errors.lpuId && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.lpuId.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">BRANCH</label>
                      <input {...register("branch")} placeholder="B.Tech CSE" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none" />
                      {errors.branch && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.branch.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">YEAR</label>
                      <select {...register("year")} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none appearance-none">
                        <option value="" className="bg-bg-surface">Select Year</option>
                        <option value="1" className="bg-bg-surface">1st Year</option>
                        <option value="2" className="bg-bg-surface">2nd Year</option>
                        <option value="3" className="bg-bg-surface">3rd Year</option>
                        <option value="4" className="bg-bg-surface">4th Year</option>
                      </select>
                      {errors.year && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.year.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="space-y-2">
                    <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">PASSWORD</label>
                    <input {...register("password")} type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none" />
                    {errors.password && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.password.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">CONFIRM PASSWORD</label>
                    <input {...register("confirmPassword")} type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none" />
                    {errors.confirmPassword && <p className="text-red-500 text-[10px] font-bold uppercase ml-1">{errors.confirmPassword.message}</p>}
                  </div>
                  <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                    <h4 className="text-[10px] font-orbitron font-bold text-white/50 uppercase mb-2">Password Requirements:</h4>
                    <ul className="text-[10px] font-exo2 space-y-1">
                      <li className={`flex items-center space-x-2 ${watch("password")?.length >= 8 ? "text-accent-green" : "text-white/20"}`}>
                        <Check size={10} /> <span>Min 8 characters</span>
                      </li>
                      <li className={`flex items-center space-x-2 ${/[A-Z]/.test(watch("password") || "") ? "text-accent-green" : "text-white/20"}`}>
                        <Check size={10} /> <span>One uppercase letter</span>
                      </li>
                      <li className={`flex items-center space-x-2 ${/[0-9]/.test(watch("password") || "") ? "text-accent-green" : "text-white/20"}`}>
                        <Check size={10} /> <span>One number</span>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center relative group cursor-pointer hover:border-accent-cyan/50 transition-all">
                      <Camera className="text-white/20 group-hover:text-accent-cyan transition-colors" size={32} />
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                    <span className="text-[10px] font-orbitron font-bold text-white/30 uppercase mt-3 tracking-widest">UPLOAD PHOTO (OPTIONAL)</span>
                  </div>
                  <div className="space-y-2">
                    <label className="font-orbitron text-[10px] font-bold text-white/50 uppercase tracking-widest ml-1">SHORT BIO</label>
                    <textarea {...register("bio")} rows={4} placeholder="Tell us about your interests in innovation..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-exo2 focus:ring-2 focus:ring-accent-cyan/50 transition-all outline-none resize-none" />
                    <div className="flex justify-end">
                      <span className="text-[10px] font-mono text-white/20">{(watch("bio") || "").length}/200</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center space-x-4 pb-4 border-b border-white/5">
                      <div className="w-12 h-12 rounded-full bg-accent-cyan/10 flex items-center justify-center">
                        <User className="text-accent-cyan" size={20} />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{formData.name}</h4>
                        <p className="text-xs text-white/40 font-exo2">{formData.email}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-[10px] font-orbitron uppercase tracking-widest">
                      <div>
                        <span className="text-white/30 block mb-1">LPU ID</span>
                        <span className="text-white">{formData.lpuId}</span>
                      </div>
                      <div>
                        <span className="text-white/30 block mb-1">BRANCH</span>
                        <span className="text-white">{formData.branch}</span>
                      </div>
                      <div>
                        <span className="text-white/30 block mb-1">YEAR</span>
                        <span className="text-white">{formData.year} Year</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] font-exo2 text-white/30 text-center px-4">
                    By clicking submit, you agree to the LPU Innovation Studio terms of service and code of conduct.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10">
              {currentStep > 1 ? (
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={prevStep}
                  leftIcon={<ChevronLeft size={16} />}
                >
                  BACK
                </Button>
              ) : (
                <Link href="/login" className="text-[10px] font-orbitron font-bold text-white/30 hover:text-white uppercase tracking-widest transition-colors">
                  ALREADY REGISTERED?
                </Link>
              )}

              {currentStep < 4 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  rightIcon={<ChevronRight size={16} />}
                >
                  NEXT STEP
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="px-8 shadow-neon-cyan"
                  leftIcon={isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check size={16} />}
                >
                  {isLoading ? "SUBMITTING..." : "COMPLETE REGISTRATION"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
