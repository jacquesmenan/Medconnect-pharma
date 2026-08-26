import React, { useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldAlert,
  Save,
  RotateCcw
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ApiService } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useLocalStorageForm } from '../hooks/useLocalStorageForm';
import { ContactFormData } from '../types';

interface ContactPageProps {
  initialSubject?: string;
  onNavigate: (page: string, param?: string) => void;
}

const CONTACT_STORAGE_KEY = 'medconnect_contact_draft_v1';

export const ContactPage: React.FC<ContactPageProps> = ({ initialSubject, onNavigate }) => {
  const initialContactValues: ContactFormData = {
    fullName: '',
    email: '',
    phone: '',
    profession: 'Médecin Prescripteur',
    organization: '',
    type: (initialSubject === 'laboratoire' || initialSubject === 'partenariat_labo') ? 'laboratoire' : 'general',
    subject: initialSubject ? `Contact relatif à ${initialSubject}` : '',
    message: ''
  };

  const {
    formData,
    setFormData,
    hasDraft,
    clearDraft,
    resetForm
  } = useLocalStorageForm<ContactFormData>(CONTACT_STORAGE_KEY, initialContactValues);

  const [loading, setLoading] = React.useState(false);
  const { success, error, info } = useToast();

  // If initialSubject changes, update subject and type if currently blank
  useEffect(() => {
    if (initialSubject) {
      setFormData((prev) => ({
        ...prev,
        type: (initialSubject === 'laboratoire' || initialSubject === 'partenariat_labo') ? 'laboratoire' : (prev.type || 'general'),
        subject: prev.subject || `Contact relatif à ${initialSubject}`
      }));
    }
  }, [initialSubject, setFormData]);

  const handleClearDraft = () => {
    clearDraft();
    info('Brouillon effacé.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.message) {
      error('Veuillez renseigner les champs obligatoires (*).');
      return;
    }

    try {
      setLoading(true);
      await ApiService.submitContact(formData);
      success('Votre message a été transmis avec succès. Notre équipe médicale vous répondra dans les plus brefs délais.');
      
      resetForm();
    } catch {
      error('Une erreur est survenue lors de l’envoi de votre message.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('Bonjour MedConnect Pharma, je souhaite échanger au sujet de vos services et spécialités pharmaceutiques.');
    window.open(`https://wa.me/2250150215202?text=${text}`, '_blank');
  };

  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Contact & Prise de RDV', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-3.5 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 inline-block">
          À Votre Écoute
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          Contactez MedConnect Pharma
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          Praticiens, pharmaciens, directeurs de laboratoires ou partenaires : notre équipe dédiée est à votre disposition pour vous orienter et planifier nos interventions.
        </p>
      </section>

      {/* Pharmacovigilance Alert Strip */}
      <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/60 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <strong className="font-bold block">Pharmacovigilance & Signalement d'Effets Indésirables :</strong>
            <span>Ligne d'urgence 24/7 : <strong>+225 01 50 21 52 02</strong> ou par email à <strong>pharmacovigilance@medconnectpharma.com</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Envoyez-nous un message</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Remplissez ce formulaire et notre responsable régional vous recontactera sous 24h ouvrées.</p>
            </div>
            {hasDraft && (
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                  <Save className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> Auto-sauvegardé
                </span>
                <button
                  type="button"
                  onClick={handleClearDraft}
                  title="Réinitialiser le formulaire et effacer la sauvegarde"
                  className="text-slate-400 dark:text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Dr. Jean Dupont"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Email professionnel *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="docteur@clinique.ci"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Téléphone de contact</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+225 01 50 21 52 02"
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Profession / Rôle</label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Médecin Prescripteur">Médecin Spécialiste / Généraliste</option>
                  <option value="Pharmacien d'Officine">Pharmacien Titulaire / Adjoint</option>
                  <option value="Praticien Hospitalier">Praticien Hospitalier / Chef de Clinique</option>
                  <option value="Représentant Laboratoire">Direction Laboratoire Pharmaceutique</option>
                  <option value="Autre Professionnel">Autre Professionnel de Santé</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Établissement / Structure</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Cabinet, Pharmacie, Polyclinique, CHU..."
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Motif de la demande *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ContactFormData['type'] })}
                  className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="rdv_delegue">Demande de RDV Délégué Médical</option>
                  <option value="laboratoire">Partenariat / Déploiement Laboratoire</option>
                  <option value="pharmacovigilance">Notification Pharmacovigilance</option>
                  <option value="general">Renseignement Général & Information Produit</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Objet</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Ex : Présentation gamme Cardiologie / Demande documentation..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-200 mb-1">Votre message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Précisez votre demande, vos disponibilités ou les molécules d'intérêt..."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Envoi en cours...' : 'Envoyer le message'}</span>
            </button>
          </form>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coordinates */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Coordonnées du Siège</h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Adresse principale :</strong>
                  <span>Abidjan Cocody, Côte d'Ivoire</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Standard Téléphonique :</strong>
                  <span>+225 01 50 21 52 02</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Courriel Direction & Médical :</strong>
                  <span>contact@medconnectpharma.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 dark:text-white">Horaires d'Ouverture :</strong>
                  <span>Du lundi au vendredi : 08h30 - 18h30</span>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Chat Card */}
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 border border-emerald-900 shadow-xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-lg text-white">Échange Direct via WhatsApp</h4>
            <p className="text-xs text-emerald-200 leading-relaxed">
              Besoin d'une réponse rapide pour la visite d'un délégué ou une information de stock ? Contactez notre permanence WhatsApp officielle.
            </p>
            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ouvrir la discussion WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

