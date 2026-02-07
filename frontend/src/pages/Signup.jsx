// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthLayout from "../components/auth/AuthLayout";
// import { registerUser } from "../services/authService";

// export default function Signup() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
  

//   const navigate = useNavigate();

//  const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
//     if (!passwordRegex.test(form.password)) {
//       alert("Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.");
//       return; // Stop the function here
//     }

//   const res = await registerUser(form);

//   if (res.token) {
//     localStorage.setItem("token", res.token);

//     // 🔥 IMPORTANT: notify app
//     window.dispatchEvent(new Event("auth-change"));

//     navigate("/designer");
//   } else {
//     alert(res.message);
//   }
// };




//   return (
//     <AuthLayout
//       title="Create your account 🚀"
//       subtitle="Start building system architectures visually"
//       footer={
//         <>
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-400 hover:underline"
//           >
//             Login
//           </Link>
//         </>
//       }
//     >
//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Name"
//           className="auth-input"
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//         />

//         <input
//           placeholder="Email"
//           className="auth-input"
//           onChange={(e) =>
//             setForm({ ...form, email: e.target.value })
//           }
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="auth-input"
//           onChange={(e) =>
//             setForm({ ...form, password: e.target.value })
//           }
//         />

//         <button className="auth-btn">Sign up</button>
//       </form>
//     </AuthLayout>
//   );
// }


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

  // Password validation logic
  const validations = {
    length: form.password.length >= 8,
    upper: /[A-Z]/.test(form.password),
    number: /[0-9]/.test(form.password),
    special: /[@$!%*?&]/.test(form.password),
  };

  const allValid = Object.values(validations).every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!allValid) {
      alert("Please meet all password requirements.");
      return;
    }

    const res = await registerUser(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      window.dispatchEvent(new Event("auth-change"));
      navigate("/designer");
    } else {
      alert(res.message);
    }
  };

  // Helper component for the checklist items
  const ValidationItem = ({ label, isMet }) => (
    <li className={`flex items-center text-xs transition-all duration-300 ${isMet ? "text-green-400 translate-x-1" : "text-red-500"}`}>
      <span className="mr-2">{isMet ? "✔" : "○"}</span>
      {label}
    </li>
  );

  return (
    <AuthLayout
      title="Create your account 🚀"
      subtitle="Start building system architectures visually"
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Name"
          className="auth-input"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Email"
          type="email"
          className="auth-input"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div>
          <input
            type="password"
            placeholder="Password"
            className={`auth-input mb-2 ${allValid ? 'border-green-500' : 'border-red-500'}`}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          
          {/* Password Checklist UI */}
          <ul className="space-y-1 ml-1">
            <ValidationItem label="At least 8 characters" isMet={validations.length} />
            <ValidationItem label="At least one uppercase letter" isMet={validations.upper} />
            <ValidationItem label="At least one number" isMet={validations.number} />
            <ValidationItem label="At least one special character (@$!%*?&)" isMet={validations.special} />
          </ul>
        </div>

        <button 
          className={`auth-btn transition-opacity ${!allValid ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
          disabled={!allValid}
        >
          Sign up
        </button>
      </form>
    </AuthLayout>
  );
}