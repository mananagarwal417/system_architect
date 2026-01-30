import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { registerUser } from "../services/authService";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const res = await registerUser(form);

  if (res.token) {
    localStorage.setItem("token", res.token);

    // 🔥 IMPORTANT: notify app
    window.dispatchEvent(new Event("auth-change"));

    navigate("/designer");
  } else {
    alert(res.message);
  }
};


  return (
    <AuthLayout
      title="Create your account 🚀"
      subtitle="Start building system architectures visually"
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          className="auth-input"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Email"
          className="auth-input"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="auth-btn">Sign up</button>
      </form>
    </AuthLayout>
  );
}
