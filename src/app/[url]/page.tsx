"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RedirectPage() {
  const params = useParams();
  const [countdown, setCountdown] = useState(3);
  const [destination, setDestination] = useState<string | null>(null);

  useEffect(() => {
    const url = params.url as string;

    if (!url) {
      window.location.href = "/not-found";
      return;
    }

    // Map short URLs to destinations
    const urlMap: Record<string, string> = {
      "github": "https://github.com/novaardiansyah",
      "website": "https://novaardiansyah.my.id",
      "linkedin": "https://linkedin.com/in/novaardiansyah",
      "portfolio": "https://novaardiansyah.my.id/portfolio",
      // Add more mappings as needed
    };

    const targetUrl = urlMap[url] || `https://${url}`;
    setDestination(targetUrl);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = targetUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [params.url]);

  if (!destination) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Invalid URL</h1>
            <p className="text-lg text-gray-600 mb-8">Redirecting to not found page...</p>
          </div>
        </div>
      </div>
    );
  }

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
              style={{ width: `${((3 - countdown) / 3) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  num <= 3 - countdown ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Destination: <span className="font-mono text-blue-600">{destination}</span>
          </p>
          <p className="text-sm text-gray-500">
            If you are not redirected automatically,
            <a
              href={destination}
              className="text-blue-600 hover:text-blue-800 underline ml-1 font-medium"
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