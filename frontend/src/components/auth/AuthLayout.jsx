import { motion } from "framer-motion";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          w-full max-w-md
          bg-slate-900/80 backdrop-blur
          border border-white/10
          rounded-2xl
          p-8
          shadow-xl
        "
      >
        <h2 className="text-2xl font-semibold text-indigo-400 mb-1">
          {title}
        </h2>
        <p className="text-slate-400 mb-6 text-sm">
          {subtitle}
        </p>

        {children}

        <div className="mt-6 text-center text-sm text-slate-400">
          {footer}
        </div>
      </motion.div>
    </div>
  );
}
