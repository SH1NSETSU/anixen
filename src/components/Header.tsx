import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-10 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold tracking-tight">
          {/* Wrap AniLeo in a Link to navigate to the home page */}
          <Link to="/" className="hover:text-gray-300 transition-colors">
            AniLeo
          </Link>
        </h1>
      </div>
    </header>
  );
}
