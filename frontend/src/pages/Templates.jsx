import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Shared edge style to keep code clean
const edgeStyle = {
  type: "smoothstep",
  markerEnd: {
    type: "arrowclosed",
    color: "#94a3b8", // Slate-400
  },
  style: {
    stroke: "#94a3b8",
    strokeWidth: 2,
  },
};

const templateData = [
  {
    name: "URL Shortener",
    nodes: [
      { id: "1", type: "custom", position: { x: 50, y: 150 }, data: { label: "User", type: "client" } },
      { id: "2", type: "custom", position: { x: 250, y: 150 }, data: { label: "API Gateway", type: "gateway" } },
      { id: "3", type: "custom", position: { x: 450, y: 150 }, data: { label: "Shorten Service", type: "server" } },
      { id: "4", type: "custom", position: { x: 650, y: 50 }, data: { label: "Redis Cache", type: "cache" } },
      { id: "5", type: "custom", position: { x: 650, y: 250 }, data: { label: "SQL Database", type: "database" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", ...edgeStyle },
      { id: "e2-3", source: "2", target: "3", ...edgeStyle },
      { id: "e3-4", source: "3", target: "4", ...edgeStyle },
      { id: "e3-5", source: "3", target: "5", ...edgeStyle },
    ],
  },
  {
    name: "Chat Application",
    nodes: [
      { id: "c1", type: "custom", position: { x: 50, y: 150 }, data: { label: "Mobile App", type: "client" } },
      { id: "c2", type: "custom", position: { x: 300, y: 150 }, data: { label: "WebSocket Server", type: "server" } },
      { id: "c3", type: "custom", position: { x: 550, y: 150 }, data: { label: "Kafka/Queue", type: "queue" } },
      { id: "c4", type: "custom", position: { x: 800, y: 150 }, data: { label: "Message Store", type: "database" } },
    ],
    edges: [
      { id: "ec1-2", source: "c1", target: "c2", ...edgeStyle },
      { id: "ec2-3", source: "c2", target: "c3", ...edgeStyle },
      { id: "ec3-4", source: "c3", target: "c4", ...edgeStyle },
    ],
  },
  {
    name: "E-Commerce",
    nodes: [
      { id: "e1", type: "custom", position: { x: 50, y: 125 }, data: { label: "Web Store", type: "client" } },
      { id: "e2", type: "custom", position: { x: 250, y: 125 }, data: { label: "Load Balancer", type: "lb" } },
      { id: "e3", type: "custom", position: { x: 450, y: 50 }, data: { label: "Order Service", type: "server" } },
      { id: "e4", type: "custom", position: { x: 450, y: 200 }, data: { label: "Payment Service", type: "auth" } },
      { id: "e5", type: "custom", position: { x: 700, y: 125 }, data: { label: "Inventory DB", type: "database" } },
    ],
    edges: [
      { id: "ee1-2", source: "e1", target: "e2", ...edgeStyle },
      { id: "ee2-3", source: "e2", target: "e3", ...edgeStyle },
      { id: "ee2-4", source: "e2", target: "e4", ...edgeStyle },
      { id: "ee3-5", source: "e3", target: "e5", ...edgeStyle },
      { id: "ee4-5", source: "e4", target: "e5", ...edgeStyle },
    ],
  },
  {
    name: "Video Streaming",
    nodes: [
      { id: "v1", type: "custom", position: { x: 50, y: 150 }, data: { label: "User Device", type: "client" } },
      { id: "v2", type: "custom", position: { x: 250, y: 150 }, data: { label: "Cloudfront CDN", type: "cdn" } },
      { id: "v3", type: "custom", position: { x: 450, y: 150 }, data: { label: "Transcoder", type: "server" } },
      { id: "v4", type: "custom", position: { x: 700, y: 150 }, data: { label: "S3 Storage", type: "database" } },
    ],
    edges: [
      { id: "ev1-2", source: "v1", target: "v2", ...edgeStyle },
      { id: "ev2-3", source: "v2", target: "v3", ...edgeStyle },
      { id: "ev3-4", source: "v3", target: "v4", ...edgeStyle },
    ],
  },
];

export default function Templates() {
  const navigate = useNavigate();


  return (
    <div className="pt-32 px-10 bg-slate-950 min-h-screen text-white">
      <h2 className="text-4xl font-extrabold mb-10 text-center bg-linear-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        System Architecture Blueprints
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {templateData.map((t, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => navigate("/preview", { state: t })}
            className="p-8 rounded-2xl bg-slate-900 border border-slate-800 cursor-pointer hover:border-indigo-500/50 transition-all shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
            
            <h3 className="text-2xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">
              {t.name}
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Standard {t.name} design with optimized nodes for high availability and low latency.
            </p>
            
            <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1">● {t.nodes.length} Nodes</span>
              <span className="flex items-center gap-1">● {t.edges.length} Connections</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}