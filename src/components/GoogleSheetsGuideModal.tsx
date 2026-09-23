import React, { useState } from 'react';
import { X, Copy, Check, Sheet, ExternalLink, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { GOOGLE_APPS_SCRIPT_CODE, GOOGLE_SCRIPT_URL, SCRIPT_URL_STORAGE_KEY, getActiveGoogleScriptUrl } from '../config';

export const GoogleSheetsGuideModal: React.FC = () => {
  const { isSheetsGuideOpen, setIsSheetsGuideOpen } = useCart();
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState(() => getActiveGoogleScriptUrl());
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isSheetsGuideOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveUrl = () => {
    const trimmed = customUrl.trim();
    if (trimmed && trimmed !== GOOGLE_SCRIPT_URL) {
      localStorage.setItem(SCRIPT_URL_STORAGE_KEY, trimmed);
    } else {
      localStorage.removeItem(SCRIPT_URL_STORAGE_KEY);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleResetUrl = () => {
    localStorage.removeItem(SCRIPT_URL_STORAGE_KEY);
    setCustomUrl(GOOGLE_SCRIPT_URL);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const columns = [
    'Order ID',
    'Date',
    'Time',
    'Customer Name',
    'Phone',
    'Email',
    'Order Type',
    'Table Number',
    'Items',
    'Total',
    'Notes',
    'Order Status',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSheetsGuideOpen(false)}
      />

      <div className="min-h-full flex items-center justify-center p-4 text-center sm:p-0">
        <div className="relative bg-[#FAF7F2] rounded-3xl max-w-3xl w-full text-left overflow-hidden shadow-2xl border border-[#DFD3BF] my-8 animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#2C1810] text-[#FAF7F2] p-6 border-b border-[#4A2E18] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Sheet className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl leading-tight">
                  Google Sheets Integration Guide
                </h3>
                <p className="text-xs text-[#E2BA8A]">
                  Google Apps Script Web App (Auto-logs every customer order)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSheetsGuideOpen(false)}
              className="text-[#FAF7F2]/70 hover:text-white p-2 rounded-full hover:bg-[#3E2317] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            
            {/* Step 1: Columns */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-[#2C1810] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2C1810] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Google Sheet Columns (Row 1 Headers)</span>
              </h4>
              <p className="text-xs text-stone-600">
                Create a new Google Sheet and add these 12 columns in Row 1:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {columns.map((col, idx) => (
                  <span
                    key={col}
                    className="px-2.5 py-1 bg-white border border-[#DFD3BF] rounded-lg text-xs font-mono font-medium text-[#2C1810] shadow-2xs"
                  >
                    <strong className="text-[#C89B6D] mr-1">{idx + 1}.</strong>{col}
                  </span>
                ))}
              </div>
            </div>

            {/* Step 2: Code.gs copy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#2C1810] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2C1810] text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Google Apps Script Code (<code className="text-xs font-mono">Code.gs</code>)</span>
                </h4>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-[#2C1810] text-[#E2BA8A] hover:bg-[#3E2317] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-stone-600">
                Go to <strong>Extensions → Apps Script</strong> in your Google Sheet, paste this code into <code className="font-mono bg-stone-200 px-1 py-0.5 rounded">Code.gs</code>, then click <strong>Deploy → New deployment → Web app</strong> (Who has access: <em>Anyone</em>).
              </p>

              <div className="relative rounded-2xl bg-[#1E110A] text-[#FAF7F2] p-4 font-mono text-xs overflow-x-auto border border-[#4A2E18] shadow-inner max-h-56">
                <pre>{GOOGLE_APPS_SCRIPT_CODE}</pre>
              </div>
            </div>

            {/* Step 3: Paste Web App URL */}
            <div className="space-y-3 bg-white p-5 rounded-2xl border border-[#DFD3BF] shadow-xs">
              <h4 className="text-sm font-bold text-[#2C1810] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2C1810] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>Active Google Apps Script Web App URL</span>
              </h4>

              <p className="text-xs text-stone-600">
                Paste your deployed Web App URL below to test live Google Sheets updates right away:
              </p>

              <div className="space-y-2">
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#DFD3BF] text-xs font-mono text-[#2C1810] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#C89B6D]"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSaveUrl}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Save URL
                  </button>

                  <button
                    onClick={handleResetUrl}
                    className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer"
                  >
                    Reset to Default Placeholder
                  </button>

                  {savedSuccess && (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Updated!
                    </span>
                  )}
                </div>
              </div>

              <div className="text-[11px] text-stone-500 bg-[#FBF9F5] p-3 rounded-xl border border-[#EDE3D2]">
                <strong className="text-[#2C1810]">In Source Code:</strong> Located in <code className="font-mono text-[#8C5D33]">src/config.ts</code> as:
                <pre className="mt-1 font-mono text-[10px] text-stone-700 bg-white p-2 rounded border border-stone-200">
                  {`const GOOGLE_SCRIPT_URL = "PASTE_GOOGLE_APPS_SCRIPT_URL_HERE";`}
                </pre>
              </div>
            </div>

          </div>

          <div className="p-4 bg-[#F2E8DC] border-t border-[#DFD3BF] flex justify-end">
            <button
              onClick={() => setIsSheetsGuideOpen(false)}
              className="px-6 py-2 rounded-xl bg-[#2C1810] text-[#FAF7F2] text-xs font-bold hover:bg-[#4A2E18] transition-colors cursor-pointer"
            >
              Close Guide
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
