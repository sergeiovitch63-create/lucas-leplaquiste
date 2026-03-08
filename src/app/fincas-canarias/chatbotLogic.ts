import { Product } from './data';
import type { Lang } from './data';

export interface ChatbotQuestion {
  id: number;
  question: Record<Lang, string>;
  options: Array<{
    label: Record<Lang, string>;
    keywords: string[];
    scoreWeights: Record<number, number>; // productId -> score weight
  }>;
}

export const CHATBOT_QUESTIONS: ChatbotQuestion[] = [
  {
    id: 1,
    question: {
      es: '¿Para qué ocasión buscas productos? (Pregunta 1 de 7)',
      en: 'What occasion are you looking for products? (Question 1 of 7)',
      de: 'Für welchen Anlass suchen Sie Produkte? (Frage 1 von 7)',
      fr: 'Pour quelle occasion cherchez-vous des produits ? (Question 1 sur 7)',
      it: 'Per quale occasione cerchi prodotti? (Domanda 1 di 7)',
      ru: 'Для какого случая вы ищете продукты? (Вопрос 1 из 7)',
      pl: 'Na jaką okazję szukasz produktów? (Pytanie 1 z 7)',
    },
    options: [
      {
        label: {
          es: '🎁 Un regalo',
          en: '🎁 A gift',
          de: '🎁 Ein Geschenk',
          fr: '🎁 Un cadeau',
          it: '🎁 Un regalo',
          ru: '🎁 Подарок',
          pl: '🎁 Prezent',
        },
        keywords: ['regalo', 'gift', 'cadeau', 'regalo', 'подарок', 'prezent'],
        scoreWeights: {
          16: 10, // Pack de 3 Mojos
          58: 8, // Confituras Artesanales
          26: 7, // Almogrote
        },
      },
      {
        label: {
          es: '🍽️ Para cocinar en casa',
          en: '🍽️ For cooking at home',
          de: '🍽️ Zum Kochen zu Hause',
          fr: '🍽️ Pour cuisiner à la maison',
          it: '🍽️ Per cucinare a casa',
          ru: '🍽️ Для готовки дома',
          pl: '🍽️ Do gotowania w domu',
        },
        keywords: ['cocinar', 'cooking', 'kochen', 'cuisiner', 'cucinare', 'готовка', 'gotowanie'],
        scoreWeights: {
          17: 10, // Mojo Rojo Picón
          18: 9, // Mojo Rojo Suave
          2: 8, // Chimichurri
        },
      },
      {
        label: {
          es: '🍷 Para acompañar comidas',
          en: '🍷 To accompany meals',
          de: '🍷 Zum Begleiten von Mahlzeiten',
          fr: '🍷 Pour accompagner les repas',
          it: '🍷 Per accompagnare i pasti',
          ru: '🍷 Для сопровождения блюд',
          pl: '🍷 Do towarzyszenia posiłkom',
        },
        keywords: ['acompañar', 'accompany', 'begleiten', 'accompagner', 'accompagnare', 'сопровождение', 'towarzyszenie'],
        scoreWeights: {
          3: 10, // Antipasto Mix
          4: 9, // Rabanitos
          26: 8, // Almogrote
        },
      },
    ],
  },
  {
    id: 2,
    question: {
      es: '¿Qué tipo de sabor prefieres? (Pregunta 2 de 7)',
      en: 'What type of flavor do you prefer? (Question 2 of 7)',
      de: 'Welchen Geschmack bevorzugen Sie? (Frage 2 von 7)',
      fr: 'Quel type de saveur préférez-vous ? (Question 2 sur 7)',
      it: 'Che tipo di sapore preferisci? (Domanda 2 di 7)',
      ru: 'Какой вкус вы предпочитаете? (Вопрос 2 из 7)',
      pl: 'Jaki smak preferujesz? (Pytanie 2 z 7)',
    },
    options: [
      {
        label: {
          es: '🌶️ Picante',
          en: '🌶️ Spicy',
          de: '🌶️ Scharf',
          fr: '🌶️ Épicé',
          it: '🌶️ Piccante',
          ru: '🌶️ Острое',
          pl: '🌶️ Pikantne',
        },
        keywords: ['picante', 'spicy', 'scharf', 'épicé', 'piccante', 'острый', 'pikantny'],
        scoreWeights: {
          1: 10, // Pimienta Puta Madre
          17: 9, // Mojo Rojo Picón
          27: 8, // Sol Picón
          28: 8, // Guayota
        },
      },
      {
        label: {
          es: '🍯 Dulce',
          en: '🍯 Sweet',
          de: '🍯 Süß',
          fr: '🍯 Sucré',
          it: '🍯 Dolce',
          ru: '🍯 Сладкое',
          pl: '🍯 Słodkie',
        },
        keywords: ['dulce', 'sweet', 'süß', 'sucré', 'dolce', 'сладкий', 'słodki'],
        scoreWeights: {
          10: 10, // Dulce de Plátano
          33: 9, // Miel de Tajinaste
          58: 8, // Confituras Artesanales
        },
      },
      {
        label: {
          es: '🧂 Salado',
          en: '🧂 Salty',
          de: '🧂 Salzig',
          fr: '🧂 Salé',
          it: '🧂 Salato',
          ru: '🧂 Соленое',
          pl: '🧂 Słone',
        },
        keywords: ['salado', 'salty', 'salzig', 'salé', 'salato', 'соленый', 'słony'],
        scoreWeights: {
          3: 10, // Antipasto Mix
          4: 9, // Rabanitos
          26: 8, // Almogrote
        },
      },
    ],
  },
  {
    id: 3,
    question: {
      es: '¿Tienes alguna restricción dietética? (Pregunta 3 de 7)',
      en: 'Do you have any dietary restrictions? (Question 3 of 7)',
      de: 'Haben Sie diätetische Einschränkungen? (Frage 3 von 7)',
      fr: 'Avez-vous des restrictions alimentaires ? (Question 3 sur 7)',
      it: 'Hai restrizioni dietetiche? (Domanda 3 di 7)',
      ru: 'Есть ли у вас диетические ограничения? (Вопрос 3 из 7)',
      pl: 'Czy masz jakieś ograniczenia dietetyczne? (Pytanie 3 z 7)',
    },
    options: [
      {
        label: {
          es: '🌱 Sin gluten',
          en: '🌱 Gluten-free',
          de: '🌱 Glutenfrei',
          fr: '🌱 Sans gluten',
          it: '🌱 Senza glutine',
          ru: '🌱 Без глютена',
          pl: '🌱 Bez glutenu',
        },
        keywords: ['sin gluten', 'gluten-free', 'glutenfrei', 'sans gluten', 'senza glutine', 'без глютена', 'bez glutenu'],
        scoreWeights: {
          16: 10, // Pack de 3 Mojos (sin gluten)
          17: 9, // Mojo Rojo Picón (sin gluten)
          19: 8, // Merengues (sin gluten)
        },
      },
      {
        label: {
          es: '🌿 Vegano',
          en: '🌿 Vegan',
          de: '🌿 Vegan',
          fr: '🌿 Végétalien',
          it: '🌿 Vegano',
          ru: '🌿 Веган',
          pl: '🌿 Wegańskie',
        },
        keywords: ['vegano', 'vegan', 'vegan', 'végétalien', 'vegano', 'веган', 'wegański'],
        scoreWeights: {
          10: 10, // Dulce de Plátano (vegano)
          11: 9, // Crema de Vinagre (vegano)
          33: 8, // Miel (no es vegano, pero es natural)
        },
      },
      {
        label: {
          es: '✅ Sin restricciones',
          en: '✅ No restrictions',
          de: '✅ Keine Einschränkungen',
          fr: '✅ Aucune restriction',
          it: '✅ Nessuna restrizione',
          ru: '✅ Без ограничений',
          pl: '✅ Bez ograniczeń',
        },
        keywords: ['sin restricciones', 'no restrictions', 'keine einschränkungen', 'aucune restriction', 'nessuna restrizione', 'без ограничений', 'bez ograniczeń'],
        scoreWeights: {}, // No specific weights
      },
    ],
  },
  {
    id: 4,
    question: {
      es: '¿Qué tipo de producto te interesa más? (Pregunta 4 de 7)',
      en: 'What type of product interests you most? (Question 4 of 7)',
      de: 'Welche Art von Produkt interessiert Sie am meisten? (Frage 4 von 7)',
      fr: 'Quel type de produit vous intéresse le plus ? (Question 4 sur 7)',
      it: 'Che tipo di prodotto ti interessa di più? (Domanda 4 di 7)',
      ru: 'Какой тип продукта вас больше всего интересует? (Вопрос 4 из 7)',
      pl: 'Jaki rodzaj produktu najbardziej Cię interesuje? (Pytanie 4 z 7)',
    },
    options: [
      {
        label: {
          es: '🍯 Miel y dulces',
          en: '🍯 Honey and sweets',
          de: '🍯 Honig und Süßigkeiten',
          fr: '🍯 Miel et douceurs',
          it: '🍯 Miele e dolci',
          ru: '🍯 Мед и сладости',
          pl: '🍯 Miód i słodycze',
        },
        keywords: ['miel', 'honey', 'honig', 'miel', 'miele', 'мед', 'miód'],
        scoreWeights: {
          33: 10, // Miel de Tajinaste
          34: 9, // Miel con Jalea Real
          10: 8, // Dulce de Plátano
        },
      },
      {
        label: {
          es: '🍷 Vinos y licores',
          en: '🍷 Wines and liqueurs',
          de: '🍷 Weine und Liköre',
          fr: '🍷 Vins et liqueurs',
          it: '🍷 Vini e liquori',
          ru: '🍷 Вина и ликеры',
          pl: '🍷 Wina i likiery',
        },
        keywords: ['vino', 'wine', 'wein', 'vin', 'vino', 'вино', 'wino'],
        scoreWeights: {
          13: 10, // Vino Pasión Frizzante
          38: 9, // Ocho Islas Tinto Roble
          57: 8, // Licor de Higos de Fasnia
        },
      },
      {
        label: {
          es: '🌶️ Salsas y condimentos',
          en: '🌶️ Sauces and condiments',
          de: '🌶️ Saucen und Gewürze',
          fr: '🌶️ Sauces et condiments',
          it: '🌶️ Salse e condimenti',
          ru: '🌶️ Соусы и приправы',
          pl: '🌶️ Sosy i przyprawy',
        },
        keywords: ['salsa', 'sauce', 'sauce', 'sauce', 'salsa', 'соус', 'sos'],
        scoreWeights: {
          17: 10, // Mojo Rojo Picón
          18: 9, // Mojo Rojo Suave
          26: 8, // Almogrote
        },
      },
      {
        label: {
          es: '🥫 Conservas',
          en: '🥫 Preserves',
          de: '🥫 Konserven',
          fr: '🥫 Conserves',
          it: '🥫 Conserve',
          ru: '🥫 Консервы',
          pl: '🥫 Konserwy',
        },
        keywords: ['conserva', 'preserve', 'konserve', 'conserve', 'conserva', 'консерва', 'konserwa'],
        scoreWeights: {
          3: 10, // Antipasto Mix
          4: 9, // Rabanitos
          7: 8, // Remolachas
        },
      },
    ],
  },
  {
    id: 5,
    question: {
      es: '¿Qué intensidad de sabor prefieres? (Pregunta 5 de 7)',
      en: 'What flavor intensity do you prefer? (Question 5 of 7)',
      de: 'Welche Geschmacksintensität bevorzugen Sie? (Frage 5 von 7)',
      fr: 'Quelle intensité de saveur préférez-vous ? (Question 5 sur 7)',
      it: 'Che intensità di sapore preferisci? (Domanda 5 di 7)',
      ru: 'Какую интенсивность вкуса вы предпочитаете? (Вопрос 5 из 7)',
      pl: 'Jaką intensywność smaku preferujesz? (Pytanie 5 z 7)',
    },
    options: [
      {
        label: {
          es: '🔥 Muy intenso',
          en: '🔥 Very intense',
          de: '🔥 Sehr intensiv',
          fr: '🔥 Très intense',
          it: '🔥 Molto intenso',
          ru: '🔥 Очень интенсивный',
          pl: '🔥 Bardzo intensywny',
        },
        keywords: ['muy intenso', 'very intense', 'sehr intensiv', 'très intense', 'molto intenso', 'очень интенсивный', 'bardzo intensywny'],
        scoreWeights: {
          1: 10, // Pimienta Puta Madre
          17: 9, // Mojo Rojo Picón
          27: 8, // Sol Picón
        },
      },
      {
        label: {
          es: '⚡ Moderado',
          en: '⚡ Moderate',
          de: '⚡ Mäßig',
          fr: '⚡ Modéré',
          it: '⚡ Moderato',
          ru: '⚡ Умеренный',
          pl: '⚡ Umiarkowany',
        },
        keywords: ['moderado', 'moderate', 'mäßig', 'modéré', 'moderato', 'умеренный', 'umiarkowany'],
        scoreWeights: {
          18: 10, // Mojo Rojo Suave
          8: 9, // Pimienta Palmera
          2: 8, // Chimichurri
        },
      },
      {
        label: {
          es: '😊 Suave',
          en: '😊 Mild',
          de: '😊 Mild',
          fr: '😊 Doux',
          it: '😊 Dolce',
          ru: '😊 Мягкий',
          pl: '😊 Łagodny',
        },
        keywords: ['suave', 'mild', 'mild', 'doux', 'dolce', 'мягкий', 'łagodny'],
        scoreWeights: {
          33: 10, // Miel de Tajinaste
          10: 9, // Dulce de Plátano
          5: 8, // Pimiento Redondo
        },
      },
    ],
  },
  {
    id: 6,
    question: {
      es: '¿Es para ti o para regalar? (Pregunta 6 de 7)',
      en: 'Is it for you or as a gift? (Question 6 of 7)',
      de: 'Ist es für Sie oder als Geschenk? (Frage 6 von 7)',
      fr: 'Est-ce pour vous ou pour offrir ? (Question 6 sur 7)',
      it: 'È per te o da regalare? (Domanda 6 di 7)',
      ru: 'Это для вас или в подарок? (Вопрос 6 из 7)',
      pl: 'To dla Ciebie czy na prezent? (Pytanie 6 z 7)',
    },
    options: [
      {
        label: {
          es: '🎁 Para regalar',
          en: '🎁 As a gift',
          de: '🎁 Als Geschenk',
          fr: '🎁 En cadeau',
          it: '🎁 Da regalare',
          ru: '🎁 В подарок',
          pl: '🎁 Na prezent',
        },
        keywords: ['regalar', 'gift', 'geschenk', 'cadeau', 'regalare', 'подарок', 'prezent'],
        scoreWeights: {
          16: 10, // Pack de 3 Mojos
          58: 9, // Confituras Artesanales (pack)
          26: 8, // Almogrote (pack degustación)
        },
      },
      {
        label: {
          es: '👤 Para mí',
          en: '👤 For me',
          de: '👤 Für mich',
          fr: '👤 Pour moi',
          it: '👤 Per me',
          ru: '👤 Для меня',
          pl: '👤 Dla mnie',
        },
        keywords: ['para mí', 'for me', 'für mich', 'pour moi', 'per me', 'для меня', 'dla mnie'],
        scoreWeights: {}, // No specific weights
      },
    ],
  },
  {
    id: 7,
    question: {
      es: '¿Prefieres un pack o productos individuales? (Pregunta 7 de 7)',
      en: 'Do you prefer a pack or individual products? (Question 7 of 7)',
      de: 'Bevorzugen Sie ein Paket oder einzelne Produkte? (Frage 7 von 7)',
      fr: 'Préférez-vous un pack ou des produits individuels ? (Question 7 sur 7)',
      it: 'Preferisci un pack o prodotti singoli? (Domanda 7 di 7)',
      ru: 'Вы предпочитаете набор или отдельные продукты? (Вопрос 7 из 7)',
      pl: 'Wolisz pakiet czy pojedyncze produkty? (Pytanie 7 z 7)',
    },
    options: [
      {
        label: {
          es: '📦 Pack',
          en: '📦 Pack',
          de: '📦 Paket',
          fr: '📦 Pack',
          it: '📦 Pack',
          ru: '📦 Набор',
          pl: '📦 Pakiet',
        },
        keywords: ['pack', 'pack', 'paket', 'pack', 'pack', 'набор', 'pakiet'],
        scoreWeights: {
          16: 10, // Pack de 3 Mojos
          26: 9, // Almogrote (pack degustación)
        },
      },
      {
        label: {
          es: '🛍️ Productos individuales',
          en: '🛍️ Individual products',
          de: '🛍️ Einzelne Produkte',
          fr: '🛍️ Produits individuels',
          it: '🛍️ Prodotti singoli',
          ru: '🛍️ Отдельные продукты',
          pl: '🛍️ Pojedyncze produkty',
        },
        keywords: ['individual', 'individual', 'einzeln', 'individuel', 'singolo', 'отдельный', 'pojedynczy'],
        scoreWeights: {}, // No specific weights
      },
    ],
  },
];

