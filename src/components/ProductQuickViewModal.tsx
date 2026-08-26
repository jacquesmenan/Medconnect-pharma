import React from 'react';
import { X, Check, Download, ExternalLink, ShieldCheck, AlertTriangle, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { useToast } from '../context/ToastContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onViewFullDetails: (productId: string) => void;
  onNavigateToLab: (labId: string) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onViewFullDetails,
  onNavigateToLab
}) => {
  const { info } = useToast();

  if (!product) return null;

  const handleDownloadNotice = () => {
    info(`Téléchargement de la fiche RCP / Notice pour « ${product.name} » démarré.`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-700 bg-white/80 backdrop-blur-sm rounded-full shadow-sm"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Col: Image & Quick Specs */}
            <div className="w-full md:w-5/12 bg-slate-50 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-100">
              <div className="w-full">
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-200 shadow-inner mb-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800">
                    {product.category}
                  </span>
                  <p className="text-xs text-slate-500 font-medium pt-2">
                    Conditionnement : <span className="text-slate-800">{product.packaging}</span>
                  </p>
                </div>
              </div>

              <div className="w-full pt-4 space-y-2">
                <button
                  type="button"
                  onClick={handleDownloadNotice}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Télécharger Notice / RCP
                </button>
              </div>
            </div>

            {/* Right Col: Details */}
            <div className="w-full md:w-7/12 p-6 overflow-y-auto space-y-4">
              <div>
                <button
                  type="button"
                  onClick={() => onNavigateToLab(product.laboratoryId)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 mb-1 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{product.laboratoryName}</span>
                </button>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                  {product.name}
                </h2>
                <p className="text-xs font-semibold text-slate-500 italic mt-0.5">
                  DCI : {product.genericName} • Dosage : {product.dosage}
                </p>
              </div>

              {/* Prescription status */}
              <div className="flex items-center gap-2 text-xs">
                {product.prescriptionRequired ? (
                  <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-medium border border-rose-200 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Prescription médicale obligatoire (Liste I)
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-medium border border-emerald-200 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Médicament conseil disponible en officine
                  </span>
                )}
              </div>

              {/* Summary Description */}
              <div className="text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                {product.fullDescription}
              </div>

              {/* Key Indications */}
              <div className="space-y-1.5 bg-blue-50/60 p-3.5 rounded-xl border border-blue-100">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  Principales Indications Thérapeutiques :
                </h4>
                <ul className="space-y-1 text-xs text-blue-950">
                  {product.indications.slice(0, 3).map((ind, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Posology overview */}
              <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl">
                <strong className="text-slate-900 block mb-0.5">Posologie usuelle :</strong>
                {product.posology}
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Fermer
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewFullDetails(product.id);
                  }}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                >
                  <span>Monographie complète</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
