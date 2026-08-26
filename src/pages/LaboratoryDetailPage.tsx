import React, { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Calendar,
  Globe,
  Award,
  Pill,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { ApiService } from '../services/api';
import { Laboratory, Product } from '../types';

interface LaboratoryDetailPageProps {
  labId: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onRequestMeeting: (serviceTitle?: string) => void;
}

export const LaboratoryDetailPage: React.FC<LaboratoryDetailPageProps> = ({
  labId,
  onNavigate,
  onOpenQuickView,
  onRequestMeeting
}) => {
  const [lab, setLab] = useState<Laboratory | null>(null);
  const [labProducts, setLabProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const l = await ApiService.getLaboratoryById(labId);
      if (l) {
        setLab(l);
        const prods = await ApiService.getProductsByLaboratory(l.id);
        setLabProducts(prods);
      }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    load();
  }, [labId]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">Chargement...</div>;
  }

  if (!lab) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Laboratoire non trouvé</h2>
        <button
          type="button"
          onClick={() => onNavigate('laboratories')}
          className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs"
        >
          Retour aux laboratoires
        </button>
      </div>
    );
  }

  return (
    <div id="laboratory-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Laboratoires Partenaires', page: 'laboratories' },
          { label: lab.name, active: true }
        ]}
        onNavigate={onNavigate}
      />

      {/* Lab Hero Card */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Cover with overlay */}
        <div className="relative h-48 sm:h-64 bg-slate-900">
          <img src={lab.coverImage} alt={lab.name} className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        </div>

        {/* Profile Info Bar */}
        <div className="p-6 sm:p-10 relative -mt-16 sm:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 overflow-hidden shrink-0">
                <img src={lab.logo} alt={lab.name} className="w-full h-full object-cover rounded-xl" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{lab.flag}</span>
                  <span className="text-xs font-semibold text-slate-500">{lab.country}</span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                  {lab.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Siège mondial : {lab.headquarters} • Fondé en {lab.foundationYear}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {lab.website && (
                <a
                  href={lab.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Site Officiel</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => onRequestMeeting(`Gamme ${lab.name}`)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs shadow-md transition-colors flex items-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre RDV</span>
              </button>
            </div>
          </div>

          {/* Body Description & Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            <div className="lg:col-span-8 space-y-4">
              <h3 className="text-base font-bold text-slate-900">Présentation du Laboratoire</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{lab.description}</p>

              {/* Specialties */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                  Domaines d'Expertise Médicale :
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lab.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Normes & Certifications</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {lab.certifications.map((cert, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-slate-200 text-xs text-slate-500">
                Partenaire MedConnect Pharma depuis plus de 6 ans.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Products Catalog */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              Gamme Thérapeutique
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
              Médicaments distribués & promus ({labProducts.length})
            </h2>
          </div>
        </div>

        {labProducts.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center text-slate-500 border border-slate-200 text-xs">
            Aucun médicament répertorié pour l'instant.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {labProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(id) => onNavigate('product-detail', id)}
                onQuickView={onOpenQuickView}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
