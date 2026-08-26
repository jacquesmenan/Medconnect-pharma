import { FAQItem, TeamMember, StatItem, Testimonial, JobOffer } from '../types';

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Quelles sont les activités principales de MedConnect Pharma ?',
    answer: 'MedConnect Pharma est une agence spécialisée dans la promotion médicale, la visite médicale en cabinet et milieu hospitalier, la représentation pharmaceutique en officine, l’organisation d’événements scientifiques (EPU, symposiums), et l’accompagnement réglementaire (dossiers AMM, pharmacovigilance) pour le compte de laboratoires pharmaceutiques internationaux.',
    category: 'Général'
  },
  {
    id: 'faq-2',
    question: 'Comment un laboratoire peut-il confier la promotion de ses produits à MedConnect Pharma ?',
    answer: 'Il vous suffit de nous contacter via notre formulaire dédié "Partenariat Laboratoire" ou par téléphone. Notre direction du développement commercial étudiera votre portefeuille, réalisera une étude d’opportunité de marché et vous proposera un plan de déploiement sur-mesure (force de vente dédiée ou partagée, stratégie multicanale).',
    category: 'Laboratoires Partenaires'
  },
  {
    id: 'faq-3',
    question: 'Comment les médecins et spécialistes peuvent-ils solliciter la visite d’un délégué médical ?',
    answer: 'Les professionnels de santé peuvent planifier une rencontre à tout moment via notre page Contact en sélectionnant "Rendez-vous Délégué Médical". Vous pouvez préciser votre spécialité, votre adresse de consultation et les gammes thérapeutiques que vous souhaitez approfondir.',
    category: 'Médecins & Spécialistes'
  },
  {
    id: 'faq-4',
    question: 'Comment les officines peuvent-elles commander les produits représentés ?',
    answer: 'Les pharmacies peuvent commander directement auprès de nos délégués pharmaceutiques lors de leurs passages réguliers, ou bien auprès de leurs grossistes-répartiteurs habituels avec lesquels MedConnect Pharma entretient des accords permanents de disponibilité.',
    category: 'Pharmacies & Officines'
  },
  {
    id: 'faq-5',
    question: 'Comment sont formés vos délégués médicaux et pharmaceutiques ?',
    answer: 'Tous nos délégués sont diplômés de l’enseignement supérieur scientifique ou médical (pharmacie, médecine, biologie, chimie). Ils suivent à leur intégration et tout au long de l’année un cursus de formation continue validé par notre direction médicale, incluant la pharmacologie des molécules, la pharmacovigilance et la déontologie.',
    category: 'Général'
  },
  {
    id: 'faq-6',
    question: 'Que faire en cas de suspicion d’effet indésirable (Pharmacovigilance) ?',
    answer: 'Tout effet indésirable suspecté lié à l’un des médicaments de notre portefeuille doit être immédiatement notifié à notre cellule de pharmacovigilance ouverte 24h/24 par email (pharmacovigilance@medconnect-pharma.com) ou par téléphone d’urgence. Notre responsable PV prend en charge le suivi réglementaire selon les directives sanitaires.',
    category: 'Général'
  }
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Jean-Marc Traoré',
    role: 'Président Directeur Général',
    department: 'Direction Générale',
    bio: 'Docteur en Pharmacie et titulaire d’un MBA, plus de 22 ans d’expérience à la tête de filiales de laboratoires pharmaceutiques multinationaux.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'team-2',
    name: 'Dr. Sarah Kouassi',
    role: 'Directrice Médicale & Scientifique',
    department: 'Direction Médicale',
    bio: 'Médecin spécialiste, experte en pharmacologie clinique et en formation médicale continue, garante de la déontologie et de l’éthique scientifique.',
    image: 'https://images.unsplash.com/photo-1594824813590-b984d726b010?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'team-3',
    name: 'Alexandre Meyer',
    role: 'Directeur des Opérations Commerciales',
    department: 'Opérations & Force de Vente',
    bio: 'Spécialiste du management de réseaux de délégués et de la distribution officinale avec plus de 15 ans de succès dans le secteur santé.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  },
  {
    id: 'team-4',
    name: 'Clémence N’Guessan',
    role: 'Responsable Affaires Réglementaires & PV',
    department: 'Affaires Réglementaires',
    bio: 'Pharmacienne spécialisée en droit de la santé et enregistrement des produits pharmaceutiques (AMM, prix, conformité ANSM/OMS).',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    linkedin: 'https://linkedin.com'
  }
];

