import React, { useState, useEffect } from 'react';
import {
  Stethoscope,
  Pill,
  GraduationCap,
  FileCheck,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Users,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ApiService } from '../services/api';
import { Service } from '../types';

interface ServicesPageProps {
  initialServiceId?: string;
  onNavigate: (page: string, param?: string) => void;
  onRequestMeeting: (serviceTitle?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  initialServiceId,
  onNavigate,
  onRequestMeeting
}) => {
  const [servicesList, setServicesList] = useState<Service[]>([]);
  const [activeServiceId, setActiveServiceId] = useState<string>(initialServiceId || 'promotion-medicale');

  useEffect(() => {
    const load = async () => {
      const data = await ApiService.getServices();
      setServicesList(data);
      if (initialServiceId && data.some((s) => s.id === initialServiceId)) {
        setActiveServiceId(initialServiceId);
      } else if (data.length > 0) {
        setActiveServiceId(data[0].id);
      }
    };
    load();
  }, [initialServiceId]);

  const activeService = servicesList.find((s) => s.id === activeServiceId) || servicesList[0];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-sky-600" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-emerald-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-rose-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-sky-600" />;
    }
  };

  return (
    <div id="services-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Nos Services & Expertises', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Expertise Thérapeutique & Terrain
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Nos Services d'Excellence Pharmaceutique
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          De la promotion médicale individuelle au conseil stratégique en passant par la représentation en pharmacie d’officine et la formation continue.
        </p>
      </section>

      {/* Service Selector Tabs & Detailed Panel */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Services Menu */}
        <div className="lg:col-span-4 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Pôles d'intervention
          </p>
          {servicesList.map((srv) => {
            const isSelected = srv.id === activeServiceId;
            return (
              <button
                key={srv.id}
                type="button"
                onClick={() => setActiveServiceId(srv.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-sky-50/80 border-sky-300 text-sky-950 shadow-md shadow-sky-900/5'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="p-2 rounded-xl bg-white shadow-sm shrink-0 mt-0.5 border border-slate-100">
                  {getServiceIcon(srv.icon)}
                </div>
                <div>
                  <h3 className="font-bold text-sm sm:text-base leading-snug">{srv.title}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-1">{srv.shortDescription}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Col: Active Service Full Detail Card */}
        {activeService && (
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center border border-sky-100">
                  {getServiceIcon(activeService.icon)}
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{activeService.title}</h2>
                  <p className="text-xs text-slate-500">Pôle d'expertise MedConnect Pharma</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onRequestMeeting(activeService.title)}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 self-start sm:self-auto shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Demander un déploiement</span>
              </button>
            </div>

            {/* Description */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
              <p className="text-base font-semibold text-slate-900">{activeService.shortDescription}</p>
              <p>{activeService.fullDescription}</p>
            </div>

            {/* Features Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800">
                Prestations & Engagements Inclus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.features.map((f, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience & Methodology */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-sky-600" /> Publics & Cibles Visées
                </h4>
                <ul className="space-y-1.5 text-xs text-sky-950">
                  {activeService.targetAudience.map((target, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Bénéfices Laboratoire
                </h4>
                <ul className="space-y-1.5 text-xs text-emerald-950">
                  {activeService.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Methodology Process */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Notre Démarche Méthodologique
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeService.methodology.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom action banner */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl">
              <div>
                <p className="text-xs font-bold text-slate-900">Besoin d’un plan personnalisé pour vos molécules ?</p>
                <p className="text-[11px] text-slate-500">Nos directeurs de projet réalisent un audit préliminaire sans engagement.</p>
              </div>
              <button
                type="button"
                onClick={() => onRequestMeeting(activeService.title)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm shrink-0"
              >
                Prendre contact avec un responsable
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
