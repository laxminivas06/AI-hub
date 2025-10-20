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

        <div className="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
          {partners.map((partner) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-300 overflow-hidden flex flex-col h-full min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] border border-gray-100"
            >
              <div className="p-2 sm:p-3 lg:p-4 flex flex-col items-center justify-center text-center h-full">
                {/* Logo Container */}
                <div className="flex items-center justify-center mb-1 sm:mb-2 lg:mb-3">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-md sm:rounded-lg object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                
                {/* Name */}
                <h3 className="text-xs sm:text-sm lg:text-base font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2 leading-tight">
                  {partner.name}
                </h3>
              </div>
            </a>
          ))}
        </div>

        {/* Optional: View All Button for many partners */}
        {partners.length > 8 && (
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