"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Anchor, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: "#08080f" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(201,169,110,0.12)", border: "1px solid rgba(201,169,110,0.25)" }}>
            <Anchor size={24} style={{ color: "#c9a96e" }} />
          </div>
          <h1 className="text-white text-2xl font-light" style={{ fontFamily: "var(--font-cormorant)", fontSize: "28px" }}>
            Party Yacht Goa
          </h1>
          <p className="text-[11px] mt-1 tracking-[0.25em] uppercase" style={{ color: "rgba(201,169,110,0.6)", fontFamily: "var(--font-inter)" }}>
            Admin Console
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl p-7"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(20px)" }}>
          <h2 className="text-white text-base font-medium mb-1" style={{ fontFamily: "var(--font-inter)" }}>Sign in to your account</h2>
          <p className="text-[12px] mb-6" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}>
            Authorised personnel only
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 p-3 rounded-xl mb-4"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              <AlertCircle size={13} style={{ color: "#f87171" }} />
              <p className="text-[12px]" style={{ color: "#f87171", fontFamily: "var(--font-inter)" }}>{error}</p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@partyyachtgoa.com"
                className="w-full px-4 py-3 rounded-xl outline-none text-[13px] transition-all"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "var(--font-inter)",
                }}
              />
            </div>
            <div>
              <label className="block text-[11px] mb-1.5" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-inter)" }}>Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••••"
                  className="w-full px-4 py-3 pr-10 rounded-xl outline-none text-[13px] transition-all"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "var(--font-inter)",
                  }}
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2">
                  {showPass ? <EyeOff size={15} style={{ color: "rgba(255,255,255,0.3)" }} /> : <Eye size={15} style={{ color: "rgba(255,255,255,0.3)" }} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-[13px] font-semibold transition-all flex items-center justify-center gap-2"
              style={{
                background: loading ? "rgba(201,169,110,0.1)" : "rgba(201,169,110,0.2)",
                border: "1px solid rgba(201,169,110,0.35)",
                color: "#c9a96e",
                fontFamily: "var(--font-inter)",
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? <><Loader2 size={14} className="animate-spin" /> Signing in...</> : "Sign In"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] mt-6" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-inter)" }}>
          © 2025 Party Yacht Goa — Secure Admin Area
        </p>
      </motion.div>
    </div>
  );
}
