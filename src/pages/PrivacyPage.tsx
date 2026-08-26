import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Database } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

interface PrivacyPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  return (
    <div id="privacy-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Politique de Confidentialité & RGPD', active: true }]} onNavigate={onNavigate} />

      <section className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Protection des Données Personnelles
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Politique de Confidentialité & RGPD
        </h1>
        <p className="text-xs text-slate-400">Dernière mise à jour : 1er Février 2026</p>
      </section>

      <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">1. Préambule et Engagement</h2>
          <p>
            MedConnect Pharma SAS (« nous », « notre ») accorde la plus haute importance à la confidentialité et à la sécurité des données à caractère personnel de ses utilisateurs, praticiens de santé, pharmaciens, partenaires laboratoires et candidats. La présente Politique de Confidentialité décrit la manière dont nous collectons, traitons et protégeons vos données conformément au Règlement Général sur la Protection des Données (RGPD n° 2016/679) et à la Loi Informatique et Libertés modifiée.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">2. Données Collectées</h2>
          <p>Dans le cadre de nos activités de promotion médicale et d’information scientifique, nous sommes susceptibles de collecter :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
            <li><strong>Données d'identification :</strong> Nom, prénom, profession de santé (RPPS ou numéro d’ordre), adresse d’exercice, établissement de rattachement.</li>
            <li><strong>Données de contact :</strong> Adresse email professionnelle, numéro de téléphone professionnel, adresse postale du cabinet ou de l’officine.</li>
            <li><strong>Historique d'échanges :</strong> Demandes de rendez-vous avec nos délégués médicaux, participation à des symposiums ou séminaires de formation médicale continue.</li>
            <li><strong>Données de navigation :</strong> Adresse IP anonymisée, cookies techniques nécessaires au fonctionnement du portail.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">3. Finalités des Traitements</h2>
          <p>Vos données sont traitées pour des finalités strictement définies et légitimes :</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
            <li>Organisation et planification des visites médicales et pharmaceutiques en présentiel ou à distance.</li>
            <li>Envoi d'informations scientifiques, monographies produits et convocations aux sessions de formation médicale continue (avec votre consentement).</li>
            <li>Gestion des obligations de pharmacovigilance et de traçabilité imposées par les autorités de santé (ANSM, EMA).</li>
            <li>Traitement des candidatures et recrutement des délégués médicaux et scientifiques.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Durée de Conservation des Données</h2>
          <p>
            Les données relatives aux professionnels de santé sont conservées pendant la durée de la relation contractuelle ou professionnelle, puis archivées conformément aux obligations réglementaires (3 ans à compter du dernier contact pour les prospections scientifiques). Les données de pharmacovigilance sont conservées selon les durées légales obligatoires (jusqu'à 10 ans après expiration de l'AMM).
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">5. Vos Droits & Contact DPO</h2>
          <p>
            Conformément à la réglementation, vous bénéficiez d'un droit d'accès, de rectification, d'effacement, de limitation du traitement et de portabilité de vos données. Vous pouvez exercer ces droits à tout moment en contactant notre Délégué à la Protection des Données (DPO) :
          </p>
          <div className="mt-3 p-4 bg-sky-50 rounded-xl border border-sky-100 text-sky-950 font-medium">
            Email : <strong>dpo@medconnectpharma.com</strong><br />
            Courrier : MedConnect Pharma SAS - DPO, Abidjan Cocody, Côte d'Ivoire.
          </div>
        </div>
      </article>
    </div>
  );
};
