import React, { useState, useEffect } from 'react';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { RequestMeetingModal } from './components/RequestMeetingModal';
import { WhatsAppButton } from './components/WhatsAppButton';
import { CookieBanner } from './components/CookieBanner';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { LaboratoriesPage } from './pages/LaboratoriesPage';
import { LaboratoryDetailPage } from './pages/LaboratoryDetailPage';
import { NewsPage } from './pages/NewsPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { CareersPage } from './pages/CareersPage';
import { FaqPage } from './pages/FaqPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { LegalPage } from './pages/LegalPage';

import { Product } from './types';
import { usePageSeo } from './hooks/usePageSeo';

export function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);

  // Automatically inject and update dynamic SEO meta tags in <head>
  usePageSeo(currentPage, pageParam);

  // Modals
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingDefaultTopic, setMeetingDefaultTopic] = useState('');

  const navigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const handleCloseQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleOpenMeetingModal = (topic?: string) => {
    setMeetingDefaultTopic(topic || '');
    setIsMeetingModalOpen(true);
  };

  const handleCloseMeetingModal = () => {
    setIsMeetingModalOpen(false);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigate}
            onOpenQuickView={handleOpenQuickView}
            onRequestMeeting={handleOpenMeetingModal}
          />
        );
      case 'about':
        return (
          <AboutPage
            onNavigate={navigate}
            onRequestMeeting={handleOpenMeetingModal}
          />
        );
      case 'services':
        return (
          <ServicesPage
            initialServiceId={pageParam}
            onNavigate={navigate}
            onRequestMeeting={handleOpenMeetingModal}
          />
        );
      case 'products':
        return (
          <ProductsPage
            initialSearch={pageParam}
            onNavigate={navigate}
            onOpenQuickView={handleOpenQuickView}
          />
        );
      case 'product-detail':
        return (
          <ProductDetailPage
            productId={pageParam || 'prod-1'}
            onNavigate={navigate}
            onOpenQuickView={handleOpenQuickView}
            onRequestMeeting={handleOpenMeetingModal}
          />
        );
      case 'laboratories':
        return <LaboratoriesPage onNavigate={navigate} />;
      case 'laboratory-detail':
        return (
          <LaboratoryDetailPage
            labId={pageParam || 'lab-1'}
            onNavigate={navigate}
            onOpenQuickView={handleOpenQuickView}
            onRequestMeeting={handleOpenMeetingModal}
          />
        );
      case 'news':
        return <NewsPage onNavigate={navigate} />;
      case 'article-detail':
        return (
          <ArticleDetailPage
            articleId={pageParam || 'art-1'}
            onNavigate={navigate}
          />
        );
      case 'contact':
        return (
          <ContactPage
            initialSubject={pageParam}
            onNavigate={navigate}
          />
        );
      case 'careers':
        return <CareersPage onNavigate={navigate} />;
      case 'faq':
        return (
          <FaqPage
            onNavigate={navigate}
            onRequestMeeting={() => handleOpenMeetingModal()}
          />
        );
      case 'privacy':
        return <PrivacyPage onNavigate={navigate} />;
      case 'legal':
        return <LegalPage onNavigate={navigate} />;
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onOpenQuickView={handleOpenQuickView}
            onRequestMeeting={handleOpenMeetingModal}
          />
        );
    }
  };

  return (
    <ThemeProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#080e1a] text-slate-800 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white transition-colors duration-200">
          {/* Global Navigation Header */}
          <Header
            currentPage={currentPage}
            onNavigate={navigate}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            onRequestMeeting={() => handleOpenMeetingModal()}
          />

          {/* Mobile Navigation Drawer */}
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            currentPage={currentPage}
            onNavigate={navigate}
            onOpenSearch={() => setIsSearchModalOpen(true)}
          />

          {/* Main Routed Page Content */}
          <main className="flex-1 w-full">{renderPage()}</main>

          {/* Global Footer */}
          <Footer onNavigate={navigate} />

          {/* Global Instant Search Modal (Cmd+K / Search button) */}
          <GlobalSearchModal
            isOpen={isSearchModalOpen}
            onClose={() => setIsSearchModalOpen(false)}
            onNavigate={navigate}
            onOpenQuickView={handleOpenQuickView}
          />

          {/* Product Fast Quick View Modal */}
          <ProductQuickViewModal
            product={quickViewProduct}
            isOpen={!!quickViewProduct}
            onClose={handleCloseQuickView}
            onViewFullDetails={(prodId) => navigate('product-detail', prodId)}
            onNavigateToLab={(labId) => navigate('laboratory-detail', labId)}
          />

          {/* Medical Meeting Booking Modal */}
          <RequestMeetingModal
            isOpen={isMeetingModalOpen}
            onClose={handleCloseMeetingModal}
            defaultServiceTitle={meetingDefaultTopic}
          />

          {/* Floating WhatsApp Action Button */}
          <WhatsAppButton />

          {/* RGPD Cookie Banner */}
          <CookieBanner onNavigateToPrivacy={() => navigate('privacy')} />
        </div>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
