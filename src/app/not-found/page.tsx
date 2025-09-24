import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-md w-full transform transition-all hover:scale-105">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">URL Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            The requested URL does not exist or is invalid.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 text-center">
              This URL shortener service provides dynamic redirects.
              Simply add any path after the domain to create a short URL.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/"
              className="inline-block w-full bg-blue-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
            <a
              href="https://novaardiansyah.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full bg-gray-600 text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
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