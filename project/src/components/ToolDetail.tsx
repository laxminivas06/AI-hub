import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Check, X, Home } from 'lucide-react';
import { aiTools } from '../data/aiTools';
import { AITool } from '../types';

const ToolDetail: React.FC = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  
  const tool = aiTools.find(t => t.id === Number(toolId));

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
      return 'bg-green-100 text-green-800 border border-green-200';
    } else if (formattedPricing.includes('freemium')) {
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    } else if (formattedPricing.includes('paid')) {
      return 'bg-orange-100 text-orange-800 border border-orange-200';
    }
    return 'bg-gray-100 text-gray-800 border border-gray-200';
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tool Not Found</h1>
            <p className="text-gray-600 mb-6">The AI tool you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Home className="h-5 w-5" />
              Return to AI Tools
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with proper spacing and no mixing */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5">
            {/* Left section - Back button with ample space */}
            <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 flex-shrink-0">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 sm:gap-3 text-gray-600 hover:text-gray-900 font-medium bg-gray-50 hover:bg-gray-100 px-3 sm:px-4 py-2.5 rounded-lg transition-colors border border-gray-200 hover:border-gray-300 flex-shrink-0"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Back to Tools</span>
                <span className="sm:hidden whitespace-nowrap">Back</span>
              </button>
            </div>

            {/* Center section - Tool name with proper spacing */}
            <div className="flex-1 min-w-0 mx-4 sm:mx-6 lg:mx-8 px-2 sm:px-4">
              <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 text-center truncate leading-tight">
                {tool.name}
              </h1>
            </div>

            {/* Right section - Optional actions with balanced spacing */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <button
                onClick={() => window.open(tool.website, '_blank', 'noopener,noreferrer')}
                className="hidden sm:flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-3 sm:px-4 py-2.5 rounded-lg transition-colors border border-blue-200 hover:border-blue-300 whitespace-nowrap flex-shrink-0"
              >
                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                <span className="hidden lg:inline">Visit Site</span>
                <span className="lg:hidden">Visit</span>
              </button>
              
              {/* Balanced spacer for mobile */}
              <div className="w-10 sm:w-12 lg:w-14 flex-shrink-0 sm:hidden"></div>
              <div className="w-4 sm:w-6 lg:w-8 flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            {/* Hero Section - Fixed logo and name container */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Logo Container - Fixed sizing and display */}
                <div className="flex-shrink-0 mx-auto sm:mx-0">
                  <img
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl object-contain shadow-md bg-white p-1"
                    onError={(e) => {
                      // Fallback if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/112/112';
                      target.className = 'w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl sm:rounded-2xl object-cover shadow-md bg-gray-100';
                    }}
                  />
                </div>
                
                {/* Name and Info Container - No gap issues */}
                <div className="flex-1 min-w-0 text-center sm:text-left mt-2 sm:mt-0">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                    {tool.name}
                  </h2>
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-3">
                    <span className="inline-block text-purple-600 bg-purple-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold">
                      {tool.category}
                    </span>
                    <span className={`inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${getPricingColor(tool.pricing)}`}>
                      {formatPricing(tool.pricing)}
                    </span>
                  </div>
                  <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.open(tool.website, '_blank', 'noopener,noreferrer')}
                className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg sm:rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
              >
                <span className="text-sm sm:text-base">Visit {tool.name}</span>
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>

            {/* Detailed Description */}
            {tool.detailedDescription && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">About {tool.name}</h2>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg whitespace-pre-line">
                  {tool.detailedDescription}
                </p>
              </div>
            )}

            {/* Tags */}
            {tool.tags && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Tags & Features</h2>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.split(', ').map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            {/* Pros */}
            {tool.pros && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Pros</h2>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {tool.pros.split(', ').map((pro, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Cons */}
            {tool.cons && (
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Cons</h2>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {tool.cons.split(', ').map((con, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <X className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm sm:text-base">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open(tool.website, '_blank', 'noopener,noreferrer')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Website
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                >
                  <Home className="h-4 w-4" />
                  Browse More Tools
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Home className="h-4 w-4" />
              Home
            </button>
            <button
              onClick={() => window.open(tool.website, '_blank', 'noopener,noreferrer')}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Site
            </button>
          </div>
        </div>
      </div>

      {/* Add padding for mobile bottom navigation */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default ToolDetail;