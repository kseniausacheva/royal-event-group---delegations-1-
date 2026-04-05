import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../LanguageContext';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  noindex?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, image, noindex }) => {
  const { language } = useLanguage();
  const location = useLocation();

  const siteTitle = 'Royal Event Group';
  const siteUrl = 'https://www.royaleventandmice.com';

  const defaultDescription = language === 'ru'
    ? 'Royal Event Group — MICE-мероприятия полного цикла в Египте, ОАЭ и России. 20+ лет опыта на Ближнем Востоке.'
    : 'Royal Event Group — Full-cycle MICE events in Egypt, UAE, and Russia. 20+ years of experience in the Middle East.';

  const defaultKeywords = language === 'ru'
    ? 'MICE, организация мероприятий, корпоративы, Египет, ОАЭ, Россия, Royal Event Group, тимбилдинг, конференции, делегации'
    : 'MICE, event organization, corporate events, Egypt, UAE, Russia, Royal Event Group, team building, conferences, delegations';

  const seoTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const seoImage = image || `${siteUrl}/logo.png`;

  const canonicalUrl = `${siteUrl}${location.pathname}`;
  const altLang = language === 'ru' ? 'en' : 'ru';
  const altPath = location.pathname.replace(`/${language}`, `/${altLang}`);
  const altUrl = `${siteUrl}${altPath}`;

  return (
    <Helmet>
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang={language} href={canonicalUrl} />
      <link rel="alternate" hrefLang={altLang} href={altUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:locale" content={language === 'ru' ? 'ru_RU' : 'en_US'} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      <html lang={language} />
    </Helmet>
  );
};

export default SEO;
