// chatbot.js — Fincas Canarias v2
(function () {

  const SYSTEM_PROMPT = `Eres el asistente personal de Fincas Canarias, una tienda de productos artesanales y auténticos de las Islas Canarias con tienda física en Tenerife.

Tu personalidad: cálido, apasionado por los productos canarios, experto, cercano. Hablas como un amigo que conoce muy bien la tienda. Usas emojis con moderación. Eres multilingüe: respondes en el idioma que usa el cliente (español, inglés, alemán, francés...).

Tu misión: ayudar al cliente a encontrar el producto perfecto según sus gustos, necesidades o la persona a quien va destinado el regalo.

ESTRATEGIA DE CONVERSACIÓN — MUY IMPORTANTE:
1. Saluda brevemente y haz UNA sola pregunta para entender la necesidad
2. Haz máximo 2-3 preguntas de seguimiento, UNA POR VEZ (¿le gusta el picante? ¿dulce o salado? ¿para aperitivo?)
3. Cuando tengas suficiente info, propón exactamente 2 o 3 productos
4. AL FINAL de tu recomendación añade OBLIGATORIAMENTE: [PRODUCTOS_RECOMENDADOS: ID1, ID2, ID3]

CATÁLOGO COMPLETO:
Pimienta Puta Madre=1, Chimichurri=2, Antipasto Mix=3, Rabanitos=4, Pimiento Redondo=5, Zanahoria=6, Remolachas=7, Pimienta Palmera=8, Berenjena=9, Dulce de Plátano=10, Crema de Vinagre=11, Vinagre de Plátano=12, Vino Pasión Frizzante=13, Vino Afrutado Semidulce de Plátano=14, Vino Blanco Semiseco de Plátano=15, Pack de 3 Mojos=16, Mojo Rojo Picón=17, Mojo Rojo Suave=18, Merengues=19, Galleta Ginger=20, Galleta Choco Nueces=21, Galleta Estilo Gomera=22, Adobo Gomero=23, Mojo Gomero de Picón=24, Mojo Gomero de Cilantro=25, Almogrote=26, Sol Picón=27, Guayota=28, Pimentón Picante=29, Palmera Ginger Roja Bio=30, Mojo Picón=31, Sal con Pimienta=32, Miel de Tajinaste=33, Miel con Jalea Real=34, Miel con Polen=35, Zum 4=36, Miel de Tenerife=37, Ocho Islas Tinto Roble=38, La Suertita Blanco Afrutado=39, La Suertita Blanco Seco=40, Barrita Plátano Avellanas Chocolate=41, Barrita Plátano Almendras Chocolate=42, Bombón Plátano Chocolate Avellanas=43, Bombón Plátano Chocolate Cacahuetes=44, Plátano Deshidratado Chocolate Negro=45, Plátano Deshidratado Cacao Puro=46, Plátano Deshidratado Gofio=47, Plátano Deshidratado Canela=48, Plátano Deshidratado Natural=49, Galleta Chocolate Almendras Avellanas=50, Galleta Almendras Coco Chocolate Blanco=51, Aceite Oliva Pimienta=52, Vinagre Vino Pimienta=53, Pimienta Seca=54, Concentrado Tuno Indio=55, Concentrado Maracuyá=56, Licor Higos Fasnia=57, Confituras Artesanales=58, Aliño Frambuesa=59, Aliño Albahaca=60, Aliño Almogrote=61, Dulce Higos Fasnia=62, Mermelada Higos Fasnia=63, Vento Tinto Vendimia=64, Vento Tinto Barrica=65, Vento Tinto Joven=66, Vento Rosado Joven=67, Vento Blanco Afrutado=68, Vento Blanco Seco=69, Rosquetas Vino Oliva=70, Torta Almendra=71, Bizcochos=72, Mantecados=73, Torta Coco=74, Roscos Almendras=75, Torta Almendras=76, Dedos Santo=77, Plátano Frito=78

Reglas:
- Nunca inventes productos fuera del catálogo
- Si preguntan precios: disponibles en tienda
- Respuestas cortas máx 5 líneas
- Siempre termina con [PRODUCTOS_RECOMENDADOS: X, X, X] cuando hagas recomendación final`;

  // ── MASCOT SVG ──
  const MASCOT = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sk${size}" cx="45%" cy="38%" r="60%"><stop offset="0%" stop-color="#FDDCB0"/><stop offset="100%" stop-color="#F5B87A"/></radialGradient>
      <radialGradient id="hr${size}" cx="50%" cy="30%" r="70%"><stop offset="0%" stop-color="#3D1F0A"/><stop offset="100%" stop-color="#1A0A02"/></radialGradient>
      <linearGradient id="sh${size}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c9963a"/><stop offset="100%" stop-color="#7a4a10"/></linearGradient>
      <radialGradient id="bl${size}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#F08060" stop-opacity="0.5"/><stop offset="100%" stop-color="#F08060" stop-opacity="0"/></radialGradient>
    </defs>
    <ellipse cx="50" cy="116" rx="22" ry="4.5" fill="rgba(0,0,0,0.2)">
      <animate attributeName="rx" values="22;18;22" dur="1.8s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.2;0.1;0.2" dur="1.8s" repeatCount="indefinite"/>
    </ellipse>
    <g>
      <animateTransform attributeName="transform" type="translate" values="0,0;0,-6;0,0" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0.05 0.55 0.95;0.45 0.05 0.55 0.95"/>
      <!-- Legs -->
      <rect x="36" y="96" width="11" height="17" rx="5.5" fill="#2d1a0e">
        <animateTransform attributeName="transform" type="rotate" values="0 41 96;4 41 96;0 41 96;-4 41 96;0 41 96" dur="1.8s" repeatCount="indefinite"/>
      </rect>
      <rect x="53" y="96" width="11" height="17" rx="5.5" fill="#2d1a0e">
        <animateTransform attributeName="transform" type="rotate" values="0 59 96;-4 59 96;0 59 96;4 59 96;0 59 96" dur="1.8s" repeatCount="indefinite"/>
      </rect>
      <ellipse cx="41" cy="113" rx="8" ry="4" fill="#1a0a02"/>
      <ellipse cx="59" cy="113" rx="8" ry="4" fill="#1a0a02"/>
      <!-- Body -->
      <path d="M28 70 Q28 58 50 58 Q72 58 72 70 L72 98 Q72 102 68 102 L32 102 Q28 102 28 98 Z" fill="url(#sh${size})"/>
      <path d="M44 58 L50 66 L56 58" fill="none" stroke="rgba(255,220,120,0.4)" stroke-width="1.5" stroke-linejoin="round"/>
      <line x1="50" y1="68" x2="50" y2="95" stroke="rgba(255,220,120,0.3)" stroke-width="1" stroke-dasharray="2,3"/>
      <!-- Arms -->
      <g><animateTransform attributeName="transform" type="rotate" values="-8 28 68;-18 28 68;-8 28 68" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0.05 0.55 0.95;0.45 0.05 0.55 0.95"/>
        <path d="M30 68 Q18 73 14 83" stroke="url(#sk${size})" stroke-width="9" stroke-linecap="round" fill="none"/>
        <circle cx="13" cy="85" r="5.5" fill="url(#sk${size})"/>
        <circle cx="10" cy="82" r="2.5" fill="url(#sk${size})"/>
        <circle cx="16" cy="81" r="2.5" fill="url(#sk${size})"/>
      </g>
      <g><animateTransform attributeName="transform" type="rotate" values="8 72 68;18 72 68;8 72 68" dur="1.8s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0.05 0.55 0.95;0.45 0.05 0.55 0.95"/>
        <path d="M70 68 Q82 73 86 83" stroke="url(#sk${size})" stroke-width="9" stroke-linecap="round" fill="none"/>
        <circle cx="87" cy="85" r="5.5" fill="url(#sk${size})"/>
        <circle cx="84" cy="81" r="2.5" fill="url(#sk${size})"/>
        <circle cx="90" cy="82" r="2.5" fill="url(#sk${size})"/>
      </g>
      <!-- Neck -->
      <rect x="44" y="50" width="12" height="10" rx="4" fill="url(#sk${size})"/>
      <!-- Head -->
      <ellipse cx="50" cy="38" rx="22" ry="24" fill="url(#sk${size})"/>
      <!-- Hair -->
      <ellipse cx="50" cy="18" rx="22" ry="12" fill="url(#hr${size})"/>
      <path d="M28 28 Q28 10 50 12 Q72 10 72 28" fill="url(#hr${size})"/>
      <path d="M44 12 Q50 4 56 12" fill="url(#hr${size})"/>
      <ellipse cx="42" cy="17" rx="5" ry="2.5" fill="white" opacity="0.1" transform="rotate(-20 42 17)"/>
      <!-- Ears -->
      <ellipse cx="28" cy="38" rx="5" ry="7" fill="url(#sk${size})"/>
      <ellipse cx="28" cy="38" rx="3" ry="4.5" fill="#F0A070" opacity="0.35"/>
      <ellipse cx="72" cy="38" rx="5" ry="7" fill="url(#sk${size})"/>
      <ellipse cx="72" cy="38" rx="3" ry="4.5" fill="#F0A070" opacity="0.35"/>
      <!-- Eyebrows -->
      <path d="M36 26 Q40 23 44 26" stroke="#3D1F0A" stroke-width="2" stroke-linecap="round" fill="none">
        <animate attributeName="d" values="M36 26 Q40 23 44 26;M36 24 Q40 22 44 24;M36 26 Q40 23 44 26" dur="4s" repeatCount="indefinite"/>
      </path>
      <path d="M56 26 Q60 23 64 26" stroke="#3D1F0A" stroke-width="2" stroke-linecap="round" fill="none">
        <animate attributeName="d" values="M56 26 Q60 23 64 26;M56 24 Q60 22 64 24;M56 26 Q60 23 64 26" dur="4s" repeatCount="indefinite"/>
      </path>
      <!-- Eyes -->
      <ellipse cx="40" cy="34" rx="6" ry="7" fill="white"/>
      <ellipse cx="60" cy="34" rx="6" ry="7" fill="white"/>
      <circle cx="40" cy="35" r="4" fill="#4A2810"/><circle cx="40" cy="35" r="2.6" fill="#1A0A02"/>
      <circle cx="60" cy="35" r="4" fill="#4A2810"/><circle cx="60" cy="35" r="2.6" fill="#1A0A02"/>
      <circle cx="42" cy="33" r="1.3" fill="white" opacity="0.9"/>
      <circle cx="62" cy="33" r="1.3" fill="white" opacity="0.9"/>
      <circle cx="39" cy="36" r="0.6" fill="white" opacity="0.4"/>
      <circle cx="59" cy="36" r="0.6" fill="white" opacity="0.4"/>
      <!-- Blink -->
      <ellipse cx="40" cy="34" rx="6" ry="0.3" fill="url(#sk${size})" opacity="0">
        <animate attributeName="ry" values="0.3;7;0.3" dur="0.18s" begin="3s;7.5s;13s" fill="freeze"/>
        <animate attributeName="opacity" values="0;1;0" dur="0.18s" begin="3s;7.5s;13s" fill="freeze"/>
      </ellipse>
      <ellipse cx="60" cy="34" rx="6" ry="0.3" fill="url(#sk${size})" opacity="0">
        <animate attributeName="ry" values="0.3;7;0.3" dur="0.18s" begin="3s;7.5s;13s" fill="freeze"/>
        <animate attributeName="opacity" values="0;1;0" dur="0.18s" begin="3s;7.5s;13s" fill="freeze"/>
      </ellipse>
      <!-- Cheeks -->
      <ellipse cx="33" cy="42" rx="6" ry="4" fill="url(#bl${size})"/>
      <ellipse cx="67" cy="42" rx="6" ry="4" fill="url(#bl${size})"/>
      <!-- Nose -->
      <ellipse cx="50" cy="42" rx="3" ry="2.5" fill="#E8956A" opacity="0.55"/>
      <!-- Mouth -->
      <path d="M41 50 Q50 57 59 50" stroke="#C05030" stroke-width="2.2" stroke-linecap="round" fill="none">
        <animate attributeName="d" values="M41 50 Q50 57 59 50;M42 49 Q50 55 58 49;M41 50 Q50 57 59 50" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M43 50 Q50 55 57 50 L56 52 Q50 57 44 52 Z" fill="white" opacity="0.85">
        <animate attributeName="d" values="M43 50 Q50 55 57 50 L56 52 Q50 57 44 52 Z;M43 49 Q50 54 57 49 L56 51 Q50 56 44 51 Z;M43 50 Q50 55 57 50 L56 52 Q50 57 44 52 Z" dur="3s" repeatCount="indefinite"/>
      </path>
      <!-- Sparkles -->
      <circle cx="20" cy="18" r="1.5" fill="#c9963a" opacity="0">
        <animate attributeName="opacity" values="0;0.8;0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0,0;-2,-4;0,0" dur="2.5s" begin="0.5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="80" cy="22" r="1.8" fill="#e8b85a" opacity="0">
        <animate attributeName="opacity" values="0;0.7;0" dur="2.8s" begin="1.2s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0,0;2,-4;0,0" dur="2.8s" begin="1.2s" repeatCount="indefinite"/>
      </circle>
      <circle cx="77" cy="56" r="1.2" fill="#c9963a" opacity="0">
        <animate attributeName="opacity" values="0;0.6;0" dur="2.2s" begin="0.9s" repeatCount="indefinite"/>
        <animateTransform attributeName="transform" type="translate" values="0,0;3,2;0,0" dur="2.2s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
    </g>
  </svg>`;

  const PH_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>`;

  const CAT_ES = { Biscuits:'Galletas', Snacks:'Snacks', Confitures:'Confitures', Miel:'Miel', Sauces:'Salsas', Conserves:'Conservas', Vins:'Vinos', Packs:'Packs' };

  let messages = [], isOpen = false, isTyping = false;

  // ── STYLES ──
  const S = document.createElement('style');
  S.textContent = `
  #fc-btn{position:fixed;bottom:28px;right:28px;z-index:9998;width:66px;height:66px;border-radius:50%;background:linear-gradient(135deg,#c9963a,#e8b85a);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s;animation:fc-p 3s ease infinite;overflow:hidden;}
  #fc-btn:hover{transform:scale(1.09);}
  #fc-btn.open{animation:none;background:linear-gradient(135deg,#2d1a0e,#3d2314);}
  @keyframes fc-p{0%,100%{box-shadow:0 4px 24px rgba(201,150,58,.5),0 0 0 0 rgba(201,150,58,.3);}50%{box-shadow:0 4px 24px rgba(201,150,58,.5),0 0 0 14px rgba(201,150,58,0);}}
  .fc-io{display:flex;}.fc-ix{display:none;}
  #fc-btn.open .fc-io{display:none;}#fc-btn.open .fc-ix{display:flex;}

  #fc-bub{position:fixed;bottom:106px;right:28px;z-index:9997;background:linear-gradient(135deg,#c9963a,#e8b85a);color:#1a0f08;font-family:'Lato',sans-serif;font-size:.77rem;font-weight:700;padding:8px 14px;border-radius:20px 20px 4px 20px;white-space:nowrap;pointer-events:none;box-shadow:0 4px 16px rgba(201,150,58,.4);animation:fc-bi .4s ease 1.8s both;transition:opacity .3s,transform .3s;}
  #fc-bub.hidden{opacity:0;transform:scale(.85);}
  @keyframes fc-bi{from{opacity:0;transform:translateY(8px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}

  #fc-win{position:fixed;bottom:108px;right:28px;z-index:9997;width:365px;max-height:calc(100vh - 150px);background:#160e06;border:1px solid rgba(201,150,58,.22);border-radius:20px;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.75);transform:scale(.88) translateY(24px);opacity:0;pointer-events:none;transition:all .28s cubic-bezier(.34,1.56,.64,1);}
  #fc-win.open{transform:scale(1) translateY(0);opacity:1;pointer-events:all;}
  @media(max-width:440px){#fc-win{width:calc(100vw - 20px);right:10px;bottom:92px;}}

  .fc-hd{padding:14px 18px;border-bottom:1px solid rgba(201,150,58,.13);display:flex;align-items:center;gap:12px;background:linear-gradient(135deg,rgba(201,150,58,.1),rgba(201,150,58,.03));border-radius:20px 20px 0 0;flex-shrink:0;}
  .fc-hd-av{width:44px;height:44px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#c9963a,#e8b85a);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 3px rgba(201,150,58,.2);overflow:hidden;}
  .fc-hd-nm{font-family:'Playfair Display',serif;font-size:.92rem;color:#f0e0c0;}
  .fc-hd-st{font-size:.67rem;color:#7a5a3a;margin-top:2px;display:flex;align-items:center;gap:5px;}
  .fc-dot{width:6px;height:6px;border-radius:50%;background:#27ae60;flex-shrink:0;animation:fc-dp 2s ease infinite;}
  @keyframes fc-dp{0%,100%{opacity:1}50%{opacity:.4}}

  .fc-msgs{flex:1;overflow-y:auto;padding:14px 12px;display:flex;flex-direction:column;gap:10px;scrollbar-width:thin;scrollbar-color:rgba(201,150,58,.15) transparent;}
  .fc-msgs::-webkit-scrollbar{width:3px;}.fc-msgs::-webkit-scrollbar-thumb{background:rgba(201,150,58,.2);border-radius:2px;}

  .fc-msg{display:flex;gap:8px;max-width:90%;animation:fc-mi .22s ease;}
  @keyframes fc-mi{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}
  .fc-msg.bot{align-self:flex-start;}.fc-msg.user{align-self:flex-end;flex-direction:row-reverse;}
  .fc-av{width:28px;height:28px;border-radius:50%;flex-shrink:0;margin-top:2px;background:linear-gradient(135deg,#c9963a,#e8b85a);display:flex;align-items:center;justify-content:center;overflow:hidden;}
  .fc-msg.user .fc-av{background:rgba(201,150,58,.15);border:1px solid rgba(201,150,58,.25);}
  .fc-bb{padding:9px 13px;border-radius:16px;font-size:.82rem;line-height:1.55;font-family:'Lato',sans-serif;}
  .fc-msg.bot .fc-bb{background:rgba(201,150,58,.09);border:1px solid rgba(201,150,58,.14);color:#f0e0c0;border-radius:4px 16px 16px 16px;}
  .fc-msg.user .fc-bb{background:linear-gradient(135deg,#c9963a,#e8b85a);color:#1a0f08;font-weight:600;border-radius:16px 4px 16px 16px;}

  .fc-ty{display:flex;gap:4px;padding:10px 13px;align-items:center;}
  .fc-ty span{width:6px;height:6px;border-radius:50%;background:#c9963a;opacity:.35;animation:fc-bo 1.2s ease infinite;}
  .fc-ty span:nth-child(2){animation-delay:.2s;}.fc-ty span:nth-child(3){animation-delay:.4s;}
  @keyframes fc-bo{0%,60%,100%{transform:translateY(0);opacity:.35}30%{transform:translateY(-7px);opacity:1}}

  .fc-qr{display:flex;flex-wrap:wrap;gap:6px;padding:0 12px 8px;flex-shrink:0;}
  .fc-qb{background:rgba(201,150,58,.08);border:1px solid rgba(201,150,58,.22);color:#c9963a;font-family:'Lato',sans-serif;font-size:.7rem;font-weight:700;padding:5px 11px;border-radius:20px;cursor:pointer;transition:all .18s;white-space:nowrap;}
  .fc-qb:hover{background:rgba(201,150,58,.2);border-color:#c9963a;}

  .fc-ir{padding:10px 12px;border-top:1px solid rgba(201,150,58,.1);display:flex;gap:8px;align-items:flex-end;flex-shrink:0;}
  #fc-in{flex:1;background:rgba(201,150,58,.06);border:1px solid rgba(201,150,58,.18);border-radius:18px;color:#f0e0c0;font-family:'Lato',sans-serif;font-size:.82rem;padding:9px 14px;outline:none;resize:none;max-height:80px;transition:border-color .2s;line-height:1.4;}
  #fc-in:focus{border-color:rgba(201,150,58,.45);}#fc-in::placeholder{color:#5a3a1a;}
  #fc-sd{width:36px;height:36px;border-radius:50%;flex-shrink:0;background:linear-gradient(135deg,#c9963a,#e8b85a);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .2s,opacity .2s;}
  #fc-sd:hover{transform:scale(1.1);}#fc-sd:disabled{opacity:.35;cursor:not-allowed;transform:none;}
  #fc-sd svg{width:15px;height:15px;color:#1a0f08;}

  /* ── PRODUCT CARDS IN CHAT ── */
  .fc-cards-wrap{align-self:flex-start;width:calc(100% - 36px);margin-left:36px;animation:fc-mi .3s ease .1s both;}
  .fc-cards-title{font-size:.63rem;letter-spacing:.18em;text-transform:uppercase;color:#c9963a;margin-bottom:8px;font-family:'Lato',sans-serif;font-weight:700;}
  .fc-cards{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  .fc-cards.one .fc-card{grid-column:1/-1;}
  .fc-cards.three .fc-card:last-child{grid-column:1/-1;}
  .fc-card{background:#241508;border:1px solid rgba(201,150,58,.18);border-radius:10px;overflow:hidden;cursor:pointer;transition:transform .2s,border-color .2s,box-shadow .2s;}
  .fc-card:hover{transform:translateY(-3px);border-color:rgba(201,150,58,.5);box-shadow:0 8px 24px rgba(0,0,0,.4);}
  .fc-card-img{aspect-ratio:1;background:linear-gradient(135deg,#3d2314,#2d1a0e);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
  .fc-card-img img{width:100%;height:100%;object-fit:cover;transition:transform .4s;}
  .fc-card:hover .fc-card-img img{transform:scale(1.06);}
  .fc-ph{width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(201,150,58,.22);}
  .fc-ph svg{width:28px;height:28px;}
  .fc-ctag{position:absolute;top:6px;left:6px;background:rgba(10,5,2,.85);border:1px solid rgba(201,150,58,.35);color:#f5d98a;font-size:.52rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:2px 6px;border-radius:10px;}
  .fc-card-body{padding:8px 10px;}
  .fc-card-name{font-family:'Playfair Display',serif;font-size:.78rem;color:#f9f0e0;line-height:1.3;margin-bottom:3px;}
  .fc-card-sub{font-size:.63rem;color:#c9963a;font-style:italic;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
  `;
  document.head.appendChild(S);

  // ── DOM ──
  const bub = document.createElement('div');
  bub.id = 'fc-bub'; bub.textContent = '¿Cómo puedo ayudarte? 👋';
  document.body.appendChild(bub);

  const btn = document.createElement('button');
  btn.id = 'fc-btn'; btn.setAttribute('aria-label','Asistente');
  btn.innerHTML = `<span class="fc-io">${MASCOT(42)}</span><span class="fc-ix"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#c9963a" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span>`;
  document.body.appendChild(btn);

  const win = document.createElement('div');
  win.id = 'fc-win';
  win.innerHTML = `
    <div class="fc-hd">
      <div class="fc-hd-av">${MASCOT(44)}</div>
      <div><div class="fc-hd-nm">Asistente Fincas Canarias</div>
      <div class="fc-hd-st"><span class="fc-dot"></span> En línea · Listo para ayudarte</div></div>
    </div>
    <div class="fc-msgs" id="fc-msgs"></div>
    <div class="fc-qr" id="fc-qr"></div>
    <div class="fc-ir">
      <textarea id="fc-in" placeholder="Escribe tu pregunta…" rows="1"></textarea>
      <button id="fc-sd" disabled><svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg></button>
    </div>`;
  document.body.appendChild(win);

  // ── QUICK REPLIES ──
  const QRS = [
    ['🎁 Un regalo','Busco un regalo para alguien especial'],
    ['🌶️ Me gusta el picante','Me gusta mucho el picante'],
    ['🍯 Algo dulce','Prefiero productos dulces'],
    ['🍷 Vinos y licores','Me interesan los vinos y licores canarios'],
    ['🌱 Sin gluten','Busco productos sin gluten'],
    ['🧀 Tabla de quesos','Quiero algo para acompañar una tabla de quesos'],
  ];
  function showQR() {
    document.getElementById('fc-qr').innerHTML = QRS.map(([l,v]) =>
      `<button class="fc-qb" onclick="window._fcq(${JSON.stringify(v)})">${l}</button>`
    ).join('');
  }
  window._fcq = v => { document.getElementById('fc-qr').innerHTML=''; send(v); };

  // ── TOGGLE ──
  btn.addEventListener('click', () => {
    isOpen = !isOpen;
    btn.classList.toggle('open', isOpen);
    win.classList.toggle('open', isOpen);
    bub.classList.add('hidden');
    if (isOpen && !messages.length) {
      setTimeout(() => {
        addBot('¡Hola! 👋 Soy el asistente de **Fincas Canarias**.\n¿Qué estás buscando hoy — un regalo, algo para ti, o tienes una ocasión especial en mente?');
        showQR();
      }, 360);
    }
    if (isOpen) document.getElementById('fc-in').focus();
  });
  setTimeout(() => bub.classList.add('hidden'), 7000);

  // ── MESSAGE HELPERS ──
  function addBot(text) {
    const c = document.getElementById('fc-msgs');
    const d = document.createElement('div');
    d.className = 'fc-msg bot';
    d.innerHTML = `<div class="fc-av">${MASCOT(22)}</div><div class="fc-bb">${fmt(text)}</div>`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
  }
  function addUser(text) {
    const c = document.getElementById('fc-msgs');
    const d = document.createElement('div');
    d.className = 'fc-msg user';
    d.innerHTML = `<div class="fc-av"><svg width="14" height="14" viewBox="0 0 24 24" fill="#c9963a"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg></div><div class="fc-bb">${text}</div>`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
  }
  function fmt(t) { return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>'); }
  function showTy() {
    const c = document.getElementById('fc-msgs');
    const d = document.createElement('div'); d.className='fc-msg bot'; d.id='fc-ty';
    d.innerHTML = `<div class="fc-av">${MASCOT(22)}</div><div class="fc-bb fc-ty"><span></span><span></span><span></span></div>`;
    c.appendChild(d); c.scrollTop = c.scrollHeight;
  }
  function hideTy() { const e=document.getElementById('fc-ty'); if(e) e.remove(); }

  // ── PRODUCT CARDS ──
  function showCards(ids) {
    if (typeof PRODUCTS === 'undefined') return;
    const prods = ids.map(id => PRODUCTS.find(p => p.id===id)).filter(Boolean);
    if (!prods.length) return;
    const lg = typeof lang !== 'undefined' ? lang : 'es';
    const c = document.getElementById('fc-msgs');
    const wrap = document.createElement('div');
    wrap.className = 'fc-cards-wrap';
    const title = document.createElement('div');
    title.className = 'fc-cards-title'; title.textContent = '✦ Mis recomendaciones para ti';
    wrap.appendChild(title);
    const grid = document.createElement('div');
    const cl = prods.length===1?'one':prods.length===3?'three':'';
    grid.className = `fc-cards ${cl}`;
    prods.forEach(p => {
      const card = document.createElement('div');
      card.className = 'fc-card';
      card.onclick = () => { if (typeof openModal==='function') { btn.click(); setTimeout(()=>openModal(p.id),320); } };
      card.innerHTML = `
        <div class="fc-card-img">
          ${p.img ? `<img src="${p.img}" alt="${p.name[lg]}" loading="lazy">` : `<div class="fc-ph">${PH_SVG}</div>`}
          <span class="fc-ctag">${CAT_ES[p.category]||p.category}</span>
        </div>
        <div class="fc-card-body">
          <div class="fc-card-name">${p.name[lg]}</div>
          <div class="fc-card-sub">${p.subtitle[lg]}</div>
        </div>`;
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    c.appendChild(wrap);
    c.scrollTop = c.scrollHeight;
  }

  // ── PARSE RESPONSE ──
  function parse(raw) {
    const m = raw.match(/\[PRODUCTOS_RECOMENDADOS:\s*([\d,\s]+)\]/);
    const ids = m ? m[1].split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)) : [];
    const text = raw.replace(/\[PRODUCTOS_RECOMENDADOS:[\d,\s]+\]/g,'').trim();
    return { text, ids };
  }

  // ── SEND ──
  async function send(text) {
    if (!text.trim() || isTyping) return;
    document.getElementById('fc-qr').innerHTML = '';
    addUser(text);
    messages.push({ role:'user', content:text });
    const inp=document.getElementById('fc-in'), sd=document.getElementById('fc-sd');
    inp.value=''; inp.style.height='auto'; sd.disabled=true; isTyping=true;
    showTy();
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{ 'Content-Type':'application/json', 'x-api-key': window.FC_API_KEY||'', 'anthropic-version':'2023-06-01' },
        body: JSON.stringify({ model:'claude-sonnet-4-20250514', max_tokens:800, system:SYSTEM_PROMPT, messages })
      });
      const data = await res.json();
      const raw = data.content?.[0]?.text || 'Lo siento, ha habido un error 🙏';
      hideTy();
      const { text:t, ids } = parse(raw);
      messages.push({ role:'assistant', content:raw });
      addBot(t);
      if (ids.length) setTimeout(()=>showCards(ids), 420);
    } catch(e) {
      hideTy(); addBot('¡Ups! Problema de conexión. Inténtalo de nuevo 🙏');
    }
    isTyping=false; sd.disabled=false;
    document.getElementById('fc-in').focus();
  }

  // ── INPUT ──
  const inp=document.getElementById('fc-in'), sd=document.getElementById('fc-sd');
  inp.addEventListener('input',()=>{ sd.disabled=!inp.value.trim(); inp.style.height='auto'; inp.style.height=Math.min(inp.scrollHeight,80)+'px'; });
  inp.addEventListener('keydown',e=>{ if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();if(!sd.disabled)send(inp.value);} });
  sd.addEventListener('click',()=>send(inp.value));

})();
