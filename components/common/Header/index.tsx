"use client";
import React, { useState } from "react";
import { LogOut, Menu, RocketIcon, User, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

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
    localStorage.clear();
    router.push("/");
    setUser(null);
    setIsUserDropdownOpen(false);
  };

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".user-dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const UserDropdown = () => (
    <div className="relative user-dropdown">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsUserDropdownOpen(!isUserDropdownOpen);
        }}
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition"
      >
        <User className="w-5 h-5" />
        <span>{user.user_metadata?.full_name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isUserDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isUserDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <Link
            href="/account/profile"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            Profile
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            Settings
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-black/90 backdrop-blur-md fixed top-0 w-full z-50">
      <nav className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href={"/"}
            className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            <span className="text-4xl">S</span>TARTUP
            <span className="text-4xl">X</span>TREME
            {/* <span className="text-4xl">F</span>ind{" "}
            <span className="text-4xl">M</span>e{" "}
            <span className="text-4xl">S</span>tartup */}
            {/* <span className="text-4xl">S</span>tartup{" - "}
            <span className="text-4ssxl">f</span>ound
            <span className="text-4xl">R</span> */}
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
            {user ? (
              <UserDropdown />
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
                <div className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-center space-x-2 text-gray-300 mb-2">
                    <User className="w-5 h-5" />
                    <span>{user.user_metadata?.full_name}</span>
                  </div>
                  <Link
                    href="/profile"
                    className="text-gray-300 hover:text-white transition py-2"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="text-gray-300 hover:text-white transition py-2"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition py-2"
                  >
                    <LogOut className="w-4 h-4" />
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
