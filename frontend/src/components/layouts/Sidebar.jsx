import { motion } from "framer-motion";
import {
  Cloud,
  Server,
  Database,
  Shuffle,
  HardDrive,
  MessageSquare,
  Globe,
  Shield,
  Activity,
  Layers,
} from "lucide-react";

const items = [
  { label: "Client", type: "client", icon: Cloud },
  { label: "API Gateway", type: "gateway", icon: Server },
  { label: "Load Balancer", type: "lb", icon: Shuffle },
  { label: "Application Server", type: "server", icon: Server },
  { label: "Database", type: "database", icon: Database },
  { label: "Cache", type: "cache", icon: HardDrive },
  { label: "Message Queue", type: "queue", icon: MessageSquare },
  { label: "CDN", type: "cdn", icon: Globe },
  { label: "Auth Service", type: "auth", icon: Shield },
  { label: "Monitoring", type: "monitoring", icon: Activity },
  { label: "External Service", type: "external", icon: Layers },
];

export default function Sidebar({ addNode }) {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-4 overflow-y-auto">
      <h3 className="mb-6 text-slate-300 font-semibold">
        Components
      </h3>

      {items.map((item, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="
            flex items-center gap-3 mb-3
            p-3 rounded-xl bg-slate-800
            cursor-pointer
          "
          onClick={() => addNode(item)}
        >
          <item.icon size={18} />
          <span className="text-sm">{item.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
