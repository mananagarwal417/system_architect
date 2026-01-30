// import { GitBranch, Slash, Minus, Trash2 } from "lucide-react";

// export default function TopToolbar({
//   setEdgeType,
//   deleteSelected,
// }) {
//   return (
//     <div
//       className="
//         absolute top-24 left-1/2 -translate-x-1/2
//         z-50 flex gap-4
//         bg-slate-900/90 backdrop-blur
//         border border-white/10
//         px-5 py-3 rounded-2xl
//       "
//     >
//       <button onClick={() => setEdgeType("smoothstep")}>
//         Smooth
//       </button>

//       <button onClick={() => setEdgeType("step")}>
//         Step
//       </button>

//       <button onClick={() => setEdgeType("straight")}>
//         Straight
//       </button>

//       <button
//         onClick={deleteSelected}
//         className="text-red-400"
//       >
//         <Trash2 />
//       </button>
//     </div>
//   );
// }



// import {
//   GitBranch,
//   Slash,
//   Minus,
//   Trash2,
// } from "lucide-react";

// export default function TopToolbar({
//   edgeType,
//   setEdgeType,
//   deleteSelected,
// }) {
//   const tools = [
//     {
//       id: "smoothstep",
//       label: "Smooth",
//       icon: GitBranch,
//     },
//     {
//       id: "step",
//       label: "Step",
//       icon: Slash,
//     },
//     {
//       id: "straight",
//       label: "Straight",
//       icon: Minus,
//     },
//   ];

//   return (
//     <div
//       className="
//         absolute top-24 left-1/2 -translate-x-1/2
//         z-50 flex items-center gap-2
//         bg-slate-900/90 backdrop-blur-md
//         border border-white/10
//         px-4 py-2 rounded-2xl
//         shadow-xl
//       "
//     >
//       {tools.map((tool) => {
//         const Icon = tool.icon;
//         const active = edgeType === tool.id;

//         return (
//           <button
//             key={tool.id}
//             onClick={() => setEdgeType(tool.id)}
//             className={`
//               group flex items-center gap-2
//               px-3 py-2 rounded-xl
//               text-sm font-medium
//               transition-all
//               ${
//                 active
//                   ? "bg-indigo-500/20 text-indigo-400"
//                   : "text-slate-300 hover:bg-white/5"
//               }
//             `}
//           >
//             <Icon size={18} />
//             <span className="hidden md:block">
//               {tool.label}
//             </span>

//             {/* tooltip */}
//             <span
//               className="
//                 absolute top-full mt-2
//                 scale-0 group-hover:scale-100
//                 transition-transform
//                 text-xs
//                 bg-black/90 text-white
//                 px-2 py-1 rounded-md
//                 whitespace-nowrap
//               "
//             >
//               {tool.label} edge
//             </span>
//           </button>
//         );
//       })}

//       {/* divider */}
//       <div className="w-px h-6 bg-white/10 mx-1" />

//       {/* delete */}
//       <button
//         onClick={deleteSelected}
//         className="
//           flex items-center gap-2
//           px-3 py-2 rounded-xl
//           text-red-400
//           hover:bg-red-500/10
//           transition
//         "
//       >
//         <Trash2 size={18} />
//         <span className="hidden md:block">
//           Delete
//         </span>
//       </button>
//     </div>
//   );
// }


import { motion } from "framer-motion";
import {
  GitBranch,
  Slash,
  Minus,
  Trash2,
} from "lucide-react";

export default function TopToolbar({
  edgeType,
  setEdgeType,
  deleteSelected,
}) {
  const tools = [
    { id: "smoothstep", label: "Smooth", icon: GitBranch },
    { id: "step", label: "Step", icon: Slash },
    { id: "straight", label: "Straight", icon: Minus },
  ];

  return (
    <div
      className="
        absolute top-24 left-1/2 -translate-x-1/2
        z-50 flex items-center gap-2
        bg-slate-900/90 backdrop-blur-md
        border border-white/10
        px-4 py-2 rounded-2xl
        shadow-xl
      "
    >
      {tools.map((tool) => {
        const Icon = tool.icon;
        const active = edgeType === tool.id;

        return (
          <motion.button
            key={tool.id}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
            }}
            onClick={() => setEdgeType(tool.id)}
            className={`
              relative flex items-center gap-2
              px-3 py-2 rounded-xl
              text-sm font-medium
              transition-colors
              ${
                active
                  ? "bg-indigo-500/20 text-indigo-400 shadow-[0_0_0_1px_rgba(99,102,241,0.5)]"
                  : "text-slate-300 hover:bg-white/5"
              }
            `}
          >
            <Icon size={18} />
            <span className="hidden md:block">
              {tool.label}
            </span>

            {/* glow pulse when active */}
            {active && (
              <motion.span
                layoutId="active-glow"
                className="
                  absolute inset-0 rounded-xl
                  ring-1 ring-indigo-500/40
                "
              />
            )}
          </motion.button>
        );
      })}

      {/* divider */}
      <div className="w-px h-6 bg-white/10 mx-1" />

      {/* delete */}
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        onClick={deleteSelected}
        className="
          flex items-center gap-2
          px-3 py-2 rounded-xl
          text-red-400
          hover:bg-red-500/10
        "
      >
        <Trash2 size={18} />
        <span className="hidden md:block">
          Delete
        </span>
      </motion.button>
    </div>
  );
}
