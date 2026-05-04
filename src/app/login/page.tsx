"use client"; 
// Enables client-side rendering (required for React hooks like useState and useRouter)

// Import React hook for managing component state
import { useState } from "react";

// Import Next.js router for page navigation
import { useRouter } from "next/navigation";

// Import toast library for showing notifications
import toast from "react-hot-toast";

//  Login Page Component
export default function LoginPage() {
  const router = useRouter(); // Initialize router

  //  State to store email input value
  const [email, setEmail] = useState("");

  //  State to store password input value
  const [password, setPassword] = useState("");

  //  Login handler function (runs on form submit)
  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form reload behavior

    //  Simple demo authentication (hardcoded credentials)
    if (email === "admin@gmail.com" && password === "Admin@123") {

      // Store login status in browser localStorage
      localStorage.setItem("isAdmin", "true");

      // Show success message
      toast.success("Login successful");

      // Redirect user to dashboard page
      router.push("/dashboard");

    } else {
      //  Show error if credentials are incorrect
      toast.error("Invalid login details");
    }
  };

  return (
    <main className="login-page">
      <div className="login-card">

        {/*  Page Heading Section */}
        <span className="task-badge">Admin Login</span>
        <h1>Welcome Back</h1>
        <p>Login to manage your Firebase tasks.</p>

        {/*  Login Form */}
        <form onSubmit={login}>

          {/*  Email Input Field */}
          <input
            className="form-control mb-3"
            placeholder="Email: admin@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            // Updates email state on typing
          />

          {/*  Password Input Field */}
          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password: Admin@123"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            // Updates password state on typing
          />

          {/*  Submit Button */}
          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>
      </div>
    </main>
  );
}