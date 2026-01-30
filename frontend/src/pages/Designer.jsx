// import Sidebar from "../components/layouts/Sidebar";
// import Canvas from "../components/canvas/Canvas";
// import { useLocation } from "react-router-dom";

// export default function Designer() {
//   const location = useLocation();
//   return (
//     <div className="flex pt-20 h-screen">
//       <Sidebar />
//       <Canvas initialData={location.state}  />
//     </div>
//   );
// }


import { useState } from "react";
import { useLocation } from "react-router-dom";

import Sidebar from "../components/layouts/Sidebar";
import Canvas from "../components/canvas/Canvas";

export default function Designer() {
  const location = useLocation();

  // 🔗 function bridge
  const [addNodeFn, setAddNodeFn] = useState(null);

  return (
    <div className="flex pt-20 h-screen">
      {/* Sidebar triggers node creation */}
      <Sidebar addNode={addNodeFn} />

      {/* Canvas provides node creation logic */}
      <Canvas
        initialData={location.state}
        setAddNodeFn={setAddNodeFn}
      />
    </div>
  );
}
