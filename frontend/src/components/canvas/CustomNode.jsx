// import {
//   Cloud,
//   Server,
//   Database,
//   Shuffle,
//   HardDrive,
//   MessageSquare,
//   Globe,
//   Shield,
//   Activity,
//   Layers,
// } from "lucide-react";

// import { Handle, Position, NodeResizer } from "reactflow";

// const iconMap = {
//   client: Cloud,
//   gateway: Server,
//   lb: Shuffle,
//   server: Server,
//   database: Database,
//   cache: HardDrive,
//   queue: MessageSquare,
//   cdn: Globe,
//   auth: Shield,
//   monitoring: Activity,
//   external: Layers,
//   default: Layers,
// };

// export default function CustomNode({ data, selected }) {
//   const Icon = iconMap[data.type] || iconMap.default;

//   return (
//     <div
//       // className="
//       //   relative flex items-center justify-center
//       //   bg-slate-800 rounded-xl
//       //   border border-white/10
//       //   overflow-hidden
//       // "
//       style={{ width: "100%", height: "100%" }}
//     >
//       {/* resize only when selected */}
//       {selected && (
//         <NodeResizer
//           minWidth={50}
//           minHeight={50}
//           keepAspectRatio
//         />
//       )}

//       {/* icon scales automatically */}
//       <Icon
//         className="text-indigo-400 w-full h-full p-3"
//       />

//       {/* connection handles */}
      
      
//        <Handle
//         id="left-target"
//         type="target"
//         position={Position.Left}
//         // style={{ top: "40%" }}
//       />

//       <Handle
//         id="left-source"
//         type="source"
//         position={Position.Left}
//         // style={{ top: "60%" }}
//       />

//       {/* RIGHT SIDE */}
//       <Handle
//         id="right-target"
//         type="target"
//         position={Position.Right}
//         // style={{ top: "40%" }}
//       />

//       <Handle
//         id="right-source"
//         type="source"
//         position={Position.Right}
//         // style={{ top: "60%" }}
//       />

    
      
//     </div>
//   );
// }


import { Handle, Position, NodeResizer } from "reactflow";
import { 
  Cloud, Server, Database, Shuffle, HardDrive, 
  MessageSquare, Globe, Shield, Activity, Layers 
} from "lucide-react";

const iconMap = {
  client: Cloud,
  gateway: Server,
  lb: Shuffle,
  server: Server,
  database: Database,
  cache: HardDrive,
  queue: MessageSquare,
  cdn: Globe,
  auth: Shield,
  monitoring: Activity,
  external: Layers,
  default: Layers,
};

export default function CustomNode({ data, selected }) {
  const Icon = iconMap[data.type] || iconMap.default;

  return (
    <div className="relative group">
      {/* 1. NodeResizer: Snaps to the container boundaries */}
      {/* <NodeResizer 
        minWidth={120} 
        minHeight={45} 
        isVisible={selected} 
        lineClassName="border-indigo-500"
        handleClassName="h-2 w-2 bg-white border-2 border-indigo-500 rounded"
      /> */}

      {/* 2. Main Container: Styled to match your Sidebar */}
      <div className={`
        flex items-center gap-3 
        p-3 rounded-xl border-white border
        cursor-pointer transition-all
        ${selected ? "border-indigo-500 shadow-lg" : "border-transparent"}
      `}>
        <Icon  className="text-indigo-400" />
        <span className="text-sm  text-slate-300 tracking-tighter whitespace-nowrap">
          {data.label}
        </span>
      </div>

      {/* 3. Handles: Positioned relative to the container */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-2 h-2 bg-indigo-500! border-2 border-slate-900"
        style={{ left: "-4px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-2 h-2 bg-indigo-500! border-2 border-slate-900"
        style={{ right: "-4px" }}
      />
    </div>
  );
}



