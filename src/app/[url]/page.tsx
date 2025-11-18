"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RedirectPage() {
  const params = useParams();
  const countdownSeconds = parseInt(process.env.NEXT_PUBLIC_COUNTDOWN_SECONDS || "5", 10);
  const [countdown, setCountdown] = useState(countdownSeconds);
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    const shortCode = params.url as string;

    if (!shortCode) {
      window.location.href = "/not-found";
      return;
    }

    let countdownValue = countdownSeconds;
    let destinationUrl: string | null = null;
    let timer: NodeJS.Timeout;
    let isRedirected = false;

    const fetchUrl = async () => {
      try {
        const response = await fetch(`/api/short-urls/${shortCode}`);

        if (!response.ok) {
          throw new Error('Failed to fetch URL');
        }

        const data = await response.json();

        if (data.success) {
          const longUrl = data.data?.long_url || data.long_url || data.data?.url;

          if (longUrl) {
            destinationUrl = longUrl;
            setDestination(longUrl);

            timer = setInterval(() => {
              countdownValue--;
              setCountdown(countdownValue);

              if (countdownValue <= 0) {
                clearInterval(timer);
                if (!isRedirected && destinationUrl) {
                  isRedirected = true;
                  window.location.href = destinationUrl;
                }
              }
            }, 1000);
          } else {
            throw new Error('No destination URL found in response');
          }
        } else {
          throw new Error('API returned failure');
        }
      } catch {
        if (!isRedirected) {
          isRedirected = true;
          window.location.href = "/not-found";
        }
      }
    };

    fetchUrl();

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [params.url, countdownSeconds]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-3 p-sm-5">
      <div className="w-full max-w-lg">
        {/* Glass morphism card */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 overflow-hidden p-8 md:p-12">
          <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Redirecting...</h1>
          <p className="text-lg text-blue-100 mb-8">
            You will be redirected in {countdown} second{countdown !== 1 ? "s" : ""}
          </p>
          <div className="w-full h-3 bg-white/20 rounded-full mx-auto mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((countdownSeconds - countdown) / countdownSeconds) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
            {Array.from({ length: countdownSeconds }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  num <= countdownSeconds - countdown ? 'bg-blue-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-blue-100 mb-4 break-all">
            Destination: <span className="font-mono text-blue-300 break-all">{destination || 'Loading...'}</span>
          </p>
          <p className="text-sm text-blue-100">
            If you are not redirected automatically,
            <a
              href={destination || '#'}
              className="text-blue-300 hover:text-white underline ml-1 font-medium"
              onClick={(e) => !destination && e.preventDefault()}
            >
              click here
            </a>
          </p>
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-xs text-blue-100">
              © {new Date().getFullYear()} Made with{" "}
              <span className="text-red-500 animate-pulse">❤️</span> by{" "}
              <a
                href="https://novadev.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 hover:text-white underline font-medium transition-colors"
              >
                Nova Ardiansyah
              </a>
            </p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}