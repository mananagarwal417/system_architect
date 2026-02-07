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

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MarkerType,
  StraightEdge
} from "reactflow";
import "reactflow/dist/style.css";

import ExplainPanel from "../explain/ExplainPanel";
import FlowControls from "./FlowControls";
import { saveDesign } from "../../services/designService";
import { toPng } from "html-to-image";
import TopToolbar from "./TopToolbar";
import CustomNode from "./CustomNode";


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


export default function Canvas({ initialData,setAddNodeFn  }) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const [showExplain, setShowExplain] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [loading, setLoading] = useState(false);

  const [edgeType, setEdgeType] = useState("smoothstep");


  // ✅ LOAD SAVED DESIGN
  useEffect(() => {
    if (initialData) {
      setNodes(initialData.nodes || []);
      setEdges(initialData.edges || []);
    }
  }, [initialData, setNodes, setEdges]);
  

  const nodeTypes = {
  custom: CustomNode,
};


//   const addNode = (label) => {
//   setNodes((prev) => [
//     ...prev,
//     {
//       id: Date.now().toString(),
//       position: {
//         x: 200 + Math.random() * 300,
//         y: 100 + Math.random() * 300,
//       },
//       data: {
//         label,
//       },
//     },
//   ]);
// };
 const addNode = (item) => {
  setNodes((nds) => [
    ...nds,
    {
      id: Date.now().toString(),
      type: "custom",
      position: {
        x: 200 + Math.random() * 300,
        y: 120 + Math.random() * 250,
      },
      data: {
        label: item.label,
        type: item.type,
      },
    },
  ]);
};





  // ✅ VERY IMPORTANT — CLEAN DATA ONLY
//    const serializeFlow = () => {
//   return {
//     nodes: nodes.map((n) => ({
//       id: n.id,
//       type: n.type,
//       position: { x: n.position.x, y: n.position.y },
//       data: {
//         label: n.data?.label || "",
//         type: n.data?.type || "default", // ✅ Added this line
//       },
//       // If you are using NodeResizer, save the dimensions too!
//       width: n.width, 
//       height: n.height,
//     })),
//     edges: edges.map((e) => ({
//       id: e.id,
//       source: e.source,
//       target: e.target,
//       // Pass all properties to keep arrows and markers
//       ...e 
//     })),
//   };
// };
// Inside Canvas.jsx

const serializeFlow = () => {
  return {
    nodes: nodes.map((n) => ({
      id: n.id,
      type: n.type, // "custom"
      position: {
        x: n.position.x,
        y: n.position.y,
      },
      data: {
        label: n.data?.label || "",
        type: n.data?.type || "default", // ✅ REQUIRED: This maps to the icon
      },
    })),
    edges: edges.map((e) => ({
      ...e, // ✅ Spread the whole edge to keep markers and arrows
    })),
  };
};

  // ✅ CONNECT NODES
  const onConnect = useCallback(
  (params) =>
    setEdges((eds) =>
      addEdge(
        {
          ...params,
          type: StraightEdge,
          // animated: true,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 20,
            height: 20,
          },
          style: {
            strokeWidth: 2.5,
          },
        },
        eds
      )
    ),
  [edgeType]
);


  // ======================
  // 🔥 SAVE DESIGN
  // ======================
  const handleSave = async () => {
  const name = prompt("Enter design name");
  if (!name) return;

  try {
    const flow = serializeFlow();

    await saveDesign({
      name,
      nodes: flow.nodes || [],
      edges: flow.edges || [],
    });

    alert("Design saved successfully ✅");
  } catch (err) {
    console.error(err);
    alert("Failed to save design");
  }
};


  // ======================
  // 🤖 EXPLAIN DESIGN
  // ======================
  const handleExplain = async (input) => {
  try {
    setLoading(true);

    // ✅ BLOCK REACT EVENTS COMPLETELY
    const mode =
      typeof input === "string" ? input : "rule";

    // ✅ serialize clean data only
    const flow = {
      nodes: nodes.map((n) => ({
        id: n.id,
        type: n.type,
        position: {
          x: n.position.x,
          y: n.position.y,
        },
        data: {
          label: n.data?.label || "",
        },
      })),
      edges: edges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        type: e.type || "default",
      })),
    };
    const res = await fetch("https://system-architect.onrender.com/api/explain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        nodes: flow.nodes,
        edges: flow.edges,
        mode,
      }),
    });

    const data = await res.json();
    setExplanation(data.explanation);
    setShowExplain(true);
  } catch (err) {
    console.error(err);
    alert("Explain failed");
  } finally {
    setLoading(false);
  }
};
  
    // ======================
  // 🤖 Clear DESIGN
  // ======================
    
    const handleClear = () => {
  const confirmClear = window.confirm(
    "Are you sure you want to clear the canvas?"
  );

  if (!confirmClear) return;

  setNodes([]);
  setEdges([]);
};
   
      // ======================
  // 🤖 Export DESIGN
  // ======================   

    const handleExport = async () => {
  const flow = document.querySelector(".react-flow");

  if (!flow) return;

  try {
    const dataUrl = await toPng(flow, {
      backgroundColor: "#020617",
    });

    const link = document.createElement("a");
    link.download = "system-design.png";
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error(err);
    alert("Failed to export image");
  }
};

    const deleteSelected = () => {
  setNodes((nds) => nds.filter((n) => !n.selected));
  setEdges((eds) => eds.filter((e) => !e.selected));
};


  
  
  useEffect(() => {
  if (setAddNodeFn) {
    setAddNodeFn(() => addNode);
  }
}, []);


  return (
    <>
     <TopToolbar
  setEdgeType={setEdgeType}
  deleteSelected={deleteSelected}
/>
    <div className="w-full h-[calc(100vh-80px)] relative">
     

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      {/* CONTROLS */}
      <FlowControls
        onSave={handleSave}
        onExplain={handleExplain}
        onClear={handleClear}
        onExport={handleExport}
      />

      {/* EXPLAIN PANEL */}
      <ExplainPanel
        open={showExplain}
        loading={loading}
        explanation={explanation}
        onClose={() => setShowExplain(false)}
      />
    </div>
    </>
  );
}

