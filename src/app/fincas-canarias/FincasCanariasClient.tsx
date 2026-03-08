'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { UI, CAT_KEY, LANG_NAMES, getProductName, getProductSubtitle, getProductDesc, getCategoryLabel, type Lang, type Category, type Product } from './data';
import Chatbot from './Chatbot';
import './fincas-canarias.css';
import styles from './fincas-canarias.module.css';

const PLACEHOLDER_SVG = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

export default function FincasCanariasClient() {
  const [lang, setLang] = useState<Lang>('es');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [overlaySearchQuery, setOverlaySearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [carouselConfig, setCarouselConfig] = useState<{
    title: Record<Lang, string>;
    description: Record<Lang, string>;
    items: Array<{
      id: number;
      img: string | null;
      name: Record<Lang, string>;
      description: Record<Lang, string>;
      order: number;
    }>;
  } | null>(null);

  // ── LOAD PRODUCTS FROM API ──
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch('/api/fincas-canarias/products');
        if (!res.ok) throw new Error('Erreur chargement');
        const data = await res.json();
        setProducts(data);
      } catch {
        // Error loading products
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
    
    // Sync every 3 seconds
    const interval = setInterval(loadProducts, 3000);
    return () => clearInterval(interval);
  }, []);

  // ── LOAD CAROUSEL FROM API ──
  useEffect(() => {
    const loadCarousel = async () => {
      try {
        const res = await fetch('/api/fincas-canarias/carousel');
        if (!res.ok) throw new Error('Erreur chargement carrousel');
        const data = await res.json();
        setCarouselConfig(data);
      } catch {
        // Error loading carousel
      }
    };
    loadCarousel();
    
    // Sync every 3 seconds
    const interval = setInterval(loadCarousel, 3000);
    return () => clearInterval(interval);
  }, []);

  const getFiltered = useCallback(() => {
    const q = searchQuery.toLowerCase().trim();
    return products.filter((p) => {
      const catMatch = activeCategory === 'All' || p.category === activeCategory;
      const searchMatch =
        !q ||
        [getProductName(p, lang), getProductSubtitle(p, lang), getProductDesc(p, lang)]
          .join(' ')
          .toLowerCase()
          .includes(q);
      return catMatch && searchMatch;
    });
  }, [searchQuery, activeCategory, lang, products]);

  const filteredProducts = getFiltered();

  // Helper function to get flag emoji for language
  const getLangFlag = (langCode: Lang): string => {
    const flags: Record<Lang, string> = {
      es: '🇪🇸',
      en: '🇬🇧',
      de: '🇩🇪',
      fr: '🇫🇷',
      it: '🇮🇹',
      ru: '🇷🇺',
      pl: '🇵🇱',
    };
    return flags[langCode] || '🌐';
  };

  const handleOpenModalFromId = useCallback((productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setModalProduct(product);
    }
  }, [products]);

  const handleOverlaySearch = useCallback(
    (q: string) => {
      setOverlaySearchQuery(q);
    },
    []
  );

  const overlayFiltered = overlaySearchQuery
    ? products.filter((p) =>
        [getProductName(p, lang), getProductSubtitle(p, lang), getProductDesc(p, lang)]
          .join(' ')
          .toLowerCase()
          .includes(overlaySearchQuery.toLowerCase().trim())
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalProduct(null);
        setIsSearchOpen(false);
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isLangMenuOpen && !target.closest(`.${styles.langMenuWrapper}`)) {
        setIsLangMenuOpen(false);
      }
    };
    if (isLangMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLangMenuOpen]);

  useEffect(() => {
    if (modalProduct || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalProduct, isSearchOpen]);

  useEffect(() => {
    const fontUrl = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;600&display=swap';
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    
    if (!existingLink) {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
      return () => {
        const linkToRemove = document.querySelector(`link[href="${fontUrl}"]`);
        if (linkToRemove) {
          document.head.removeChild(linkToRemove);
        }
      };
    }
  }, []);


  if (loading) {
    return (
      <div className="fincas-canarias-page" style={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
        <span style={{color:"var(--text-light)",fontSize:"1rem"}}>Chargement des produits…</span>
      </div>
    );
  }

  return (
    <div className="fincas-canarias-page">
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.headerLogo}>
            <Image
              src="/media/fincas-canarias/logo-header.png"
              alt="Fincas Canarias"
              width={600}
              height={180}
              priority
              className={styles.headerLogoImg}
            />
          </Link>
          <div className={styles.headerRight}>
            <div className={styles.langMenuWrapper}>
              <button
                className={styles.hamburgerBtn}
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-label="Menu langues"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.hamburgerIcon}
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                <span className={styles.currentLang}>{getLangFlag(lang)}</span>
              </button>
              {isLangMenuOpen && (
                <div className={styles.langMenu}>
                  {(['es', 'en', 'de', 'fr', 'it', 'ru', 'pl'] as Lang[]).map((l) => (
                    <button
                      key={l}
                      className={`${styles.langMenuItem} ${lang === l ? styles.langMenuItemActive : ''}`}
                      onClick={() => {
                        setLang(l);
                        setIsLangMenuOpen(false);
                      }}
                    >
                      <span className={styles.langCode}>{getLangFlag(l)}</span>
                      <span className={styles.langName}>{LANG_NAMES[l]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              className={styles.searchIconBtn}
              onClick={() => setIsSearchOpen(true)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* SEARCH OVERLAY */}
      <div
        className={`${styles.searchOverlay} ${isSearchOpen ? styles.searchOverlayOpen : ''}`}
      >
        <button
          className={styles.closeSearch}
          onClick={() => {
            setIsSearchOpen(false);
            setOverlaySearchQuery('');
          }}
        >
          ×
        </button>
        <div className={styles.searchOverlayInner}>
          <span className={styles.searchOverlayLabel}>
            {UI[lang].overlayLabel}
          </span>
          <input
            className={styles.searchInputBig}
            type="text"
            placeholder={UI[lang].overlayPlaceholder}
            value={overlaySearchQuery}
            onChange={(e) => handleOverlaySearch(e.target.value)}
            autoFocus
          />
          <div className={styles.searchResultsPreview}>
            {overlayFiltered.map((p) => (
              <div
                key={p.id}
                className={styles.productCard}
                onClick={() => {
                  setIsSearchOpen(false);
                  setOverlaySearchQuery('');
                  setModalProduct(p);
                }}
              >
                <div className={styles.productImgWrap} style={{ aspectRatio: 1 }}>
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={getProductName(p, lang)}
                      fill
                      sizes="140px"
                      className={styles.modalImg}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.imgPlaceholder}>{PLACEHOLDER_SVG}</div>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName} style={{ fontSize: '0.8rem' }}>
                    {getProductName(p, lang)}
                  </h3>
                  <p className={styles.productSubtitle} style={{ fontSize: '0.7rem' }}>
                    {getProductSubtitle(p, lang)}
                  </p>
                </div>
              </div>
            ))}
            {overlaySearchQuery && overlayFiltered.length === 0 && (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                {UI[lang].empty}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className={styles.hero}>
        <p className={styles.heroTagline}>{UI[lang].tagline}</p>
        <h1 className={styles.heroTitle}>Fincas Canarias</h1>
        <div className={styles.heroSocialLinks}>
          <a
            href="https://www.tiktok.com/@fincascanarias"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="TikTok"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
          <a
            href="https://www.facebook.com/fincascanarias"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="Facebook"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="mailto:contact@fincascanarias.com"
            className={styles.socialLink}
            aria-label="Email"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>
        </div>
        <p className={styles.heroAddress}>
          Calle la hoya 47, 38400 Puerto de la cruz, tenerife
        </p>
        <div className={styles.locationCard}>
          <div className={styles.locationIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span className={styles.locationText}>Localisation</span>
        </div>
        
        {/* Carousel Section */}
        {carouselConfig && (
          <>
            <h2 className={styles.heroPackTitle}>
              {carouselConfig.title[lang] || carouselConfig.title.es || UI[lang].packTitle}
            </h2>
            {carouselConfig.description[lang] && (
              <p className={styles.heroPackDescription}>
                {carouselConfig.description[lang] || carouselConfig.description.es}
              </p>
            )}
            {carouselConfig.items && carouselConfig.items.length > 0 && (
              <div className={styles.carouselContainer}>
                <div 
                  className={styles.carousel}
                  style={{
                    '--carousel-item-count': carouselConfig.items.length,
                    '--carousel-item-width': '280px',
                    '--carousel-gap': '40px',
                  } as React.CSSProperties & {
                    '--carousel-item-count': number;
                    '--carousel-item-width': string;
                    '--carousel-gap': string;
                  }}
                >
                  {/* First wrapper */}
                  <div className={styles.carouselWrapper}>
                    {carouselConfig.items
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <div key={`item-${item.id}`} className={styles.carouselCard}>
                          {item.img ? (
                            <Image
                              src={item.img}
                              alt={item.name[lang] || item.name.es || ''}
                              fill
                              sizes="(max-width: 768px) 50vw, 280px"
                              className={styles.carouselCardImage}
                              unoptimized
                            />
                          ) : (
                            <div className={styles.carouselCardPlaceholder}>
                              {PLACEHOLDER_SVG}
                              <span>{item.name[lang] || item.name.es || 'Photo'}</span>
                            </div>
                          )}
                          <div className={styles.carouselCardOverlay}>
                            <div className={styles.carouselCardName}>
                              {item.name[lang] || item.name.es}
                            </div>
                            {item.description[lang] && (
                              <div className={styles.carouselCardDescription}>
                                {item.description[lang]}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                  {/* Duplicate wrapper for seamless loop */}
                  <div className={styles.carouselWrapper}>
                    {carouselConfig.items
                      .sort((a, b) => a.order - b.order)
                      .map((item) => (
                        <div key={`item-dup-${item.id}`} className={styles.carouselCard}>
                          {item.img ? (
                            <Image
                              src={item.img}
                              alt={item.name[lang] || item.name.es || ''}
                              fill
                              sizes="(max-width: 768px) 50vw, 280px"
                              className={styles.carouselCardImage}
                              unoptimized
                            />
                          ) : (
                            <div className={styles.carouselCardPlaceholder}>
                              {PLACEHOLDER_SVG}
                              <span>{item.name[lang] || item.name.es || 'Photo'}</span>
                            </div>
                          )}
                          <div className={styles.carouselCardOverlay}>
                            <div className={styles.carouselCardName}>
                              {item.name[lang] || item.name.es}
                            </div>
                            {item.description[lang] && (
                              <div className={styles.carouselCardDescription}>
                                {item.description[lang]}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div className={styles.heroDivider}></div>
      </section>

      {/* MAIN */}
      <main className={styles.main}>
        <div className={styles.categoriesSection}>
          <p className={styles.sectionTitle}>{UI[lang].categories}</p>
          <div className={styles.categoriesScroll}>
                {CAT_KEY.map((c) => (
              <button
                key={c}
                className={`${styles.catBtn} ${activeCategory === c ? styles.catBtnActive : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {getCategoryLabel(c, lang)}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.searchBarWrap}>
          <svg
            className={styles.searchBarIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            className={styles.searchBarInput}
            type="text"
            id="mainSearch"
            placeholder={UI[lang].searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <p
          className={styles.resultsMeta}
          dangerouslySetInnerHTML={{
            __html: UI[lang].results(filteredProducts.length),
          }}
        />
        <div className={styles.productsGrid}>
          {filteredProducts.length === 0 ? (
            <div className={styles.emptyState}>{UI[lang].empty}</div>
          ) : (
            filteredProducts.map((p, i) => (
              <div
                key={p.id}
                className={styles.productCard}
                style={{ animationDelay: `${i * 0.04}s` }}
                onClick={() => setModalProduct(p)}
              >
                <div className={styles.productImgWrap}>
                  {p.img ? (
                    <Image
                      src={p.img}
                      alt={getProductName(p, lang)}
                      fill
                      sizes="(max-width: 480px) 50vw, 210px"
                      className={styles.modalImg}
                    />
                  ) : (
                    <div className={styles.imgPlaceholder}>{PLACEHOLDER_SVG}</div>
                  )}
                  <span className={styles.productCategoryTag}>
                    {getCategoryLabel(p.category, lang)}
                  </span>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{getProductName(p, lang)}</h3>
                  <p className={styles.productSubtitle}>{getProductSubtitle(p, lang)}</p>
                  <p className={styles.productDesc}>{getProductDesc(p, lang)}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* MODAL */}
      {modalProduct && (
        <div
          className={`${styles.modalOverlay} ${modalProduct ? styles.modalOverlayOpen : ''}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalProduct(null);
          }}
        >
          <div className={styles.modal}>
            <button
              className={styles.modalClose}
              onClick={() => setModalProduct(null)}
            >
              ×
            </button>
            <div className={styles.modalImgWrap}>
              {modalProduct.img ? (
                <Image
                  className={styles.modalImg}
                  src={modalProduct.img}
                  alt={getProductName(modalProduct, lang)}
                  fill
                  sizes="(max-width: 520px) 100vw, 520px"
                />
              ) : (
                <div className={styles.modalImgPlaceholder}>
                  {PLACEHOLDER_SVG}
                  <span>{UI[lang].photoSoon}</span>
                </div>
              )}
            </div>
            <div className={styles.modalBody}>
              <span className={styles.modalTag}>
                {getCategoryLabel(modalProduct.category, lang)}
              </span>
              <h2 className={styles.modalTitle}>{getProductName(modalProduct, lang)}</h2>
              <p className={styles.modalSubtitle}>{getProductSubtitle(modalProduct, lang)}</p>
              <p className={styles.modalDesc}>{getProductDesc(modalProduct, lang)}</p>
            </div>
          </div>
        </div>
      )}

      {/* CHATBOT */}
      <Chatbot lang={lang} products={products} onOpenModal={handleOpenModalFromId} />
    </div>
  );
}

