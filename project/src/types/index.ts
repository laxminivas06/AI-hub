export interface AITool {
  id: number;
  name: string;
  description: string;
  website: string;
  category: string;
  logo: string;
  pros: string;
  cons: string;
  pricing: string | number; // Allow both string and number
  tags: string;
  detailedDescription: string;
}

export interface Mentor {
  name: string;
  photo: string;
  tagline: string;
  subtitle: string;
  about: string;
  socialLinks: {
    linkedin?: string;
    website?: string;
    instagram?: string;
    github?: string;
    email?: string;
  };
}

export interface Partner {
  name: string;
  description: string;
  website: string;
  logo: string;
}