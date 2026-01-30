import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function ExplainPanel({
  open,
  onClose,
  explanation,
  loading,
}) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      className="
        absolute right-0 top-0 h-full w-96
        bg-slate-900 border-l border-white/10
        p-6 z-50
      "
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-indigo-400">
          Explain Architecture
        </h2>
        <button onClick={onClose}>
          <X />
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-indigo-400 animate-pulse">
          AI is thinking...
        </p>
      )}

      {/* {RULE BASED (array)} */}
      {/* {!loading && Array.isArray(explanation) && (
        <div className="space-y-4 text-sm text-slate-300">
          {explanation.map((item, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-800 border border-white/10"
            >
              {item}
            </div>
          ))}
        </div>
      )} */}

      {/* AI BASED (string) */}
      {/* {!loading && typeof explanation === "string" && (
        <pre className="text-sm text-slate-300 whitespace-pre-wrap">
          {explanation}
        </pre>
      )} */}
      {Array.isArray(explanation) &&
  explanation.map((line, i) => (
    <div key={i}>{line}</div>
  ))}

{typeof explanation === "string" && (
  <pre>{explanation}</pre>
)}

    </motion.div>
  );
}
