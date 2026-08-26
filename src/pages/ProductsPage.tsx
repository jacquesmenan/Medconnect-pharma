import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  RotateCcw,
  Pill,
  ShieldCheck,
  ChevronDown,
  X
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ProductCard } from '../components/ProductCard';
import { Pagination } from '../components/Pagination';
import { ApiService } from '../services/api';
import { Product, Laboratory } from '../types';

interface ProductsPageProps {
  initialSearch?: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialSearch = '',
  onNavigate,
  onOpenQuickView
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [laboratories, setLaboratories] = useState<Laboratory[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLab, setSelectedLab] = useState<string>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name-asc' | 'name-desc' | 'category' | 'recent'>('name-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const [prods, labs] = await Promise.all([
        ApiService.getProducts(),
        ApiService.getLaboratories()
      ]);
      setProducts(prods);
      setLaboratories(labs);
      setLoading(false);
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ['all', ...Array.from(set)];
  }, [products]);

  // Filter & Search Logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.genericName.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.laboratoryName.toLowerCase().includes(q) ||
          p.therapeuticClass.toLowerCase().includes(q) ||
          p.indications.some((ind) => ind.toLowerCase().includes(q))
      );
    }

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedLab !== 'all') {
      list = list.filter((p) => p.laboratoryId === selectedLab);
    }

    if (selectedPrescription !== 'all') {
      const isReq = selectedPrescription === 'required';
      list = list.filter((p) => p.prescriptionRequired === isReq);
    }

    if (sortBy === 'name-asc') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      list.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'category') {
      list.sort((a, b) => a.category.localeCompare(b.category));
    }

    return list;
  }, [products, searchQuery, selectedCategory, selectedLab, selectedPrescription, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedLab('all');
    setSelectedPrescription('all');
    setSortBy('name-asc');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedCategory !== 'all' ||
    selectedLab !== 'all' ||
    selectedPrescription !== 'all';

  return (
    <div id="products-page" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <Breadcrumb items={[{ label: 'Catalogue Médicaments', active: true }]} onNavigate={onNavigate} />

      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
            Catalogue Médical
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Médicaments & Thérapeutiques
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Consultez les monographies officielles, indications, posologies et notices des spécialités représentées.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-900">{filteredProducts.length}</span> produit(s) trouvé(s)
        </div>
      </section>

      {/* Search & Top Controls */}
      <section className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Rechercher par nom de marque, molécule (DCI), indication..."
            className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Controls: Sort, View, Mobile filter toggle */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-end">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtres</span>
            {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-sky-600"></span>}
          </button>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden sm:inline">Trier :</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            >
              <option value="name-asc">Nom (A - Z)</option>
              <option value="name-desc">Nom (Z - A)</option>
              <option value="category">Spécialité Thérapeutique</option>
            </select>
          </div>

          {/* Grid / List Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label="Vue grille"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label="Vue liste"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Active filters badges bar */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400 font-medium">Filtres actifs :</span>
          {searchQuery && (
            <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Recherche : "{searchQuery}"
              <button type="button" onClick={() => setSearchQuery('')}>
                <X className="w-3 h-3 text-sky-600" />
              </button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Spécialité : {selectedCategory}
              <button type="button" onClick={() => setSelectedCategory('all')}>
                <X className="w-3 h-3 text-sky-600" />
              </button>
            </span>
          )}
          {selectedLab !== 'all' && (
            <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Laboratoire : {laboratories.find((l) => l.id === selectedLab)?.name}
              <button type="button" onClick={() => setSelectedLab('all')}>
                <X className="w-3 h-3 text-sky-600" />
              </button>
            </span>
          )}
          {selectedPrescription !== 'all' && (
            <span className="bg-sky-50 text-sky-800 border border-sky-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
              Statut : {selectedPrescription === 'required' ? 'Sur ordonnance' : 'Conseil officine'}
              <button type="button" onClick={() => setSelectedPrescription('all')}>
                <X className="w-3 h-3 text-sky-600" />
              </button>
            </span>
          )}
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 flex items-center gap-1 ml-2"
          >
            <RotateCcw className="w-3 h-3" /> Réinitialiser tous les filtres
          </button>
        </div>
      )}

      {/* Main Content Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar Filters (Desktop + Mobile Drawer) */}
        <aside
          className={`lg:col-span-3 space-y-6 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm ${
            showMobileFilters ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-sky-600" /> Filtres Thérapeutiques
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[11px] text-sky-600 font-semibold hover:underline"
              >
                Effacer
              </button>
            )}
          </div>

          {/* 1. Spécialités / Catégories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Spécialité Médicale
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    selectedCategory === cat
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat === 'all' ? 'Toutes les spécialités' : cat}</span>
                  {cat !== 'all' && (
                    <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                      {products.filter((p) => p.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Laboratoires */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Laboratoire Titulaire
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedLab('all');
                  setCurrentPage(1);
                }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  selectedLab === 'all'
                    ? 'bg-sky-50 text-sky-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                Tous les laboratoires ({laboratories.length})
              </button>
              {laboratories.map((lab) => (
                <button
                  key={lab.id}
                  type="button"
                  onClick={() => {
                    setSelectedLab(lab.id);
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    selectedLab === lab.id
                      ? 'bg-sky-50 text-sky-700 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="line-clamp-1">{lab.name}</span>
                  <span className="text-[10px] text-slate-400">{lab.flag}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Statut de Prescription */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Cadre de Délivrance
            </label>
            <div className="space-y-1.5 text-xs text-slate-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="prescription"
                  checked={selectedPrescription === 'all'}
                  onChange={() => {
                    setSelectedPrescription('all');
                    setCurrentPage(1);
                  }}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <span>Tous les médicaments</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="prescription"
                  checked={selectedPrescription === 'required'}
                  onChange={() => {
                    setSelectedPrescription('required');
                    setCurrentPage(1);
                  }}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <span>Sur Ordonnance (Liste I / II)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="prescription"
                  checked={selectedPrescription === 'otc'}
                  onChange={() => {
                    setSelectedPrescription('otc');
                    setCurrentPage(1);
                  }}
                  className="text-sky-600 focus:ring-sky-500"
                />
                <span>Conseil Officinal / OTC</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Right Area: Products Grid / List */}
        <main className="lg:col-span-9 space-y-6">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
              <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
                <Pill className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Aucun produit ne correspond à vos critères</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Veuillez élargir votre recherche ou réinitialiser les filtres appliqués pour afficher l'ensemble des spécialités.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-md transition-colors"
              >
                Réinitialiser la recherche
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onSelect={(id) => onNavigate('product-detail', id)}
                  onQuickView={onOpenQuickView}
                />
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-4">
              {paginatedProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 hover:border-sky-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-semibold text-sky-800 bg-sky-50 px-2 py-0.5 rounded-md">
                          {prod.category}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {prod.laboratoryName}
                        </span>
                      </div>
                      <h3
                        onClick={() => onNavigate('product-detail', prod.id)}
                        className="font-bold text-slate-900 hover:text-sky-600 cursor-pointer text-base"
                      >
                        {prod.name}
                      </h3>
                      <p className="text-xs text-slate-500 italic mt-0.5">
                        {prod.genericName} • {prod.dosage} ({prod.galenicForm})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => onOpenQuickView(prod)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                    >
                      Aperçu
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('product-detail', prod.id)}
                      className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-colors"
                    >
                      Monographie
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 200, behavior: 'smooth' });
            }}
          />
        </main>
      </div>
    </div>
  );
};
