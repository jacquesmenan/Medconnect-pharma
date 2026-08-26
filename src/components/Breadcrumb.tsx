import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  page?: string;
  active?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onNavigate: (page: string, param?: string) => void;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-4 bg-slate-100/80 rounded-xl mb-6 text-xs sm:text-sm text-slate-600">
      <ol className="flex items-center flex-wrap gap-1.5">
        <li className="flex items-center">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-sky-700 transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Accueil</span>
          </button>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            {item.active || !item.page ? (
              <span className="font-semibold text-sky-800 line-clamp-1 max-w-[220px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                type="button"
                onClick={() => onNavigate(item.page!)}
                className="hover:text-sky-700 transition-colors line-clamp-1 max-w-[180px] sm:max-w-none font-medium"
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
