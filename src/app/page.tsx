
'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    long_url: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; data?: {
    uid: string;
    short_url: string;
    long_url: string;
    note?: string;
    clicks: number;
    is_active: boolean;
    updated_at: string;
    qrcode_url: string;
  }; error?: string } | null>(null);
  const [showForm, setShowForm] = useState(true);
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/short-urls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          data: data.data
        });
        // Clear form immediately on successful submission
        setFormData({ long_url: '', note: '' });
        setShowForm(false);
      } else {
        setResult({
          success: false,
          error: data.error || 'Failed to create short URL'
        });
      }
    } catch {
      setResult({
        success: false,
        error: 'Network error. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleCreateAnother = () => {
    setResult(null);
    setShowForm(true);
    setFormData({ long_url: '', note: '' });
  };

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 md:p-5">
      <div className="w-full max-w-lg">
        {/* Clean white card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header with logo */}
          {showForm && (
            <div className="text-center p-8 border-b border-gray-100 pb-4 sm:pb-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                <img
                  src="/logo-dark-circle.png"
                  alt="Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">Nova Link</h1>
              <p className="text-gray-600 text-sm">
                Transform your long URLs into sleek, shareable links
              </p>
            </div>
          )}

          {/* Form section */}
          <div className="p-4 md:p-6 pb-6 md:pb-6">
            {showForm && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="long_url" className="text-gray-700 text-sm font-medium">
                    Destination URL
                  </label>
                  <input
                    type="url"
                    id="long_url"
                    name="long_url"
                    value={formData.long_url}
                    onChange={handleInputChange}
                    required
                    placeholder="https://your-very-long-url.com"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="note" className="text-gray-700 text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    placeholder="What's this link for?"
                    rows={2}
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.long_url}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating link...
                    </span>
                  ) : (
                    'Generate Short Link'
                  )}
                </button>
              </form>
            )}

            {/* Result display */}
            {result && result.success && result.data && (
              <div className="text-gray-900">
                <h3 className="font-semibold mb-2 flex items-center">
                  <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                    ✓
                  </span>
                  {result.data.clicks > 0 ? 'Link found successfully!' : 'Link created successfully!'}
                </h3>
                {result.data.clicks > 0 && (
                  <p className="text-sm text-gray-600 mb-4">
                    This URL already exists and has been used.
                  </p>
                )}

                <div className="space-y-4">
                  {/* QR Code */}
                  <div className="text-center mt-4">
                    <div className="inline-block p-4 bg-gray-50 rounded-lg">
                      <img
                        src={result.data.qrcode_url}
                        alt="QR Code"
                        className="w-32 h-32 object-contain"
                        onError={(e) => {
                          e.currentTarget.src = '';
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2">Scan to open link</p>
                  </div>

                  {/* Short URL */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm text-gray-700">Short URL:</p>
                      <button
                        onClick={() => result.data && handleCopyToClipboard(result.data.short_url)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <code className="text-blue-900 text-sm font-mono break-all">
                        {result.data.short_url}
                      </code>
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-700 text-sm mb-1">UID:</p>
                      <p className="text-gray-900 text-xs font-mono">{result.data.uid}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm mb-1">Clicks:</p>
                      <p className="text-gray-900 text-xs">{result.data.clicks}</p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm mb-1">Status:</p>
                      <p className={`font-medium text-xs ${result.data.is_active ? 'text-green-600' : 'text-yellow-600'}`}>
                        {result.data.is_active ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm mb-1">Created:</p>
                      <p className="text-gray-900 text-xs">
                        {new Date(result.data.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {/* Original URL */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-gray-700 text-sm">Destination:</p>
                      <button
                        onClick={() => result.data && handleCopyToClipboard(result.data.long_url)}
                        className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50 transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <code className="text-gray-900 text-xs font-mono break-all">
                        {result.data.long_url}
                      </code>
                    </div>
                  </div>

                  {/* Note */}
                  {result.data.note && (
                    <div>
                      <p className="text-gray-700 text-sm mb-1">Note:</p>
                      <p className="text-gray-900 text-xs">{result.data.note}</p>
                    </div>
                  )}
                </div>

                {/* Create Another Button */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleCreateAnother}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 cursor-pointer transition-all duration-200"
                  >
                    Create Another Link
                  </button>
                </div>
              </div>
            )}

            {result && !result.success && (
              <div className="mt-6 p-4 rounded-xl border bg-red-50 border-red-200">
                <div className="text-red-900">
                  <h3 className="font-semibold mb-1 flex items-center">
                    <span className="w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-2">✕</span>
                    Something went wrong
                  </h3>
                  <p className="text-sm text-red-700">{result.error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 mb-5 text-gray-600 text-xs">
          <p>
            © {new Date().getFullYear()} Made with{" "}
            <span className="text-red-500 animate-pulse">❤️</span> by{" "}
            <a
              href="https://novaardiansyah.my.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
            >
              Nova Ardiansyah
            </a>
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg transform transition-all duration-300 animate-pulse">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}
