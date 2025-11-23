import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ExternalLink, Search, Filter, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { AITool } from '../types';
import { aiTools } from '../data/aiTools';
import { useNavigate } from 'react-router-dom';

const AITools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      
      // Adjust items per page based on screen size
      if (width < 640) { // Small mobile
        setItemsPerPage(8);  // 2 columns × 4 rows
      } else if (width < 768) { // Mobile
        setItemsPerPage(10); // 2 columns × 5 rows
      } else if (width < 1024) { // Tablet
        setItemsPerPage(12); // 3 columns × 4 rows
      } else { // Desktop
        setItemsPerPage(16); // 4 columns × 4 rows
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const filteredTools = React.useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.tags.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredTools.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTools = filteredTools.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const categories = ['All', ...Array.from(new Set(aiTools.map(tool => tool.category)))];

  const handleToolClick = useCallback((toolId: number) => {
    navigate(`/tool/${toolId}`);
  }, [navigate]);

  const handleCategorySelect = useCallback((category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  }, []);

  const handleVisitWebsite = useCallback((e: React.MouseEvent, website: string) => {
    e.stopPropagation();
    window.open(website, '_blank', 'noopener,noreferrer');
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const handlePrevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const handlePageClick = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // Updated responsive grid columns
  const getGridColumns = () => {
    if (isMobile) return 'grid-cols-2'; // 2 columns on mobile
    if (isTablet) return 'grid-cols-3'; // 3 columns on tablet
    return 'grid-cols-4'; // 4 columns on desktop
  };

  const getPaginationButtons = () => {
    const buttons = [];
    const maxVisibleButtons = isMobile ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    if (startPage > 1) {
      buttons.push(1);
      if (startPage > 2) {
        buttons.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push('...');
      }
      buttons.push(totalPages);
    }

    return buttons;
  };

  // Helper function to format pricing (handle both string and number)
  const formatPricing = (pricing: string | number): string => {
    if (typeof pricing === 'number') {
      return pricing === 0 ? 'Free' : `$${pricing}/month`;
    }
    
    const pricingStr = pricing.toString().toLowerCase();
    if (pricingStr.includes('free')) {
      return 'Free';
    } else if (pricingStr.includes('freemium')) {
      return 'Freemium';
    } else if (pricingStr.includes('paid')) {
      return 'Paid';
    }
    return pricing.toString();
  };

  // Helper function to get pricing color
  const getPricingColor = (pricing: string | number) => {
    const formattedPricing = formatPricing(pricing).toLowerCase();
    if (formattedPricing.includes('free')) {
      return 'bg-green-100 text-green-800';
    } else if (formattedPricing.includes('freemium')) {
      return 'bg-blue-100 text-blue-800';
    } else if (formattedPricing.includes('paid')) {
      return 'bg-orange-100 text-orange-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <section id="tools" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            AI Tools Collection
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-3 sm:px-4">
            Discover powerful AI tools that can transform your workflow and boost creativity
          </p>
        </div>

        {/* Search and Filter - Custom Dropdown */}
        <div className="mb-8 sm:mb-10 lg:mb-12 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm"
            />
          </div>
          
          {/* Custom Dropdown Container */}
          <div className="relative sm:min-w-[180px] lg:min-w-[200px]" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full pl-10 pr-8 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-sm text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-gray-400 mr-2" />
                <span className="truncate">{selectedCategory}</span>
              </div>
              <ChevronDown 
                className={`h-4 w-4 text-gray-400 transition-transform ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg sm:rounded-xl shadow-lg z-50 max-h-60 overflow-hidden">
                <div className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                        selectedCategory === category
                          ? 'bg-purple-50 text-purple-700 font-medium'
                          : 'text-gray-700'
                      } first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            Showing <span className="font-semibold">{startIndex + 1}-{Math.min(endIndex, filteredTools.length)}</span> of{' '}
            <span className="font-semibold">{filteredTools.length}</span> tools
            {searchTerm && (
              <span> for "<span className="font-semibold">{searchTerm}</span>"</span>
            )}
            {selectedCategory !== 'All' && (
              <span> in <span className="font-semibold">{selectedCategory}</span></span>
            )}
          </p>
        </div>

        {/* Tools Grid - Updated with responsive gap and padding */}
        <div className={`grid ${getGridColumns()} gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12`}>
          {currentTools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-1"
              onClick={() => handleToolClick(tool.id)}
            >
              <div className="p-3 sm:p-4 lg:p-6">
                {/* Tool Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-lg sm:rounded-xl object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base lg:text-lg leading-tight mb-1 sm:mb-2 line-clamp-2">
                      {tool.name}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      <span className="inline-block text-purple-600 bg-purple-100 px-2 py-1 rounded-full text-xs font-medium">
                        {tool.category}
                      </span>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPricingColor(tool.pricing)}`}>
                        {formatPricing(tool.pricing)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3">
                  {tool.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                  {tool.tags.split(', ').slice(0, isMobile ? 2 : 3).map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 px-1.5 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {tool.tags.split(', ').length > (isMobile ? 2 : 3) && (
                    <span className="inline-block bg-gray-100 text-gray-600 px-1.5 py-1 rounded text-xs">
                      +{tool.tags.split(', ').length - (isMobile ? 2 : 3)} more
                    </span>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleToolClick(tool.id)}
                  className="w-full py-2 px-3 sm:py-2.5 sm:px-4 border border-gray-300 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                >
                  View Details
                </button>
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

        {/* Pagination */}
        {filteredTools.length > 0 && totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 sm:mt-10 lg:mt-12">
            {/* Mobile Pagination */}
            <div className="sm:hidden flex items-center justify-between w-full">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-xs ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="h-3 w-3" />
                Previous
              </button>
              
              <span className="text-gray-600 text-xs font-medium">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg font-medium text-xs ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Next
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>

            {/* Desktop Pagination */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-1">
                {getPaginationButtons().map((page, index) => (
                  <React.Fragment key={index}>
                    {page === '...' ? (
                      <span className="px-2 sm:px-3 py-2 text-gray-500 text-sm">...</span>
                    ) : (
                      <button
                        onClick={() => handlePageClick(page as number)}
                        className={`min-w-[32px] sm:min-w-[40px] px-2 sm:px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                          currentPage === page
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {page}
                      </button>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium text-sm ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-50'
                }`}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Page Info */}
            <div className="hidden sm:block text-gray-600 text-sm">
              Page {currentPage} of {totalPages} • {filteredTools.length} tools
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AITools;