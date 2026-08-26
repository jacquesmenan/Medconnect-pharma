export interface Product {
  id: string;
  name: string;
  genericName: string; // DCI (Dénomination Commune Internationale)
  dosage: string;
  galenicForm: string; // Comprimé, Gélule, Sirop, Injectable, Pommade, etc.
  packaging: string;
  category: string; // Cardiologie, Infectiologie, Gastro-entérologie, etc.
  therapeuticClass: string;
  laboratoryId: string;
  laboratoryName: string;
  prescriptionRequired: boolean;
  shortDescription: string;
  fullDescription: string;
  indications: string[];
  posology: string;
  contraindications: string[];
  precautions: string[];
  composition: string;
  storage: string;
  image: string;
  featured?: boolean;
  pdfNoticeUrl?: string;
  atcCode?: string;
}

export interface Laboratory {
  id: string;
  name: string;
  slug: string;
  country: string;
  flag: string;
  logo: string;
  coverImage: string;
  description: string;
  longDescription: string;
  specialties: string[];
  foundedYear: number;
  certifications: string[];
  headquarters: string;
  website: string;
  partnerSince: number;
  productsCount: number;
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  features: string[];
  targetAudience: string[];
  methodology: string[];
  benefits: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Actualité Pharmaceutique' | 'Événement' | 'Formation Médicale' | 'Innovation' | 'Communiqué';
  publicationDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string | string[];
  image: string;
  tags: string[];
  featured?: boolean;
}

export type FaqItem = FAQItem;

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  workplace: string;
  city: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface StatItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Général' | 'Pharmacies & Officines' | 'Médecins & Spécialistes' | 'Laboratoires Partenaires';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image: string;
  linkedin?: string;
}

export interface JobOffer {
  id: string;
  title: string;
  location: string;
  contractType: string;
  department: string;
  postedDate: string;
  description: string;
  missions: string[];
  profile: string[];
  open: boolean;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  profession: string;
  organization: string;
  subject: string;
  message: string;
  type: 'general' | 'rdv_delegue' | 'laboratoire' | 'pharmacovigilance';
}
