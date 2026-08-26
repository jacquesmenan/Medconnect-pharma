import React, { useEffect } from 'react';
import { X, Calendar, Save, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useToast } from '../context/ToastContext';
import { ApiService } from '../services/api';
import { useLocalStorageForm } from '../hooks/useLocalStorageForm';

interface RequestMeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultServiceTitle?: string;
}

const MEETING_STORAGE_KEY = 'medconnect_meeting_draft_v1';

export const RequestMeetingModal: React.FC<RequestMeetingModalProps> = ({
  isOpen,
  onClose,
  defaultServiceTitle = ''
}) => {
  const initialMeetingValues = {
    fullName: '',
    email: '',
    phone: '',
    profession: 'Médecin Spécialiste',
    organization: '',
    preferredDate: '',
    notes: '',
    serviceTopic: defaultServiceTitle
  };

  const {
    formData,
    setFormData,
    hasDraft,
    clearDraft,
    resetForm
  } = useLocalStorageForm(MEETING_STORAGE_KEY, initialMeetingValues);

  const [loading, setLoading] = React.useState(false);
  const { success, error, info } = useToast();

  // If defaultServiceTitle changes, update form data
  useEffect(() => {
    if (defaultServiceTitle) {
      setFormData((prev) => ({
        ...prev,
        serviceTopic: defaultServiceTitle
      }));
    }
  }, [defaultServiceTitle, setFormData]);

  if (!isOpen) return null;

  const handleClearDraft = () => {
    clearDraft();
    info('Brouillon effacé.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      error('Veuillez remplir les champs obligatoires (Nom, Email, Téléphone).');
      return;
    }

    try {
      setLoading(true);
      await ApiService.submitContact({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        profession: formData.profession,
        organization: formData.organization || 'Non précisé',
        subject: `Demande de RDV / Déploiement : ${formData.serviceTopic || 'Visite Délégué'}`,
        message: `Date souhaitée : ${formData.preferredDate || 'Dès que possible'}. Remarques : ${formData.notes}`,
        type: 'rdv_delegue'
      });
      success('Votre demande de rendez-vous a bien été enregistrée. Un délégué médical ou chargé de compte vous contactera sous 24h.');
      
      resetForm();
      onClose();
    } catch {
      error('Erreur lors de la prise de contact.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-blue-100" />
              </div>
              <div>
                <h3 className="font-bold text-base">Planifier un Rendez-Vous Médical</h3>
                <p className="text-xs text-blue-100">Visite médicale • Présentation de gamme • Conseil</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs sm:text-sm">
            {hasDraft && (
              <div className="flex items-center justify-between bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl px-3 py-1.5 text-[11px] text-emerald-800 dark:text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Save className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Progression auto-sauvegardée (localStorage)
                </span>
                <button
                  type="button"
                  onClick={handleClearDraft}
                  className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-semibold transition-colors"
                  title="Effacer le brouillon"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Effacer</span>
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Nom & Prénom *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Dr. Jean Dupont"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Profession *</label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Médecin Spécialiste">Médecin Spécialiste</option>
                  <option value="Médecin Généraliste">Médecin Généraliste</option>
                  <option value="Pharmacien Titulaire">Pharmacien Titulaire</option>
                  <option value="Praticien Hospitalier">Praticien Hospitalier / CHU</option>
                  <option value="Représentant Laboratoire">Représentant Laboratoire</option>
                  <option value="Autre Professionnel">Autre Professionnel de Santé</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Email Professionnel *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="docteur@clinique.fr"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Téléphone de contact *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+225 01 50 21 52 02"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Structure / Établissement</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Cabinet Médical, Clinique, Hôpital..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Date souhaitée (indicative)</label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Précisions ou Molécules d'intérêt</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Ex : Présentation de la gamme cardiologie, demande d'échantillons médicaux réglementaires, staff de service..."
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              />
            </div>

            {/* Submit buttons */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-xs sm:text-sm"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-400 text-white font-semibold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5"
              >
                {loading ? 'Validation en cours...' : 'Confirmer la demande'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

