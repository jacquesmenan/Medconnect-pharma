import React from 'react';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onSelect: (articleId: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onSelect }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Actualité Pharmaceutique':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Événement':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Formation Médicale':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Innovation':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <article
      id={`news-card-${article.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Image & Category Tag */}
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shadow-sm ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {article.publicationDate}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(article.id)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug line-clamp-2"
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>

        {/* Footer & Author */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs text-slate-600 font-medium">{article.author.name}</span>
          </div>

          <button
            type="button"
            onClick={() => onSelect(article.id)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 group/btn"
          >
            <span>Lire</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
};
