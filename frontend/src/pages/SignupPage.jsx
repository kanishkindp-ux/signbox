import { useState } from "react";
import {Link} from "react-router-dom";

function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Signup attempt: ", { name, email, password });
  }

  return (
    <div className="min-h-screen bg-[#612D53] flex flex-col justify-center items-center p-4">
      {/* Form container using the 4th color (Off-White) for contrast */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#F3F4F4] p-8 rounded-xl shadow-2xl flex flex-col gap-5"
      >
        <div className="text-center mb-6 flex flex-col items-center">
          {/* Enhanced SignBox Logo */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 mb-3 drop-shadow-sm"
          >
            {/* Document Outline (Charcoal) */}
            <path
              d="M20 9V20C20 21.1046 19.1046 22 18 22H6C4.89543 22 4 21.1046 4 20V4C4 2.89543 4.89543 2 6 2H13L20 9Z"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Document Fold (Charcoal) */}
            <path
              d="M13 2V9H20"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Signature Line (Mauve) */}
            <path
              d="M10.5 14C10.5 14 12 14 13 15.5C13 15.5 15.5 12 18 11.5"
              stroke="#853953"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 14.5H7.5"
              stroke="#853953"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Bottom Line (Charcoal) */}
            <path
              d="M6.5 18H15"
              stroke="#2C2C2C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <h1 className="text-2xl font-bold text-[#2C2C2C]">
            Create an Account
          </h1>
          <p className="text-[#2C2C2C] opacity-70 text-sm mt-1">
            Welcome! Sign up to get started with SignBox.
          </p>
        </div>

        <input 
        type="text" 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Full name"
        className="bg-white text-[#2C2C2C] border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#853953]"      
        />

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          className="bg-white text-[#2C2C2C] border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#853953]"
        />

        {/* Password Input */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="bg-white text-[#2C2C2C] border border-gray-300 p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#853953]"
        />

        <button
          type="submit"
          className="bg-[#853953] text-[#F3F4F4] font-medium p-2.5 rounded-lg hover:bg-[#2C2C2C] transition duration-200 shadow-md"
        >
          Sign Up
        </button>

        <p className="text-center text-sm text-[#2C2C2C] mt-2">
            {/* To add an extra space after the sentence */}
            Already have an account?{' '}
            <Link to="/login" className="text-[#853953] font-bold hover:underline">
                Log in
            </Link>
        </p>
        
      </form>
    </div>
  );
}

export default SignUpPage;