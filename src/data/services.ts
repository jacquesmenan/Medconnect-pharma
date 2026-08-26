import { Service } from '../types';

export const services: Service[] = [
  {
    id: 'promotion-medicale',
    title: 'Promotion & Visite Médicale',
    shortDescription: 'Déploiement d’une force de vente médicale hautement qualifiée auprès des médecins prescripteurs, spécialistes et hôpitaux.',
    fullDescription: 'Notre réseau de délégués médicaux diplômés en sciences de la santé assure une communication scientifique rigoureuse, éthique et persuasive auprès des professionnels de santé pour maximiser la prescription éclairée de vos spécialités pharmaceutiques.',
    icon: 'Stethoscope',
    features: [
      'Visite médicale individuelle en cabinet libéral et centres hospitaliers',
      'Argumentaires scientifiques basés sur des études cliniques validées (EBM)',
      'Couverture ciblée par spécialité : cardiologie, infectiologie, pédiatrie, dermatologie, etc.',
      'Suivi CRM digitalisé et reporting d’activité en temps réel'
    ],
    targetAudience: ['Médecins Généralistes', 'Médecins Spécialistes', 'Chefs de service hospitaliers', 'Internes & Praticiens Hospitaliers'],
    methodology: [
      'Ciblage et segmentation fine des potentiels de prescription',
      'Formation continue intensive des délégués aux monographies produits',
      'Plans de tournée optimisés par géo-sectorisation intelligente',
      'Mesure du retour sur investissement (ROI) et analyse des parts de marché (IMS/IQVIA)'
    ],
    benefits: [
      'Accroissement mesurable de la notoriété et des volumes de prescription',
      'Déontologie irréprochable conforme aux chartes de la visite médicale',
      'Visibilité analytique hebdomadaire pour les laboratoires partenaires'
    ]
  },
  {
    id: 'representation-pharmaceutique',
    title: 'Représentation & Vente Officinale',
    shortDescription: 'Présence terrain active dans les officines, négociation commerciale, conseil de comptoir et référencement grossistes.',
    fullDescription: 'Nos délégués pharmaceutiques travaillent au quotidien avec les pharmaciens titulaires et les équipes d’officine pour optimiser la disponibilité des produits, la mise en avant au point de vente et le conseil thérapeutique.',
    icon: 'Pill',
    features: [
      'Prise de commande directe et négociation des conditions commerciales',
      'Formation de l’équipe officinale (pharmacien adjoint, préparateur)',
      'Merchandising, mise en place des PLV et optimisation du linéaire',
      'Gestion des accords de référencement avec les groupements de pharmacies'
    ],
    targetAudience: ['Pharmaciens Titulaires', 'Groupements d’Officines', 'Grossistes Répartiteurs', 'Centrales d’Achat'],
    methodology: [
      'Visites cadencées selon la typologie et le potentiel de l’officine',
      'Ateliers comptoir interactifs pour former les équipes au conseil patient',
      'Suivi strict des stocks et prévention des ruptures d’approvisionnement'
    ],
    benefits: [
      'Taux de pénétration officinale supérieur à 85% sur les zones cibles',
      'Accélération du sell-out grâce au conseil actif des préparateurs',
      'Partenariat durable avec les acteurs clés de la distribution'
    ]
  },
  {
    id: 'formations-seminaires',
    title: 'Formations & Événements Médicaux',
    shortDescription: 'Organisation de symposiums, congrès, Enseignements Post-Universitaires (EPU) et webinaires d’experts.',
    fullDescription: 'Nous concevons et animons des événements médicaux de haut niveau scientifique pour réunir leaders d’opinion, praticiens et chercheurs autour des avancées thérapeutiques de nos laboratoires partenaires.',
    icon: 'GraduationCap',
    features: [
      'Organisation de Staffs hospitaliers et réunions de service',
      'Symposiums satellites lors des congrès nationaux et régionaux',
      'Programmes d’Enseignement Post-Universitaire (EPU) accrédités',
      'Webinaires interactifs et plateformes de e-learning médical'
    ],
    targetAudience: ['Sociétés Savantes', 'Leaders d’Opinion (KOL)', 'Associations de Professionnels de Santé', 'Pharmaciens'],
    methodology: [
      'Sélection de thématiques cliniques à forte valeur ajoutée',
      'Coordination avec des comités scientifiques indépendants',
      'Logistique complète : invitations, lieu prestigieux, retransmission digitale, actes de colloque'
    ],
    benefits: [
      'Positionnement de vos molécules au cœur des recommandations scientifiques',
      'Création d’un réseau solide d’ambassadeurs cliniques (KOL)',
      'Impact durable sur la pratique médicale quotidienne'
    ]
  },
  {
    id: 'affaires-reglementaires',
    title: 'Affaires Réglementaires & Market Access',
    shortDescription: 'Accompagnement complet pour l’enregistrement de médicaments, les dossiers AMM, le prix et la pharmacovigilance.',
    fullDescription: 'Notre équipe d’experts pharmaciens et juristes en santé pilote l’ensemble des démarches réglementaires auprès des autorités sanitaires nationales et régionales pour accélérer l’accès au marché de vos innovations.',
    icon: 'FileCheck',
    features: [
      'Constitution et dépôt des dossiers d’Autorisation de Mise sur le Marché (AMM)',
      'Négociation des prix, remboursement et dossiers de transparence',
      'Système local de Pharmacovigilance opérationnel 24h/24 et 7j/7',
      'Validation réglementaire de tous les documents promotionnels et emballages'
    ],
    targetAudience: ['Directions Réglementaires des Laboratoires', 'Ministères de la Santé', 'Agences Nationales du Médicament'],
    methodology: [
      'Veille réglementaire continue et anticipation des évolutions législatives',
      'Relations institutionnelles pérennes avec les commissions d’enregistrement',
      'Audits de conformité rigoureux et gestion des alertes sanitaires'
    ],
    benefits: [
      'Réduction significative des délais d’obtention d’AMM',
      'Conformité légale absolue et sérénité opérationnelle',
      'Stratégie de prix optimisée pour une pénétration marché rapide'
    ]
  },
  {
    id: 'conseil-strategique',
    title: 'Conseil Stratégique & Études de Marché',
    shortDescription: 'Analyses épidémiologiques, études de faisabilité, stratégie de lancement de nouveaux produits et intelligence concurrentielle.',
    fullDescription: 'Nous fournissons aux laboratoires internationaux des données de marché précises et des recommandations stratégiques sur-mesure pour guider leurs décisions d’investissement et de lancement territorial.',
    icon: 'TrendingUp',
    features: [
      'Études d’opportunité de marché et analyse de la concurrence',
      'Enquêtes qualitatives et quantitatives auprès des prescripteurs',
      'Plans de lancement stratégique à 360° (Go-to-Market)',
      'Modélisation prévisionnelle des ventes et scenarii de pricing'
    ],
    targetAudience: ['Directions Générales & Marketing des Laboratoires', 'Investisseurs Santé', 'Chefs de Produit'],
    methodology: [
      'Croisement des données de panel officinal et hospitalier',
      'Panels de médecins experts et focus groups spécialisés',
      'Recommandations pragmatiques et plans d’action directement applicables'
    ],
    benefits: [
      'Sécurisation des investissements de lancement',
      'Compréhension fine des spécificités et sensibilités locales',
      'Avantage concurrentiel déterminant dès le premier jour'
    ]
  }
];
