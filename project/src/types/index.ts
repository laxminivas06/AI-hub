export interface AITool {
  id: number;
  name: string;
  description: string;
  website: string;
  category: string;
  logo: string;
  featured?: boolean;
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