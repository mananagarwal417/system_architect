// import { useEffect, useState } from "react";
// import { getMyDesigns } from "../services/designService";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function MyDesigns() {
//   const [designs, setDesigns] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     getMyDesigns().then(setDesigns);
//   }, []);

//   return (
//     <div className="pt-28 px-8 max-w-6xl mx-auto">
//       <h1 className="text-3xl font-semibold mb-8">
//         My Designs
//       </h1>

//       {designs.length === 0 && (
//         <p className="text-slate-400">
//           No designs saved yet.
//         </p>
//       )}

//       <div className="grid md:grid-cols-3 gap-6">
//         {designs.map((design) => (
//           <motion.div
//             key={design._id}
//             whileHover={{ scale: 1.05 }}
//             className="bg-slate-900 border border-white/10 p-6 rounded-xl cursor-pointer"
//             onClick={() =>
//               navigate("/designer", {
//                 state: design,
//               })
//             }
//           >
//             <h3 className="font-semibold mb-2">
//               {design.name}
//             </h3>
//             <p className="text-xs text-slate-400">
//               {new Date(design.createdAt).toLocaleString()}
//             </p>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { getMyDesigns, deleteDesign } from "../services/designService";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function MyDesigns() {
  const [designs, setDesigns] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  // 🔥 DELETE HANDLER (must be outside useEffect)
  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Delete this design?"
    );

    if (!confirm) return;

    await deleteDesign(id);

    setDesigns((prev) =>
      prev.filter((d) => d._id !== id)
    );
  };

  useEffect(() => {
    const updateAuth = () => {
      const isAuth = !!localStorage.getItem("token");
      setLoggedIn(isAuth);

      if (!isAuth) {
        setDesigns([]);
      } else {
        getMyDesigns().then(setDesigns);
      }
    };

    updateAuth();

    window.addEventListener("auth-change", updateAuth);
    return () =>
      window.removeEventListener("auth-change", updateAuth);
  }, []);

  // 🔒 NOT LOGGED IN
  if (!loggedIn) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-2xl mb-4">
          Please login to view your designs
        </h2>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="px-6 py-2 rounded-xl bg-indigo-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-2 rounded-xl border border-white/20"
          >
            Signup
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 px-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-semibold mb-8">
        My Designs
      </h1>

      {designs.length === 0 && (
        <p className="text-slate-400">
          No designs saved yet.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <motion.div
            key={design._id}
            whileHover={{ scale: 1.05 }}
            className="
              relative bg-slate-900 border border-white/10
              p-6 rounded-xl cursor-pointer
            "
            onClick={() =>
              navigate("/designer", {
                state: design,
              })
            }
          >
            {/* DELETE ICON */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // 🔥 important
                handleDelete(design._id);
              }}
              className="
                absolute top-3 right-3
                text-red-400 hover:text-red-500
              "
            >
              <Trash2 size={18} />
            </button>

            <h3 className="font-semibold mb-2">
              {design.name}
            </h3>

            <p className="text-xs text-slate-400">
              {new Date(design.createdAt).toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
