import React, { useState, useEffect } from 'react';
import { Building2, Search, Globe, Pill, ArrowRight, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { LaboratoryCard } from '../components/LaboratoryCard';
import { ApiService } from '../services/api';
import { Laboratory } from '../types';

interface LaboratoriesPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const LaboratoriesPage: React.FC<LaboratoriesPageProps> = ({ onNavigate }) => {
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');

  useEffect(() => {
    const load = async () => {
      const data = await ApiService.getLaboratories();
      setLaboratories(data);
    };
    load();
  }, []);

  const countries = ['all', ...Array.from(new Set(laboratories.map((l) => l.country)))];

  const filteredLaboratories = laboratories.filter((lab) => {
    const matchSearch =
      lab.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lab.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      lab.country.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCountry = selectedCountry === 'all' || lab.country === selectedCountry;
    return matchSearch && matchCountry;
  });

  return (
    <div id="laboratories-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Laboratoires Partenaires', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-100">
          Réseau International & Titulaires AMM
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Nos Laboratoires Partenaires
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Découvrez les fabricants et firmes pharmaceutiques de renommée mondiale que nous représentons en exclusivité sur nos territoires.
        </p>
      </section>

      {/* Filter Controls */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher par nom de laboratoire, pays, domaine d'expertise..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {countries.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setSelectedCountry(c)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCountry === c
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {c === 'all' ? 'Tous les Pays' : c}
            </button>
          ))}
        </div>
      </section>

      {/* Laboratories Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaboratories.map((lab) => (
          <LaboratoryCard
            key={lab.id}
            laboratory={lab}
            onSelect={(id) => onNavigate('laboratory-detail', id)}
          />
        ))}
      </section>

      {/* Partnership CTA Banner */}
      <section className="bg-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 border border-emerald-900">
        <div className="space-y-3 text-center lg:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Développement de portefeuille</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Vous représentez un laboratoire pharmaceutique ?
          </h3>
          <p className="text-xs sm:text-sm text-emerald-200 max-w-xl">
            Confiez-nous l'enregistrement, la promotion médicale et le déploiement de vos spécialités avec un reporting en temps réel et une force de vente dédiée.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('contact', 'partenariat_labo')}
          className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shrink-0 transition-transform hover:scale-105"
        >
          Proposer un partenariat
        </button>
      </section>
    </div>
  );
};
