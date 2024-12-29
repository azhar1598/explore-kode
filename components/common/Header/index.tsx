"use client";
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
    const res = await supabase.auth.signOut();
    if (res) setUser(null);
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
            <span className="text-4xl">S</span>TARTUP
            {/* <span className="text-4xl">B</span>UZINESS */}
            <span className="text-4xl">X</span>TREME
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
                    className="flex bg-red-400 items-center space-x-2 text-gray-300 "
                  >
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
