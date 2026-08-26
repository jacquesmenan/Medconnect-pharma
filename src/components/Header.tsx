import React, { useState, useEffect } from 'react';
import {
  Menu,
  Search,
  PhoneCall,
  Calendar,
  ChevronDown,
  Building2,
  Stethoscope,
  Pill,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenSearch: () => void;
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenMobileMenu
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil' },
    { id: 'about', label: 'À propos' },
    {
      id: 'services',
      label: 'Services',
      hasDropdown: true
    },
    { id: 'products', label: 'Produits' },
    { id: 'laboratories', label: 'Laboratoires' },
    { id: 'news', label: 'Actualités' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2.5 border-b border-slate-200'
          : 'bg-white py-3.5 border-b border-slate-200 shadow-sm'
      }`}
    >
      {/* Top emergency & regulatory info bar */}
      <div className="hidden lg:block bg-slate-900 text-slate-300 text-xs py-1.5 px-6 -mt-3.5 mb-3 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" /> Promotion Médicale Certifiée & Déontologie
            </span>
            <span className="text-slate-400">
              Urgences & Pharmacovigilance 24/7 : <strong className="text-white">+33 (0)1 89 48 01 00</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button
              type="button"
              onClick={() => onNavigate('careers')}
              className="hover:text-white transition-colors flex items-center gap-1 text-slate-300"
            >
              <Sparkles className="w-3 h-3 text-amber-400" /> Recrutement Délégués
            </button>
            <span className="text-slate-700">|</span>
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="hover:text-white transition-colors"
            >
              FAQ Professionnels
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/20 group-hover:bg-blue-700 transition-colors">
            <Pill className="w-5 h-5 rotate-45" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-blue-900 flex items-center">
              MedConnect<span className="text-emerald-500">Pharma</span>
            </span>
            <p className="text-[10px] font-medium text-slate-500 tracking-wider uppercase">
              Promotion & Représentation
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm text-slate-600">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'services' && currentPage === 'service-detail') ||
              (item.id === 'products' && currentPage === 'product-detail') ||
              (item.id === 'laboratories' && currentPage === 'laboratory-detail') ||
              (item.id === 'news' && currentPage === 'article-detail');

            if (item.hasDropdown) {
              return (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => setIsServicesDropdownOpen(true)}
                  onMouseLeave={() => setIsServicesDropdownOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className={`flex items-center gap-1 transition-colors py-1 ${
                      isActive
                        ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5'
                        : 'hover:text-blue-600'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isServicesDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isServicesDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Pôles d'expertise
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('services', 'promotion-medicale');
                          setIsServicesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-start gap-2.5 transition-colors"
                      >
                        <Stethoscope className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Promotion & Visite Médicale</p>
                          <p className="text-[11px] text-slate-500">Cabinets & Réseau Hospitalier</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('services', 'representation-pharmaceutique');
                          setIsServicesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 flex items-start gap-2.5 transition-colors"
                      >
                        <Pill className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Représentation Officinale</p>
                          <p className="text-[11px] text-slate-500">Vente, Merchandising & Grossistes</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('services', 'formations-seminaires');
                          setIsServicesDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-blue-50 text-slate-700 hover:text-blue-700 flex items-start gap-2.5 transition-colors"
                      >
                        <Building2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-900">Symposiums & EPU</p>
                          <p className="text-[11px] text-slate-500">Formations médicales continues</p>
                        </div>
                      </button>
                      <div className="my-1 border-t border-slate-100"></div>
                      <button
                        type="button"
                        onClick={() => {
                          onNavigate('services');
                          setIsServicesDropdownOpen(false);
                        }}
                        className="w-full text-center py-1.5 text-xs text-blue-600 font-semibold hover:underline"
                      >
                        Voir tous les services →
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`transition-colors py-1 ${
                  isActive
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600 pb-0.5'
                    : 'hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search Pill */}
          <button
            type="button"
            id="btn-header-search"
            onClick={onOpenSearch}
            className="px-3.5 sm:px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full flex items-center gap-2 text-xs sm:text-sm border border-slate-200 transition-colors"
            aria-label="Rechercher"
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline text-slate-500">Rechercher...</span>
            <kbd className="hidden md:inline-block text-[10px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200">
              ⌘K
            </kbd>
          </button>

          {/* Contact / Appointment Button */}
          <button
            type="button"
            id="btn-header-rdv"
            onClick={() => onNavigate('contact', 'rdv_delegue')}
            className="bg-blue-600 text-white px-5 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Contact / RDV</span>
          </button>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            id="btn-mobile-menu"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            aria-label="Menu principal"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
