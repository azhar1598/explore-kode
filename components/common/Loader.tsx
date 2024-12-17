"use client";
import React from "react";

const StunningLoader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="relative w-48 h-48">
        {/* Outer Glow Circle */}
        <div className="absolute inset-0 bg-white/30 rounded-full animate-ping"></div>

        {/* Spinning Loader */}
        <div className="relative w-full h-full">
          {/* Circular Gradient Loader */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 animate-spin-slow">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white rounded-full shadow-2xl"></div>
          </div>

          {/* Pulsing Inner Dots */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full animate-pulse-slow"></div>
            <div className="absolute w-10 h-10 bg-purple-500 rounded-full animate-pulse-fast"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom animations
const styles = `
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-slow {
  0%, 100% { transform: scale(1); opacity: 0.7; }
  50% { transform: scale(1.1); opacity: 1; }
}

@keyframes pulse-fast {
  0%, 100% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 1; }
}

.animate-spin-slow {
  animation: spin-slow 4s linear infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 2s ease-in-out infinite;
}
`;

// Inject custom styles
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default StunningLoader;
