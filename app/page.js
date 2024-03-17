"use client";
import { useState } from "react"; // No need for useEffect here if not used
import Link from "next/link";
import { useUserAuth } from "./auth-context"; // Assuming this is the correct path

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // TODO: Implement handleSignIn and handleSignOut functions using gitHubSignIn and firebaseSignOut from useUserAuth

  const handleSignIn = () => {
    gitHubSignIn(); // Or any other authentication method provided by useUserAuth
  };

  const handleSignOut = () => {
    firebaseSignOut(); // Or any other sign out method provided by useUserAuth
  };

  return (
    <div className="container mx-auto my-8 p-4">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>

          {/* TODO: Render a button that links to the weather page. Use the Next.js Link component. */}
          <Link className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" href="/weather">
              Weather App
          </Link>

          {/* TODO: Render a Sign Out button that calls handleSignOut when clicked */}
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <>
          <p>Please sign in to access the weather information.</p>
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" onClick={handleSignIn}>Sign In</button>
          {/* TODO: Render a Sign In button that calls handleSignIn when clicked */}
        </>
      )}
    </div>
  );
}