export const statItems: StatItem[] = [
  {
    id: 'stat-labs',
    value: 50,
    suffix: '+',
    label: 'Laboratoires Partenaires',
    description: 'Groupes pharmaceutiques internationaux et régionaux sous contrat exclusif',
    iconName: 'Building2'
  },
  {
    id: 'stat-products',
    value: 500,
    suffix: '+',
    label: 'Produits & Références',
    description: 'Spécialités hospitalières, princeps, génériques de précision et dispositifs',
    iconName: 'Pill'
  },
  {
    id: 'stat-visits',
    value: 1000,
    suffix: '+',
    label: 'Visites Médicales / mois',
    description: 'Entretiens scientifiques individuels en cabinets de ville, cliniques et CHU',
    iconName: 'Stethoscope'
  },
  {
    id: 'stat-pharmacies',
    value: 850,
    suffix: '+',
    label: 'Officines Partenaires',
    description: 'Pharmacies de ville et hospitalières régulièrement visitées et approvisionnées',
    iconName: 'Store'
  },
  {
    id: 'stat-satisfaction',
    value: 98,
    suffix: '%',
    label: 'Taux de Satisfaction',
    description: 'Recommandation globale auprès des prescripteurs et praticiens de santé',
    iconName: 'ShieldCheck'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Dr. Patrick Lambert',
    role: 'Cardiologue libéral',
    workplace: 'Polyclinique du Parc',
    city: 'Abidjan / Paris',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    quote: 'Les délégués médicaux de MedConnect Pharma se démarquent par une maîtrise scientifique irréprochable de leurs monographies. Leurs présentations sont concises, pertinentes et toujours étayées par des études solides.'
  },
  {
    id: 'testi-2',
    name: 'Dr. Élodie Vigneron',
    role: 'Pharmacienne Titulaire',
    workplace: 'Grande Pharmacie Centrale',
    city: 'Bordeaux',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    quote: 'La réactivité de l’équipe commerciale et la qualité des formations apportées à mon équipe de comptoir nous permettent de conseiller au mieux nos patients tout en évitant les ruptures de stock.'
  },
  {
    id: 'testi-3',
    name: 'Dr. François Dubois',
    role: 'Pédiatre Hospitalier',
    workplace: 'Centre Hospitalier Universitaire',
    city: 'Lyon',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=120&h=120&q=80',
    rating: 5,
    quote: 'Les événements médicaux et symposiums organisés par MedConnect sont d’une qualité scientifique remarquable. Un partenaire indispensable pour la formation médicale continue de notre service.'
  }
];

export const jobOffers: JobOffer[] = [
  {
    id: 'job-delegue-cardio',
    title: 'Délégué(e) Médical(e) Spécialiste - Gamme Cardiologie & Métabolisme',
    location: 'Secteur Régional / Hôpitaux & Cabinets',
    contractType: 'CDI - Temps plein',
    department: 'Promotion Médicale',
    postedDate: 'Il y a 3 jours',
    description: 'Rattaché(e) au Directeur Régional des Ventes, vous aurez la charge du développement et de la promotion d’un portefeuille de médicaments de cardiologie auprès des cardiologues, néphrologues et médecins généralistes.',
    missions: [
      'Réaliser les visites médicales selon les objectifs de couverture et de fréquence fixés',
      'Animer des réunions scientifiques, staffs de service et symposiums régionaux',
      'Veiller au respect de la charte de l’information promotionnelle et de la déontologie',
      'Renseigner quotidiennement le CRM et participer aux réunions régionales de cycle'
    ],
    profile: [
      'Diplôme de Visiteur Médical (Titre VM ou équivalent) ou formation supérieure en sciences (Pharmacie, Biologie, Médecine)',
      'Expérience réussie de 2 ans minimum en visite médicale de spécialité',
      'Excellentes compétences relationnelles, rigueur scientifique et sens de la persuasion éthique',
      'Permis B indispensable'
    ],
    open: true
  },
  {
    id: 'job-delegue-pharma',
    title: 'Délégué(e) Pharmaceutique - Réseau Officines & Groupements',
    location: 'Secteur Sud & Littoral',
    contractType: 'CDI - Temps plein',
    department: 'Représentation Officinale',
    postedDate: 'Il y a 1 semaine',
    description: 'Vous assurez le développement du chiffre d’affaires et la visibilité de nos marques auprès des pharmaciens d’officine titulaires et de leurs équipes.',
    missions: [
      'Négocier les commandes directes et optimiser le sell-in / sell-out',
      'Former les équipes officinales au conseil de comptoir sur nos gammes phares',
      'Mettre en place la PLV et le merchandising conformément aux préconisations',
      'Prospecter de nouvelles officines et groupements d’achats'
    ],
    profile: [
      'Formation commerciale (Bac+2 à Bac+5) ou formation scientifique avec sensibilité vente',
      'Expérience confirmée de la vente directe en pharmacie',
      'Tempérament dynamique, orienté résultats et sens du service client'
    ],
    open: true
  },
  {
    id: 'job-reglementaire',
    title: 'Chargé(e) d’Affaires Réglementaires & Pharmacovigilance',
    location: 'Siège social',
    contractType: 'CDI - Temps plein',
    department: 'Affaires Réglementaires',
    postedDate: 'Il y a 2 semaines',
    description: 'Au sein de la Direction Médicale, vous participez à la gestion des dossiers d’enregistrement des médicaments et au suivi de la pharmacovigilance.',
    missions: [
      'Constituer et déposer les dossiers d’AMM et de renouvellement',
      'Assurer le suivi des déclarations de pharmacovigilance 24/7',
      'Effectuer la veille réglementaire nationale et internationale',
      'Valider les supports promotionnels conformément à la réglementation'
    ],
    profile: [
      'Docteur en Pharmacie ou Master 2 en Droit de la Santé / Affaires Réglementaires',
      'Minimum 3 ans d’expérience en affaires réglementaires pharmaceutiques',
      'Maîtrise du français et de l’anglais technique'
    ],
    open: true
  }
];
