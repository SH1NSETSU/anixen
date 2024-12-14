import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm sticky top-0 z-10 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight flex items-center space-x-2">
          <img src="/logo.jpg" alt="d1gitalanime" className="h-8 w-8 object-contain" />
          <Link to="/" className="hover:text-gray-300 transition-colors">
            d1gitalanime
          </Link>
        </h1>
      </div>
    </header>
  );
}
