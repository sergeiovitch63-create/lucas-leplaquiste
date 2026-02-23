/**
 * Marina Masaje — traductions FR, RU, ES, DE, IT, EN
 */

export type MarinaLocale = "fr" | "ru" | "es" | "de" | "it" | "en";

export const marinaDefaultLocale: MarinaLocale = "fr";

export const marinaLocales: { value: MarinaLocale; label: string; flag: string }[] = [
  { value: "fr", label: "Français", flag: "🇫🇷" },
  { value: "en", label: "English", flag: "🇬🇧" },
  { value: "ru", label: "Русский", flag: "🇷🇺" },
  { value: "es", label: "Español", flag: "🇪🇸" },
  { value: "de", label: "Deutsch", flag: "🇩🇪" },
  { value: "it", label: "Italiano", flag: "🇮🇹" },
];

type MarinaTranslations = {
  [K in MarinaLocale]: Record<string, string>;
};

export const marinaTranslations: MarinaTranslations = {
  fr: {
    "our-services": "Nos services",
    "reserve-now": "Réserver",
    "your-masseuse": "Votre masseuse",
    "gallery": "Galerie",
    "faq": "FAQ",
    "photos-placeholder": "Les photos seront ajoutées ici",
    "close": "Fermer",
    "open": "Ouvrir",
    "back": "Retour",
    "choose-language": "Langue",
  },
  ru: {
    "our-services": "Наши услуги",
    "reserve-now": "Забронировать",
    "your-masseuse": "Ваша массажистка",
    "gallery": "Галерея",
    "faq": "Вопросы и ответы",
    "photos-placeholder": "Фотографии будут добавлены позже",
    "close": "Закрыть",
    "open": "Открыть",
    "back": "Назад",
    "choose-language": "Язык",
  },
  es: {
    "our-services": "Nuestros servicios",
    "reserve-now": "Reservar",
    "your-masseuse": "Tu masajista",
    "gallery": "Galería",
    "faq": "Preguntas frecuentes",
    "photos-placeholder": "Las fotos se añadirán aquí",
    "close": "Cerrar",
    "open": "Abrir",
    "back": "Volver",
    "choose-language": "Idioma",
  },
  de: {
    "our-services": "Unsere Leistungen",
    "reserve-now": "Reservieren",
    "your-masseuse": "Ihre Masseurin",
    "gallery": "Galerie",
    "faq": "Häufige Fragen",
    "photos-placeholder": "Fotos werden hier hinzugefügt",
    "close": "Schließen",
    "open": "Öffnen",
    "back": "Zurück",
    "choose-language": "Sprache",
  },
  it: {
    "our-services": "I nostri servizi",
    "reserve-now": "Prenota",
    "your-masseuse": "La tua massaggiatrice",
    "gallery": "Galleria",
    "faq": "Domande frequenti",
    "photos-placeholder": "Le foto saranno aggiunte qui",
    "close": "Chiudi",
    "open": "Apri",
    "back": "Indietro",
    "choose-language": "Lingua",
  },
  en: {
    "our-services": "Our services",
    "reserve-now": "Reserve now",
    "your-masseuse": "Your masseuse",
    "gallery": "Gallery",
    "faq": "FAQ",
    "photos-placeholder": "Photos will be added here",
    "close": "Close",
    "open": "Open",
    "back": "Back",
    "choose-language": "Language",
  },
};

/** Traductions des catégories (title, description, faq) */
const categoryTranslations: Record<
  MarinaLocale,
  Record<string, Record<string, string>>
