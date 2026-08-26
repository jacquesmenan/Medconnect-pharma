import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';

interface LegalPageProps {
  onNavigate: (page: string, param?: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ onNavigate }) => {
  return (
    <div id="legal-page" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      <Breadcrumb items={[{ label: 'Mentions Légales & Réglementation', active: true }]} onNavigate={onNavigate} />

      <section className="space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100">
          Informations Juridiques
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Mentions Légales & Charte de la Visite Médicale
        </h1>
        <p className="text-xs text-slate-400">Édition conforme aux textes légaux en vigueur (2026)</p>
      </section>

      <article className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 space-y-6 leading-relaxed bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">1. Éditeur du Site</h2>
          <p>
            Le site <strong>medconnect-pharma.com</strong> est édité par la société <strong>MedConnect Pharma SAS</strong>, Société par Actions Simplifiée au capital social de 500 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris sous le numéro B 512 849 103.
          </p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-600">
            <li><strong>Siège social :</strong> 45 Avenue des Champs-Élysées, 75008 Paris, France.</li>
            <li><strong>Téléphone :</strong> +33 (0)1 42 68 00 00</li>
            <li><strong>Directeur de la Publication :</strong> Dr. Alexandre Laurent, Président du Directoire.</li>
            <li><strong>Pharmacien Responsable :</strong> Dr. Éléonore Mercier, Directrice des Affaires Pharmaceutiques.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">2. Hébergement du Site</h2>
          <p>
            Le site est hébergé sur des serveurs sécurisés certifiés HDS (Hébergeur de Données de Santé) par Cloud Infrastructure Europe, SAS au capital de 1 000 000 €, dont le siège est situé à Paris, France.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">3. Cadre Déontologique & Charte de la Visite Médicale</h2>
          <p>
            MedConnect Pharma adhère pleinement à la <strong>Charte de l'Information par Démarchage ou Prospection visant à la Promotion des Médicaments</strong> signée entre le LEEM et le CEPS, et certifiée par la Haute Autorité de Santé (HAS).
          </p>
          <p className="mt-2">
            Tous nos délégués médicaux et pharmaceutiques sont titulaires du diplôme agréé de la visite médicale (ou équivalent docteur en médecine / pharmacie) et reçoivent une formation continue stricte sur les Résumés des Caractéristiques du Produit (RCP) validés par l’ANSM et l’Agence Européenne des Médicaments (EMA).
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Avertissement Médical et Absence de Conseil Personnalisé</h2>
          <p>
            Les informations scientifiques et monographies publiées sur ce portail sont destinées exclusivement aux professionnels de santé habilités à prescrire ou délivrer des médicaments (médecins, chirurgiens-dentistes, pharmaciens, sages-femmes). Elles ne sauraient en aucun cas constituer une consultation médicale ou se substituer au diagnostic d’un praticien.
          </p>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">5. Propriété Intellectuelle</h2>
          <p>
            L'ensemble des marques, dénominations commerciales, logos, textes et visuels de conditionnement pharmaceutique reproduits sur ce site sont la propriété exclusive de MedConnect Pharma ou des laboratoires partenaires titulaires de leurs droits respectifs. Toute reproduction sans autorisation préalable expresse est strictement interdite.
          </p>
        </div>
      </article>
    </div>
  );
};
