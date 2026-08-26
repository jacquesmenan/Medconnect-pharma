import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, Send, FileText, Sparkles } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { useToast } from '../context/ToastContext';

interface CareersPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateMessage, setCandidateMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { success, error } = useToast();

  const jobs = [
    {
      id: 'job-1',
      title: 'Délégué Médical Hospitalier - Spécialité Cardiologie / Métabolisme',
      location: 'Île-de-France & Nord (Paris, Lille)',
      type: 'CDI - Temps Plein',
      department: 'Visite Médicale Hospitalière',
      experience: '3 ans minimum en visite hospitalière',
      description:
        'Sous la responsabilité du Directeur Régional des Ventes, vous assurez la promotion scientifique de notre gamme de cardiologie innovante auprès des chefs de service et praticiens hospitaliers (CHU, cliniques privées).',
      missions: [
        'Organiser et animer les réunions scientifiques et staffs de service hospitaliers.',
        'Développer et fidéliser un réseau d’experts et de leaders d’opinion (KOL).',
        'Assurer le reporting d’activité et la veille concurrentielle sur votre secteur.',
        'Participer aux congrès nationaux et régionaux de cardiologie.'
      ]
    },
    {
      id: 'job-2',
      title: 'Délégué Pharmaceutique / Officine - Gamme Dermatologie & OTC',
      location: 'Région Sud-Est (Lyon, Marseille, Nice)',
      type: 'CDI - Temps Plein',
      department: 'Réseau Officine',
      experience: '2 ans en réseau officinal',
      description:
        'Vous développez le chiffre d’affaires et la visibilité de nos gammes dermatologiques auprès d’un portefeuille de 180 pharmacies d’officine.',
      missions: [
        'Négocier les référencements et implantations de gammes en officine.',
        'Former les équipes officinales (pharmaciens et préparateurs) au conseil patient.',
        'Optimiser le merchandising et la mise en avant sur le point de vente.',
        'Suivre les commandes et veiller à la disponibilité continue des stocks.'
      ]
    },
    {
      id: 'job-3',
      title: 'Pharmacien Affaires Réglementaires & Pharmacovigilance',
      location: 'Siège social (Paris 8e) avec télétravail partiel',
      type: 'CDI - Temps Plein',
      department: 'Affaires Réglementaires',
      experience: 'Docteur en Pharmacie (PharmD) + 3 ans d’expérience',
      description:
        'Vous pilotez les dossiers d’enregistrement AMM, les variations, le contrôle de la publicité pharmaceutique et le système de pharmacovigilance.',
      missions: [
        'Rédiger et déposer les dossiers d’AMM et de renouvellement auprès des autorités sanitaires.',
        'Valider les supports promotionnels conformément aux recommandations de l’ANSM.',
        'Assurer la gestion opérationnelle de la pharmacovigilance (déclaration des cas, PSUR).',
        'Coordonner les relations réglementaires avec les laboratoires partenaires internationaux.'
      ]
    }
  ];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail || !candidatePhone) {
      error('Veuillez remplir vos coordonnées complètes.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      success('Votre candidature a bien été transmise à notre Direction des Ressources Humaines. Nous vous recontacterons très vite.');
      setCandidateName('');
      setCandidateEmail('');
      setCandidatePhone('');
      setCandidateMessage('');
      setSelectedJob(null);
    }, 800);
  };

  return (
    <div id="careers-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-12">
      <Breadcrumb items={[{ label: 'Rejoindre nos équipes / Carrières', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Rejoignez MedConnect Pharma
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Donnez du sens à votre carrière médicale
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Nous recrutons des talents animés par la rigueur scientifique, l'excellence relationnelle et l'ambition de transformer la promotion pharmaceutique.
        </p>
      </section>

      {/* Job Openings List */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Nos Opportunités de Carrière Actuelles</h2>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow space-y-4"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[11px] font-bold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                    {job.department}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 mt-2">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400" /> {job.type}
                    </span>
                    <span>•</span>
                    <span className="text-slate-700 font-medium">Expérience : {job.experience}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedJob(job.title)}
                  className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-colors shrink-0 self-start md:self-auto"
                >
                  Postuler à cette offre
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{job.description}</p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Missions Principales :
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {job.missions.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Candidature Spontanée / Apply Form */}
      <section className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Recrutement & Talents</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            {selectedJob ? `Postuler pour : ${selectedJob}` : 'Candidature Spontanée'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Délégué médical expérimenté, jeune diplômé en pharmacie ou expert réglementaire ? Rejoignez notre vivier de talents.
          </p>
        </div>

        <form onSubmit={handleApply} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div>
            <label className="block text-slate-300 font-medium mb-1">Nom & Prénom *</label>
            <input
              type="text"
              required
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              placeholder="Dr. Paul Martin"
              className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Email *</label>
            <input
              type="email"
              required
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              placeholder="paul.martin@gmail.com"
              className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-medium mb-1">Téléphone *</label>
            <input
              type="tel"
              required
              value={candidatePhone}
              onChange={(e) => setCandidatePhone(e.target.value)}
              placeholder="+33 6 12 34 56 78"
              className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="sm:col-span-3">
            <label className="block text-slate-300 font-medium mb-1">
              Message, Diplômes et Motivations
            </label>
            <textarea
              rows={3}
              value={candidateMessage}
              onChange={(e) => setCandidateMessage(e.target.value)}
              placeholder="Précisez votre parcours (diplôme de visiteur médical, pharmacien, biologiste), vos régions cibles et vos disponibilités..."
              className="w-full p-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none"
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Transmission...' : 'Envoyer ma candidature'}</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};
