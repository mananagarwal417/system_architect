import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomNode from '../components/canvas/CustomNode';

const nodeTypes = { custom: CustomNode };

export default function TemplatePreview() {
  const location = useLocation();
  const navigate = useNavigate();
  const template = location.state; // Receives the template data

  if (!template) {
    return <div className="text-white pt-28 text-center">No template selected.</div>;
  }

  return (
    <div className="h-screen w-full bg-slate-950 pt-20 flex flex-col">
      {/* Header for the Preview Page */}
      <div className="p-4 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">{template.name}</h2>
          <p className="text-slate-400 text-xs text-left">Read-only Architecture Preview</p>
        </div>
        <button 
          onClick={() => navigate('/signup')}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
        >
          Sign up to Edit
        </button>
      </div>

      {/* The Canvas - Read Only Mode */}
      <div className="flex-grow">
        <ReactFlow
          nodes={template.nodes}
          edges={template.edges}
          nodeTypes={nodeTypes}
          fitView
          nodesConnectable={false} // Prevents guests from making new lines
          nodesDraggable={true}    // Allows them to move things around for fun
          elementsSelectable={true}
        >
          <Background color="#334155" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}