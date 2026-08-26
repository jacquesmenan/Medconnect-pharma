import { NewsArticle } from '../types';

export const newsArticles: NewsArticle[] = [
  {
    id: 'news-congres-cardiologie-2026',
    title: 'MedConnect Pharma partenaire officiel des Journées Médicales de Cardiologie',
    slug: 'medconnect-partenaire-journees-cardiologie-2026',
    category: 'Événement',
    publicationDate: '15 Février 2026',
    readTime: '4 min',
    author: {
      name: 'Dr. Sarah Kouassi',
      role: 'Directrice Médicale & Scientifique',
      avatar: 'https://images.unsplash.com/photo-1594824813590-b984d726b010?auto=format&fit=crop&w=160&h=160&q=80'
    },
    summary: 'Plus de 400 cardiologues et praticiens hospitaliers se sont réunis pour débattre des nouvelles recommandations sur la prise en charge de l’hypertension artérielle résistante.',
    content: [
      'Lors de la 14ème édition des Journées Nationales de Cardiologie, notre équipe médicale a animé un symposium scientifique de premier plan consacré aux associations fixes dans le traitement de l’HTA sévère.',
      'Les intervenants ont souligné l’importance capitale de l’observance thérapeutique chez le patient hypertendu, démontrant qu’une monoprise quotidienne associant un inhibiteur calcique et un diurétique thiazidique réduisait de 34% le risque d’accident vasculaire cérébral par rapport aux thérapies séquentielles.',
      'MedConnect Pharma réaffirme à travers cet événement son engagement aux côtés des sociétés savantes pour diffuser les meilleures pratiques fondées sur les preuves (Evidence-Based Medicine).'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=600&q=80',
    tags: ['Cardiologie', 'Congrès', 'HTA', 'Formation Continue'],
    featured: true
  },
  {
    id: 'news-lancement-nouvelle-gamme-pediatrique',
    title: 'Lancement exclusif de la gamme micronutrition pédiatrique BioMed France',
    slug: 'lancement-gamme-pediatrique-biomed-france',
    category: 'Innovation',
    publicationDate: '28 Janvier 2026',
    readTime: '3 min',
    author: {
      name: 'Marc Dubois',
      role: 'Responsable Lancement Produits',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=160&h=160&q=80'
    },
    summary: 'MedConnect Pharma enrichit son catalogue avec des solutions pédiatriques sans additifs certifiées Bio, développées pour répondre aux besoins immunitaires et osseux des tout-petits.',
    content: [
      'Face à une demande croissante des pédiatres et des parents pour des formulations sans excipients notoires ni arômes artificiels, nous sommes fiers d’annoncer la distribution exclusive de la gamme pédiatrique BioMed.',
      'Formulée sur base d’huile d’olive extra-vierge biologique et extraite à froid, cette nouvelle solution de Vitamine D3 végétale garantit une biodisponibilité maximale dès les premiers jours de vie.',
      'Nos délégués médicaux débutent cette semaine la présentation détaillée auprès des maternités, services de pédiatrie et cabinets de consultation.'
    ],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&h=600&q=80',
    tags: ['Pédiatrie', 'Micronutrition', 'Innovation', 'BioMed'],
    featured: true
  },
  {
    id: 'news-bonnes-pratiques-visite-medicale',
    title: 'Charte de déontologie : la visite médicale responsable selon MedConnect Pharma',
    slug: 'charte-deontologie-visite-medicale-responsable',
    category: 'Actualité Pharmaceutique',
    publicationDate: '12 Janvier 2026',
    readTime: '5 min',
    author: {
      name: 'Dr. Sarah Kouassi',
      role: 'Directrice Médicale & Scientifique',
      avatar: 'https://images.unsplash.com/photo-1594824813590-b984d726b010?auto=format&fit=crop&w=160&h=160&q=80'
    },
    summary: 'Rappel des engagements éthiques, de la transparence scientifique et du rôle central de nos délégués dans le bon usage du médicament.',
    content: [
      'La promotion du médicament ne saurait être assimilée à une simple démarche commerciale : elle constitue un vecteur essentiel d’information médicale auprès des prescripteurs.',
      'Chez MedConnect Pharma, chaque délégué médical suit un programme d’accréditation continu portant sur la pharmacologie, la pharmacovigilance et le respect strict du cadre réglementaire.',
      'Notre objectif premier demeure d’apporter au médecin des données objectives, équilibrées et vérifiables permettant de choisir le traitement le plus adapté au profil de chaque patient.'
    ],
    image: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&h=600&q=80',
    tags: ['Déontologie', 'Éthique', 'Visite Médicale', 'Santé Publique'],
    featured: false
  },
  {
    id: 'news-webinaire-antibioresistance',
    title: 'Webinaire Médical : Stratégies de lutte contre l’antibiorésistance en pratique de ville',
    slug: 'webinaire-medical-antibioresistance-pratique-de-ville',
    category: 'Formation Médicale',
    publicationDate: '18 Décembre 2025',
    readTime: '4 min',
    author: {
      name: 'Pr. Alain Bertin',
      role: 'Infectiologue Référent',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=160&h=160&q=80'
    },
    summary: 'Un programme de formation interactif pour accompagner les généralistes et pharmaciens dans la prescription rationnelle des antibiotiques à large spectre.',
    content: [
      'L’antibiorésistance représente l’un des défis majeurs de la médecine contemporaine. MedConnect Pharma a réuni plus de 600 professionnels lors d’un séminaire virtuel interactif.',
      'Les discussions ont porté sur l’optimisation des posologies, l’utilisation des tests de diagnostic rapide (TDR) en officine et les durées de traitement raccourcies préconisées par les récentes recommandations.',
      'Le replay et les fiches mémo de synthèse sont désormais accessibles gratuitement sur l’espace professionnel MedConnect.'
    ],
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&h=600&q=80',
    tags: ['Infectiologie', 'Antibiorésistance', 'Formation', 'Webinaire'],
    featured: false
  },
  {
    id: 'news-communique-certif-iso',
    title: 'Communiqué officiel : Renouvellement de notre certification qualité ISO 9001:2015',
    slug: 'communique-officiel-renouvellement-certification-iso-9001',
    category: 'Communiqué',
    publicationDate: '02 Décembre 2025',
    readTime: '2 min',
    author: {
      name: 'Jean-Marc Traoré',
      role: 'Directeur Général',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80'
    },
    summary: 'L’audit annuel confirme l’excellence opérationnelle de notre chaîne de distribution, de notre service client et de notre système de management de la qualité.',
    content: [
      'Nous sommes très fiers d’annoncer le renouvellement avec mention d’excellence de notre certification ISO 9001:2015 pour nos activités de promotion médicale, de représentation de laboratoires et de support réglementaire.',
      'Cette distinction vient récompenser la rigueur quotidienne de nos 80 collaborateurs et notre volonté permanente d’offrir à nos laboratoires partenaires des standards de classe mondiale.'
    ],
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&h=600&q=80',
    tags: ['Qualité', 'ISO 9001', 'Certification', 'Gouvernance'],
    featured: false
  }
];
