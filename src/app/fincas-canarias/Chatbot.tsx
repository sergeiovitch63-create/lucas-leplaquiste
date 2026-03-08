'use client';

import { useEffect, useRef } from 'react';
import type { Lang, Product } from './data';
import { CHATBOT_QUESTIONS, getRecommendedProducts } from './chatbotLogic';

interface ChatbotProps {
  lang: Lang;
  products: Product[];
  onOpenModal: (productId: number) => void;
}

interface WindowWithChatbot extends Window {
  PRODUCTS?: Product[];
  lang?: Lang;
  CHATBOT_QUESTIONS?: typeof CHATBOT_QUESTIONS;
  getRecommendedProducts?: (answers: string[], lg: Lang, count?: number) => Product[];
  openModal?: (id: number) => void;
  updateChatbotLang?: (lang: Lang) => void;
}

export default function Chatbot({ lang, products, onOpenModal }: ChatbotProps) {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    const win = window as WindowWithChatbot;
    // Expose PRODUCTS, lang, questions and recommendation function globally for the chatbot script
    win.PRODUCTS = products;
    win.lang = lang;
    win.CHATBOT_QUESTIONS = CHATBOT_QUESTIONS;
    win.getRecommendedProducts = (answers: string[], lg: Lang, count: number = 3) => {
      return getRecommendedProducts(answers, lg, count, products);
    };
    win.openModal = (id: number) => {
      onOpenModal(id);
    };

    // Load the chatbot script only once
    if (!scriptLoadedRef.current) {
      const script = document.createElement('script');
      script.src = '/chatbot.js';
      script.async = true;
      script.id = 'fc-chatbot-script';
      document.body.appendChild(script);
      scriptLoadedRef.current = true;
    } else {
      // If script already loaded, just update the lang
      // The script should react to window.lang changes
      if (win.updateChatbotLang) {
        win.updateChatbotLang(lang);
      }
    }

    return () => {
      // Don't remove script on cleanup, just update references
      win.PRODUCTS = products;
      win.lang = lang;
      win.CHATBOT_QUESTIONS = CHATBOT_QUESTIONS;
    };
  }, [lang, products, onOpenModal]);

  return null;
}

