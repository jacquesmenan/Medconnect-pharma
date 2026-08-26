import React from 'react';
import { Eye, ArrowRight, ShieldCheck, FileText, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView
}) => {
  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-blue-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
    >
      {/* Image & Badges */}
      <div className="relative h-48 sm:h-52 bg-slate-50 overflow-hidden border-b border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
          <span className="text-[11px] font-semibold bg-white/95 backdrop-blur-sm text-blue-800 px-2.5 py-0.5 rounded-full shadow-sm border border-blue-100">
            {product.category}
          </span>
          {product.prescriptionRequired && (
            <span className="text-[10px] font-semibold bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-sm">
              Sur Ordonnance
            </span>
          )}
        </div>

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2 rounded-xl bg-white/95 hover:bg-white text-slate-700 hover:text-blue-600 shadow-md backdrop-blur-sm transition-all transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          title="Aperçu rapide"
          aria-label={`Aperçu rapide de ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Laboratory name */}
          <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-blue-500" />
            {product.laboratoryName}
          </p>

          {/* Product Name */}
          <h3
            onClick={() => onSelect(product.id)}
            className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 cursor-pointer transition-colors leading-snug"
          >
            {product.name}
          </h3>

          {/* DCI / Generic Name & Galenic */}
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
            <span className="italic font-medium text-slate-600">{product.genericName}</span>
            <span>•</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[11px]">
              {product.galenicForm}
            </span>
          </div>

          {/* Short description */}
          <p className="mt-3 text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-slate-400">
            {product.packaging}
          </span>
          <button
            type="button"
            onClick={() => onSelect(product.id)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 group/btn"
          >
            <span>Fiche Produit</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
