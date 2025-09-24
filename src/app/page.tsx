"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <p className="text-sm text-gray-500">
            If you are not redirected automatically,
            <a
              href="https://example.com"
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
