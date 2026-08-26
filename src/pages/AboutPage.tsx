import React, { useState, useEffect } from 'react';
import { ShieldCheck, Target, Eye, HeartHandshake, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ApiService } from '../services/api';
import { TeamMember, StatItem } from '../types';
import { StatCard } from '../components/StatCard';

interface AboutPageProps {
  onNavigate: (page: string, param?: string) => void;
  onRequestMeeting: (serviceTitle?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onRequestMeeting }) => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    const load = async () => {
      const [t, s] = await Promise.all([ApiService.getTeam(), ApiService.getStats()]);
      setTeam(t);
      setStats(s);
    };
    load();
  }, []);

  const values = [
    {
      title: 'Éthique & Déontologie',
      desc: 'Respect absolu du cadre réglementaire, des chartes de la visite médicale et de la pharmacovigilance.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Rigueur Scientifique',
      desc: 'Argumentaires étayés par des essais cliniques rigoureux et une formation médicale continue d’excellence.',
      icon: 'Award'
    },
    {
      title: 'Proximité Médicale',
      desc: 'Écoute permanente des prescripteurs et des équipes d’officines pour répondre fidèlement aux besoins des patients.',
      icon: 'HeartHandshake'
    },
    {
      title: 'Innovation Thérapeutique',
      desc: 'Faciliter l’accès précoce aux thérapies de pointe et aux molécules à haute valeur ajoutée.',
      icon: 'Target'
    }
  ];

  return (
    <div id="about-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-16">
      <Breadcrumb items={[{ label: 'À propos de MedConnect Pharma', active: true }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Notre Identité & Notre Engagement
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          L’expert de référence en <span className="text-sky-600">promotion médicale éthique</span>
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Depuis plus de 15 ans, MedConnect Pharma bâtit des passerelles solides entre l’industrie pharmaceutique internationale et la communauté médicale, au service d’une santé de qualité et accessible.
        </p>
      </section>

      {/* 1. Notre Histoire & Notre Mission */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">Notre Histoire</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Une aventure humaine née de la passion pharmacologique
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Créée en 2011 par un collège de pharmaciens et de médecins spécialistes, MedConnect Pharma est née d'un constat : la nécessité de professionnaliser la promotion du médicament par une communication scientifique irréprochable et un ancrage territorial fort.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            D’une équipe initiale de 5 délégués passionnés, notre réseau compte aujourd’hui plus de 45 délégués médicaux et pharmaceutiques couvrant un maillage complet de cliniques, hôpitaux universitaires et officines.
          </p>

          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-100 space-y-2">
            <h3 className="font-bold text-sky-950 text-sm">Notre Mission</h3>
            <p className="text-xs text-sky-900 leading-relaxed">
              « Informer objectivement les professionnels de santé sur les thérapeutiques disponibles, promouvoir le bon usage du médicament et garantir la disponibilité des innovations médicales auprès de chaque patient. »
            </p>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1000&h=750&q=80"
              alt="Recherche et laboratoire MedConnect Pharma"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 2. Notre Vision */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              Notre Vision 2030
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Devenir la première plateforme omnicanale de communication scientifique & médicale
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Nous conjuguons la puissance de la visite médicale en présentiel avec des outils digitaux avancés (e-learning accrédité, webinaires interactifs, CRM prédictif) pour offrir une expérience sur-mesure aux praticiens et un suivi d'activité transparent aux laboratoires.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-emerald-400 text-sm">Excellence Omnicanale</h4>
              <p className="text-xs text-slate-300">Visites physiques complétées par des modules digitaux interactifs.</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-1.5">
              <h4 className="font-bold text-sky-400 text-sm">Expansion Régionale</h4>
              <p className="text-xs text-slate-300">Déploiement accéléré dans de nouveaux bassins de santé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nos Valeurs Fondamentales */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Principes Directeurs
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Les 4 piliers de notre culture d’entreprise
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">{v.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Notre Équipe Dirigeante */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Gouvernance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Notre Comité de Direction
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Une équipe pluridisciplinaire unissant médecins, pharmaciens et experts du management opérationnel.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-square bg-slate-100 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                    {member.department}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">{member.name}</h4>
                  <p className="text-xs font-semibold text-slate-600">{member.role}</p>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Chiffres */}
      <section className="space-y-6 pt-4">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {stats.map((s) => (
            <StatCard key={s.id} stat={s} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="text-center bg-sky-50 rounded-3xl p-8 sm:p-12 border border-sky-100 space-y-4">
        <h3 className="text-2xl font-bold text-sky-950">Vous souhaitez collaborer avec notre équipe ?</h3>
        <p className="text-xs sm:text-sm text-sky-800 max-w-xl mx-auto">
          Que vous soyez un laboratoire souhaitant déléguer sa force de vente ou un soignant désirant planifier un échange scientifique.
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onRequestMeeting()}
            className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-md"
          >
            Prendre un Rendez-Vous
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold"
          >
            Nous Contacter
          </button>
        </div>
      </section>
    </div>
  );
};
