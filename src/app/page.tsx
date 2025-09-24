import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full transform transition-all hover:scale-105">
        <div className="text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome</h1>
          <p className="text-lg text-gray-600 mb-8">
            Personal URL shortener service by Nova Ardiansyah. To create new short URLs, please use the backend system.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">How it works:</h2>
            <p className="text-sm text-gray-600">
              Add any path after the domain to create a redirect. The system will automatically redirect to the configured destination.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="https://novaardiansyah.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Visit My Website
            </a>
          </div>

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
