import React from 'react';
import { Building2, ArrowRight, ShieldCheck, Pill, MapPin } from 'lucide-react';
import { Laboratory } from '../types';

interface LaboratoryCardProps {
  laboratory: Laboratory;
  onSelect: (labId: string) => void;
}

export const LaboratoryCard: React.FC<LaboratoryCardProps> = ({
  laboratory,
  onSelect
}) => {
  return (
    <div
      id={`lab-card-${laboratory.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Cover Image with Flag & Logo */}
      <div className="relative h-40 bg-slate-100 overflow-hidden">
        <img
          src={laboratory.coverImage}
          alt={laboratory.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm text-slate-800">
          <span>{laboratory.flag}</span>
          <span>{laboratory.country}</span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white p-1 shadow-md border border-slate-200 overflow-hidden shrink-0">
            <img
              src={laboratory.logo}
              alt={laboratory.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div>
            <h3 className="font-bold text-white text-base leading-tight group-hover:text-emerald-300 transition-colors">
              {laboratory.name}
            </h3>
            <p className="text-[11px] text-slate-300 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {laboratory.headquarters}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {laboratory.description}
          </p>

          {/* Specialties pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {laboratory.specialties.map((spec) => (
              <span
                key={spec}
                className="text-[11px] font-medium bg-emerald-50 text-emerald-800 border border-emerald-100 px-2 py-0.5 rounded-md"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
            <Pill className="w-3.5 h-3.5 text-emerald-600" />
            <span>{laboratory.productsCount} médicaments</span>
          </span>
          <button
            type="button"
            onClick={() => onSelect(laboratory.id)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 group/btn"
          >
            <span>Voir le laboratoire</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
