import React from 'react';
import { Users, Building2, Store, Stethoscope, ShieldCheck } from 'lucide-react';
import { StatItem } from '../types';

interface StatCardProps {
  stat: StatItem;
}

export const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Users':
        return <Users className="w-6 h-6 text-blue-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-emerald-600" />;
      case 'Store':
        return <Store className="w-6 h-6 text-amber-600" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-blue-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      default:
        return <Users className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div
      id={`stat-${stat.id}`}
      className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-center space-y-2"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-1">
        {renderIcon(stat.iconName)}
      </div>
      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
        {stat.value}
        <span className="text-blue-600">{stat.suffix}</span>
      </div>
      <div className="font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider">
        {stat.label}
      </div>
      <p className="text-[11px] text-slate-500 max-w-[200px] leading-snug">
        {stat.description}
      </p>
    </div>
  );
};
