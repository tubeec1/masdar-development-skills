import React from "react";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white border border-slate-100 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 mb-4 shadow-inner">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Confirm Core Purge Transaction
          </h3>
          <p className="text-xs font-semibold text-slate-400 mt-2 leading-relaxed">
            Are you sure you want to delete this resource item frame from the
            schema network architecture? This process is irreversible.
          </p>
        </div>

        <div className="mt-6 flex gap-2 w-full text-xs font-bold">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Abort Action
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl flex items-center justify-center transition-colors shadow-sm cursor-pointer"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Purge Structural Instance"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
