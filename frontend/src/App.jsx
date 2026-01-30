import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Designer from "./pages/Designer";
import Templates from "./pages/Templates";
import MyDesigns from "./pages/MyDesigns";
import NotFound from "./pages/NotFound";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen text-white ">
      <Navbar />

      <main>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/designer"
          element={
            <ProtectedRoute>
              <Designer />
            </ProtectedRoute>
          }
        />

        <Route path="/templates" element={<Templates />} />
        <Route
  path="/designs"
  element={
    <ProtectedRoute>
      <MyDesigns />
    </ProtectedRoute>
  }
/>
        <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      </main>
      <Footer/>
    </div>
  );
}
