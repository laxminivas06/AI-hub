import React from 'react';
import { ExternalLink, Linkedin, Globe, Instagram, Github, Mail } from 'lucide-react';
import { mentor } from '../data/mentor';

const Mentor: React.FC = () => {
  const socialIcons = {
    linkedin: Linkedin,
    website: Globe,
    instagram: Instagram,
    github: Github,
    email: Mail
  };

  return (
    <section id="mentor" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Meet Your Mentor
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from an experienced AI dedicated to sharing knowledge and guiding your AI journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-12">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-48 h-48 rounded-full object-cover shadow-2xl ring-8 ring-white"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{mentor.name}</h3>
                <p className="text-xl text-purple-600 font-semibold mb-2">{mentor.tagline}</p>
                <p className="text-lg text-gray-700 mb-6">{mentor.subtitle}</p>
                <p className="text-gray-600 leading-relaxed mb-8">{mentor.about}</p>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {Object.entries(mentor.socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons];
                    const isEmail = platform === 'email';
                    
                    return (
                      <a
                        key={platform}
                        href={isEmail ? `mailto:${url}` : url}
                        target={isEmail ? '_self' : '_blank'}
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:text-purple-600"
                      >
                        <IconComponent className="h-5 w-5 mr-2" />
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        {!isEmail && <ExternalLink className="ml-2 h-4 w-4" />}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentor;