import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonStar, CheckCircle2 } from "lucide-react";

export default function LoadingScreen() {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
   const progressInterval = setInterval(() => {
     setProgress((prev) => {
       if (prev >= 100) {
         clearInterval(progressInterval);
         return 100;
       }

       return prev + 1;
     });
   }, 80);

    // Staggered checklist reveals
 const timer1 = setTimeout(() => setStep(1), 1800);

 const timer2 = setTimeout(() => setStep(2), 4000);

 const timer3 = setTimeout(() => setStep(3), 6200);

 const finish = setTimeout(() => {
   navigate("/");
 }, 8000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(finish);
    };
  }, [navigate]);

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[length:300%_300%] animate-gradient"
      style={{
        background: "linear-gradient(135deg,#dffcf0,#b7f7d7,#ffffff,#d7fbe8)",
      }}
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 rounded-full bg-green-300/20 blur-3xl -top-20 -left-20 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute w-80 h-80 rounded-full bg-emerald-300/20 blur-3xl bottom-0 right-0 animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-md px-8">
        <div className="rounded-[34px] bg-white/75 backdrop-blur-xl border border-white/50 shadow-[0_25px_70px_rgba(16,185,129,0.18)] p-10">
          {/* Logo */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-[30px] bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 flex items-center justify-center shadow-xl animate-bounce">
              <MoonStar size={42} className="text-white" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-black text-center mt-8 text-gray-900">
            Preparing Tawfiq...
          </h1>
          <p className="text-center text-gray-500 mt-3 leading-7">
            Setting up your personalized Islamic experience.
          </p>

          {/* Progress */}
          <div className="mt-10">
            <div className="flex justify-between text-sm font-semibold mb-2 text-gray-700">
              <span>Loading</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-green-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-500 transition-all duration-200"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-10 space-y-5">
            {/* Prayer Times */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${
                step >= 1
                  ? "opacity-100 translate-x-0"
                  : "opacity-30 translate-x-4"
              }`}
            >
              <CheckCircle2
                size={22}
                className={`${step >= 1 ? "text-green-600" : "text-slate-300"}`}
              />
              <div>
                <h3 className="font-semibold">Prayer Times Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Personalized for your location
                </p>
              </div>
            </div>

            {/* Preferences */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${
                step >= 2
                  ? "opacity-100 translate-x-0"
                  : "opacity-30 translate-x-4"
              }`}
            >
              <CheckCircle2
                size={22}
                className={`${step >= 2 ? "text-green-600" : "text-slate-300"}`}
              />
              <div>
                <h3 className="font-semibold">Preferences Saved</h3>
                <p className="text-sm text-muted-foreground">
                  Madhab and calculation method configured
                </p>
              </div>
            </div>

            {/* Dashboard */}
            <div
              className={`flex items-center gap-3 transition-all duration-700 ${
                step >= 3
                  ? "opacity-100 translate-x-0"
                  : "opacity-30 translate-x-4"
              }`}
            >
              <CheckCircle2
                size={22}
                className={`${step >= 3 ? "text-green-600" : "text-slate-300"}`}
              />
              <div>
                <h3 className="font-semibold">Dashboard Ready</h3>
                <p className="text-sm text-muted-foreground">
                  Launching your experience...
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground animate-pulse">
            ✨ Preparing your personalized Islamic journey...
          </p>
        </div>
      </div>
    </div>
  );
}
