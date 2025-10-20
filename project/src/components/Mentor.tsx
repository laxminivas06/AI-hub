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
    <section id="mentor" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Meet Your Mentor
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Learn from an experienced AI dedicated to sharing knowledge and guiding your AI journey
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-lg sm:shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src={mentor.photo}
                  alt={mentor.name}
                  className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-full object-cover shadow-xl sm:shadow-2xl ring-4 sm:ring-8 ring-white"
                />
              </div>

              {/* Content */}
              <div className="flex-1 text-center lg:text-left w-full min-w-0">
                {/* Name - Single line */}
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {mentor.name}
                </h3>
                
                {/* Tagline - Single line with guaranteed single line display */}
                <div className="mb-2 w-full overflow-hidden">
                  <p className="text-lg sm:text-xl lg:text-2xl text-purple-600 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full block w-full">
                    {mentor.tagline}
                  </p>
                </div>
                
                {/* Subtitle - Single line */}
                <div className="mb-4 sm:mb-6 w-full overflow-hidden">
                  <p className="text-base sm:text-lg lg:text-xl text-gray-700 whitespace-nowrap overflow-hidden text-ellipsis max-w-full block w-full">
                    {mentor.subtitle}
                  </p>
                </div>
                
                {/* About Section */}
                <div className="mb-6 sm:mb-8 w-full">
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed sm:leading-loose break-words hyphens-auto overflow-wrap-anywhere max-w-full">
                    Empowering the next generation with AI knowledge and cutting-edge technology insights. A visionary mind shaping the future through innovation and purpose, passionate about bridging the gap between knowledge and real-world impact, with an unwavering drive to inspire and create meaningful change.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 lg:gap-4 w-full">
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
                        className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-white text-gray-700 rounded-lg sm:rounded-xl shadow-sm sm:shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 hover:text-purple-600 text-xs sm:text-sm flex-shrink-0"
                      >
                        <IconComponent className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 mr-1 sm:mr-2 flex-shrink-0" />
                        <span className="hidden xs:inline">
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </span>
                        {!isEmail && <ExternalLink className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />}
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