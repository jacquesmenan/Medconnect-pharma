import React, { useState } from 'react';
import { Pill, Mail, Phone, MapPin, Send, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { ApiService } from '../services/api';
import { useToast } from '../context/ToastContext';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { success, error } = useToast();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      error('Veuillez renseigner une adresse email valide.');
      return;
    }

    try {
      setIsSubscribing(true);
      const res = await ApiService.subscribeNewsletter(newsletterEmail);
      if (res.success) {
        setIsSubscribed(true);
        success(res.message);
        setNewsletterEmail('');
      }
    } catch {
      error('Une erreur est survenue lors de l’inscription.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-400 text-xs sm:text-sm border-t border-slate-800">
      {/* Newsletter Section */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-10 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-3 py-1 rounded-full border border-blue-800/60 inline-block mb-2">
              Veille Médicale & Scientifique
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
              Recevez notre lettre d’information thérapeutique
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Réservée aux professionnels de santé : nouvelles AMM, études cliniques, invitations aux symposiums et actualités de nos laboratoires partenaires.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto flex-1 max-w-md flex gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Votre adresse email professionnelle"
                disabled={isSubscribing || isSubscribed}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isSubscribing || isSubscribed}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 shrink-0"
            >
              {isSubscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> Inscrit
                </>
              ) : isSubscribing ? (
                'Envoi...'
              ) : (
                <>
                  <span>S’abonner</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Main 4-Column Footer Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
        {/* Col 1: Brand & Presentation */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <Pill className="w-5 h-5 rotate-45" />
            </div>
            <div>
              <span className="font-bold text-lg text-white">
                MedConnect<span className="text-emerald-400">Pharma</span>
              </span>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Excellence Médicale & Distribution
              </p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            Partenaire stratégique de référence pour la promotion éthique de médicaments, la visite médicale spécialisée et la représentation de laboratoires pharmaceutiques internationaux auprès des médecins et pharmaciens.
          </p>
          <div className="pt-2 flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> ISO 9001:2015
            </span>
            <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> Charte de la Visite Médicale
            </span>
          </div>
        </div>

        {/* Col 2: Navigation rapide */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm tracking-wide">Navigation</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors"
              >
                Accueil
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="hover:text-white transition-colors"
              >
                À propos de nous
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="hover:text-white transition-colors"
              >
                Nos Services & Expertises
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('products')}
                className="hover:text-white transition-colors"
              >
                Catalogue Médicaments
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('laboratories')}
                className="hover:text-white transition-colors"
              >
                Laboratoires Partenaires
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('news')}
                className="hover:text-white transition-colors"
              >
                Actualités & Congrès
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Services & Pro */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm tracking-wide">Espace Professionnel</h4>
          <ul className="space-y-2 text-xs sm:text-sm">
            <li>
              <button
                type="button"
                onClick={() => onNavigate('services', 'promotion-medicale')}
                className="hover:text-white transition-colors"
              >
                Promotion & Visite Médicale
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('services', 'representation-pharmaceutique')}
                className="hover:text-white transition-colors"
              >
                Représentation Officinale
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('services', 'affaires-reglementaires')}
                className="hover:text-white transition-colors"
              >
                Affaires Réglementaires & AMM
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('careers')}
                className="hover:text-white transition-colors flex items-center gap-1 text-blue-400"
              >
                <span>Recrutement Délégués</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="hover:text-white transition-colors"
              >
                FAQ Pharmacies & Médecins
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Contact & PV */}
        <div className="space-y-3">
          <h4 className="font-semibold text-white text-sm tracking-wide">Contact & Siège</h4>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <span>Abidjan Cocody, Côte d'Ivoire</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-400 shrink-0" />
              <span>+225 01 50 21 52 02</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-400 shrink-0" />
              <span>contact@medconnect-pharma.com</span>
            </li>
            <li className="pt-2">
              <button
                type="button"
                onClick={() => onNavigate('contact', 'pharmacovigilance')}
                className="text-[11px] font-semibold text-amber-400 hover:text-amber-300 bg-amber-950/40 border border-amber-800/60 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Signalement Pharmacovigilance
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Sub-footer */}
      <div className="border-t border-slate-800 py-6 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <p>© {new Date().getFullYear()} MedConnect Pharma. Tous droits réservés.</p>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => onNavigate('privacy')}
                className="hover:text-slate-300 transition-colors"
              >
                Confidentialité & RGPD
              </button>
              <button
                type="button"
                onClick={() => onNavigate('legal')}
                className="hover:text-slate-300 transition-colors"
              >
                Mentions Légales
              </button>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-slate-400">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span> Support actif 24/7
            </span>
            <div className="flex gap-2">
              <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer font-bold text-[10px]">L</span>
              <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer font-bold text-[10px]">F</span>
              <span className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors cursor-pointer font-bold text-[10px]">W</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