> = {
  fr: {
    "hand-and-foot-massage": {
      title: "Massage mains et pieds",
      description:
        "Offrez à vos mains et pieds un moment de détente bien mérité. Un massage express de 20 minutes pour soulager les tensions et retrouver une sensation de légèreté.",
      "faq.0.q": "Combien de temps dure le massage mains et pieds ?",
      "faq.0.a": "La séance dure 20 minutes. C'est un soin court et express, idéal pour une pause rapide.",
      "faq.1.q": "Quels sont les bienfaits ?",
      "faq.1.a": "Il soulage les tensions des mains et pieds, améliore la circulation et procure une sensation de légèreté et de relaxation.",
      "faq.2.q": "Dois-je me préparer d'une manière particulière ?",
      "faq.2.a": "Aucune préparation spéciale. Venez tels que vous êtes et profitez du moment.",
    },
    "relaxing-back-massage": {
      title: "Massage relaxant du dos",
      description:
        "Un massage profond pour détendre les muscles, réduire le stress et retrouver le bien-être. Idéal pour soulager les tensions du dos et de la nuque.",
      "faq.0.q": "Quelles zones sont ciblées ?",
      "faq.0.a": "Le massage se concentre sur le dos et la nuque pour libérer les tensions musculaires et favoriser une relaxation profonde.",
      "faq.1.q": "Convient-il aux maux de dos chroniques ?",
      "faq.1.a": "Il peut aider à soulager tensions et stress. Pour les problèmes chroniques, mentionnez-le à la réservation pour adapter la pression.",
      "faq.2.q": "Combien de temps dure la séance ?",
      "faq.2.a": "Le massage relaxant du dos dure 30 minutes.",
    },
    "harmonizing-vital-areas-massage": {
      title: "Massage des zones vitales",
      description:
        "Massage du cou, épaules, tête et bras. Soulage les tensions, apaise l'esprit et restaure l'équilibre intérieur.",
      "faq.0.q": "Quelles parties du corps sont incluses ?",
      "faq.0.a": "Le soin couvre le cou, les épaules, la tête et les bras — les zones où nous accumulons souvent le plus de tensions.",
      "faq.1.q": "Que puis-je attendre après la séance ?",
      "faq.1.a": "Vous devriez vous sentir plus calme, équilibré et avec moins de tensions dans le haut du corps.",
      "faq.2.q": "Combien de temps dure le soin ?",
      "faq.2.a": "Le massage des zones vitales dure 40 minutes.",
    },
    "energizing-back-and-legs-massage": {
      title: "Massage dos et jambes énergisant",
      description:
        "Massage ciblé du dos et des jambes, idéal pour libérer les tensions, améliorer la circulation et restaurer l'énergie. Parfait après un voyage, une marche ou une journée intense.",
      "faq.0.q": "Quand ce massage est-il le plus bénéfique ?",
      "faq.0.a": "Idéal après un long trajet, une journée de marche ou toute journée physiquement exigeante.",
      "faq.1.q": "Quels sont les principaux bienfaits ?",
      "faq.1.a": "Il libère les tensions du dos et des jambes, améliore la circulation et aide à restaurer votre énergie.",
      "faq.2.q": "Combien de temps dure la séance ?",
      "faq.2.a": "La séance dure 40 minutes.",
    },
    "facial-massage-cervical-decompression": {
      title: "Massage facial et décompression cervicale",
      description:
        "Soin relaxant du visage avec travail ciblé sur la zone cervicale. Stimule la circulation, affine les traits et restaure l'éclat naturel de la peau. Idéal pour libérer l'esprit et retrouver l'équilibre.",
      "faq.0.q": "En quoi consiste la décompression cervicale ?",
      "faq.0.a": "C'est un travail doux et ciblé sur le cou et la zone cervicale pour libérer les tensions et améliorer le confort.",
      "faq.1.q": "Ma peau sera-t-elle différente après ?",
      "faq.1.a": "Le massage stimule la circulation et peut aider à retrouver un éclat naturel et sain.",
      "faq.2.q": "Combien de temps dure le soin ?",
      "faq.2.a": "La séance de massage facial et décompression cervicale dure 60 minutes.",
    },
    "psychosomatic-back-massage": {
      title: "Massage psychosomatique du dos",
      description:
        "Le massage psychosomatique du dos agit sur le dos, la nuque et les épaules, libérant les blocages physiques et émotionnels tout en apportant calme et équilibre.",
      "faq.0.q": "Qu'est-ce que le massage psychosomatique ?",
      "faq.0.a": "Une approche qui considère le lien corps-esprit, aidant à libérer les tensions physiques et le stress émotionnel stockés dans les muscles.",
      "faq.1.q": "Quelles zones sont traitées ?",
      "faq.1.a": "Le massage se concentre sur le dos, la nuque et les épaules.",
      "faq.2.q": "Combien de temps dure la séance ?",
      "faq.2.a": "Le massage psychosomatique du dos dure 60 minutes.",
    },
    "japanese-lifting-kobido": {
      title: "Japanese Lifting (style Kobido)",
      description:
        "Massage facial japonais qui stimule la circulation, tonifie la peau et procure un effet liftant naturel tout en offrant une relaxation profonde.",
      "faq.0.q": "Qu'est-ce que le Kobido ?",
      "faq.0.a": "Le Kobido est une technique japonaise traditionnelle de massage facial qui vise à tonifier la peau, stimuler la circulation et créer un effet liftant naturel.",
      "faq.1.q": "Convient-il à tous les types de peau ?",
      "faq.1.a": "Oui, la technique est douce et peut s'adapter à différents types de peau. Nous pouvons en discuter avant la séance.",
      "faq.2.q": "Combien de temps dure le soin ?",
      "faq.2.a": "La séance Japanese Lifting (style Kobido) dure 90 minutes.",
    },
    "full-body-relaxing-massage": {
      title: "Massage relaxant corps entier",
      description:
        "Un massage complet, fluide et enveloppant qui libère les tensions et apaise l'esprit. Un vrai moment d'équilibre et de sérénité.",
      "faq.0.q": "Que comprend le massage corps entier ?",
      "faq.0.a": "Un massage complet de la tête aux pieds, avec des mouvements fluides et enveloppants pour libérer les tensions et calmer l'esprit.",
      "faq.1.q": "Que puis-je attendre ?",
      "faq.1.a": "Une profonde sensation de relaxation, équilibre et sérénité. Beaucoup le trouvent parmi les soins les plus régénérants.",
      "faq.2.q": "Combien de temps dure la séance ?",
      "faq.2.a": "Le massage relaxant corps entier dure 90 minutes.",
    },
    "deep-lifting-facial-intraoral": {
      title: "Massage facial Deep Lifting (intraoral)",
      description:
        "Massage facial interne et externe qui libère les tensions, détend la mâchoire et affine les contours du visage. Idéal pour les visages tendus, procurant un effet liftant naturel.",
      "faq.0.q": "Que signifie intraoral ?",
      "faq.0.a": "Une partie du massage se fait à l'intérieur de la bouche (joues et mâchoire) pour libérer les tensions profondes et affiner les contours du visage.",
      "faq.1.q": "Convient-il en cas de tension de la mâchoire ?",
      "faq.1.a": "Oui, ce soin est particulièrement bénéfique pour libérer les tensions de la mâchoire et détendre les muscles du visage.",
      "faq.2.q": "Combien de temps dure le soin ?",
      "faq.2.a": "La séance de massage facial Deep Lifting (intraoral) dure 90 minutes.",
    },
    "maderotherapy-wood-therapy": {
      title: "Maderothérapie (thérapie par le bois)",
      description:
        "Massage avec des instruments en bois qui sculptent la silhouette, activent la circulation et éliminent les toxines. Inclut le drainage lymphatique pour un effet détox visible dès la première séance.",
      "faq.0.q": "Qu'est-ce que la maderothérapie ?",
      "faq.0.a": "La maderothérapie utilise des instruments en bois spécialement conçus pour masser le corps, sculpter la silhouette et stimuler circulation et drainage lymphatique.",
      "faq.1.q": "Quand verrai-je des résultats ?",
      "faq.1.a": "Beaucoup de clients constatent un effet détox et sculptant visible dès la première séance.",
      "faq.2.q": "Combien de temps dure la séance ?",
      "faq.2.a": "La séance de maderothérapie dure 90 minutes.",
    },
  },
  en: {
    "hand-and-foot-massage": {
      title: "Hand and Foot Massage",
      description:
        "Treat your hands and feet to a well-deserved moment of relaxation. A 20-minute express massage designed to relieve tension and restore a feeling of lightness.",
      "faq.0.q": "How long does the Hand and Foot Massage last?",
      "faq.0.a": "The session lasts 20 minutes. It's a short, express treatment perfect for a quick break.",
      "faq.1.q": "What are the benefits?",
      "faq.1.a": "It relieves tension in the hands and feet, improves circulation, and leaves you with a feeling of lightness and relaxation.",
      "faq.2.q": "Do I need to prepare in any way?",
      "faq.2.a": "No special preparation is needed. Just come as you are and enjoy the moment.",
    },
    "relaxing-back-massage": {
      title: "Relaxing Back Massage",
      description:
        "A deep massage to relax the muscles, reduce stress, and restore well-being. Ideal for relieving tension in the back and neck.",
      "faq.0.q": "What areas are focused on?",
      "faq.0.a": "The massage focuses on the back and neck to release muscle tension and promote deep relaxation.",
      "faq.1.q": "Is it suitable for chronic back pain?",
      "faq.1.a": "It can help relieve tension and stress. For chronic conditions, we recommend mentioning it when booking so we can adapt the pressure.",
      "faq.2.q": "How long is the session?",
      "faq.2.a": "The Relaxing Back Massage lasts 30 minutes.",
    },
    "harmonizing-vital-areas-massage": {
      title: "Harmonizing Vital Areas Massage",
      description:
        "Massage of the neck, shoulders, head, and arms. Relieves tension, calms the mind, and restores inner balance.",
      "faq.0.q": "Which body parts are included?",
      "faq.0.a": "The treatment covers the neck, shoulders, head, and arms — the areas where we often hold the most tension.",
      "faq.1.q": "What can I expect after the session?",
      "faq.1.a": "You should feel calmer, more balanced, and with less tension in the upper body.",
      "faq.2.q": "How long is the treatment?",
      "faq.2.a": "The Harmonizing Vital Areas Massage lasts 40 minutes.",
    },
    "energizing-back-and-legs-massage": {
      title: "Energizing Back and Legs Massage",
      description:
        "Targeted massage for the back and legs, ideal for releasing tension, improving circulation, and restoring the body's energy. Perfect after traveling, walking, or an intense day.",
      "faq.0.q": "When is this massage most beneficial?",
      "faq.0.a": "It's ideal after a long journey, a day of walking, or any physically demanding day.",
      "faq.1.q": "What are the main benefits?",
      "faq.1.a": "It releases tension in the back and legs, improves circulation, and helps restore your energy.",
      "faq.2.q": "How long does it take?",
      "faq.2.a": "The session lasts 40 minutes.",
    },
    "facial-massage-cervical-decompression": {
      title: "Facial Massage and Cervical Decompression",
      description:
        "Relaxing facial treatment with focused work on the cervical area. Stimulates circulation, smooths facial features, and restores the skin's natural radiance. Ideal for freeing the mind and regaining balance.",
      "faq.0.q": "What does cervical decompression involve?",
      "faq.0.a": "It involves gentle, focused work on the neck and cervical area to release tension and improve comfort.",
      "faq.1.q": "Will my skin look different after?",
      "faq.1.a": "The massage stimulates circulation and can help restore a natural, healthy glow to the skin.",
      "faq.2.q": "How long is the treatment?",
      "faq.2.a": "The Facial Massage and Cervical Decompression session lasts 60 minutes.",
    },
    "psychosomatic-back-massage": {
      title: "Psychosomatic Back Massage",
      description:
        "The psychosomatic back massage works on the back, neck, and shoulders, releasing physical and emotional blockages while bringing calm and balance.",
      "faq.0.q": "What is psychosomatic massage?",
      "faq.0.a": "It's an approach that considers the link between mind and body, helping to release both physical tension and emotional stress stored in the muscles.",
      "faq.1.q": "What areas are treated?",
      "faq.1.a": "The massage focuses on the back, neck, and shoulders.",
      "faq.2.q": "How long is the session?",
      "faq.2.a": "The Psychosomatic Back Massage lasts 60 minutes.",
    },
    "japanese-lifting-kobido": {
      title: "Japanese Lifting (Kobido Style)",
      description:
        "A Japanese facial massage that stimulates circulation, tones the skin, and provides a natural lifting effect while offering deep inner relaxation.",
      "faq.0.q": "What is Kobido?",
      "faq.0.a": "Kobido is a traditional Japanese facial massage technique that aims to tone the skin, stimulate circulation, and create a natural lifting effect.",
      "faq.1.q": "Is it suitable for all skin types?",
      "faq.1.a": "Yes, the technique is gentle and can be adapted to different skin types. We can discuss your skin before the session.",
      "faq.2.q": "How long is the treatment?",
      "faq.2.a": "The Japanese Lifting (Kobido Style) session lasts 90 minutes.",
    },
    "full-body-relaxing-massage": {
      title: "Full Body Relaxing Massage",
      description:
        "A complete, fluid, and enveloping massage that releases tension and calms the mind. A true moment of balance and serenity.",
      "faq.0.q": "What does the full body massage include?",
      "faq.0.a": "It's a complete massage from head to toe, with fluid, enveloping movements designed to release tension and calm the mind.",
      "faq.1.q": "What should I expect?",
      "faq.1.a": "A deep sense of relaxation, balance, and serenity. Many clients find it one of the most restorative treatments.",
      "faq.2.q": "How long is the session?",
      "faq.2.a": "The Full Body Relaxing Massage lasts 90 minutes.",
    },
    "deep-lifting-facial-intraoral": {
      title: "Deep Lifting Facial Massage (Intraoral)",
      description:
        "An internal and external facial massage that releases tension, relaxes the jaw, and refines the facial contours. Ideal for tense faces, providing a natural lifting effect.",
      "faq.0.q": "What does intraoral mean?",
      "faq.0.a": "Part of the massage is performed inside the mouth (on the cheeks and jaw area) to release deep tension and refine facial contours.",
      "faq.1.q": "Is it suitable if I have jaw tension?",
      "faq.1.a": "Yes, this treatment is particularly beneficial for releasing jaw tension and relaxing the facial muscles.",
      "faq.2.q": "How long does it take?",
      "faq.2.a": "The Deep Lifting Facial Massage (Intraoral) session lasts 90 minutes.",
    },
    "maderotherapy-wood-therapy": {
      title: "Maderotherapy (Wood Therapy)",
      description:
        "Massage using wooden tools that sculpt the silhouette, activate circulation, and eliminate toxins. Includes lymphatic drainage for a visible detox effect from the very first session.",
      "faq.0.q": "What is maderotherapy?",
      "faq.0.a": "Maderotherapy uses specially designed wooden instruments to massage the body, sculpt the silhouette, and stimulate circulation and lymphatic drainage.",
      "faq.1.q": "When will I see results?",
      "faq.1.a": "Many clients notice a visible detox and sculpting effect from the very first session.",
      "faq.2.q": "How long is the session?",
      "faq.2.a": "The Maderotherapy (Wood Therapy) session lasts 90 minutes.",
    },
  },
  ru: {
    "hand-and-foot-massage": {
      title: "Массаж рук и ног",
      description:
        "Побалуйте свои руки и ноги заслуженным моментом расслабления. Экспресс-массаж 20 минут для снятия напряжения и ощущения лёгкости.",
      "faq.0.q": "Сколько длится массаж рук и ног?",
      "faq.0.a": "Сеанс длится 20 минут. Это короткая экспресс-процедура, идеальная для быстрой паузы.",
      "faq.1.q": "Каковы преимущества?",
      "faq.1.a": "Снимает напряжение рук и ног, улучшает кровообращение и даёт ощущение лёгкости и расслабления.",
      "faq.2.q": "Нужна ли особая подготовка?",
      "faq.2.a": "Специальной подготовки не требуется. Приходите как есть и наслаждайтесь моментом.",
    },
    "relaxing-back-massage": {
      title: "Расслабляющий массаж спины",
      description:
        "Глубокий массаж для расслабления мышц, снятия стресса и восстановления. Идеален для снятия напряжения в спине и шее.",
      "faq.0.q": "Какие зоны обрабатываются?",
      "faq.0.a": "Массаж сосредоточен на спине и шее для снятия мышечного напряжения и глубокого расслабления.",
      "faq.1.q": "Подходит ли при хронических болях в спине?",
      "faq.1.a": "Может помочь снять напряжение и стресс. При хронических проблемах сообщите при записи, чтобы адаптировать силу нажатия.",
      "faq.2.q": "Сколько длится сеанс?",
      "faq.2.a": "Расслабляющий массаж спины длится 30 минут.",
    },
    "harmonizing-vital-areas-massage": {
      title: "Массаж жизненно важных зон",
      description:
        "Массаж шеи, плеч, головы и рук. Снимает напряжение, успокаивает ум и восстанавливает внутренний баланс.",
      "faq.0.q": "Какие части тела включены?",
      "faq.0.a": "Процедура охватывает шею, плечи, голову и руки — зоны, где чаще всего накапливается напряжение.",
      "faq.1.q": "Что ожидать после сеанса?",
      "faq.1.a": "Вы почувствуете себя спокойнее, сбалансированнее, с меньшим напряжением в верхней части тела.",
      "faq.2.q": "Сколько длится процедура?",
      "faq.2.a": "Массаж жизненно важных зон длится 40 минут.",
    },
    "energizing-back-and-legs-massage": {
      title: "Энергетический массаж спины и ног",
      description:
        "Целенаправленный массаж спины и ног, идеален для снятия напряжения, улучшения кровообращения и восстановления энергии. Идеален после путешествий, прогулок или интенсивного дня.",
      "faq.0.q": "Когда этот массаж наиболее полезен?",
      "faq.0.a": "Идеален после долгой поездки, дня ходьбы или любого физически demanding дня.",
      "faq.1.q": "Каковы основные преимущества?",
      "faq.1.a": "Снимает напряжение в спине и ногах, улучшает кровообращение и восстанавливает энергию.",
      "faq.2.q": "Сколько длится сеанс?",
      "faq.2.a": "Сеанс длится 40 минут.",
    },
    "facial-massage-cervical-decompression": {
      title: "Массаж лица и декомпрессия шеи",
      description:
        "Расслабляющая процедура для лица с фокусом на шейную зону. Стимулирует кровообращение, разглаживает черты и восстанавливает естественное сияние кожи.",
      "faq.0.q": "Что включает декомпрессия шеи?",
      "faq.0.a": "Мягкая, целенаправленная работа с шеей и шейной зоной для снятия напряжения и повышения комфорта.",
      "faq.1.q": "Будет ли кожа выглядеть по-другому после?",
      "faq.1.a": "Массаж стимулирует кровообращение и помогает восстановить естественное здоровое сияние кожи.",
      "faq.2.q": "Сколько длится процедура?",
      "faq.2.a": "Сеанс массажа лица и декомпрессии шеи длится 60 минут.",
    },
    "psychosomatic-back-massage": {
      title: "Психосоматический массаж спины",
      description:
        "Работает со спиной, шеей и плечами, освобождая физические и эмоциональные блоки, принося спокойствие и баланс.",
      "faq.0.q": "Что такое психосоматический массаж?",
      "faq.0.a": "Подход, учитывающий связь тела и разума, помогающий освободить физическое напряжение и эмоциональный стресс, накопленный в мышцах.",
      "faq.1.q": "Какие зоны обрабатываются?",
      "faq.1.a": "Массаж сосредоточен на спине, шее и плечах.",
      "faq.2.q": "Сколько длится сеанс?",
      "faq.2.a": "Психосоматический массаж спины длится 60 минут.",
    },
    "japanese-lifting-kobido": {
      title: "Японский лифтинг (стиль Кобидо)",
      description:
        "Японский массаж лица, стимулирующий кровообращение, тонизирующий кожу и дающий естественный эффект лифтинга с глубоким расслаблением.",
      "faq.0.q": "Что такое Кобидо?",
      "faq.0.a": "Кобидо — традиционная японская техника массажа лица, тонизирующая кожу, стимулирующая кровообращение и создающая эффект естественного лифтинга.",
      "faq.1.q": "Подходит ли для всех типов кожи?",
      "faq.1.a": "Да, техника мягкая и адаптируется к разным типам кожи. Обсудим перед сеансом.",
      "faq.2.q": "Сколько длится процедура?",
      "faq.2.a": "Сеанс японского лифтинга (стиль Кобидо) длится 90 минут.",
    },
    "full-body-relaxing-massage": {
      title: "Расслабляющий массаж всего тела",
      description:
        "Полный, плавный и enveloping массаж, снимающий напряжение и успокаивающий ум. Истинный момент баланса и serenity.",
      "faq.0.q": "Что включает массаж всего тела?",
      "faq.0.a": "Полный массаж с головы до ног, с плавными enveloping движениями для снятия напряжения и успокоения ума.",
      "faq.1.q": "Что ожидать?",
      "faq.1.a": "Глубокое ощущение расслабления, баланса и serenity. Многие считают его одним из самых восстанавливающих процедур.",
      "faq.2.q": "Сколько длится сеанс?",
      "faq.2.a": "Расслабляющий массаж всего тела длится 90 минут.",
    },
    "deep-lifting-facial-intraoral": {
      title: "Глубокий лифтинг-массаж лица (внутриротовой)",
      description:
        "Внутренний и внешний массаж лица, снимающий напряжение, расслабляющий челюсть и улучшающий контуры лица. Идеален при напряжённом лице, даёт естественный эффект лифтинга.",
      "faq.0.q": "Что значит внутриротовой?",
      "faq.0.a": "Часть массажа выполняется внутри рта (щёки и область челюсти) для снятия глубокого напряжения и улучшения контуров лица.",
      "faq.1.q": "Подходит ли при напряжении челюсти?",
      "faq.1.a": "Да, эта процедура особенно полезна для снятия напряжения челюсти и расслабления лицевых мышц.",
      "faq.2.q": "Сколько длится процедура?",
      "faq.2.a": "Сеанс глубокого лифтинг-массажа лица (внутриротовой) длится 90 минут.",
    },
    "maderotherapy-wood-therapy": {
      title: "Мадеротерапия (древесная терапия)",
      description:
        "Массаж деревянными инструментами, sculpting силуэт, активируя кровообращение и выводя токсины. Включает лимфодренаж для видимого детокс-эффекта с первой сессии.",
      "faq.0.q": "Что такое мадеротерапия?",
      "faq.0.a": "Мадеротерапия использует специально разработанные деревянные инструменты для массажа тела, sculpting силуэта и стимуляции кровообращения и лимфодренажа.",
      "faq.1.q": "Когда будут видны результаты?",
      "faq.1.a": "Многие клиенты замечают видимый детокс и sculpting эффект уже с первой сессии.",
      "faq.2.q": "Сколько длится сеанс?",
      "faq.2.a": "Сеанс мадеротерапии длится 90 минут.",
    },
  },
  es: {
    "hand-and-foot-massage": {
      title: "Massaje de manos y pies",
      description:
        "Dale a tus manos y pies un merecido momento de relax. Un masaje express de 20 minutos para aliviar tensiones y recuperar una sensación de ligereza.",
      "faq.0.q": "¿Cuánto dura el masaje de manos y pies?",
      "faq.0.a": "La sesión dura 20 minutos. Es un tratamiento corto y express, ideal para una pausa rápida.",
      "faq.1.q": "¿Cuáles son los beneficios?",
      "faq.1.a": "Alivia las tensiones de manos y pies, mejora la circulación y aporta una sensación de ligereza y relajación.",
      "faq.2.q": "¿Necesito prepararme de alguna manera?",
      "faq.2.a": "No hace falta ninguna preparación especial. Ven tal como estás y disfruta del momento.",
    },
    "relaxing-back-massage": {
      title: "Masaje relajante de espalda",
      description:
        "Un masaje profundo para relajar los músculos, reducir el estrés y recuperar el bienestar. Ideal para aliviar tensiones en espalda y cuello.",
      "faq.0.q": "¿Qué zonas se trabajan?",
      "faq.0.a": "El masaje se centra en espalda y cuello para liberar tensiones musculares y favorecer una relajación profunda.",
      "faq.1.q": "¿Es adecuado para dolores crónicos de espalda?",
      "faq.1.a": "Puede ayudar a aliviar tensiones y estrés. En casos crónicos, coméntalo al reservar para adaptar la presión.",
      "faq.2.q": "¿Cuánto dura la sesión?",
      "faq.2.a": "El masaje relajante de espalda dura 30 minutos.",
    },
    "harmonizing-vital-areas-massage": {
      title: "Masaje de zonas vitales",
      description:
        "Masaje de cuello, hombros, cabeza y brazos. Alivia tensiones, calma la mente y restaura el equilibrio interior.",
      "faq.0.q": "¿Qué partes del cuerpo se incluyen?",
      "faq.0.a": "El tratamiento cubre cuello, hombros, cabeza y brazos — las zonas donde más tensiones acumulamos.",
      "faq.1.q": "¿Qué puedo esperar después de la sesión?",
      "faq.1.a": "Deberías sentirte más tranquilo, equilibrado y con menos tensiones en la parte superior del cuerpo.",
      "faq.2.q": "¿Cuánto dura el tratamiento?",
      "faq.2.a": "El masaje de zonas vitales dura 40 minutos.",
    },
    "energizing-back-and-legs-massage": {
      title: "Masaje energizante espalda y piernas",
      description:
        "Masaje focalizado de espalda y piernas, ideal para liberar tensiones, mejorar la circulación y restaurar la energía. Perfecto tras viajes, caminatas o días intensos.",
      "faq.0.q": "¿Cuándo es más beneficioso este masaje?",
      "faq.0.a": "Ideal tras un largo viaje, un día de caminata o cualquier día físicamente exigente.",
      "faq.1.q": "¿Cuáles son los principales beneficios?",
      "faq.1.a": "Libera tensiones en espalda y piernas, mejora la circulación y ayuda a restaurar la energía.",
      "faq.2.q": "¿Cuánto dura la sesión?",
      "faq.2.a": "La sesión dura 40 minutos.",
    },
    "facial-massage-cervical-decompression": {
      title: "Masaje facial y descompresión cervical",
      description:
        "Tratamiento facial relajante con trabajo focalizado en la zona cervical. Estimula la circulación, suaviza los rasgos y restaura el brillo natural de la piel.",
      "faq.0.q": "¿En qué consiste la descompresión cervical?",
      "faq.0.a": "Es un trabajo suave y focalizado en cuello y zona cervical para liberar tensiones y mejorar el confort.",
      "faq.1.q": "¿Mi piel se verá diferente después?",
      "faq.1.a": "El masaje estimula la circulación y puede ayudar a restaurar un brillo natural y saludable.",
      "faq.2.q": "¿Cuánto dura el tratamiento?",
      "faq.2.a": "La sesión de masaje facial y descompresión cervical dura 60 minutos.",
    },
    "psychosomatic-back-massage": {
      title: "Masaje psicosomático de espalda",
      description:
        "Trabaja la espalda, cuello y hombros, liberando bloqueos físicos y emocionales y aportando calma y equilibrio.",
      "faq.0.q": "¿Qué es el masaje psicossomático?",
      "faq.0.a": "Un enfoque que considera el vínculo cuerpo-mente, liberando tanto tensiones físicas como estrés emocional almacenado en los músculos.",
      "faq.1.q": "¿Qué zonas se tratan?",
      "faq.1.a": "El masaje se centra en espalda, cuello y hombros.",
      "faq.2.q": "¿Cuánto dura la sesión?",
      "faq.2.a": "El masaje psicosomático de espalda dura 60 minutos.",
    },
    "japanese-lifting-kobido": {
      title: "Japanese Lifting (estilo Kobido)",
      description:
        "Masaje facial japonés que estimula la circulación, tonifica la piel y aporta un efecto lifting natural con relajación profunda.",
      "faq.0.q": "¿Qué es el Kobido?",
      "faq.0.a": "Kobido es una técnica tradicional japonesa de masaje facial que tonifica la piel, estimula la circulación y crea un efecto lifting natural.",
      "faq.1.q": "¿Es adecuado para todos los tipos de piel?",
      "faq.1.a": "Sí, la técnica es suave y se adapta a distintos tipos de piel. Podemos hablarlo antes de la sesión.",
      "faq.2.q": "¿Cuánto dura el tratamiento?",
      "faq.2.a": "La sesión Japanese Lifting (estilo Kobido) dura 90 minutos.",
    },
    "full-body-relaxing-massage": {
      title: "Masaje relajante cuerpo completo",
      description:
        "Un masaje completo, fluido y envolvente que libera tensiones y calma la mente. Un verdadero momento de equilibrio y serenidad.",
      "faq.0.q": "¿Qué incluye el masaje cuerpo completo?",
      "faq.0.a": "Un masaje de pies a cabeza, con movimientos fluidos y envolventes para liberar tensiones y calmar la mente.",
      "faq.1.q": "¿Qué puedo esperar?",
      "faq.1.a": "Una profunda sensación de relajación, equilibrio y serenidad. Muchos lo consideran uno de los tratamientos más restauradores.",
      "faq.2.q": "¿Cuánto dura la sesión?",
      "faq.2.a": "El masaje relajante cuerpo completo dura 90 minutos.",
    },
    "deep-lifting-facial-intraoral": {
      title: "Masaje facial Deep Lifting (intraoral)",
      description:
        "Masaje facial interno y externo que libera tensiones, relaja la mandíbula y afina los contornos. Ideal para rostros tensos, con efecto lifting natural.",
      "faq.0.q": "¿Qué significa intraoral?",
      "faq.0.a": "Parte del masaje se realiza dentro de la boca (mejillas y mandíbula) para liberar tensiones profundas y afinar los contornos del rostro.",
      "faq.1.q": "¿Es adecuado si tengo tensión en la mandíbula?",
      "faq.1.a": "Sí, este tratamiento es especialmente beneficioso para liberar tensión mandibular y relajar los músculos faciales.",
      "faq.2.q": "¿Cuánto dura el tratamiento?",
      "faq.2.a": "La sesión de masaje facial Deep Lifting (intraoral) dura 90 minutos.",
    },
    "maderotherapy-wood-therapy": {
      title: "Maderoterapia (terapia con madera)",
      description:
        "Masaje con instrumentos de madera que esculpen la silueta, activan la circulación y eliminan toxinas. Incluye drenaje linfático para un efecto detox visible desde la primera sesión.",
      "faq.0.q": "¿Qué es la maderoterapia?",
      "faq.0.a": "La maderoterapia usa instrumentos de madera especialmente diseñados para masajear el cuerpo, esculpir la silueta y estimular circulación y drenaje linfático.",
      "faq.1.q": "¿Cuándo veré resultados?",
      "faq.1.a": "Muchos clientes notan un efecto detox y de esculpido visible desde la primera sesión.",
      "faq.2.q": "¿Cuánto dura la sesión?",
      "faq.2.a": "La sesión de maderoterapia dura 90 minutos.",
    },
  },
  de: {
    "hand-and-foot-massage": {
      title: "Hand- und Fußmassage",
      description:
        "Gönnen Sie Ihren Händen und Füßen einen wohlverdienten Moment der Entspannung. Eine 20-minütige Express-Massage zur Linderung von Verspannungen und einem Gefühl der Leichtigkeit.",
      "faq.0.q": "Wie lange dauert die Hand- und Fußmassage?",
      "faq.0.a": "Die Sitzung dauert 20 Minuten. Es ist eine kurze Express-Behandlung, ideal für eine kurze Pause.",
      "faq.1.q": "Was sind die Vorteile?",
      "faq.1.a": "Löst Verspannungen in Händen und Füßen, verbessert die Durchblutung und bringt ein Gefühl von Leichtigkeit und Entspannung.",
      "faq.2.q": "Muss ich mich irgendwie vorbereiten?",
      "faq.2.a": "Keine besondere Vorbereitung nötig. Kommen Sie einfach wie Sie sind und genießen Sie den Moment.",
    },
    "relaxing-back-massage": {
      title: "Entspannende Rückenmassage",
      description:
        "Eine tiefe Massage zur Entspannung der Muskeln, Stressabbau und Wohlbefinden. Ideal zur Linderung von Verspannungen in Rücken und Nacken.",
      "faq.0.q": "Welche Bereiche werden bearbeitet?",
      "faq.0.a": "Die Massage konzentriert sich auf Rücken und Nacken, um Muskelverspannungen zu lösen und tiefe Entspannung zu fördern.",
      "faq.1.q": "Eignet sich bei chronischen Rückenbeschwerden?",
      "faq.1.a": "Kann bei Verspannungen und Stress helfen. Bei chronischen Beschwerden bitte bei der Buchung erwähnen, um den Druck anzupassen.",
      "faq.2.q": "Wie lange dauert die Sitzung?",
      "faq.2.a": "Die entspannende Rückenmassage dauert 30 Minuten.",
    },
    "harmonizing-vital-areas-massage": {
      title: "Massage der vitalen Zonen",
      description:
        "Massage von Nacken, Schultern, Kopf und Armen. Löst Verspannungen, beruhigt den Geist und stellt das innere Gleichgewicht wieder her.",
      "faq.0.q": "Welche Körperteile sind einbezogen?",
      "faq.0.a": "Die Behandlung umfasst Nacken, Schultern, Kopf und Arme — die Bereiche, in denen wir oft am meisten verspannt sind.",
      "faq.1.q": "Was kann ich nach der Sitzung erwarten?",
      "faq.1.a": "Sie sollten sich ruhiger, ausgeglichener und mit weniger Verspannungen im Oberkörper fühlen.",
      "faq.2.q": "Wie lange dauert die Behandlung?",
      "faq.2.a": "Die Massage der vitalen Zonen dauert 40 Minuten.",
    },
    "energizing-back-and-legs-massage": {
      title: "Energiebringende Rücken- und Beinmassage",
      description:
        "Gezielte Massage von Rücken und Beinen, ideal zum Lösen von Verspannungen, Verbesserung der Durchblutung und Wiederherstellung der Energie. Perfekt nach Reisen, Spaziergängen oder intensiven Tagen.",
      "faq.0.q": "Wann ist diese Massage am nützlichsten?",
      "faq.0.a": "Ideal nach langer Reise, einem Tag voller Spaziergänge oder jedem körperlich anstrengenden Tag.",
      "faq.1.q": "Was sind die Hauptvorteile?",
      "faq.1.a": "Löst Verspannungen in Rücken und Beinen, verbessert die Durchblutung und hilft, die Energie wiederherzustellen.",
      "faq.2.q": "Wie lange dauert die Sitzung?",
      "faq.2.a": "Die Sitzung dauert 40 Minuten.",
    },
    "facial-massage-cervical-decompression": {
      title: "Gesichtsmassage und zervikale Dekompression",
      description:
        "Entspannende Gesichtsbehandlung mit Fokus auf den Nackenbereich. Stimuliert die Durchblutung, glättet die Gesichtszüge und stellt den natürlichen Glanz der Haut wieder her.",
      "faq.0.q": "Was umfasst die zervikale Dekompression?",
      "faq.0.a": "Sanfte, fokussierte Arbeit an Nacken und Halswirbelsäule, um Verspannungen zu lösen und den Komfort zu verbessern.",
      "faq.1.q": "Wird meine Haut danach anders aussehen?",
      "faq.1.a": "Die Massage stimuliert die Durchblutung und kann helfen, einen natürlichen, gesunden Glanz wiederherzustellen.",
      "faq.2.q": "Wie lange dauert die Behandlung?",
      "faq.2.a": "Die Sitzung Gesichtsmassage und zervikale Dekompression dauert 60 Minuten.",
    },
    "psychosomatic-back-massage": {
      title: "Psychosomatische Rückenmassage",
      description:
        "Arbeitet an Rücken, Nacken und Schultern, löst körperliche und emotionale Blockaden und bringt Ruhe und Gleichgewicht.",
      "faq.0.q": "Was ist psychosomatische Massage?",
      "faq.0.a": "Ein Ansatz, der die Verbindung von Körper und Geist berücksichtigt und hilft, sowohl körperliche als auch in den Muskeln gespeicherte emotionale Spannungen zu lösen.",
      "faq.1.q": "Welche Bereiche werden behandelt?",
      "faq.1.a": "Die Massage konzentriert sich auf Rücken, Nacken und Schultern.",
      "faq.2.q": "Wie lange dauert die Sitzung?",
      "faq.2.a": "Die psychosomatische Rückenmassage dauert 60 Minuten.",
    },
    "japanese-lifting-kobido": {
      title: "Japanese Lifting (Kobido-Stil)",
      description:
        "Eine japanische Gesichtsmassage, die die Durchblutung stimuliert, die Haut strafft und einen natürlichen Lifting-Effekt mit tiefer Entspannung bietet.",
      "faq.0.q": "Was ist Kobido?",
      "faq.0.a": "Kobido ist eine traditionelle japanische Gesichtsmassage-Technik zur Straffung der Haut, Stimulierung der Durchblutung und Erzielung eines natürlichen Lifting-Effekts.",
      "faq.1.q": "Eignet sich für alle Hauttypen?",
      "faq.1.a": "Ja, die Technik ist sanft und kann an verschiedene Hauttypen angepasst werden. Wir können vor der Sitzung darüber sprechen.",
      "faq.2.q": "Wie lange dauert die Behandlung?",
      "faq.2.a": "Die Japanese Lifting (Kobido-Stil)-Sitzung dauert 90 Minuten.",
    },
    "full-body-relaxing-massage": {
      title: "Entspannende Ganzkörpermassage",
      description:
        "Eine vollständige, fließende und einhüllende Massage, die Verspannungen löst und den Geist beruhigt. Ein echter Moment von Gleichgewicht und Serenität.",
      "faq.0.q": "Was umfasst die Ganzkörpermassage?",
      "faq.0.a": "Eine vollständige Massage von Kopf bis Fuß mit fließenden, einhüllenden Bewegungen zur Linderung von Verspannungen und Beruhigung des Geistes.",
      "faq.1.q": "Was kann ich erwarten?",
      "faq.1.a": "Ein tiefes Gefühl von Entspannung, Gleichgewicht und Serenität. Viele empfinden sie als eine der erholsamsten Behandlungen.",
      "faq.2.q": "Wie lange dauert die Sitzung?",
      "faq.2.a": "Die entspannende Ganzkörpermassage dauert 90 Minuten.",
    },
    "deep-lifting-facial-intraoral": {
      title: "Deep Lifting Gesichtsmassage (intraoral)",
      description:
        "Eine innere und äußere Gesichtsmassage, die Verspannungen löst, den Kiefer entspannt und die Gesichtskonturen verfeinert. Ideal bei verspanntem Gesicht mit natürlichem Lifting-Effekt.",
      "faq.0.q": "Was bedeutet intraoral?",
      "faq.0.a": "Teil der Massage wird im Mund (Wangen und Kieferbereich) durchgeführt, um tiefe Verspannungen zu lösen und die Gesichtskonturen zu verfeinern.",
      "faq.1.q": "Eignet sich bei Kieferverspannungen?",
      "faq.1.a": "Ja, diese Behandlung ist besonders wohltuend bei Kieferverspannungen und zur Entspannung der Gesichtsmuskulatur.",
      "faq.2.q": "Wie lange dauert die Behandlung?",
      "faq.2.a": "Die Deep Lifting Gesichtsmassage (intraoral)-Sitzung dauert 90 Minuten.",
    },
    "maderotherapy-wood-therapy": {
      title: "Maderotherapie (Holztherapie)",
      description:
        "Massage mit Holzinstrumenten, die die Silhouette formen, die Durchblutung aktivieren und Giftstoffe eliminieren. Enthält Lymphdrainage für einen sichtbaren Detox-Effekt ab der ersten Sitzung.",
      "faq.0.q": "Was ist Maderotherapie?",
      "faq.0.a": "Maderotherapie nutzt speziell entwickelte Holzinstrumente zur Massage des Körpers, Formung der Silhouette und Stimulierung von Durchblutung und Lymphdrainage.",
      "faq.1.q": "Wann sehe ich Ergebnisse?",
      "faq.1.a": "Viele Kunden bemerken bereits ab der ersten Sitzung einen sichtbaren Detox- und Formungseffekt.",
      "faq.2.q": "Wie lange dauert die Sitzung?",
      "faq.2.a": "Die Maderotherapie-Sitzung dauert 90 Minuten.",
    },
  },
  it: {
    "hand-and-foot-massage": {
      title: "Massaggio mani e piedi",
      description:
        "Regalati un meritato momento di relax per mani e piedi. Un massaggio express di 20 minuti per alleviare le tensioni e ritrovare una sensazione di leggerezza.",
      "faq.0.q": "Quanto dura il massaggio mani e piedi?",
      "faq.0.a": "La sessione dura 20 minuti. È un trattamento breve e express, ideale per una pausa veloce.",
      "faq.1.q": "Quali sono i benefici?",
      "faq.1.a": "Allevia le tensioni di mani e piedi, migliora la circolazione e dona una sensazione di leggerezza e relax.",
      "faq.2.q": "Devo prepararmi in qualche modo?",
      "faq.2.a": "Nessuna preparazione speciale. Vieni come sei e goditi il momento.",
    },
    "relaxing-back-massage": {
      title: "Massaggio rilassante della schiena",
      description:
        "Un massaggio profondo per rilassare i muscoli, ridurre lo stress e ritrovare il benessere. Ideale per alleviare le tensioni di schiena e collo.",
      "faq.0.q": "Quali zone vengono trattate?",
      "faq.0.a": "Il massaggio si concentra su schiena e collo per liberare le tensioni muscolari e favorire un rilassamento profondo.",
      "faq.1.q": "È adatto per mal di schiena cronico?",
      "faq.1.a": "Può aiutare ad alleviare tensioni e stress. In caso di disturbi cronici, menzionalo alla prenotazione per adattare la pressione.",
      "faq.2.q": "Quanto dura la sessione?",
      "faq.2.a": "Il massaggio rilassante della schiena dura 30 minuti.",
    },
    "harmonizing-vital-areas-massage": {
      title: "Massaggio delle zone vitali",
      description:
        "Massaggio di collo, spalle, testa e braccia. Allevia le tensioni, calma la mente e ripristina l'equilibrio interiore.",
      "faq.0.q": "Quali parti del corpo sono incluse?",
      "faq.0.a": "Il trattamento copre collo, spalle, testa e braccia — le zone dove accumuliamo più tensioni.",
      "faq.1.q": "Cosa posso aspettarmi dopo la sessione?",
      "faq.1.a": "Dovresti sentirti più calmo, equilibrato e con meno tensioni nella parte superiore del corpo.",
      "faq.2.q": "Quanto dura il trattamento?",
      "faq.2.a": "Il massaggio delle zone vitali dura 40 minuti.",
    },
    "energizing-back-and-legs-massage": {
      title: "Massaggio energizzante schiena e gambe",
      description:
        "Massaggio mirato di schiena e gambe, ideale per liberare tensioni, migliorare la circolazione e ripristinare l'energia. Perfetto dopo viaggi, camminate o giornate intense.",
      "faq.0.q": "Quando è più benefico questo massaggio?",
      "faq.0.a": "Ideale dopo un lungo viaggio, una giornata di camminata o qualsiasi giornata fisicamente impegnativa.",
      "faq.1.q": "Quali sono i principali benefici?",
      "faq.1.a": "Libera le tensioni di schiena e gambe, migliora la circolazione e aiuta a ripristinare l'energia.",
      "faq.2.q": "Quanto dura la sessione?",
      "faq.2.a": "La sessione dura 40 minuti.",
    },
    "facial-massage-cervical-decompression": {
      title: "Massaggio facciale e decompressione cervicale",
      description:
        "Trattamento rilassante del viso con lavoro focalizzato sulla zona cervicale. Stimola la circolazione, distende i tratti e ripristina il naturale splendore della pelle.",
      "faq.0.q": "In cosa consiste la decompressione cervicale?",
      "faq.0.a": "È un lavoro dolce e focalizzato su collo e zona cervicale per liberare tensioni e migliorare il comfort.",
      "faq.1.q": "La mia pelle apparirà diversa dopo?",
      "faq.1.a": "Il massaggio stimola la circolazione e può aiutare a ripristinare un naturale splendore della pelle.",
      "faq.2.q": "Quanto dura il trattamento?",
      "faq.2.a": "La sessione di massaggio facciale e decompressione cervicale dura 60 minuti.",
    },
    "psychosomatic-back-massage": {
      title: "Massaggio psicosomatico della schiena",
      description:
        "Lavora su schiena, collo e spalle, liberando blocchi fisici ed emotivi e donando calma e equilibrio.",
      "faq.0.q": "Cos'è il massaggio psicosomatico?",
      "faq.0.a": "Un approccio che considera il legame corpo-mente, aiutando a liberare tensioni fisiche e stress emotivo accumulati nei muscoli.",
      "faq.1.q": "Quali zone vengono trattate?",
      "faq.1.a": "Il massaggio si concentra su schiena, collo e spalle.",
      "faq.2.q": "Quanto dura la sessione?",
      "faq.2.a": "Il massaggio psicosomatico della schiena dura 60 minuti.",
    },
    "japanese-lifting-kobido": {
      title: "Japanese Lifting (stile Kobido)",
      description:
        "Massaggio facciale giapponese che stimola la circolazione, tonifica la pelle e dona un effetto lifting naturale con profondo relax.",
      "faq.0.q": "Cos'è il Kobido?",
      "faq.0.a": "Il Kobido è una tecnica tradizionale giapponese di massaggio facciale che tonifica la pelle, stimola la circolazione e crea un effetto lifting naturale.",
      "faq.1.q": "È adatto a tutti i tipi di pelle?",
      "faq.1.a": "Sì, la tecnica è delicata e si adatta a diversi tipi di pelle. Possiamo discuterne prima della sessione.",
      "faq.2.q": "Quanto dura il trattamento?",
      "faq.2.a": "La sessione Japanese Lifting (stile Kobido) dura 90 minuti.",
    },
    "full-body-relaxing-massage": {
      title: "Massaggio rilassante corpo intero",
      description:
        "Un massaggio completo, fluido e avvolgente che libera le tensioni e calma la mente. Un vero momento di equilibrio e serenità.",
      "faq.0.q": "Cosa include il massaggio corpo intero?",
      "faq.0.a": "Un massaggio completo dalla testa ai piedi, con movimenti fluidi e avvolgenti per liberare tensioni e calmare la mente.",
      "faq.1.q": "Cosa posso aspettarmi?",
      "faq.1.a": "Una profonda sensazione di relax, equilibrio e serenità. Molti lo considerano uno dei trattamenti più rigeneranti.",
      "faq.2.q": "Quanto dura la sessione?",
      "faq.2.a": "Il massaggio rilassante corpo intero dura 90 minuti.",
    },
    "deep-lifting-facial-intraoral": {
      title: "Massaggio facciale Deep Lifting (intraorale)",
      description:
        "Massaggio facciale interno ed esterno che libera tensioni, rilassa la mascella e affina i contorni. Ideale per visi tesi, con effetto lifting naturale.",
      "faq.0.q": "Cosa significa intraorale?",
      "faq.0.a": "Parte del massaggio si svolge all'interno della bocca (guance e mascella) per liberare tensioni profonde e affinare i contorni del viso.",
      "faq.1.q": "È adatto se ho tensione alla mascella?",
      "faq.1.a": "Sì, questo trattamento è particolarmente benefico per liberare la tensione mascellare e rilassare i muscoli facciali.",
      "faq.2.q": "Quanto dura il trattamento?",
      "faq.2.a": "La sessione di massaggio facciale Deep Lifting (intraorale) dura 90 minuti.",
    },
    "maderotherapy-wood-therapy": {
      title: "Maderoterapia (terapia del legno)",
      description:
        "Massaggio con strumenti in legno che scolpiscono la silhouette, attivano la circolazione ed eliminano le tossine. Include drenaggio linfatico per un effetto detox visibile dalla prima sessione.",
      "faq.0.q": "Cos'è la maderoterapia?",
      "faq.0.a": "La maderoterapia usa strumenti in legno appositamente progettati per massaggiare il corpo, scolpire la silhouette e stimolare circolazione e drenaggio linfatico.",
      "faq.1.q": "Quando vedrò i risultati?",
      "faq.1.a": "Molti clienti notano un effetto detox e di modellamento visibile già dalla prima sessione.",
      "faq.2.q": "Quanto dura la sessione?",
      "faq.2.a": "La sessione di maderoterapia dura 90 minuti.",
    },
  },
};

export function getMarinaTranslation(
  locale: MarinaLocale,
  key: string
): string {
  return marinaTranslations[locale][key] ?? marinaTranslations[marinaDefaultLocale][key] ?? key;
}

export function getMarinaCategoryTranslation(
  locale: MarinaLocale,
  slug: string,
  field: string
): string {
  const cat = categoryTranslations[locale]?.[slug];
  if (!cat) {
    const fallback = categoryTranslations[marinaDefaultLocale]?.[slug];
    return fallback?.[field] ?? "";
  }
  return cat[field] ?? categoryTranslations[marinaDefaultLocale]?.[slug]?.[field] ?? "";
}
