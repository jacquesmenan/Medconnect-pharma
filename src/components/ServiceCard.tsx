import React from 'react';
import {
  Stethoscope,
  Pill,
  GraduationCap,
  FileCheck,
  TrendingUp,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (serviceId: string) => void;
  onOpenConsultation?: (serviceTitle: string) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onSelect,
  onOpenConsultation
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'Pill':
        return <Pill className="w-6 h-6 text-emerald-600" />;
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-amber-600" />;
      case 'FileCheck':
        return <FileCheck className="w-6 h-6 text-indigo-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-blue-600" />;
      default:
        return <Stethoscope className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div
      id={`service-card-${service.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between"
    >
      <div>
        {/* Icon & Category */}
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          {getIcon(service.icon)}
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(service.id)}
          className="text-lg font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug"
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
          {service.shortDescription}
        </p>

        {/* Key Features Bullet List */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
          {service.features.slice(0, 3).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => onSelect(service.id)}
          className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 group/btn"
        >
          <span>Détails & méthodologie</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
        </button>

        {onOpenConsultation && (
          <button
            type="button"
            onClick={() => onOpenConsultation(service.title)}
            className="text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg transition-colors"
          >
            Demander un devis
          </button>
        )}
      </div>
    </div>
  );
};
