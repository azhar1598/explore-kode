"use client";
// import React from "react";
// import { Menu, X, User, LogOut } from "lucide-react";

// import { useRouter } from "next/navigation";
// import { createClient } from "@/utils/supabase/client";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const [user, setUser] = React.useState(null);
//   const router = useRouter();
//   const supabase = createClient();

//   React.useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setUser(user);
//     };
//     fetchUser();
//   }, []);

//   const handleSignOut = async () => {
//     await supabase.auth.signOut();
//     router.push("/");
//   };

//   return (
//     <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <button
//               onClick={() => router.push("/")}
//               className="text-xl font-bold text-gray-800 hover:text-gray-600"
//             >
//               BusinessBuilder
//             </button>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-8">
//             <button
//               onClick={() => router.push("/explore")}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               Explore
//             </button>
//             <button
//               onClick={() => router.push("/pricing")}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               Pricing
//             </button>
//             <button
//               onClick={() => router.push("/about")}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               About
//             </button>
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => router.push("/dashboard")}
//                   className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
//                 >
//                   <User size={20} />
//                   <span>Dashboard</span>
//                 </button>
//                 <button
//                   onClick={handleSignOut}
//                   className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
//                 >
//                   <LogOut size={20} />
//                   <span>Sign Out</span>
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => router.push("/login")}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//               >
//                 Sign In
//               </button>
//             )}
//           </nav>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//           >
//             {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t">
//             <div className="flex flex-col space-y-4">
//               <button
//                 onClick={() => {
//                   router.push("/explore");
//                   setIsMenuOpen(false);
//                 }}
//                 className="text-gray-600 hover:text-gray-800 px-2 py-1"
//               >
//                 Explore
//               </button>
//               <button
//                 onClick={() => {
//                   router.push("/pricing");
//                   setIsMenuOpen(false);
//                 }}
//                 className="text-gray-600 hover:text-gray-800 px-2 py-1"
//               >
//                 Pricing
//               </button>
//               <button
//                 onClick={() => {
//                   router.push("/about");
//                   setIsMenuOpen(false);
//                 }}
//                 className="text-gray-600 hover:text-gray-800 px-2 py-1"
//               >
//                 About
//               </button>
//               {user ? (
//                 <>
//                   <button
//                     onClick={() => {
//                       router.push("/dashboard");
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-2 py-1"
//                   >
//                     <User size={20} />
//                     <span>Dashboard</span>
//                   </button>
//                   <button
//                     onClick={() => {
//                       handleSignOut();
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 px-2 py-1"
//                   >
//                     <LogOut size={20} />
//                     <span>Sign Out</span>
//                   </button>
//                 </>
//               ) : (
//                 <button
//                   onClick={() => {
//                     router.push("/login");
//                     setIsMenuOpen(false);
//                   }}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Sign In
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { LogOut, Menu, RocketIcon, User, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = ["Home", "Features", "About", "Contact"];

  const [user, setUser] = React.useState(null);
  const router = useRouter();
  const supabase = createClient();

  React.useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <header className="bg-black/90 backdrop-blur-md fixed top-0 w-full z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            {/* <span className="text-4xl">X</span>PERT INSIDER */}
            <span className="text-4xl">S</span>TARTUP{" "}
            {/* <span className="text-4xl">B</span>UZINESS */}
            <span className="text-4xl">X</span>PERT
            {/* <span className="text-4xl">B</span>usinessvala */}
            {/* PERT */}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white transition"
              >
                {item}
              </a>
            ))}
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg hover:opacity-90 transition">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-300 hover:text-white transition"
                >
                  {item}
                </a>
              ))}
              {user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-gray-300 "
                  >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              )}
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 rounded-lg hover:opacity-90 transition">
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