export function calculateProductScores(
  answers: string[],
  lang: Lang,
  products: Product[]
): Map<number, number> {
  const scores = new Map<number, number>();

  // Initialize all products with base score
  products.forEach((p) => {
    scores.set(p.id, 0);
  });

  // Process each answer
  answers.forEach((answer, questionIndex) => {
    if (questionIndex >= CHATBOT_QUESTIONS.length) return;

    const question = CHATBOT_QUESTIONS[questionIndex];
    const answerLower = answer.toLowerCase();

    // Find matching option
    const matchingOption = question.options.find((opt) =>
      opt.keywords.some((kw) => answerLower.includes(kw.toLowerCase()))
    );

    if (matchingOption) {
      // Add scores from this option
      Object.entries(matchingOption.scoreWeights).forEach(([productId, weight]) => {
        const id = parseInt(productId);
        const currentScore = scores.get(id) || 0;
        scores.set(id, currentScore + weight);
      });
    }
  });

  return scores;
}

export function getRecommendedProducts(
  answers: string[],
  lang: Lang,
  count: number = 3,
  products: Product[]
): Product[] {
  const scores = calculateProductScores(answers, lang, products);

  // Sort products by score
  const sortedProducts = Array.from(scores.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([id]) => products.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  // If we don't have enough high-scoring products, add some popular ones
  if (sortedProducts.length < count) {
    const popularIds = [16, 17, 18, 26, 33, 58]; // Popular products
    const existingIds = new Set(sortedProducts.map((p) => p.id));

    for (const id of popularIds) {
      if (sortedProducts.length >= count) break;
      if (!existingIds.has(id)) {
        const product = products.find((p) => p.id === id);
        if (product) {
          sortedProducts.push(product);
          existingIds.add(id);
        }
      }
    }
  }

  return sortedProducts.slice(0, count);
}

