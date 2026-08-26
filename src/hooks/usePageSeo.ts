import { useEffect } from 'react';
import {
  MetaTagsConfig,
  updateDocumentMetaTags,
  getRouteSeoConfig
} from '../utils/seo';

/**
 * Hook to apply custom meta tags directly
 */
export function useMetaTags(config: MetaTagsConfig): void {
  useEffect(() => {
    updateDocumentMetaTags(config);
  }, [
    config.title,
    config.description,
    config.canonical,
    config.image,
    config.type,
    config.robots,
    config.twitterCard
  ]);
}

/**
 * Hook that listens to route changes and automatically updates
 * document head meta tags (Title, Description, Canonical, OG, Twitter, JSON-LD)
 */
export function usePageSeo(currentPage: string, pageParam?: string): void {
  useEffect(() => {
    const seoConfig = getRouteSeoConfig(currentPage, pageParam);
    updateDocumentMetaTags(seoConfig);
  }, [currentPage, pageParam]);
}

export default usePageSeo;
