import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod-cardio-tensol',
    name: 'TensolCor Plus 10mg/25mg',
    genericName: 'Amlodipine + Hydrochlorothiazide',
    dosage: '10 mg / 25 mg',
    galenicForm: 'Comprimé sécable',
    packaging: 'Boîte de 30 comprimés sous blister',
    category: 'Cardiologie',
    therapeuticClass: 'Inhibiteurs calciques associés à un diurétique thiazidique',
    laboratoryId: 'lab-novartis-partner',
    laboratoryName: 'PharmaSandoz Alliance',
    prescriptionRequired: true,
    shortDescription: 'Traitement de l’hypertension artérielle essentielle chez les patients dont la pression artérielle est insuffisamment contrôlée par une monothérapie.',
    fullDescription: 'TensolCor Plus associe l’action vasodilatatrice périphérique de l’amlodipine à l’effet salidiurétique de l’hydrochlorothiazide. Cette synergie d’action assure un contrôle tensionnel optimal sur 24 heures en une seule prise matinale.',
    indications: [
      'Hypertension artérielle essentielle modérée à sévère',
      'Substitution chez les patients stabilisés par les deux composants pris simultanément',
      'Prévention des événements cardiovasculaires majeurs chez les hypertendus à risque'
    ],
    posology: '1 comprimé par jour, de préférence le matin au cours du petit déjeuner avec un grand verre d’eau.',
    contraindications: [
      'Hypersensibilité aux substances actives ou aux dérivés de la dihydropyridine et aux sulfamides',
      'Insuffisance rénale sévère (clairance de la créatinine < 30 mL/min)',
      'Grossesse (2ème et 3ème trimestres) et allaitement',
      'Choc cardiogénique, sténose aortique sévère'
    ],
    precautions: [
      'Surveillance régulière de la kaliémie, natrémie et de la fonction rénale',
      'Prudence chez les sujets âgés et en cas d’insuffisance hépatique légère à modérée',
      'Éviter la prise simultanée de pamplemousse'
    ],
    composition: 'Amlodipine bésylate équivalent à 10 mg d’amlodipine base, Hydrochlorothiazide 25 mg. Excipients : cellulose microcristalline, lactose monohydraté, stéarate de magnésium.',
    storage: 'Conserver à une température ne dépassant pas 30°C, à l’abri de l’humidité et de la lumière.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=600&q=80',
    featured: true,
    atcCode: 'C08GA02'
  },
  {
    id: 'prod-amoxi-clav',
    name: 'Clavucilline 1g/125mg',
    genericName: 'Amoxicilline + Acide Clavulanique',
    dosage: '1 g / 125 mg',
    galenicForm: 'Comprimé pelliculé',
    packaging: 'Boîte de 16 comprimés sous plaquettes thermoformées',
    category: 'Infectiologie',
    therapeuticClass: 'Pénicillines à large spectre en association avec un inhibiteur de bêta-lactamase',
    laboratoryId: 'lab-novartis-partner',
    laboratoryName: 'PharmaSandoz Alliance',
    prescriptionRequired: true,
    shortDescription: 'Traitement curatif des infections bactériennes courantes à germes sensibles chez l’adulte et l’enfant de plus de 40 kg.',
    fullDescription: 'Clavucilline est un antibiotique à large spectre bactéricide associant l’amoxicilline à l’acide clavulanique, qui inactive les pénicillinases bactériennes et restaure le spectre d’action de l’amoxicilline sur les souches résistantes.',
    indications: [
      'Infections des voies respiratoires supérieures : sinusites aiguës bactériennes, otites moyennes',
      'Exacerbations de bronchite chronique et pneumonies communautaires',
      'Infections urinaires compliquées : pyélonéphrites aiguës',
      'Infections cutanées et des tissus mous, cellulite bactérienne',
      'Infections odontologiques sévères'
    ],
    posology: 'Adulte : 1 comprimé (1g/125mg) deux à trois fois par jour au début des repas.',
    contraindications: [
      'Antécédent d’hypersensibilité aux pénicillines ou aux bêta-lactamines (céphalosporines)',
      'Antécédent de jaunisse ou d’atteinte hépatique liée à l’amoxicilline/acide clavulanique'
    ],
    precautions: [
      'Rechercher des antécédents allergiques avant l’instauration',
      'Adapter la posologie chez l’insuffisant rénal sévère',
      'Maintenir une hydratation adéquate pour éviter la cristallurie'
    ],
    composition: 'Amoxicilline trihydratée équivalent à 1000 mg d’amoxicilline, Clavulanate de potassium équivalent à 125 mg d’acide clavulanique.',
    storage: 'À conserver dans l’emballage d’origine à température ambiante (< 25°C).',
    image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&h=600&q=80',
    featured: true,
    atcCode: 'J01CR02'
  },
  {
    id: 'prod-dermo-cicatri',
    name: 'DermaPur CicaGel Pro',
    genericName: 'Complexe Cuivre-Zinc + Madécassoside 2%',
    dosage: 'Formule concentrée 2%',
    galenicForm: 'Gel-crème réparateur dermo-cosmétique',
    packaging: 'Tube canule de 50 ml',
    category: 'Dermatologie',
    therapeuticClass: 'Cicatrisant & Régénérant épidermique antibactérien',
    laboratoryId: 'lab-biomed-france',
    laboratoryName: 'Laboratoires BioMed France',
    prescriptionRequired: false,
    shortDescription: 'Soin apaisant et réparateur intensif pour les peaux irritées, lésées, post-interventions dermatologiques ou post-laser.',
    fullDescription: 'DermaPur CicaGel Pro crée un film protecteur respirant "effet pansement" qui accélère la reconstruction cutanée, limite la prolifération microbienne grâce aux ions cuivre-zinc et prévient les marques cicatricielles pigmentaires.',
    indications: [
      'Altérations épidermiques : gerçures, dartres, irritations péri-orales',
      'Post-actes dermatologiques légers : peeling, laser superficiel, électrocoagulation',
      'Brûlures superficielles du 1er degré et coups de soleil',
      'Soins des zones de frottement chez le sportif'
    ],
    posology: 'Appliquer 2 fois par jour sur peau nettoyée et séchée jusqu’à réparation complète.',
    contraindications: [
      'Lésions suintantes majeures',
      'Hypersensibilité à l’un des composants'
    ],
    precautions: [
      'Usage externe exclusif',
      'Éviter le contact direct avec les muqueuses oculaires'
    ],
    composition: 'Madécassoside 2%, Sulfate de Cuivre 0.2%, Sulfate de Zinc 0.1%, Acide Hyaluronique HMW, Panthénol 5%, Eau thermale purifiée.',
    storage: 'Conserver entre 15°C et 25°C. Utiliser dans les 6 mois après ouverture.',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&h=600&q=80',
    featured: true,
    atcCode: 'D03AX02'
  },
  {
    id: 'prod-neuro-calm',
    name: 'NeuroRelax Forte 75mg',
    genericName: 'Prégabaline micronisée',
    dosage: '75 mg',
    galenicForm: 'Gélule',
    packaging: 'Boîte de 56 gélules',
    category: 'Neurologie',
    therapeuticClass: 'Antiépileptique, modulateur des canaux calciques voltage-dépendants',
    laboratoryId: 'lab-helvetia-neuro',
    laboratoryName: 'Helvetia NeuroSciences',
    prescriptionRequired: true,
    shortDescription: 'Traitement des douleurs neuropathiques périphériques et centrales chez l’adulte et du trouble anxieux généralisé.',
    fullDescription: 'NeuroRelax Forte se lie à la sous-unité alpha-2-delta des canaux calciques du système nerveux central, réduisant la libération excessive de neurotransmetteurs pro-nociceptifs tels que le glutamate et la substance P.',
    indications: [
      'Douleurs neuropathiques d’origine diabétique ou post-zostériennes',
      'Lombosciatalgies chroniques avec composante neuropathique',
      'Troubles de l’anxiété généralisée (TAG) de l’adulte',
      'Épilepsie partielle avec ou sans généralisation secondaire en association'
    ],
    posology: 'La dose initiale est de 150 mg par jour répartie en 2 prises, avec adaptation progressive sous surveillance médicale.',
    contraindications: [
      'Hypersensibilité à la prégabaline',
      'Patients de moins de 18 ans'
    ],
    precautions: [
      'Attention aux risques de somnolence et d’étourdissements lors de la conduite',
      'Arrêt progressif sur une durée minimale d’une semaine pour éviter le rebond'
    ],
    composition: 'Prégabaline 75 mg. Excipients : amidon de maïs prégélatinisé, talc, gélule en gélatine et dioxyde de titane.',
    storage: 'Conserver dans l’emballage d’origine à température ambiante.',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&h=600&q=80',
    featured: false,
    atcCode: 'N02BF02'
  },
  {
    id: 'prod-gastro-omep',
    name: 'GastroProtect 20mg MUPS',
    genericName: 'Ésoméprazole magnésium trihydraté',
    dosage: '20 mg',
    galenicForm: 'Comprimé gastro-résistant à libération modulée',
    packaging: 'Flacon de 28 comprimés avec bouchon déshydratant',
    category: 'Gastro-entérologie',
    therapeuticClass: 'Inhibiteur de la pompe à protons (IPP)',
    laboratoryId: 'lab-novartis-partner',
    laboratoryName: 'PharmaSandoz Alliance',
    prescriptionRequired: true,
    shortDescription: 'Traitement du reflux gastro-œsophagien (RGO), des œsophagites par érosion et prévention des ulcères induits par les AINS.',
    fullDescription: 'GastroProtect contient de l’ésoméprazole sous technologie MUPS (système de microgranules pelliculées) garantissant une dissolution gastrique homogène et une biodisponibilité supérieure pour une suppression acide rapide et durable.',
    indications: [
      'Traitement de l’œsophagite érosive par reflux',
      'Traitement d’entretien et prévention des récidives du RGO',
      'Éradication de Helicobacter pylori en trithérapie ou quadrithérapie',
      'Cicatrisation des ulcères gastriques induits par la prise d’AINS'
    ],
    posology: '1 comprimé de 20 mg par jour le matin à jeun 30 minutes avant le repas.',
    contraindications: [
      'Hypersensibilité aux dérivés benzimidazolés',
      'Prise concomitante avec le nelfinavir'
    ],
    precautions: [
      'Éliminer toute malignité gastrique avant le début du traitement',
      'Surveillance du magnésium sérique lors des traitements prolongés (> 1 an)'
    ],
    composition: 'Ésoméprazole magnésium trihydraté 22.3 mg équivalent à 20 mg d’ésoméprazole. Microbilles d’enrobage gastro-résistant.',
    storage: 'Refermer soigneusement le flacon après usage. Conserver < 30°C.',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&h=600&q=80',
    featured: true,
    atcCode: 'A02BC05'
  },
  {
    id: 'prod-pediatrie-vitd',
    name: 'VitaD3 Baby Gouttes 1000 UI',
    genericName: 'Cholécalciférol d’origine végétale',
    dosage: '1000 UI / goutte',
    galenicForm: 'Solution buvable en gouttes flacon compte-goutte',
    packaging: 'Flacon compte-goutte précis de 20 ml (environ 600 gouttes)',
    category: 'Pédiatrie',
    therapeuticClass: 'Vitamines D et dérivés, régulateur du métabolisme phosphocalcique',
    laboratoryId: 'lab-biomed-france',
    laboratoryName: 'Laboratoires BioMed France',
    prescriptionRequired: false,
    shortDescription: 'Prévention et correction des carences en vitamine D chez le nourrisson, l’enfant et la femme enceinte.',
    fullDescription: 'Formulation pédiatrique pure sur support d’huile d’olive vierge extra bio de première pression à froid, sans aucun additif, arôme artificiel ni conservateur, favorisant une absorption optimale de la vitamine D3.',
    indications: [
      'Prévention du rachitisme chez le nouveau-né et le nourrisson',
      'Apport quotidien recommandé en vitamine D chez l’enfant et l’adolescent',
      'Soutien du capital osseux et de l’immunité naturelle de la petite enfance'
    ],
    posology: 'Nourrisson allaité : 1 à 2 gouttes par jour. Enfant > 1 an : 2 gouttes par jour directement sur la langue ou dans une cuillère de compote.',
    contraindications: [
      'Hypercalcémie, hypercalciurie, lithiase rénale calcique'
    ],
    precautions: [
      'Ne pas dépasser la dose recommandée sans avis médical',
      'Tenir compte des autres apports vitaminiques enrichis'
    ],
    composition: 'Cholécalciférol (Vitamine D3 issue du lichen boréal), Huile d’olive extra-vierge biologique.',
    storage: 'Conserver à l’abri de la lumière et de la chaleur (< 25°C).',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&h=600&q=80',
    featured: true,
    atcCode: 'A11CC05'
  },
  {
    id: 'prod-ophta-tear',
    name: 'OcuLarm Dual 0.2% monodoses',
    genericName: 'Hyaluronate de sodium 0.2% + Tréhalose 3%',
    dosage: '0.2% / 3%',
    galenicForm: 'Collyre stérile sans conservateur',
    packaging: 'Boîte de 30 unidoses stériles de 0.4 ml',
    category: 'Ophtalmologie',
    therapeuticClass: 'Substitut lacrymal & Protecteur de la surface oculaire',
    laboratoryId: 'lab-aegis-italy',
    laboratoryName: 'Aegis Therapeutica Roma',
    prescriptionRequired: false,
    shortDescription: 'Hydratation intense, lubrification et régénération de la surface oculaire en cas de sécheresse oculaire modérée à sévère.',
    fullDescription: 'OcuLarm Dual combine les propriétés viscoélastiques du hyaluronate de sodium haut poids moléculaire avec l’effet bioprotecteur et antioxydant du tréhalose, protégeant l’épithélium cornéen du stress osmotique.',
    indications: [
      'Sécheresse oculaire liée aux écrans, à la climatisation ou au port de lentilles',
      'Syndrome des yeux secs post-chirurgie réfractive (LASIK, PRK)',
      'Sensations de brûlure, corps étranger et picotements oculaires'
    ],
    posology: 'Instiller 1 goutte dans chaque œil 3 à 6 fois par jour selon les besoins. Compatible avec le port de lentilles de contact.',
    contraindications: [
      'Hypersensibilité à l’un des composants'
    ],
    precautions: [
      'Unidose à usage unique immédiat',
      'Attendre 10 minutes entre l’instillation de deux collyres différents'
    ],
    composition: 'Hyaluronate de sodium (0.2%), Tréhalose (3%), Chlorure de sodium, Trométamol, Eau pour préparations injectables.',
    storage: 'Conserver à l’abri de la chaleur (< 25°C). Ne pas réutiliser une unidose entamée.',
    image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&w=600&h=600&q=80',
    featured: false,
    atcCode: 'S01XA20'
  },
  {
    id: 'prod-diab-glyco',
    name: 'GlycoControl 850mg XR',
    genericName: 'Chlorhydrate de Metformine à libération prolongée',
    dosage: '850 mg',
    galenicForm: 'Comprimé à libération prolongée',
    packaging: 'Boîte de 60 comprimés sous plaquette alu',
    category: 'Endocrinologie',
    therapeuticClass: 'Antidiabétique oral, Biguanide',
    laboratoryId: 'lab-vitalis-spain',
    laboratoryName: 'Vitalis Iberia Farmacéutica',
    prescriptionRequired: true,
    shortDescription: 'Traitement du diabète de type 2 chez l’adulte, en particulier en cas de surcharge pondérale.',
    fullDescription: 'GlycoControl XR utilise une matrice hydrophile brevetée qui libère progressivement la metformine sur 12 heures, améliorant significativement la tolérance digestive tout en réduisant l’insulinorésistance hépatique et musculaire.',
    indications: [
      'Diabète de type 2 en monothérapie lorsque le régime alimentaire et l’exercice physique ne suffisent pas',
      'En association avec d’autres antidiabétiques oraux ou avec l’insuline'
    ],
    posology: '1 à 2 comprimés par jour le soir au cours du dîner.',
    contraindications: [
      'Insuffisance rénale modérée à sévère (DFG < 30 mL/min)',
      'Acidose métabolique aiguë ou acidocétose diabétique',
      'Insuffisance cardiaque décompensée ou insuffisance respiratoire'
    ],
    precautions: [
      'Évaluation de la fonction rénale avant et pendant le traitement',
      'Interrompre le traitement 48h avant tout examen radiologique avec injection de produit de contraste iodé'
    ],
    composition: 'Chlorhydrate de metformine 850 mg équivalent à 662.9 mg de metformine base. Hypromellose, carboxyméthylamidon sodique.',
    storage: 'Conserver à l’abri de l’humidité à température ambiante.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=600&h=600&q=80',
    featured: false,
    atcCode: 'A10BA02'
  },
  {
    id: 'prod-urgent-perfus',
    name: 'IsoHydrate Ringer Lactate 500ml',
    genericName: 'Solution polyionique pour perfusion intraveineuse',
    dosage: '500 ml poche sans PVC',
    galenicForm: 'Soluté injectable pour perfusion IV',
    packaging: 'Poche stérile bi-orifices de 500 ml avec suremballage protecteur',
    category: 'Hospitalier & Urgences',
    therapeuticClass: 'Soluté de remplissage vasculaire & rééquilibrage électrolytique',
    laboratoryId: 'lab-genpharma-belgium',
    laboratoryName: 'GenPharma Benelux',
    prescriptionRequired: true,
    shortDescription: 'Restauration des équilibres hydro-électrolytiques et réhydratation extracellulaire en milieu hospitalier et pré-hospitalier.',
    fullDescription: 'Solution isotonique stérile et apyrogène équilibrée contenant du sodium, potassium, calcium, chlorure et lactate de sodium comme précurseur de bicarbonate, indiquée dans les états de déshydratation aiguë et d’hypovolémie.',
    indications: [
      'Rétablissement de l’équilibre hydro-électrolytique en chirurgie et réanimation',
      'Déshydratation extracellulaire modérée à sévère',
      'Remplissage vasculaire péri-opératoire et prise en charge des états de choc hypovolémique initiaux'
    ],
    posology: 'Voie intraveineuse stricte en perfusion lente. Débit et volume adaptés par le médecin anesthésiste-réanimateur.',
    contraindications: [
      'Hyperhydratation extracellulaire ou hypervolémie',
      'Insuffisance cardiaque congestive non stabilisée',
      'Hyperkaliémie sévère ou hypercalcémie'
    ],
    precautions: [
      'Surveillance clinique et biologique continue (ionogramme plasmatique, glycémie, diurèse)',
      'Prudence chez l’insuffisant hépatique'
    ],
    composition: 'Chlorure de sodium, Chlorure de potassium, Chlorure de calcium dihydraté, Lactate de sodium, Eau ppi.',
    storage: 'Conserver à une température comprise entre 2°C et 25°C. Ne pas congeler.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&h=600&q=80',
    featured: false,
    atcCode: 'B05BB01'
  }
];
