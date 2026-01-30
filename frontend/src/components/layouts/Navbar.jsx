import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { useEffect, useState } from "react";
import { logout } from "../../utils/auth";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  const handleLogout = () => {
  logout();              // remove token + dispatch event
  setOpen(false);        // close dropdown immediately
  setLoggedIn(false);    // 🔥 THIS IS THE KEY LINE
  navigate("/login");
};


  useEffect(() => {
    const updateAuth = () => {
      setLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("auth-change", updateAuth);
    return () =>
      window.removeEventListener("auth-change", updateAuth);
  }, []);

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        fixed top-0 w-full z-50
        backdrop-blur bg-white/5
        border-b border-white/10
        px-8 py-4 flex justify-between items-center
      "
    >
      {/* LOGO */}
      <h1
        className="font-bold text-indigo-400 cursor-pointer"
        onClick={() => navigate("/")}
      >
        System Designer
      </h1>

      {/* LINKS */}
      <div className="flex items-center gap-6 text-sm">
        <Link to="/">Home</Link>
        <Link to="/designer">Designer</Link>
        <Link to="/templates">Templates</Link>
        <Link to="/designs">My Designs</Link>

        {/* PROFILE */}
       {loggedIn && (
  <div className="relative">
    <User
      className="cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    />

    {open && (
      <div className="absolute right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl w-32">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-left hover:bg-slate-800"
        >
          Logout
        </button>
      </div>
    )}
  </div>
)}

      </div>
    </motion.nav>
  );
}
