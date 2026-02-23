/**
 * 10 catégories de massage Marina Masaje — contenu issu du PDF English.
 */

export interface MarinaMassageFaq {
  question: string;
  answer: string;
}

export interface MarinaMassageCategory {
  slug: string;
  title: string;
  durationMinutes: number;
  priceEur: number;
  description: string;
  faq: MarinaMassageFaq[];
  /** Image paths for the gallery (e.g. "hand-foot-1.jpg") — add files to public/media/marina/ */
  images: string[];
}

export const marinaMassageCategories: MarinaMassageCategory[] = [
  {
    slug: "hand-and-foot-massage",
    title: "Hand and Foot Massage",
    durationMinutes: 20,
    priceEur: 30,
    description:
      "Treat your hands and feet to a well-deserved moment of relaxation. A 20-minute express massage designed to relieve tension and restore a feeling of lightness.",
    faq: [
      { question: "How long does the Hand and Foot Massage last?", answer: "The session lasts 20 minutes. It's a short, express treatment perfect for a quick break." },
      { question: "What are the benefits?", answer: "It relieves tension in the hands and feet, improves circulation, and leaves you with a feeling of lightness and relaxation." },
      { question: "Do I need to prepare in any way?", answer: "No special preparation is needed. Just come as you are and enjoy the moment." },
    ],
    // Fichiers dans public/media/ (PNG)
    images: ["/media/foot-massage.png", "/media/hand-massage.png"],
  },
  {
    slug: "relaxing-back-massage",
    title: "Relaxing Back Massage",
    durationMinutes: 30,
    priceEur: 35,
    description:
      "A deep massage to relax the muscles, reduce stress, and restore well-being. Ideal for relieving tension in the back and neck.",
    faq: [
      { question: "What areas are focused on?", answer: "The massage focuses on the back and neck to release muscle tension and promote deep relaxation." },
      { question: "Is it suitable for chronic back pain?", answer: "It can help relieve tension and stress. For chronic conditions, we recommend mentioning it when booking so we can adapt the pressure." },
      { question: "How long is the session?", answer: "The Relaxing Back Massage lasts 30 minutes." },
    ],
    images: ["/media/massage-du-dos.png", "/media/massage-du-dos-2.png"],
  },
  {
    slug: "harmonizing-vital-areas-massage",
    title: "Harmonizing Vital Areas Massage",
    durationMinutes: 40,
    priceEur: 40,
    description:
      "Massage of the neck, shoulders, head, and arms. Relieves tension, calms the mind, and restores inner balance.",
    faq: [
      { question: "Which body parts are included?", answer: "The treatment covers the neck, shoulders, head, and arms — the areas where we often hold the most tension." },
      { question: "What can I expect after the session?", answer: "You should feel calmer, more balanced, and with less tension in the upper body." },
      { question: "How long is the treatment?", answer: "The Harmonizing Vital Areas Massage lasts 40 minutes." },
    ],
    images: ["/media/massage-zone-vitales.png", "/media/massage-zones-vitales-2.png"],
  },
  {
    slug: "energizing-back-and-legs-massage",
    title: "Energizing Back and Legs Massage",
    durationMinutes: 40,
    priceEur: 45,
    description:
      "Targeted massage for the back and legs, ideal for releasing tension, improving circulation, and restoring the body's energy. Perfect after traveling, walking, or an intense day.",
    faq: [
      { question: "When is this massage most beneficial?", answer: "It's ideal after a long journey, a day of walking, or any physically demanding day." },
      { question: "What are the main benefits?", answer: "It releases tension in the back and legs, improves circulation, and helps restore your energy." },
      { question: "How long does it take?", answer: "The session lasts 40 minutes." },
    ],
    images: ["/media/massage-energetique.png", "/media/massage-energetique-2.png"],
  },
  {
    slug: "facial-massage-cervical-decompression",
    title: "Facial Massage and Cervical Decompression",
    durationMinutes: 60,
    priceEur: 50,
    description:
      "Relaxing facial treatment with focused work on the cervical area. Stimulates circulation, smooths facial features, and restores the skin's natural radiance. Ideal for freeing the mind and regaining balance.",
    faq: [
      { question: "What does cervical decompression involve?", answer: "It involves gentle, focused work on the neck and cervical area to release tension and improve comfort." },
      { question: "Will my skin look different after?", answer: "The massage stimulates circulation and can help restore a natural, healthy glow to the skin." },
      { question: "How long is the treatment?", answer: "The Facial Massage and Cervical Decompression session lasts 60 minutes." },
    ],
    images: ["/media/massage-cervical.png", "/media/massage-cervical-2.png"],
  },
  {
    slug: "psychosomatic-back-massage",
    title: "Psychosomatic Back Massage",
    durationMinutes: 60,
    priceEur: 50,
    description:
      "The psychosomatic back massage works on the back, neck, and shoulders, releasing physical and emotional blockages while bringing calm and balance.",
    faq: [
      { question: "What is psychosomatic massage?", answer: "It's an approach that considers the link between mind and body, helping to release both physical tension and emotional stress stored in the muscles." },
      { question: "What areas are treated?", answer: "The massage focuses on the back, neck, and shoulders." },
      { question: "How long is the session?", answer: "The Psychosomatic Back Massage lasts 60 minutes." },
    ],
    images: ["/media/massage-psycho.png", "/media/massage-psycho-2.png"],
  },
  {
    slug: "japanese-lifting-kobido",
    title: "Japanese Lifting (Kobido Style)",
    durationMinutes: 90,
    priceEur: 60,
    description:
      "A Japanese facial massage that stimulates circulation, tones the skin, and provides a natural lifting effect while offering deep inner relaxation.",
    faq: [
      { question: "What is Kobido?", answer: "Kobido is a traditional Japanese facial massage technique that aims to tone the skin, stimulate circulation, and create a natural lifting effect." },
      { question: "Is it suitable for all skin types?", answer: "Yes, the technique is gentle and can be adapted to different skin types. We can discuss your skin before the session." },
      { question: "How long is the treatment?", answer: "The Japanese Lifting (Kobido Style) session lasts 90 minutes." },
    ],
    images: ["/media/massage-kobido.png", "/media/massage-kobido-2.png"],
  },
  {
    slug: "full-body-relaxing-massage",
    title: "Full Body Relaxing Massage",
    durationMinutes: 90,
    priceEur: 70,
    description:
      "A complete, fluid, and enveloping massage that releases tension and calms the mind. A true moment of balance and serenity.",
    faq: [
      { question: "What does the full body massage include?", answer: "It's a complete massage from head to toe, with fluid, enveloping movements designed to release tension and calm the mind." },
      { question: "What should I expect?", answer: "A deep sense of relaxation, balance, and serenity. Many clients find it one of the most restorative treatments." },
      { question: "How long is the session?", answer: "The Full Body Relaxing Massage lasts 90 minutes." },
    ],
    images: ["/media/massage-corps.png", "/media/massage-corps-2.png"],
  },
  {
    slug: "deep-lifting-facial-intraoral",
    title: "Deep Lifting Facial Massage (Intraoral)",
    durationMinutes: 90,
    priceEur: 70,
    description:
      "An internal and external facial massage that releases tension, relaxes the jaw, and refines the facial contours. Ideal for tense faces, providing a natural lifting effect.",
    faq: [
      { question: "What does intraoral mean?", answer: "Part of the massage is performed inside the mouth (on the cheeks and jaw area) to release deep tension and refine facial contours." },
      { question: "Is it suitable if I have jaw tension?", answer: "Yes, this treatment is particularly beneficial for releasing jaw tension and relaxing the facial muscles." },
      { question: "How long does it take?", answer: "The Deep Lifting Facial Massage (Intraoral) session lasts 90 minutes." },
    ],
    images: ["/media/massage-facial.png", "/media/massage-facial-2.png"],
  },
  {
    slug: "maderotherapy-wood-therapy",
    title: "Maderotherapy (Wood Therapy)",
    durationMinutes: 90,
    priceEur: 85,
    description:
      "Massage using wooden tools that sculpt the silhouette, activate circulation, and eliminate toxins. Includes lymphatic drainage for a visible detox effect from the very first session.",
    faq: [
      { question: "What is maderotherapy?", answer: "Maderotherapy uses specially designed wooden instruments to massage the body, sculpt the silhouette, and stimulate circulation and lymphatic drainage." },
      { question: "When will I see results?", answer: "Many clients notice a visible detox and sculpting effect from the very first session." },
      { question: "How long is the session?", answer: "The Maderotherapy (Wood Therapy) session lasts 90 minutes." },
    ],
    images: ["/media/madero.png", "/media/madero-2.png"],
  },
];

export function getMarinaMassageBySlug(slug: string): MarinaMassageCategory | undefined {
  return marinaMassageCategories.find((m) => m.slug === slug);
}
