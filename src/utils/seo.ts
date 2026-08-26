import { products } from '../data/products';
import { laboratories } from '../data/laboratories';
import { newsArticles } from '../data/news';
import { services } from '../data/services';

export interface MetaTagsConfig {
  /**
   * Page title (<title> and og:title / twitter:title)
   */
  title: string;
  /**
   * Meta description (<meta name="description"> and og:description / twitter:description)
   */
  description: string;
  /**
   * Canonical URL (<link rel="canonical" href="..."> and og:url)
   */
  canonical?: string;
  /**
   * Keywords for the page
   */
  keywords?: string | string[];
  /**
   * Open Graph image URL
   */
  image?: string;
  /**
   * Open Graph type (e.g. 'website', 'article', 'product')
   */
  type?: 'website' | 'article' | 'profile' | 'product' | string;
  /**
   * Robots instructions (e.g. 'index, follow' or 'noindex, nofollow')
   */
  robots?: string;
  /**
   * Specific Twitter Card style
   */
  twitterCard?: 'summary' | 'summary_large_image';
  /**
   * Schema.org JSON-LD Structured data object or array of objects
   */
  jsonLd?: Record<string, any> | Array<Record<string, any>>;
}

const DEFAULT_BRAND_SUFFIX = 'MedConnect Pharma';
const DEFAULT_BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://medconnect-pharma.com';
const DEFAULT_OG_IMAGE = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=630&q=80';

/**
 * Helper to get or create a <meta> tag with specific selector
 */
function setMetaTag(selector: string, attrName: 'name' | 'property', attrValue: string, content: string | undefined): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    if (element) element.remove();
    return;
  }

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Helper to update or create a <link rel="..."> tag
 */
function setLinkTag(rel: string, href: string | undefined): void {
  if (typeof document === 'undefined') return;

  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!href) {
    if (element) element.remove();
    return;
  }

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

/**
 * Injects or updates Schema.org JSON-LD structured data in the document head
 */
function setStructuredData(jsonLd: Record<string, any> | Array<Record<string, any>> | undefined): void {
  if (typeof document === 'undefined') return;

  const SCRIPT_ID = 'medconnect-dynamic-jsonld';
  let scriptElement = document.head.querySelector<HTMLScriptElement>(`#${SCRIPT_ID}`);

  if (!jsonLd) {
    if (scriptElement) scriptElement.remove();
    return;
  }

  if (!scriptElement) {
    scriptElement = document.createElement('script');
    scriptElement.id = SCRIPT_ID;
    scriptElement.type = 'application/ld+json';
    document.head.appendChild(scriptElement);
  }

  try {
    scriptElement.textContent = JSON.stringify(jsonLd, null, 2);
  } catch (err) {
    console.warn('[SEO] Failed to serialize JSON-LD structured data:', err);
  }
}

/**
 * Dynamically updates document head meta tags (Title, Description, Canonical, OG, Twitter, JSON-LD)
 */
export function updateDocumentMetaTags(config: MetaTagsConfig): void {
  if (typeof document === 'undefined') return;

  // Format document title
  const fullTitle = config.title.includes(DEFAULT_BRAND_SUFFIX)
    ? config.title
    : `${config.title} | ${DEFAULT_BRAND_SUFFIX}`;

  document.title = fullTitle;

  // Description
  setMetaTag('meta[name="description"]', 'name', 'description', config.description);

  // Keywords
  const keywordsStr = Array.isArray(config.keywords) ? config.keywords.join(', ') : config.keywords;
  setMetaTag('meta[name="keywords"]', 'name', 'keywords', keywordsStr);

  // Robots
  setMetaTag('meta[name="robots"]', 'name', 'robots', config.robots || 'index, follow, max-snippet:-1, max-image-preview:large');

  // Canonical URL
  const canonicalUrl = config.canonical || (typeof window !== 'undefined' ? window.location.href : DEFAULT_BASE_URL);
  setLinkTag('canonical', canonicalUrl);

  // OpenGraph Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', config.type || 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', config.image || DEFAULT_OG_IMAGE);
  setMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'MedConnect Pharma');
  setMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'fr_FR');

  // Twitter Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', config.twitterCard || 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', config.image || DEFAULT_OG_IMAGE);

  // Structured Data (Schema.org)
  setStructuredData(config.jsonLd);
}

/**
 * Builds standard SEO configuration based on the routed page and optional param
 */
