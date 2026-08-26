/**
 * MedConnect Pharma - Service Layer
 * Architecture prête pour intégration directe avec Supabase
 *
 * Pour brancher Supabase :
 * 1. Installer @supabase/supabase-js
 * 2. Définir VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY
 * 3. Activer les requêtes Supabase ci-dessous
 */

import { products } from '../data/products';
import { laboratories } from '../data/laboratories';
import { services } from '../data/services';
import { newsArticles } from '../data/news';
import { faqItems, teamMembers, statItems, testimonials, jobOffers } from '../data/faq';
import { Product, Laboratory, Service, NewsArticle, FAQItem, TeamMember, StatItem, Testimonial, JobOffer, ContactFormData } from '../types';

// Simulateur de délai réseau pour une expérience fluide et réaliste
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductFilterOptions {
  search?: string;
  category?: string;
  laboratoryId?: string;
  prescriptionRequired?: boolean | 'all';
  galenicForm?: string;
  sortBy?: 'name-asc' | 'name-desc' | 'category' | 'recent';
}

export const ApiService = {
  // --- PRODUITS ---
  async getProducts(options: ProductFilterOptions = {}): Promise<Product[]> {
    await delay(150);
    let list = [...products];

    if (options.search && options.search.trim() !== '') {
      const q = options.search.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.genericName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.laboratoryName.toLowerCase().includes(q) ||
          p.therapeuticClass.toLowerCase().includes(q) ||
          p.indications.some((ind) => ind.toLowerCase().includes(q))
      );
    }

    if (options.category && options.category !== 'all') {
      list = list.filter((p) => p.category === options.category);
    }

    if (options.laboratoryId && options.laboratoryId !== 'all') {
      list = list.filter((p) => p.laboratoryId === options.laboratoryId);
    }

    if (options.prescriptionRequired !== undefined && options.prescriptionRequired !== 'all') {
      list = list.filter((p) => p.prescriptionRequired === options.prescriptionRequired);
    }

    if (options.galenicForm && options.galenicForm !== 'all') {
      list = list.filter((p) => p.galenicForm.toLowerCase().includes(options.galenicForm!.toLowerCase()));
    }

    if (options.sortBy) {
      if (options.sortBy === 'name-asc') {
        list.sort((a, b) => a.name.localeCompare(b.name));
      } else if (options.sortBy === 'name-desc') {
        list.sort((a, b) => b.name.localeCompare(a.name));
      } else if (options.sortBy === 'category') {
        list.sort((a, b) => a.category.localeCompare(b.category));
      }
    }

    return list;
  },

  async getProductById(id: string): Promise<Product | null> {
    await delay(100);
    return products.find((p) => p.id === id) || null;
  },

  async getRelatedProducts(productId: string, limit = 3): Promise<Product[]> {
    await delay(100);
    const current = products.find((p) => p.id === productId);
    if (!current) return products.slice(0, limit);

    const related = products.filter(
      (p) => p.id !== productId && (p.category === current.category || p.laboratoryId === current.laboratoryId)
    );

    if (related.length < limit) {
      const others = products.filter((p) => p.id !== productId && !related.includes(p));
      return [...related, ...others].slice(0, limit);
    }

    return related.slice(0, limit);
  },

  // --- LABORATOIRES ---
  async getLaboratories(): Promise<Laboratory[]> {
    await delay(120);
    return [...laboratories];
  },

  async getLaboratoryById(id: string): Promise<Laboratory | null> {
    await delay(100);
    return laboratories.find((l) => l.id === id || l.slug === id) || null;
  },

  async getProductsByLaboratory(laboratoryId: string): Promise<Product[]> {
    await delay(100);
    return products.filter((p) => p.laboratoryId === laboratoryId);
  },

  // --- SERVICES ---
  async getServices(): Promise<Service[]> {
    await delay(100);
    return [...services];
  },

  async getServiceById(id: string): Promise<Service | null> {
    await delay(80);
    return services.find((s) => s.id === id) || null;
  },

  // --- ACTUALITÉS ---
  async getNews(category?: string): Promise<NewsArticle[]> {
    await delay(120);
    if (!category || category === 'all') {
      return [...newsArticles];
    }
    return newsArticles.filter((n) => n.category === category);
  },

  async getArticleById(id: string): Promise<NewsArticle | null> {
    await delay(100);
    return newsArticles.find((n) => n.id === id || n.slug === id) || null;
  },

  async getNewsById(id: string): Promise<NewsArticle | null> {
    return this.getArticleById(id);
  },

  // --- AUTRES DONNÉES ---
  async getFaq(category?: string): Promise<FAQItem[]> {
    await delay(80);
    if (!category || category === 'all') {
      return [...faqItems];
    }
    return faqItems.filter((f) => f.category === category);
  },

  async getFaqs(category?: string): Promise<FAQItem[]> {
    return this.getFaq(category);
  },

  async getTeam(): Promise<TeamMember[]> {
    await delay(80);
    return [...teamMembers];
  },

  async getStats(): Promise<StatItem[]> {
    await delay(50);
    return [...statItems];
  },

  async getTestimonials(): Promise<Testimonial[]> {
    await delay(80);
    return [...testimonials];
  },

  async getJobOffers(): Promise<JobOffer[]> {
    await delay(100);
    return [...jobOffers];
  },

  // --- FORMULAIRES ET INTERACTIONS ---
  async submitContact(data: ContactFormData): Promise<{ success: boolean; message: string }> {
    await delay(600); // simulation envoi réseau
    console.log('[MedConnect API] Formulaire de contact soumis:', data);
    
    // Sauvegarde en LocalStorage pour conservation de session
    try {
      const existing = JSON.parse(localStorage.getItem('medconnect_messages') || '[]');
      existing.push({ ...data, date: new Date().toISOString() });
      localStorage.setItem('medconnect_messages', JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    return {
      success: true,
      message: 'Votre message a été transmis avec succès. Notre équipe vous contactera dans les plus brefs délais.'
    };
  },

  async subscribeNewsletter(email: string): Promise<{ success: boolean; message: string }> {
    await delay(400);
    console.log('[MedConnect API] Inscription newsletter:', email);
    return {
      success: true,
      message: 'Merci pour votre inscription à la lettre d’information scientifique de MedConnect Pharma !'
    };
  },

  async submitJobApplication(formData: {
    jobId: string;
    fullName: string;
    email: string;
    phone: string;
    experience: string;
    motivation: string;
    fileName?: string;
  }): Promise<{ success: boolean; message: string }> {
    await delay(700);
    console.log('[MedConnect API] Candidature soumise:', formData);
    return {
      success: true,
      message: 'Votre candidature a bien été enregistrée. Notre pôle Ressources Humaines l’étudiera avec la plus grande attention.'
    };
  },

  // --- RECHERCHE GLOBALE MULTI-ENTITÉ ---
  async globalSearch(query: string) {
    await delay(150);
    const q = query.toLowerCase().trim();
    if (!q) {
      return { products: [], laboratories: [], services: [], news: [] };
    }

    const matchedProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.genericName.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.laboratoryName.toLowerCase().includes(q)
    ).slice(0, 5);

    const matchedLabs = laboratories.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.country.toLowerCase().includes(q) ||
        l.specialties.some((s) => s.toLowerCase().includes(q))
    ).slice(0, 3);

    const matchedServices = services.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedNews = newsArticles.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 3);

    return {
      products: matchedProducts,
      laboratories: matchedLabs,
      services: matchedServices,
      news: matchedNews
    };
  }
};
