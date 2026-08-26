import React, { useState, useEffect } from 'react';
import {
  Download,
  Calendar,
  Building2,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Clock,
  ArrowRight,
  Package,
  Layers
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { ApiService } from '../services/api';
import { Product } from '../types';
import { useToast } from '../context/ToastContext';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenQuickView: (product: Product) => void;
  onRequestMeeting: (serviceTitle?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onOpenQuickView,
  onRequestMeeting
}) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, info } = useToast();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const p = await ApiService.getProductById(productId);
      if (p) {
        setProduct(p);
        const rel = await ApiService.getRelatedProducts(p.id, 3);
        setRelatedProducts(rel);
      }
      setLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    load();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
        Chargement de la monographie produit...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Produit non trouvé</h2>
        <p className="text-slate-500 text-sm">Le médicament demandé n'existe pas ou a été déplacé.</p>
        <button
          type="button"
          onClick={() => onNavigate('products')}
          className="px-5 py-2.5 bg-sky-600 text-white rounded-xl font-semibold text-xs"
        >
          Retour au catalogue
        </button>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    info(`Génération du document officiel RCP pour « ${product.name} » en cours...`);
  };

  return (
    <div id="product-detail-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <Breadcrumb
        items={[
          { label: 'Catalogue Médicaments', page: 'products' },
          { label: product.category, page: 'products' },
          { label: product.name, active: true }
        ]}
        onNavigate={onNavigate}
      />

      {/* Top Product Hero Block */}
      <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 items-start">
        {/* Left: Image & Fast CTAs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="aspect-square rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner p-4 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownloadPdf}
              className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200"
            >
              <Download className="w-4 h-4 text-sky-600" />
              <span>Télécharger RCP / Notice</span>
            </button>

            <button
              type="button"
              onClick={() => onRequestMeeting(`Visite Délégué - ${product.name}`)}
              className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Demander un Délégué</span>
            </button>
          </div>
        </div>

        {/* Right: Pharmaceutical Identification Header */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                {product.category}
              </span>
              {product.prescriptionRequired ? (
                <span className="text-xs font-semibold bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md border border-rose-200">
                  Médicament soumis à prescription médicale
                </span>
              ) : (
                <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                  Médicament conseil / OTC
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
              {product.name}
            </h1>

            <p className="text-sm sm:text-base font-semibold text-slate-600 italic mt-1">
              DCI : {product.genericName}
            </p>
          </div>

          {/* Laboratory Link */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4 text-sky-600" />
              <span className="text-xs text-slate-600">
                Laboratoire titulaire : <strong className="text-slate-900">{product.laboratoryName}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('laboratory-detail', product.laboratoryId)}
              className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
            >
              <span>Fiche Labo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Key Specs Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Dosage</span>
              <span className="font-bold text-slate-900">{product.dosage}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Forme Galénique</span>
              <span className="font-bold text-slate-900">{product.galenicForm}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
              <span className="text-slate-400 block mb-0.5">Conditionnement</span>
              <span className="font-bold text-slate-900">{product.packaging}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 col-span-2 sm:col-span-3">
              <span className="text-slate-400 block mb-0.5">Classe Pharmaco-Thérapeutique</span>
              <span className="font-bold text-slate-900">{product.therapeuticClass}</span>
            </div>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
            {product.fullDescription}
          </div>
        </div>
      </section>

      {/* Deep Monograph Sections */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Monograph Content */}
        <div className="lg:col-span-8 space-y-6">
          {/* Indications */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-sky-600" />
              <span>Indications Thérapeutiques</span>
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              {product.indications.map((ind, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-sky-50/50 p-3 rounded-xl border border-sky-100/60">
                  <span className="w-2 h-2 rounded-full bg-sky-600 shrink-0 mt-1.5"></span>
                  <span className="leading-relaxed">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Posology */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <span>Posologie & Mode d'Administration</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {product.posology}
            </p>
          </div>

          {/* Contraindications & Precautions */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Contre-indications & Précautions d'Emploi</span>
            </h3>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-100 text-rose-950 space-y-2">
                <strong className="block font-bold text-rose-900">Contre-indications majeures :</strong>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {product.contraindications.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-100 text-amber-950 space-y-2">
                <strong className="block font-bold text-amber-900">Mises en garde & précautions :</strong>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  {product.precautions.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Composition, Storage, Regulatory & Sample Request */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
              Composition & Conservation
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <strong className="text-slate-800 block mb-1">Composition qualitative & quantitative :</strong>
                <p className="leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {product.composition}
                </p>
              </div>
              <div>
                <strong className="text-slate-800 block mb-1">Conditions de conservation :</strong>
                <p className="leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  {product.storage}
                </p>
              </div>
            </div>
          </div>

          {/* Sample / Meeting Card */}
          <div className="rounded-3xl p-6 bg-gradient-to-br from-sky-700 to-slate-900 text-white shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-sky-300" />
            </div>
            <h4 className="font-bold text-base">Vous êtes prescripteur ?</h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Sollicitez le passage d'un délégué médical dans votre cabinet ou service pour une présentation détaillée et la mise à disposition de matériel scientifique.
            </p>
            <button
              type="button"
              onClick={() => onRequestMeeting(`Demande Médecin - ${product.name}`)}
              className="w-full py-2.5 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-bold text-xs shadow-md transition-colors"
            >
              Planifier un échange
            </button>
          </div>
        </div>
      </section>

      {/* Related Products Carousel / Grid */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Thérapeutiques similaires</span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Produits de la même classe ou du même laboratoire
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('products')}
              className="text-xs font-semibold text-sky-600 hover:text-sky-800"
            >
              Voir tout →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onSelect={(id) => onNavigate('product-detail', id)}
                onQuickView={onOpenQuickView}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
