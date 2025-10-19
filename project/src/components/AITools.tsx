import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, X, Search, Filter, MoreVertical } from 'lucide-react';
import { AITool } from '../types';
import { aiTools } from '../data/aiTools';

const AITools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);

  // Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Memoized filtered tools calculation
  const filteredTools = React.useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(aiTools.map(tool => tool.category)))];

  // Optimized event handlers
  const handleToolClick = useCallback((tool: AITool) => {
    if (!isMobile) {
      setSelectedTool(tool);
    }
  }, [isMobile]);

  const handleMobileViewMore = useCallback((e: React.MouseEvent, tool: AITool) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedTool(tool);
  }, []);

  const handleMobileVisit = useCallback((e: React.MouseEvent, tool: AITool) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(tool.website, '_blank', 'noopener,noreferrer');
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTool(null);
  }, []);

  // Optimized modal management
  useEffect(() => {
    if (selectedTool) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [selectedTool]);

  return (
    <section id="tools" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AI Tools Collection
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover 100 powerful AI tools that can transform your workflow, boost creativity, and unlock new possibilities
          </p>
        </div>

        {/* Search and Filter - Optimized for touch */}
        <div className="mb-12 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-base"
              style={{ 
                WebkitAppearance: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>
          <div className="relative min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-base"
              style={{ 
                WebkitAppearance: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Optimized Tools Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
              onClick={() => handleToolClick(tool)}
            >
              {/* Mobile View - Simplified and Optimized */}
              <div className="block sm:hidden p-4">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-xs">
                      {tool.category.split(' ')[0]}
                    </span>
                  </div>
                </div>

                {/* Mobile Action Buttons - Larger touch targets */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={(e) => handleMobileVisit(e, tool)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-medium rounded-lg active:bg-blue-700 transition-colors text-sm"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={(e) => handleMobileViewMore(e, tool)}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-lg active:bg-gray-100 transition-colors text-sm"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <MoreVertical className="h-4 w-4" />
                    <span>View Details</span>
                  </button>
                </div>

                {tool.featured && (
                  <div className="mt-3 flex justify-center">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop/Tablet View */}
              <div className="hidden sm:block p-6 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm">
                      {tool.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(tool.website, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors py-2 px-3 rounded-lg hover:bg-blue-50"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Visit Tool</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  
                  {tool.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-3 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTools.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <p className="text-gray-500 text-lg font-medium">No AI tools found</p>
            <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Optimized Modal for Mobile */}
        {selectedTool && (
          <div 
            className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
            style={{
              WebkitBackdropFilter: 'blur(8px)',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              overflow: 'hidden'
            }}
            onClick={handleCloseModal}
          >
            <div 
              className="bg-white w-full h-full sm:h-auto sm:max-h-[85vh] sm:max-w-2xl sm:rounded-3xl sm:shadow-2xl flex flex-col"
              style={{
                WebkitOverflowScrolling: 'touch',
                overflow: 'hidden'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Sticky */}
              <div className="sticky top-0 bg-white border-b border-gray-200 sm:rounded-t-3xl px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-xl font-bold text-gray-900 truncate pr-4">
                  {selectedTool.name}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <X className="h-6 w-6 text-gray-500" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div 
                className="flex-1 overflow-y-auto p-6"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedTool.logo}
                    alt={`${selectedTool.name} logo`}
                    className="w-16 h-16 rounded-xl object-cover flex-shrink-0 shadow-md"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-purple-600 bg-purple-100 px-3 py-1 rounded-full text-sm font-medium mb-2">
                      {selectedTool.category}
                    </span>
                    {selectedTool.featured && (
                      <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 text-base leading-relaxed mb-8">
                  {selectedTool.description}
                </p>
              </div>

              {/* Footer - Sticky */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 sm:rounded-b-3xl p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.open(selectedTool.website, '_blank', 'noopener,noreferrer')}
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl active:scale-95 transition-transform text-base"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Visit {selectedTool.name}</span>
                    <ExternalLink className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="py-4 px-6 border border-gray-300 text-gray-700 font-semibold rounded-xl active:bg-gray-50 transition-colors text-base sm:flex-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
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