import { motion } from "framer-motion";
import { Save, Trash2, Image, Info } from "lucide-react";

export default function FlowControls({
  onSave,
  onClear,
  onExport,
  onExplain,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        absolute bottom-6 right-6 z-50
        bg-slate-900/80 backdrop-blur
        border border-white/10
        rounded-2xl p-3
        flex gap-3
      "
    >
      <button onClick={onSave} title="Save">
        <Save />
      </button>
      <button onClick={() => onExplain("ai")} title="Explain">
        <Info />
      </button>
      <button onClick={onExport} title="Export">
        <Image />
      </button>
      <button onClick={onClear} title="Clear">
        <Trash2 />
      </button>
    </motion.div>
  );
}
