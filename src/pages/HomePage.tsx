import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Stethoscope,
  Pill,
  ShieldCheck,
  Building2,
  Users,
  Sparkles,
  Calendar,
  CheckCircle2,
  TrendingUp,
  Search,
  Award,
  ChevronRight
} from 'lucide-react';
import { ApiService } from '../services/api';
import { Product, Laboratory, Service, NewsArticle, StatItem, Testimonial } from '../types';
import { ProductCard } from '../components/ProductCard';
import { LaboratoryCard } from '../components/LaboratoryCard';
import { ServiceCard } from '../components/ServiceCard';
import { NewsCard } from '../components/NewsCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { StatCard } from '../components/StatCard';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onRequestMeeting: (serviceTitle?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenQuickView,
  onRequestMeeting
}) => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadData = async () => {
      const [prods, labs, servs, newsItems, statData, testiData] = await Promise.all([
        ApiService.getProducts({ sortBy: 'recent' }),
        ApiService.getLaboratories(),
        ApiService.getServices(),
        ApiService.getNews(),
        ApiService.getStats(),
        ApiService.getTestimonials()
      ]);
      setFeaturedProducts(prods);
      setLaboratories(labs);
      setServices(servs);
      setNews(newsItems);
      setStats(statData);
      setTestimonials(testiData);
    };
    loadData();
  }, []);

  const categories = ['all', 'Cardiologie', 'Infectiologie', 'Dermatologie', 'Gastro-entérologie', 'Pédiatrie'];

  const filteredProducts = selectedCategory === 'all'
    ? featuredProducts.slice(0, 6)
    : featuredProducts.filter((p) => p.category === selectedCategory).slice(0, 6);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('products', searchQuery);
    } else {
      onNavigate('products');
    }
  };

  return (
    <div id="home-page" className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200/80 pt-10 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Hero Left: Copy, Stats & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-block px-3.5 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-lg">
              Promotion Médicale de Précision
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Connecter l'innovation<br className="hidden sm:inline" /> pharmaceutique au{' '}
              <span className="text-blue-600 underline decoration-emerald-300 underline-offset-4">
                patient
              </span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Expert en représentation et promotion médicale, nous assurons le lien stratégique et scientifique entre les laboratoires internationaux et le réseau des praticiens & pharmaciens d'officine.
            </p>

            {/* Live Search Bar inside Hero */}
            <form onSubmit={handleHeroSearch} className="max-w-xl mx-auto lg:mx-0 pt-1">
              <div className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all shadow-sm">
                <Search className="w-5 h-5 text-slate-400 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher une molécule, DCI, laboratoire ou spécialité..."
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 px-3 py-2 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs sm:text-sm transition-colors shrink-0 flex items-center gap-1.5 shadow-sm"
                >
                  <span>Rechercher</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* 3 Metric Cards Row from Polish Design */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">850+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Officines Partenaires</p>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <p className="text-2xl sm:text-3xl font-bold text-emerald-500">15+</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Laboratoires Leaders</p>
              </div>
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm text-left">
                <p className="text-2xl sm:text-3xl font-bold text-slate-800">98%</p>
                <p className="text-[10px] sm:text-xs text-slate-500 font-medium uppercase tracking-wider mt-0.5">Taux de Satisfaction</p>
              </div>
            </div>

            {/* Action Buttons & Expert Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all hover:scale-[1.02] flex items-center gap-2 text-xs sm:text-sm"
              >
                <Pill className="w-4 h-4 text-emerald-400" />
                <span>Découvrir le Catalogue</span>
              </button>

              <button
                type="button"
                onClick={() => onRequestMeeting()}
                className="px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-colors flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-blue-600" />
                <span>Prendre RDV</span>
              </button>

              <div className="flex items-center gap-2 pl-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-300 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=80&h=80&q=80" alt="Médecin" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-400 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=80&h=80&q=80" alt="Pharmacien" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
                    +40
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-600">Rejoint par 40+ experts</span>
              </div>
            </div>
          </div>

          {/* Hero Right: Spotlight Featured Card & Service blocks */}
          <div className="lg:col-span-5 space-y-4">
            {/* Top Spotlight Featured Box */}
            <div className="bg-blue-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl space-y-4">
              <div className="relative z-10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                    Spécialité Vedette
                  </span>
                  <span className="px-3 py-1 bg-white text-blue-600 text-xs font-bold rounded-lg shadow-sm">
                    Nouveau
                  </span>
                </div>

                <div className="h-32 w-full bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center p-4">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-lg flex flex-col items-center justify-center text-blue-600 p-2">
                    <Pill className="w-8 h-8 rotate-45 text-blue-600" />
                    <div className="w-10 h-1.5 bg-emerald-400 rounded-full mt-1"></div>
                  </div>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-lg font-bold text-white">TensolCor 20mg</h3>
                    <p className="text-blue-100 text-xs">Laboratoires Vitamed International</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('product-detail', 'prod-1')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-semibold backdrop-blur-sm transition-colors flex items-center gap-1"
                  >
                    <span>Consulter</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
            </div>

            {/* Bottom 2 mini service blocks */}
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => onNavigate('services', 'promotion-medicale')}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-105 transition-transform">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">Visite Médicale</h4>
                <p className="text-xs text-slate-500 leading-snug">Déploiement stratégique hospitalier & officinal.</p>
              </div>

              <div
                onClick={() => onNavigate('services', 'formations-seminaires')}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-400 transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-3 group-hover:scale-105 transition-transform">
                  <Building2 className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-blue-600 transition-colors">Formation & EPU</h4>
                <p className="text-xs text-slate-500 leading-snug">Webinaires et séminaires de pointe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PRÉSENTATION DE MEDCONNECT PHARMA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
              Qui Sommes-Nous
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Le trait d’union indispensable entre <span className="text-blue-600">l’innovation pharmaceutique</span> et les soignants
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Fondée par des professionnels passionnés de santé et de pharmacologie, <strong>MedConnect Pharma</strong> s’est imposée comme l’agence de référence pour le déploiement sur-mesure de forces de vente médicales et la valorisation des portefeuilles thérapeutiques.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Notre engagement repose sur une éthique sans compromis, une maîtrise scientifique approfondie des monographies et une proximité constante avec les prescripteurs et pharmaciens d’officine.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-600" /> Éthique & Déontologie
                </div>
                <p className="text-xs text-slate-500">Respect strict des chartes de visite médicale et transparence.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <div className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" /> Impact Thérapeutique
                </div>
                <p className="text-xs text-slate-500">Diffusion des bonnes pratiques et du bon usage du médicament.</p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Découvrir notre histoire, notre vision & notre équipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&h=750&q=80"
                alt="Équipe médicale MedConnect Pharma"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">Expertise Terrain</p>
                <p className="text-lg font-bold">Un accompagnement scientifique quotidien auprès des praticiens</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. NOS SERVICES CLES */}
      <section className="bg-slate-50 py-16 px-4 sm:px-8 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
                Nos Pôles de Compétences
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
                Des solutions complètes pour laboratoires & praticiens
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('services')}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <span>Voir tous nos services en détail</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 3).map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={(id) => onNavigate('services', id)}
                onOpenConsultation={(title) => onRequestMeeting(title)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CHIFFRES CLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
            Impact & Présence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Les chiffres clés de notre performance médicale
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Une force de frappe opérationnelle au service des laboratoires et des professionnels de santé.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
      </section>

      {/* 5. PRODUITS PHARMACEUTIQUES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
              Portefeuille Thérapeutique
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Médicaments & Dispositifs Médicaux
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Des spécialités pharmaceutiques aux normes européennes et internationales les plus exigeantes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('products')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
          >
            <span>Accéder au catalogue complet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category filter pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? 'Toutes les Spécialités' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={(id) => onNavigate('product-detail', id)}
              onQuickView={onOpenQuickView}
            />
          ))}
        </div>
      </section>

      {/* 6. LABORATOIRES PARTENAIRES */}
      <section className="bg-slate-900 text-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3.5 py-1.5 rounded-lg border border-emerald-800 inline-block">
                Alliances Stratégiques
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                Les Laboratoires qui nous font confiance
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Des acteurs européens et internationaux reconnus pour l'excellence de leurs molécules.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('laboratories')}
              className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Découvrir tous les laboratoires</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {laboratories.slice(0, 3).map((lab) => (
              <LaboratoryCard
                key={lab.id}
                laboratory={lab}
                onSelect={(id) => onNavigate('laboratory-detail', id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 7. ACTUALITÉS & CONGRÈS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
              Actualités & Sciences
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-2">
              Dernières Publications & Congrès Médicaux
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('news')}
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Toutes les actualités</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.slice(0, 3).map((item) => (
            <NewsCard
              key={item.id}
              article={item}
              onSelect={(id) => onNavigate('article-detail', id)}
            />
          ))}
        </div>
      </section>

      {/* 8. TÉMOIGNAGES */}
      <section className="bg-slate-50 py-16 px-4 sm:px-8 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-3.5 py-1.5 rounded-lg inline-block">
              Reconnaissance Professionnelle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ce que disent les prescripteurs & pharmaciens
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testi) => (
              <TestimonialCard key={testi.id} testimonial={testi} />
            ))}
          </div>
        </div>
      </section>

      {/* 9. CALL TO ACTION FINAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="rounded-3xl bg-blue-600 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl space-y-3 text-center lg:text-left relative z-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-200 bg-blue-700/80 px-3 py-1 rounded-lg border border-blue-400/40 inline-block">
              Partenariat & Visite
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Vous êtes un laboratoire ou un professionnel de santé ?
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
              Discutons de vos besoins : déploiement d’une force de vente dédiée, demande de visite médicale dans votre cabinet, ou enregistrement réglementaire.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3.5 shrink-0 w-full sm:w-auto relative z-10">
            <button
              type="button"
              onClick={() => onRequestMeeting()}
              className="px-7 py-3.5 bg-white hover:bg-slate-100 text-blue-900 rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105 text-center flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-blue-600" />
              <span>Prendre un Rendez-Vous</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('contact', 'laboratoire')}
              className="px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors text-center"
            >
              Devenir Laboratoire Partenaire
            </button>
          </div>

          <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-blue-500 rounded-full opacity-40 blur-3xl pointer-events-none"></div>
        </div>
      </section>
    </div>
  );
};
