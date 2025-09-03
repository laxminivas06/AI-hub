import React from 'react';
import { ExternalLink } from 'lucide-react';
import { partners } from '../data/partners';

const Partners: React.FC = () => {
  return (
    <section id="partners" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Organistaions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Collaborating with innovative organizations to advance AI education and technology adoption
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <a
              key={partner.name}
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden opacity-0 animate-fade-in-up`}
              style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'forwards' }}
            >
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="w-20 h-20 rounded-xl object-cover shadow-md group-hover:shadow-lg transition-shadow duration-300"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-purple-600 transition-colors duration-300">
                  {partner.name}
                </h3>
                
                <p className="text-gray-600 text-center mb-6 leading-relaxed">
                  {partner.description}
                </p>
                
                <div className="flex items-center justify-center text-blue-600 group-hover:text-purple-600 font-medium transition-colors duration-300">
                  <span>Learn More</span>
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;