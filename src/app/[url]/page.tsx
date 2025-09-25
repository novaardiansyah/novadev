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

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (!destination) {
            window.location.href = "/not-found";
          } else {
            window.location.href = destination;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const fetchUrl = async () => {
      try {
        const response = await fetch(`/api/short-urls/${shortCode}`);

        if (!response.ok) {
          throw new Error('Failed to fetch URL');
        }

        const data = await response.json();

        if (data.success && data.data?.long_url) {
          setDestination(data.data.long_url);
        } else {
          throw new Error('Invalid URL response');
        }
      } catch (err) {
        console.error('Error fetching URL:', err);
      }
    };

    fetchUrl();

    return () => clearInterval(timer);
  }, [params.url, destination]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full transform transition-all hover:scale-105">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Redirecting...</h1>
          <p className="text-lg text-gray-600 mb-8">
            You will be redirected in {countdown} second{countdown !== 1 ? "s" : ""}
          </p>
          <div className="w-full h-3 bg-gray-200 rounded-full mx-auto mb-8 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((countdownSeconds - countdown) / countdownSeconds) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
            {Array.from({ length: countdownSeconds }, (_, i) => i + 1).map((num) => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  num <= countdownSeconds - countdown ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-4 break-all">
            Destination: <span className="font-mono text-blue-600 break-all">{destination || 'Loading...'}</span>
          </p>
          <p className="text-sm text-gray-500">
            If you are not redirected automatically,
            <a
              href={destination || '#'}
              className="text-blue-600 hover:text-blue-800 underline ml-1 font-medium"
              onClick={(e) => !destination && e.preventDefault()}
            >
              click here
            </a>
          </p>
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-400">
              © {new Date().getFullYear()} Created by{" "}
              <a
                href="https://novaardiansyah.my.id"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline font-medium"
              >
                Nova Ardiansyah
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}