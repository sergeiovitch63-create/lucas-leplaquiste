'use client';

import { useEffect, useRef } from 'react';
import type { Lang, Product } from './data';
import { CHATBOT_QUESTIONS, getRecommendedProducts } from './chatbotLogic';

interface ChatbotProps {
  lang: Lang;
  products: Product[];
  onOpenModal: (productId: number) => void;
}

export default function Chatbot({ lang, products, onOpenModal }: ChatbotProps) {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Expose PRODUCTS, lang, questions and recommendation function globally for the chatbot script
    (window as any).PRODUCTS = products;
    (window as any).lang = lang;
    (window as any).CHATBOT_QUESTIONS = CHATBOT_QUESTIONS;
    (window as any).getRecommendedProducts = (answers: string[], lg: Lang, count: number = 3) => {
      return getRecommendedProducts(answers, lg, count, products);
    };
    (window as any).openModal = (id: number) => {
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
      if ((window as any).updateChatbotLang) {
        (window as any).updateChatbotLang(lang);
      }
    }

    return () => {
      // Don't remove script on cleanup, just update references
      (window as any).PRODUCTS = products;
      (window as any).lang = lang;
      (window as any).CHATBOT_QUESTIONS = CHATBOT_QUESTIONS;
    };
  }, [lang, products, onOpenModal]);

  return null;
}

