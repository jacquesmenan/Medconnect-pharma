import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldAlert,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ApiService } from '../services/api';
import { useToast } from '../context/ToastContext';

interface ContactPageProps {
  initialSubject?: string;
  onNavigate: (page: string, param?: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialSubject, onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    profession: 'Médecin Prescripteur',
    organization: '',
    type: initialSubject === 'laboratoire' || initialSubject === 'partenariat_labo' ? 'partenariat' : 'general',
    subject: initialSubject ? `Contact relatif à ${initialSubject}` : '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

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
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        profession: 'Médecin Prescripteur',
        organization: '',
        type: 'general',
        subject: '',
        message: ''
      });
    } catch {
      error('Une erreur est survenue lors de l’envoi de votre message.');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent('Bonjour MedConnect Pharma, je souhaite échanger au sujet de vos services et spécialités pharmaceutiques.');
    window.open(`https://wa.me/33142680000?text=${text}`, '_blank');
  };

  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Contact & Prise de RDV', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          À Votre Écoute
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Contactez MedConnect Pharma
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Praticiens, pharmaciens, directeurs de laboratoires ou partenaires : notre équipe dédiée est à votre disposition pour vous orienter et planifier nos interventions.
        </p>
      </section>

      {/* Pharmacovigilance Alert Strip */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-amber-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <strong className="font-bold block">Pharmacovigilance & Signalement d'Effets Indésirables :</strong>
            <span>Ligne d'urgence 24/7 : <strong>+33 (0)1 42 68 00 99</strong> ou par email à <strong>pharmacovigilance@medconnectpharma.com</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Info Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Envoyez-nous un message</h2>
            <p className="text-xs text-slate-500 mt-1">Remplissez ce formulaire et notre responsable régional vous recontactera sous 24h ouvrées.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Dr. Jean Dupont"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email professionnel *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="docteur@clinique.fr"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Téléphone de contact</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 6 12 34 56 78"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Profession / Rôle</label>
                <select
                  value={formData.profession}
                  onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
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
                <label className="block font-semibold text-slate-700 mb-1">Établissement / Structure</label>
                <input
                  type="text"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="Cabinet, Pharmacie de Paris, CHU..."
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Motif de la demande *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
                >
                  <option value="rdv_delegue">Demande de RDV Délégué Médical</option>
                  <option value="partenariat">Partenariat / Déploiement Laboratoire</option>
                  <option value="information_produit">Information scientifique / RCP Produit</option>
                  <option value="pharmacovigilance">Notification Pharmacovigilance</option>
                  <option value="general">Renseignement Général</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Objet</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Ex : Présentation gamme Cardiologie / Demande documentation..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Votre message *</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Précisez votre demande, vos disponibilités ou les molécules d'intérêt..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-slate-50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-slate-400 text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Envoi en cours...' : 'Envoyer le message'}</span>
            </button>
          </form>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coordinates */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
            <h3 className="font-bold text-slate-900 text-base">Coordonnées du Siège</h3>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Adresse principale :</strong>
                  <span>45 Avenue des Champs-Élysées, 75008 Paris, France</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Standard Téléphonique :</strong>
                  <span>+33 (0)1 42 68 00 00</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Courriel Direction & Médical :</strong>
                  <span>contact@medconnectpharma.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900">Horaires d'Ouverture :</strong>
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
