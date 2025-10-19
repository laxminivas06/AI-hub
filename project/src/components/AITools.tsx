import React, { useState, useEffect, useCallback } from 'react';
import { ExternalLink, X, Search, Filter, MoreVertical } from 'lucide-react';
import { AITool } from '../types';
import { aiTools } from '../data/aiTools';

const AITools: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<AITool | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Responsive device detection
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
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

  // Get grid columns based on screen size
  const getGridColumns = () => {
    if (isMobile) return 'grid-cols-2'; // 2 columns on mobile
    if (isTablet) return 'grid-cols-3'; // 3 columns on tablet
    return 'grid-cols-4'; // 4 columns on desktop
  };

  return (
    <section id="tools" className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            AI Tools Collection
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover 100 powerful AI tools that can transform your workflow, boost creativity, and unlock new possibilities
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm sm:text-base"
              style={{ 
                WebkitAppearance: 'none',
                WebkitTapHighlightColor: 'transparent'
              }}
            />
          </div>
          <div className="relative sm:min-w-[200px]">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400 pointer-events-none" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm sm:text-base"
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

        {/* Tools Grid - Responsive columns */}
        <div className={`grid ${getGridColumns()} gap-3 sm:gap-4 lg:gap-6`}>
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
              onClick={() => handleToolClick(tool)}
            >
              {/* Mobile & Tablet View */}
              <div className="block lg:hidden p-3 sm:p-4 flex flex-col h-full">
                <div className="flex items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight mb-1 line-clamp-2">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-purple-600 bg-purple-100 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs">
                      {isMobile ? tool.category.split(' ')[0] : tool.category}
                    </span>
                  </div>
                </div>

                {/* Description for tablet */}
                {isTablet && (
                  <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2 flex-1">
                    {tool.description}
                  </p>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
                  <button
                    onClick={(e) => handleMobileVisit(e, tool)}
                    className="w-full flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-3 bg-blue-600 text-white font-medium rounded-lg active:bg-blue-700 transition-colors text-xs sm:text-sm"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Visit</span>
                    <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  
                  <button
                    onClick={(e) => handleMobileViewMore(e, tool)}
                    className="w-full flex items-center justify-center gap-1 sm:gap-2 py-2 sm:py-2.5 px-3 border border-gray-300 text-gray-700 font-medium rounded-lg active:bg-gray-100 transition-colors text-xs sm:text-sm"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>Details</span>
                  </button>
                </div>

                {tool.featured && (
                  <div className="mt-2 flex justify-center">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Desktop View */}
              <div className="hidden lg:block p-4 lg:p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg lg:rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm lg:text-lg leading-tight mb-1">
                      {tool.name}
                    </h3>
                    <span className="inline-block text-purple-600 bg-purple-100 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm">
                      {tool.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 flex-1 line-clamp-3">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 lg:pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(tool.website, '_blank', 'noopener,noreferrer');
                    }}
                    className="flex items-center gap-1 lg:gap-2 text-blue-600 hover:text-blue-700 font-medium text-xs lg:text-sm transition-colors py-1.5 lg:py-2 px-2 lg:px-3 rounded-lg hover:bg-blue-50"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Visit Tool</span>
                    <ExternalLink className="h-3 w-3 lg:h-4 lg:w-4" />
                  </button>
                  
                  {tool.featured && (
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 lg:px-3 py-1 rounded-full font-medium">
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
          <div className="text-center py-12 sm:py-16">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 sm:h-16 sm:w-16 mx-auto" />
            </div>
            <p className="text-gray-500 text-base sm:text-lg font-medium">No AI tools found</p>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Responsive Modal */}
        {selectedTool && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/50 backdrop-blur-sm"
            style={{
              WebkitBackdropFilter: 'blur(8px)',
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            onClick={handleCloseModal}
          >
            <div 
              className={`bg-white w-full h-full sm:h-auto sm:rounded-3xl sm:shadow-2xl flex flex-col ${
                isMobile ? 'max-w-full' : 
                isTablet ? 'max-w-2xl' : 
                'max-w-3xl'
              }`}
              style={{
                WebkitOverflowScrolling: 'touch',
                maxHeight: isMobile ? '100vh' : '90vh',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 sm:rounded-t-3xl px-4 sm:px-6 py-4 flex items-center justify-between z-10">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate pr-4">
                  {selectedTool.name}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div 
                className="flex-1 overflow-y-auto p-4 sm:p-6"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-6">
                  <img
                    src={selectedTool.logo}
                    alt={`${selectedTool.name} logo`}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover flex-shrink-0 shadow-md"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block text-purple-600 bg-purple-100 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                        {selectedTool.category}
                      </span>
                      {selectedTool.featured && (
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8">
                  {selectedTool.description}
                </p>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 sm:rounded-b-3xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => window.open(selectedTool.website, '_blank', 'noopener,noreferrer')}
                    className="flex-1 flex items-center justify-center gap-2 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg sm:rounded-xl active:scale-95 transition-transform text-sm sm:text-base"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                  >
                    <span>Visit {selectedTool.name}</span>
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="py-3 sm:py-4 px-4 sm:px-6 border border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl active:bg-gray-50 transition-colors text-sm sm:text-base sm:min-w-[120px]"
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