export function getRouteSeoConfig(page: string, param?: string): MetaTagsConfig {
  const origin = typeof window !== 'undefined' ? window.location.origin : DEFAULT_BASE_URL;

  switch (page) {
    case 'home':
      return {
        title: 'Promotion Médicale & Représentation Pharmaceutique en Côte d\'Ivoire',
        description: 'Leader en promotion médicale, visite pharmaceutique, partenariat avec les laboratoires internationaux et distribution éthique à Abidjan et en Afrique de l\'Ouest.',
        canonical: `${origin}/`,
        keywords: [
          'promotion médicale Côte d\'Ivoire',
          'délégué médical Abidjan',
          'représentation pharmaceutique',
          'laboratoires pharmaceutiques',
          'distribution médicaments Afrique',
          'MedConnect Pharma'
        ],
        type: 'website',
        image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=630&q=80',
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'MedicalBusiness',
          'name': 'MedConnect Pharma',
          'alternateName': 'MedConnect Pharma Côte d\'Ivoire',
          'url': origin,
          'logo': `${origin}/favicon.ico`,
          'description': 'Promotion médicale, visite scientifique et représentation exclusive de laboratoires pharmaceutiques.',
          'telephone': '+2250150215202',
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'Abidjan Cocody',
            'addressLocality': 'Abidjan',
            'addressCountry': 'CI'
          },
          'geo': {
            '@type': 'GeoCoordinates',
            'latitude': 5.359952,
            'longitude': -3.985953
          },
          'openingHoursSpecification': {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'opens': '08:30',
            'closes': '18:30'
          },
          'sameAs': [
            'https://wa.me/2250150215202'
          ]
        }
      };

    case 'about':
      return {
        title: 'À Propos & Notre Mission Éthique',
        description: 'Découvrez notre vision, notre charte de déontologie médicale et notre engagement envers l\'excellence thérapeutique et la formation continue des praticiens.',
        canonical: `${origin}/#about`,
        keywords: ['à propos MedConnect', 'éthique pharmaceutique', 'visite médicale responsable', 'équipe médicale Abidjan'],
        type: 'website'
      };

    case 'services': {
      if (param) {
        const currentService = services.find((s) => s.id === param);
        if (currentService) {
          return {
            title: `${currentService.title} | Services Médicaux`,
            description: currentService.shortDescription,
            canonical: `${origin}/#services?id=${param}`,
            keywords: [currentService.title, 'services pharmaceutiques', 'visite médicale', 'EPU', 'market access'],
            type: 'website',
            jsonLd: {
              '@context': 'https://schema.org',
              '@type': 'Service',
              'name': currentService.title,
              'description': currentService.fullDescription,
              'provider': {
                '@type': 'Organization',
                'name': 'MedConnect Pharma'
              }
            }
          };
        }
      }
      return {
        title: 'Nos Services & Solutions Pharmaceutiques',
        description: 'Promotion médicale terrain, représentation en officine, market access, affaires réglementaires et organisation de symposiums scientifiques.',
        canonical: `${origin}/#services`,
        keywords: ['services promotion médicale', 'visite officinale', 'symposiums médicaux', 'réglementaire pharmaceutique'],
        type: 'website'
      };
    }

    case 'products':
      return {
        title: param ? `Recherche "${param}" | Catalogue Produits Pharmaceutiques` : 'Catalogue Produits Pharmaceutiques & Spécialités',
        description: 'Consultez notre catalogue complet de spécialités pharmaceutiques : cardiologie, infectiologie, pédiatrie, dermatologie, antalgie et gastro-entérologie.',
        canonical: `${origin}/#products${param ? `?search=${encodeURIComponent(param)}` : ''}`,
        keywords: ['médicaments', 'catalogue pharmaceutique', 'cardiologie', 'antibiotiques', 'RCP', 'monographie'],
        type: 'website'
      };

    case 'product-detail': {
      const product = products.find((p) => p.id === param) || products[0];
      if (product) {
        return {
          title: `${product.name} (${product.dosage}) - ${product.category}`,
          description: `${product.shortDescription} Laboratoire : ${product.laboratoryName}. Forme : ${product.galenicForm}.`,
          canonical: `${origin}/#product/${product.id}`,
          keywords: [
            product.name,
            product.genericName,
            product.category,
            product.therapeuticClass,
            product.laboratoryName,
            'RCP',
            'posologie'
          ],
          image: product.image,
          type: 'product',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Drug',
            'name': product.name,
            'nonProprietaryName': product.genericName,
            'description': product.shortDescription,
            'dosageForm': product.galenicForm,
            'activeIngredient': product.composition,
            'image': product.image,
            'manufacturer': {
              '@type': 'Organization',
              'name': product.laboratoryName
            }
          }
        };
      }
      return {
        title: 'Fiche Spécialité Médicale',
        description: 'Monographie et détails thérapeutiques de la spécialité médicale.',
        type: 'product'
      };
    }

    case 'laboratories':
      return {
        title: 'Laboratoires Partenaires & Alliances Stratégiques',
        description: 'Découvrez les laboratoires pharmaceutiques internationaux d\'excellence représentés en exclusivité par MedConnect Pharma.',
        canonical: `${origin}/#laboratories`,
        keywords: ['laboratoires partenaires', 'partenariat pharmaceutique', 'industrie du médicament', 'pharma suisse france allemagne'],
        type: 'website'
      };

    case 'laboratory-detail': {
      const lab = laboratories.find((l) => l.id === param) || laboratories[0];
      if (lab) {
        return {
          title: `${lab.name} (${lab.country}) | Laboratoire Partenaire`,
          description: `${lab.description} Spécialités : ${lab.specialties.join(', ')}. Siège : ${lab.headquarters}.`,
          canonical: `${origin}/#laboratory/${lab.id}`,
          keywords: [lab.name, lab.country, ...lab.specialties, 'partenaire pharmaceutique', 'laboratoire'],
          image: lab.coverImage || lab.logo,
          type: 'profile',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': lab.name,
            'description': lab.longDescription,
            'logo': lab.logo,
            'image': lab.coverImage,
            'address': {
              '@type': 'PostalAddress',
              'addressCountry': lab.country,
              'addressLocality': lab.headquarters
            },
            'sameAs': lab.website ? [lab.website] : []
          }
        };
      }
      return {
        title: 'Fiche Laboratoire Partenaire',
        description: 'Informations et gamme de produits du laboratoire partenaire.',
        type: 'profile'
      };
    }

    case 'news':
      return {
        title: 'Actualités Médicales, Événements & Congrès',
        description: 'Restez informé des avancées thérapeutiques, symposiums, formations continues EPU et actualités scientifiques du secteur de la santé.',
        canonical: `${origin}/#news`,
        keywords: ['actualités médicales', 'congrès cardiologie', 'formation médicale continue', 'santé afrique', 'pharmacovigilance'],
        type: 'website'
      };

    case 'article-detail': {
      const article = newsArticles.find((a) => a.id === param) || newsArticles[0];
      if (article) {
        return {
          title: article.title,
          description: article.summary,
          canonical: `${origin}/#article/${article.id}`,
          keywords: [...article.tags, article.category, 'actualité santé'],
          image: article.image,
          type: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'NewsArticle',
            'headline': article.title,
            'description': article.summary,
            'image': [article.image],
            'datePublished': article.publicationDate,
            'author': {
              '@type': 'Person',
              'name': article.author.name,
              'jobTitle': article.author.role
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'MedConnect Pharma',
              'logo': {
                '@type': 'ImageObject',
                'url': `${origin}/favicon.ico`
              }
            }
          }
        };
      }
      return {
        title: 'Article Scientifique & Actualité',
        description: 'Article médical et scientifique MedConnect Pharma.',
        type: 'article'
      };
    }

    case 'contact':
      return {
        title: 'Contactez-nous & Demande de Rendez-vous Médical',
        description: 'Contactez MedConnect Pharma à Abidjan (+225 01 50 21 52 02) pour planifier une visite médicale, nouer un partenariat laboratoire ou signaler un effet indésirable.',
        canonical: `${origin}/#contact`,
        keywords: ['contact MedConnect', 'rdv délégué médical', 'contact Abidjan', 'téléphone 0150215202', 'pharmacovigilance urgence'],
        type: 'website'
      };

    case 'careers':
      return {
        title: 'Carrières & Recrutement de Délégués Médicaux',
        description: 'Rejoignez notre réseau de délégués médicaux et pharmaceutiques en Côte d\'Ivoire. Consultez nos offres d\'emploi et déposez votre candidature.',
        canonical: `${origin}/#careers`,
        keywords: ['recrutement délégué médical', 'emploi santé Abidjan', 'carrière pharmaceutique', 'postuler délégué'],
        type: 'website'
      };

    case 'faq':
      return {
        title: 'Foire Aux Questions (FAQ) Médicale & Praticiens',
        description: 'Toutes les réponses à vos questions sur nos modalités de visite médicale, la distribution pharmaceutique, les échantillons et la pharmacovigilance.',
        canonical: `${origin}/#faq`,
        keywords: ['faq médicale', 'questions visite médicale', 'bonnes pratiques', 'pharmacovigilance question'],
        type: 'website'
      };

    case 'privacy':
      return {
        title: 'Politique de Confidentialité & Protection des Données (RGPD)',
        description: 'Engagement de conformité RGPD, protection des données personnelles de santé et droits d\'accès pour les professionnels.',
        canonical: `${origin}/#privacy`,
        robots: 'noindex, follow',
        type: 'website'
      };

    case 'legal':
      return {
        title: 'Mentions Légales & Agréments Réglementaires',
        description: 'Mentions légales, immatriculation, direction de la publication et agréments pharmaceutiques de MedConnect Pharma.',
        canonical: `${origin}/#legal`,
        robots: 'noindex, follow',
        type: 'website'
      };

    default:
      return {
        title: 'Promotion Médicale & Représentation Pharmaceutique',
        description: 'MedConnect Pharma - Partenaire stratégique des professionnels de santé et des laboratoires pharmaceutiques.',
        canonical: `${origin}/`,
        type: 'website'
      };
  }
}
