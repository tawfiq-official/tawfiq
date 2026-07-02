import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, ArrowLeft, Send, MoonStar, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleReset = () => {
    setLoading(true);

    // Temporary simulation
    setTimeout(() => {
      setLoading(false);
      setEmailSent(true);
    }, 1500);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden py-12 bg-[length:300%_300%] animate-gradient"
      style={{
        background: "linear-gradient(135deg,#dffcf0,#b7f7d7,#ffffff,#d7fbe8)",
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-green-300/30 animate-float"
            style={{
              width: `${8 + Math.random() * 8}px`,
              height: `${8 + Math.random() * 8}px`,
              left: `${10 + Math.random() * 80}%`,
              animationDuration: `${8 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 5}s`,
              bottom: "-20px",
            }}
          />
        ))}

        <div className="absolute w-72 h-72 rounded-full bg-green-200/20 blur-3xl -top-20 -left-20 animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="absolute w-80 h-80 rounded-full bg-emerald-200/15 blur-3xl bottom-0 right-0 animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center shadow-lg">
            <MoonStar size={34} className="text-white" />
          </div>

          <p className="text-green-700 font-bold tracking-[0.25em] mt-3 text-xl tracking-wide">
            Tawfiq
          </p>

          <h1 className="text-4xl font-black mt-3 tracking-tight">
            Forgot Password
          </h1>

          <p className="text-muted-foreground mt-3 leading-relaxed">
            Enter your email address and we'll send you a password reset link.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="w-36 h-36 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
            <Mail size={60} className="text-green-600" />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_60px_rgba(16,185,129,0.15)] p-8">
          {!emailSent ? (
            <>
              {/* Email */}

              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Email Address
                </label>

                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                    <Mail size={18} className="text-green-700" />
                  </div>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full rounded-2xl border border-slate-200 hover:border-green-300 focus:border-green-500 placeholder:text-slate-400 pl-20 pr-4 h-14 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  />
                </div>
              </div>

              {/* Send Button */}

              <button
                onClick={handleReset}
                disabled={loading || !email.trim()}
                className="
w-full
mt-8
rounded-3xl
bg-gradient-to-r
from-green-600
to-emerald-600
hover:from-green-700
hover:to-emerald-700
text-white
font-semibold
py-4
flex
items-center
justify-center
gap-2
shadow-xl
hover:shadow-green-300
transition-all
duration-300
hover:-translate-y-1
active:scale-95
disabled:opacity-70
disabled:cursor-not-allowed
 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Reset Link...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Reset Link
                  </>
                )}
              </button>
            </>
          ) : (
            <>
              {/* Success */}

              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-green-400 blur-xl opacity-30 animate-pulse" />

                    <div className="relative w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 size={42} className="text-green-600" />
                    </div>
                  </div>
                </div>

                <h2 className="text-2xl font-bold">Check Your Email</h2>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                  <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />

                  <span className="text-sm font-semibold text-green-700">
                    Reset Link Sent
                  </span>
                </div>

                <p className="text-muted-foreground mt-3 leading-relaxed">
                  We've sent a password reset link to
                  <span className="font-semibold text-green-700"> {email}</span>
                </p>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-8 w-full rounded-3xl bg-green-600 hover:bg-green-700 text-white py-4 font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ArrowLeft size={18} />
                  Back to Login
                </button>
              </div>
            </>
          )}

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Didn't receive the email?
            </p>

            <button
              disabled
              className="mt-2 text-green-700 font-semibold opacity-50 cursor-not-allowed"
            >
              Resend in 30s
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-green-700 font-semibold hover:underline inline-flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
            <div className="mt-8 rounded-2xl bg-green-50 border border-green-100 p-4">
              <p className="text-sm text-center text-green-800 leading-relaxed">
                🔒 For your security, password reset links expire after a short
                period.
              </p>
            </div>
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white/60 backdrop-blur p-4">
              <h3 className="font-semibold">Need Help?</h3>

              <p className="text-sm text-muted-foreground mt-2">
                Make sure you entered the same email address used to create your
                account.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
