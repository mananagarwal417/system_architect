import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { loginUser } from "../services/authService";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!passwordRegex.test(form.password)) {
      alert("Invalid password format. Please check your credentials.");
      return; // Stop the function here
    }

  const res = await loginUser(form);

  if (res.token) {
    localStorage.setItem("token", res.token);

    // 🔥 THIS LINE IS IMPORTANT
    window.dispatchEvent(new Event("auth-change"));

    navigate("/designer");
  } else {
    alert(res.message);
  }
};


  return (
    <AuthLayout
      title="Welcome back 👋"
      subtitle="Sign in to continue designing systems"
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
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

        <button className="auth-btn">Login</button>
      </form>
    </AuthLayout>
  );
}
