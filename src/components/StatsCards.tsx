import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import {
  Building2,
  Pill,
  Stethoscope,
  Store,
  ShieldCheck,
  TrendingUp,
  Users,
  Award,
  LucideIcon
} from 'lucide-react';
import { StatItem } from '../types';

export interface StatCardData {
  id: string;
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
  iconName?: string;
  customIcon?: LucideIcon;
  colorTheme?: 'blue' | 'emerald' | 'cyan' | 'amber' | 'purple';
}

const DEFAULT_STATS: StatCardData[] = [
  {
    id: 'stat-labs',
    value: 50,
    suffix: '+',
    label: 'Laboratoires Partenaires',
    description: 'Groupes pharmaceutiques internationaux et régionaux sous contrat exclusif',
    iconName: 'Building2',
    colorTheme: 'blue'
  },
  {
    id: 'stat-products',
    value: 500,
    suffix: '+',
    label: 'Produits Référencés',
    description: 'Spécialités hospitalières, princeps, génériques de précision et dispositifs',
    iconName: 'Pill',
    colorTheme: 'emerald'
  },
  {
    id: 'stat-visits',
    value: 1000,
    suffix: '+',
    label: 'Visites Médicales / mois',
    description: 'Entretiens scientifiques individuels en cabinets de ville, cliniques et CHU',
    iconName: 'Stethoscope',
    colorTheme: 'cyan'
  },
  {
    id: 'stat-pharmacies',
    value: 850,
    suffix: '+',
    label: 'Officines Partenaires',
    description: 'Pharmacies de ville et hospitalières approvisionnées et conseillées',
    iconName: 'Store',
    colorTheme: 'amber'
  },
  {
    id: 'stat-satisfaction',
    value: 98,
    suffix: '%',
    label: 'Taux de Satisfaction',
    description: 'Recommandation globale auprès des prescripteurs et praticiens de santé',
    iconName: 'ShieldCheck',
    colorTheme: 'purple'
  }
];

// Helper to animate count up smoothly from 0 to target
const AnimatedNumber: React.FC<{ value: number; duration?: number; inView: boolean }> = ({
  value,
  duration = 2000,
  inView
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing: easeOutExpo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOut * value);
      
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [inView, value, duration]);

  // Format with space thousands separator (e.g. 1 000)
  const formatted = displayValue.toLocaleString('fr-FR');

  return <span>{formatted}</span>;
};

interface SingleStatCardProps {
  stat: StatCardData;
  index: number;
}

const SingleStatCard: React.FC<SingleStatCardProps> = ({ stat, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-40px 0px' });

  const getThemeStyles = (theme?: string) => {
    switch (theme) {
      case 'emerald':
        return {
          iconBg: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/60',
          accentText: 'text-emerald-600 dark:text-emerald-400',
          borderHover: 'hover:border-emerald-300 dark:hover:border-emerald-700',
          badgeBg: 'bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300'
        };
      case 'cyan':
        return {
          iconBg: 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 border-cyan-100 dark:border-cyan-900/60',
          accentText: 'text-cyan-600 dark:text-cyan-400',
          borderHover: 'hover:border-cyan-300 dark:hover:border-cyan-700',
          badgeBg: 'bg-cyan-100/70 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300'
        };
      case 'amber':
        return {
          iconBg: 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-900/60',
          accentText: 'text-amber-600 dark:text-amber-400',
          borderHover: 'hover:border-amber-300 dark:hover:border-amber-700',
          badgeBg: 'bg-amber-100/70 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300'
        };
      case 'purple':
        return {
          iconBg: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/60',
          accentText: 'text-purple-600 dark:text-purple-400',
          borderHover: 'hover:border-purple-300 dark:hover:border-purple-700',
          badgeBg: 'bg-purple-100/70 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300'
        };
      case 'blue':
      default:
        return {
          iconBg: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-900/60',
          accentText: 'text-blue-600 dark:text-blue-400',
          borderHover: 'hover:border-blue-300 dark:hover:border-blue-700',
          badgeBg: 'bg-blue-100/70 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300'
        };
    }
  };

  const themeStyles = getThemeStyles(stat.colorTheme);

  const renderIcon = () => {
    if (stat.customIcon) {
      const IconComponent = stat.customIcon;
      return <IconComponent className="w-6 h-6" />;
    }

    switch (stat.iconName) {
      case 'Building2':
        return <Building2 className="w-6 h-6" />;
      case 'Pill':
        return <Pill className="w-6 h-6" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6" />;
      case 'Store':
        return <Store className="w-6 h-6" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <TrendingUp className="w-6 h-6" />;
    }
  };

  return (
    <div
      ref={cardRef}
      id={`stats-card-${stat.id || index}`}
      className={`group relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${themeStyles.borderHover} overflow-hidden`}
    >
      {/* Background soft ambient gradient on hover */}
      <div className="absolute -top-12 -right-12 w-28 h-28 rounded-full bg-slate-100 dark:bg-slate-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none blur-2xl" />

      <div>
        {/* Top bar: Icon + Key metric pill */}
        <div className="flex items-center justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-sm ${themeStyles.iconBg}`}
          >
            {renderIcon()}
          </div>
          <span
            className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${themeStyles.badgeBg}`}
          >
            Indicateur clé
          </span>
        </div>

        {/* Counter Number */}
        <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight flex items-baseline gap-0.5">
          {stat.prefix && <span className={themeStyles.accentText}>{stat.prefix}</span>}
          <AnimatedNumber value={stat.value} duration={1800 + index * 150} inView={inView} />
          {stat.suffix && <span className={themeStyles.accentText}>{stat.suffix}</span>}
        </div>

        {/* Label */}
        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 mt-2 line-clamp-1">
          {stat.label}
        </h3>
      </div>

      {/* Description */}
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 pt-3">
        {stat.description}
      </p>
    </div>
  );
};

export interface StatsCardsProps {
  stats?: StatCardData[] | StatItem[];
  title?: string;
  subtitle?: string;
  badge?: string;
  className?: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  title = 'Les chiffres clés de notre performance médicale',
  subtitle = 'Une force de frappe opérationnelle au service des laboratoires et des professionnels de santé.',
  badge = 'Impact & Présence',
  className = ''
}) => {
  // Normalize stats input to ensure required data for animated display
  const itemsToRender: StatCardData[] = React.useMemo(() => {
    if (stats && stats.length > 0) {
      return stats.map((s, idx) => {
        // If it's already a StatCardData
        if ('colorTheme' in s) {
          return s as StatCardData;
        }
        // If it's StatItem from types
        const rawStat = s as StatItem;
        const colorThemes: ('blue' | 'emerald' | 'cyan' | 'amber' | 'purple')[] = [
          'blue',
          'emerald',
          'cyan',
          'amber',
          'purple'
        ];
        return {
          id: rawStat.id,
          value: rawStat.value,
          suffix: rawStat.suffix,
          label: rawStat.label,
          description: rawStat.description,
          iconName: rawStat.iconName,
          colorTheme: colorThemes[idx % colorThemes.length]
        };
      });
    }
    return DEFAULT_STATS;
  }, [stats]);

  return (
    <section id="stats-cards-section" className={`w-full max-w-7xl mx-auto px-4 sm:px-8 ${className}`}>
      {/* Header with Title & Badge */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2.5">
        {badge && (
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 inline-block">
            {badge}
          </span>
        )}
        {title && (
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      {/* Grid of 5 Key Indicator Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        {itemsToRender.map((stat, idx) => (
          <SingleStatCard key={stat.id || `stat-${idx}`} stat={stat} index={idx} />
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
