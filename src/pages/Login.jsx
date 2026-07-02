import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Chrome,
  ArrowRight,
  MoonStar,
  Clock3,
  BookOpen,
  HandHeart,
  Compass,
  Map,
  BarChart3,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("remember_email");

    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    setLoading(true);

    if (rememberMe) {
      localStorage.setItem("remember_email", email);
    } else {
      localStorage.removeItem("remember_email");
    }

    // Temporary login simulation
    setTimeout(() => {
      setLoading(false);
      navigate("/onboarding");
    }, 1200);
  };

  const handleGuest = () => {
    navigate("/");
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden py-12 bg-[length:300%_300%] animate-gradient"
      style={{
        background: "linear-gradient(135deg,#dffcf0,#b7f7d7,#ffffff,#d7fbe8)",
      }}
    >
      {/* Background Animated Blobs */}
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
        <div className="text-center mb-6">
          <div
            className="mx-auto w-20 h-20 rounded-3xl bg-gradient-to-r
from-green-600
to-emerald-600 flex items-center justify-center shadow-lg"
          >
            <MoonStar size={34} className="text-white" />
          </div>
          <p
            className="text-green-700 font-bold tracking-[0.25em] mt-3 text-xl
font-bold
tracking-wide"
          >
            Tawfiq
          </p>
          <h1 className="text-4xl font-black mt-3 tracking-tight">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-3">
            Pray. Learn. Remember Allah.
          </p>
        </div>

        {/* Login Card */}
        <div
          className=" rounded-3xl  hover:shadow-green-200 border bg-white/70
backdrop-blur-xl
border
border-white/40
shadow-[0_20px_60px_rgba(16,185,129,0.15)] p-8 space-y-8"
        >
          {/* Email */}
          <div>
            <label className="text-sm font-semibold mb-2 block">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Mail size={18} />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-slate-200
hover:border-green-300
focus:border-green-500 placeholder:text-slate-400
hover:border-green-400
focus:border-green-500 pl-20 pr-4 h-16 outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold mb-2 block">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Lock size={18} className="text-green-700" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-slate-200
hover:border-green-300
focus:border-green-500 placeholder:text-slate-400 
hover:border-green-400
focus:border-green-500 pl-20 pr-12 py-3.5 outline-none focus:ring-2 focus:ring-green-500 transition-all"
              />
              {password && password.length < 8 && (
                <p className="mt-2 text-sm text-red-500">
                  Password must be at least 8 characters.
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-green-600"
              />
              <span className="text-sm">Remember Me</span>
            </label>
            <Link
              to="/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading || !email.trim() || !password.trim()}
          className="w-full mt-6 rounded-3xl bg-gradient-to-r hover:-translate-y-1 group-hover:translate-x-1 
from-green-600
to-emerald-600
hover:from-green-700
hover:to-emerald-700 text-white font-semibold py-4 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn size={18} />
              Login
            </>
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-green-100" />
          <span className="text-xs uppercase tracking-widest text-slate-400">
            or continue with
          </span>
          <div className="flex-1 h-px bg-green-100" />
        </div>

        {/* Google Login */}
        <button
          className="
w-full
rounded-3xl
bg-white
border
border-slate-200
shadow-sm
hover:shadow-lg
hover:border-green-300
transition-all
duration-300
py-4
flex
items-center
justify-center
gap-3
hover:-translate-y-1
"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Guest */}
        <button
          onClick={handleGuest}
          className="w-full rounded-2xl border border-green-100 mt-4 py-4 flex items-center justify-center gap-2 hover:bg-green-50 transition-all"
        >
          Explore Tawfiq without an account
          <ArrowRight size={18} />
        </button>

        {/* Register */}
        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            New to Tawfiq?
            <Link
              to="/register"
              className="ml-2 font-semibold text-green-600 hover:underline"
            >
              Create your free account
            </Link>
          </p>
        </div>

        <div className="mt-8 rounded-2xl bg-green-50 border border-green-100 p-4 text-center">
          <p className="text-sm font-semibold text-green-700">
            Today's Reminder
          </p>

          <p className="text-sm italic mt-2 text-muted-foreground">
            "Indeed, Allah is with the patient."
          </p>

          <p className="text-xs text-green-600 mt-2">Qur'an 2:153</p>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            By continuing you agree to our
          </p>

          <div className="mt-2 flex justify-center gap-2 text-xs">
            <span className="text-green-600 hover:underline cursor-pointer">
              Terms
            </span>

            <span>•</span>

            <span className="text-green-600 hover:underline cursor-pointer">
              Privacy Policy
            </span>

            <span>•</span>

            <span className="text-green-600 hover:underline cursor-pointer">
              Support
            </span>
          </div>

          <div className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            Version 1.0.0
          </div>
        </div>
      </div>
    </div>
  );
}
