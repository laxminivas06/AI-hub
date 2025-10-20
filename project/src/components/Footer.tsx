import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  // Get current year automatically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold">AI Tools Hub</span>
          </div>
          
          <p className="text-gray-400 mb-4">
            Empowering innovation through artificial intelligence
          </p>
          
          <div className="flex items-center justify-center space-x-1 text-gray-400">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-400 animate-pulse" />
            <span>for the AI community</span>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-700 text-sm text-gray-500">
            <p>&copy; {currentYear} AI Tools Hub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;