"use client"; // Enables client-side rendering (required for hooks like useEffect and router)

// React hook for running side effects
import { useEffect } from "react";

// Next.js hook for navigation (redirecting between pages)
import { useRouter } from "next/navigation";

// Home component (root page)
export default function Home() {
  const router = useRouter(); // Initialize router

  //  useEffect runs when the component loads
  useEffect(() => {
    // Automatically redirect user to login page
    router.push("/login");
  }, [router]); // Dependency array ensures this runs once

  // No UI is rendered on home page
  return null;
}