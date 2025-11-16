import React from 'react';
import { ExternalLink } from 'lucide-react';
import { partners } from '../data/partners';

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Our Organisations
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Collaborating with innovative organizations to advance AI education
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {partners.map((partner, index) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transform hover:scale-105 
                transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[120px] sm:min-h-[140px] 
                lg:min-h-[160px] border border-gray-100
                ${index === 2 ? 'col-span-2 lg:col-span-1 justify-self-center w-full max-w-[280px] sm:max-w-none' : ''}
              `}
            >
              <div className="p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center text-center h-full">
                {/* Logo Container */}
                <div className="flex items-center justify-center mb-3 sm:mb-4 lg:mb-5">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-lg sm:rounded-xl object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Name */}
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {partner.name}
                </h3>
                
                {/* Optional: Description */}
                {partner.description && (
                  <p className="mt-2 text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {partner.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </div>

        {/* Optional: View All Button for many partners */}
        {partners.length > 6 && (
          <div className="text-center mt-8 sm:mt-12">
            <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              <span>View All Organisations</span>
              <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Partners;