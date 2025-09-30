import React, { useState, useEffect } from 'react';
import { ExternalLink, X, Search, Filter } from 'lucide-react';
import { AITool } from '../types';
import { aiTools } from '../data/aiTools';

const AITools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [visibleTools, setVisibleTools] = useState<AITool[]>([]);

  const categories = ['All', ...Array.from(new Set(aiTools.map(tool => tool.category)))];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleTools(aiTools);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToolClick = (tool: AITool) => {
    // Prevent modal opening on mobile devices
    if (window.innerWidth < 768) { // 768px is the typical breakpoint for 'md' in Tailwind
      return;
    }
    setSelectedTool(tool);
  };

  const handleMobileVisit = (e: React.MouseEvent, tool: AITool) => {
    e.stopPropagation();
    window.open(tool.website, '_blank');
  };

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            AI Tools Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover 100 powerful AI tools that can transform your workflow, boost creativity, and unlock new possibilities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tools Grid - Updated for mobile responsiveness */}
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
          {filteredTools.map((tool, index) => (
            <div
              key={tool.id}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 overflow-hidden ${
                visibleTools.includes(tool) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${
                // Only add hover effects and cursor pointer on desktop
                window.innerWidth >= 768 ? 'hover:scale-105 cursor-pointer' : 'cursor-default'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
              onClick={() => handleToolClick(tool)}
            >
              {/* Mobile Compact View */}
              <div className="sm:hidden p-3 flex flex-col items-center text-center">
                <img
                  src={tool.logo}
                  alt={`${tool.name} logo`}
                  className="w-10 h-10 rounded-lg object-cover shadow-md mb-2"
                />
                <h3 className="font-semibold text-gray-900 text-xs leading-tight mb-1 line-clamp-2">
                  {tool.name}
                </h3>
                <span className="text-xs text-purple-600 bg-purple-100 px-1.5 py-0.5 rounded-full mb-2">
                  {tool.category.split(' ')[0]}
                </span>
                
                {/* Mobile Visit Button - Always visible on mobile */}
                <button
                  onClick={(e) => handleMobileVisit(e, tool)}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors duration-200 mt-1"
                >
                  Visit
                  <ExternalLink className="ml-1 h-3 w-3" />
                </button>

                {tool.featured && (
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-1.5 py-0.5 rounded-full font-medium mt-1">
                    Featured
                  </span>
                )}
              </div>

              {/* Desktop/Tablet Detailed View */}
              <div className="hidden sm:block p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-12 h-12 rounded-xl object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{tool.name}</h3>
                    <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                      {tool.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(tool.website, '_blank');
                    }}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
                  >
                    Visit Tool
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </button>
                  {tool.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tool Detail Modal - Only relevant for desktop */}
        {selectedTool && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto shadow-2xl transform transition-all duration-300 scale-100">
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedTool.logo}
                      alt={`${selectedTool.name} logo`}
                      className="w-16 h-16 rounded-xl object-cover shadow-lg"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedTool.name}</h3>
                      <span className="text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm font-medium">
                        {selectedTool.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X className="h-6 w-6 text-gray-500" />
                  </button>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  {selectedTool.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => window.open(selectedTool.website, '_blank')}
                    className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    Visit {selectedTool.name}
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setSelectedTool(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AITools;