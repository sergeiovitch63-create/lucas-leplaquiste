# Cahier des charges — Site "Lucas Le Plaquiste"

**Version :** 1.0  
**Date :** 2024  
**Statut :** Implémenté et déployé

---

## 1. Présentation générale du projet

### 1.1 Identité
- **Nom du projet :** Lucas Le Plaquiste
- **Type :** Site vitrine mobile-first (format Linktree premium)
- **Objectif principal :** Permettre un accès rapide aux services, galeries photos, avis clients et contact téléphonique
- **Cible :** Particuliers et professionnels en Occitanie
- **Priorité UX :** Mobile-first (smartphone en premier)

### 1.2 Contexte
Site vitrine professionnel pour un plaquiste indépendant, conçu comme un point d'entrée unique vers les différents services proposés. L'interface reprend les codes visuels d'une application mobile premium avec un design glassmorphism.

---

## 2. Stack technique

### 2.1 Technologies principales
- **Framework :** Next.js 14 (App Router)
- **Langage :** TypeScript (strict mode)
- **Styling :** Tailwind CSS
- **Déploiement :** Vercel
- **Structure :** App directory (Next.js 14)

### 2.2 Configuration
- **Build :** `npm run build` validé sans erreur
- **Linting :** ESLint actif avec règles `react/no-unescaped-entities` respectées
- **Runtime :** Edge runtime pour la route `/og`
- **Fonts :** Geist Sans et Geist Mono (local fonts)

### 2.3 Structure des fichiers
```
src/
├── app/                    # Pages Next.js App Router
│   ├── page.tsx           # Home
│   ├── a-propos/
│   ├── avis/
│   ├── cloisons/
│   ├── creation-decoration/
│   ├── doublages/
│   ├── faux-plafonds/
│   └── og/                # Route OG image
├── components/             # Composants réutilisables
├── config/                 # Configuration centralisée
└── lib/                    # Utilitaires
```

---

## 3. Structure des pages

### 3.1 Routes disponibles

| Route | Type | Objectif |
|-------|------|----------|
| `/` | Home | Point d'entrée principal avec liste de services |
| `/avis` | Service | Affichage des avis clients Google |
| `/creation-decoration` | Service | Galerie et description du service |
| `/faux-plafonds` | Service | Galerie et description du service |
| `/doublages` | Service | Galerie et description du service |
| `/cloisons` | Service | Galerie et description du service |
| `/a-propos` | Informative | Présentation du professionnel |

### 3.2 Détail par page

#### 3.2.1 Home (`/`)
**Objectif :** Hub central avec accès rapide à tous les services

**Contenu :**
- Header avec logo et tagline
- Bouton hero "Appeler — Devis gratuit" (card spéciale avec logo en haut)
- Liste de cards cliquables pour chaque service
- Bloc "Made by PUBLOX" (uniquement sur cette page)

**Composants utilisés :**
- `BackgroundShell` (avec image de fond)
- `PhoneFrame`
- `GlassCard`
- `ProfileHeader`
- `LinkList`
- `LinkButton`
- `MadeByPublox`

**Spécificités UX :**
- Design glassmorphism avec image de fond
- Cards avec effet hover
- Bouton hero animé
- Aucun bouton téléphone flottant

#### 3.2.2 Pages services (toutes sauf Home)
**Pages concernées :**
- `/creation-decoration`
- `/faux-plafonds`
- `/doublages`
- `/cloisons`
- `/a-propos`

**Structure commune :**
1. Bouton "← Retour" en haut à gauche
2. Logo centré (petit format, `/media/services/logo.png`)
3. Titre de la page centré
4. Texte descriptif centré
5. Galerie d'images (grille responsive 2 colonnes)
6. Bouton "Contactez-nous" en bas
7. Bouton téléphone flottant (bottom-right, uniquement sur ces pages)

**Composants utilisés :**
- `PhoneFrame` (mode `compact`)
- `Image` (Next.js)
- Fond bleu dégradé avec texture grain

**Spécificités UX :**
- Fond bleu uniforme (`var(--logo-blue-light)` → `var(--logo-blue)`)
- Texture grain subtile (opacity 0.03)
- Logo remonté au maximum (espacement réduit)
- Mobile-first avec `max-w-[420px]`

#### 3.2.3 Page Avis (`/avis`)
**Objectif :** Afficher les avis clients Google

**Contenu :**
- Bouton "← Retour"
- Titre "Avis clients"
- Widget Google Reviews intégré
- Aucun bouton "Contactez-nous" (spécificité de cette page)

**Composants utilisés :**
- `BackgroundShell`
- `PhoneFrame`
- `GlassCard`
- `GoogleReviewsWidget`

**Spécificités UX :**
- Même design glassmorphism que la Home
- Widget centré et responsive

---

## 4. Home page — Comportement spécifique

### 4.1 Liste de cards
**Comportement :**
- Toutes les cards utilisent le même logo/thumbnail (`/media/avis/thumbnail.png`)
- Chaque card contient :
  - Logo identique à gauche (40x40px, rounded-xl)
  - Titre du service centré
  - Menu "⋯" à droite
- Style glassmorphism avec effet hover

**Cards disponibles :**
1. **Appeler — Devis gratuit** (card hero spéciale)
   - Logo en haut (175px de hauteur)
   - Bouton en bas avec icône téléphone
   - Animation au hover
2. **Avis clients**
3. **Création et Décoration sur mesure**
4. **Faux plafonds**
5. **Doublages**
6. **Cloisons**
7. **À propos**

### 4.2 Bouton hero "Appeler — Devis gratuit"
**Caractéristiques :**
- Card spéciale avec deux zones distinctes
- Zone supérieure : logo du site (`/media/accueil/logo.png`)
- Zone inférieure : bouton avec icône téléphone
- Animation `animate-call-shake-burst`
- Lien : `tel:+33699156340`

### 4.3 Bloc "Made by PUBLOX"
**Visibilité :** UNIQUEMENT sur la Home (`/`)

**Contenu :**
- Texte "Made by" (text-xs, opacity 60%)
- Bouton "PUBLOX" :
  - Taille réduite : `h-[40px]`, `max-w-[220px]`
  - Texte : `text-xs`
  - Style glassmorphism identique aux autres boutons
  - Centré horizontalement
  - Lien : `https://www.publox-marketing.com/` (nouvel onglet)

**Position :** En bas de la liste de cards, après `LinkList`

---

## 5. Pages services — Comportement commun

### 5.1 Structure standardisée
Toutes les pages services suivent la même structure :

1. **Header**
   - Bouton "← Retour" (lien vers `/`)
   - Logo centré (`h-20 w-20`)
   - Titre de la page

2. **Contenu**
   - Texte descriptif (max-width 420px, centré)
   - Galerie d'images

3. **Footer**
   - Bouton "Contactez-nous"
   - Bouton téléphone flottant (si applicable)

### 5.2 Bouton "Contactez-nous"
**Caractéristiques :**
- Style identique sur toutes les pages
- Hauteur : `h-[54px]`
- Largeur : `w-full` avec `max-w-[420px]`
- Style glassmorphism :
  - `bg-white/15`
  - `backdrop-blur-xl`
  - `border-t border-white/10`
  - Ombre : `shadow-[0_10px_25px_rgba(0,0,0,0.18)]`
- Hover : `hover:bg-white/20 hover:-translate-y-[1px]`
- Lien : `tel:+33699156340` (via `site.telLink`)

**Position :** Après la galerie d'images, avant la fermeture du conteneur

### 5.3 Bouton téléphone flottant
**Visibilité :** Toutes les pages SAUF la Home

**Caractéristiques :**
- Position : `fixed bottom-6 right-6`
- Taille : `h-14 w-14` (56px)
- Forme : `rounded-full`
- Style glassmorphism identique
- Z-index : `z-50`
- Icône téléphone (lucide-style)
- Lien : `tel:+33699156340`

**Comportement :**
- Détection de route via `usePathname()` (client-side)
- Masqué si `pathname === "/"`

---

## 6. Galerie photos

### 6.1 Structure commune
**Grille :**
- Layout : `grid-cols-2` (2 colonnes)
- Gap : `gap-3`
- Max-width : `max-w-[420px]`
- Images : `aspect-[4/3]`
- Style : `rounded-2xl`, `border border-white/10`, `shadow-md`
- Images servies depuis : `/public/media/services/`

### 6.2 Cas spécifiques par page

#### 6.2.1 Doublages (`/doublages`)
- **Nombre d'images :** 7
- **Dernière image :** Centrée horizontalement
  - Classes : `col-span-2 justify-self-center w-[calc(50%-0.375rem)]`

#### 6.2.2 Faux plafonds (`/faux-plafonds`)
- **Nombre d'images :** 6
- **Dernière image :** Alignée à droite (colonne 2)
  - Classes : `col-start-2`

#### 6.2.3 Création & décoration (`/creation-decoration`)
- **Nombre d'images :** 6
- **Dernière image :** Alignement standard (pas de traitement spécial)

#### 6.2.4 Cloisons (`/cloisons`)
- **Nombre d'images :** 3
- **Dernière image :** Centrée horizontalement
  - Classes : `col-span-2 justify-self-center w-[calc(50%-0.375rem)]`

#### 6.2.5 À propos (`/a-propos`)
- **Nombre d'images :** 2
- **Source :** `/media/a-propos/`
- **Pas de traitement spécial**

### 6.3 Optimisation images
- Composant Next.js `Image` utilisé partout
- `object-cover` pour le remplissage
- `sizes` optimisé pour mobile : `(max-width: 420px) 50vw, 200px`

---

## 7. Contenu textuel

### 7.1 Page Doublages
**Titre :** "Doublages"

**Description :**
> "Doublage de murs en placo pour des surfaces planes, propres et prêtes à recevoir les finitions."

### 7.2 Page Faux plafonds
**Titre :** "Faux plafonds"

**Description :**
> "Création de faux plafonds en placo, sous charpente ou avec intégration d&apos;ouvertures, avec un travail précis et des finitions propres."

### 7.3 Page Création & décoration
**Titre :** "Création & décoration sur mesure"

**Description :**
> "Création d&apos;éléments en placo entièrement sur mesure, alliant fonctionnalité, esthétique et finitions soignées, pour un aménagement intérieur personnalisé et durable."

### 7.4 Page Cloisons
**Titre :** "Cloisons"

**Description :**
> "Pose de cloisons en placo pour structurer vos espaces : création de pièces, séparation, redistribution, avec un travail propre, des alignements précis et des finitions soignées."

### 7.5 Page À propos
**Titre :** "À propos"

**Contenu :**
- 3 paragraphes de présentation
- Ton professionnel, mention des Compagnons du Devoir
- Focus sur la rigueur et les finitions

---

## 8. Boutons & CTA

### 8.1 Bouton "Contactez-nous"
**Utilisation :** Toutes les pages services (sauf `/avis`)

**Caractéristiques techniques :**
- Hauteur : `54px`
- Largeur : `100%` avec `max-w-[420px]`
- Style : Glassmorphism premium
- Lien : `tel:+33699156340`
- Accessibilité : `aria-label="Contactez-nous"`

**Position :** Après la galerie d'images, avant la fermeture du conteneur principal

### 8.2 Bouton téléphone flottant
**Utilisation :** Toutes les pages SAUF la Home

**Caractéristiques techniques :**
- Position : `fixed bottom-6 right-6`
- Taille : `56px × 56px`
- Forme : Cercle
- Z-index : `50`
- Lien : `tel:+33699156340`

**Logique d'affichage :**
- Composant client-side (`"use client"`)
- Détection de route via `usePathname()`
- Condition : `if (pathname === "/") return null;`

### 8.3 Bouton PUBLOX
**Utilisation :** UNIQUEMENT sur la Home

**Caractéristiques techniques :**
- Hauteur : `40px`
- Largeur : `max-w-[220px]`
- Texte : `text-xs`
- Lien : `https://www.publox-marketing.com/` (nouvel onglet)

---

## 9. Composants transverses

### 9.1 Composants principaux

#### `BackgroundShell`
**Rôle :** Conteneur avec image de fond et overlay

**Props :**
- `children: ReactNode`
- `priority?: boolean` (pour l'image de fond)

**Utilisation :** Home et page Avis

#### `PhoneFrame`
**Rôle :** Conteneur avec largeur max et padding responsive

**Props :**
- `children: ReactNode`
- `compact?: boolean` (réduit le padding vertical)

**Utilisation :** Toutes les pages
- Mode normal : Home, Avis
- Mode compact : Pages services

#### `GlassCard`
**Rôle :** Card glassmorphism avec image de fond intégrée

**Props :**
- `children: ReactNode`
- `className?: string`

**Utilisation :** Home et page Avis

#### `LinkButton`
**Rôle :** Bouton/card cliquable pour les services

**Props :**
- `link: SiteLink`
- `onClick?: MouseEventHandler`

**Logique interne :**
- Détection du type de card (hero vs standard)
- Utilisation du thumbnail par défaut si non spécifié
- Gestion des liens internes/externes/actions

#### `FloatingCallButton`
**Rôle :** Bouton téléphone flottant

**Props :** Aucune (détection automatique de route)

**Logique :**
- Client-side component
- Masqué sur la Home
- Affiché sur toutes les autres pages

#### `MadeByPublox`
**Rôle :** Signature de l'agence

**Props :** Aucune

**Utilisation :** UNIQUEMENT sur la Home

### 9.2 Configuration centralisée

#### `src/config/site.ts`
**Contenu :**
- Informations de contact (téléphone, WhatsApp, Facebook)
- Configuration SEO
- Liste des liens/services
- Constantes réutilisables

**Numéro de téléphone unique :** `+33699156340`

---

## 10. Design system

### 10.1 Couleurs
**Fond bleu (pages services) :**
- Light : `var(--logo-blue-light)`
- Dark : `var(--logo-blue)`
- Gradient : `linear-gradient(to bottom, var(--logo-blue-light), var(--logo-blue))`

**Glassmorphism :**
- Background : `bg-white/15`
- Border : `border-white/10`
- Backdrop : `backdrop-blur-xl`

### 10.2 Typographie
- **Font principale :** Geist Sans (variable)
- **Font mono :** Geist Mono (variable)
- **Tailles :**
  - Titres : `text-lg`, `text-xl`
  - Corps : `text-sm`, `text-[14px]`
  - Petits textes : `text-xs`

### 10.3 Espacements
- **Padding cards :** `p-6`
- **Gap entre éléments :** `gap-3`, `space-y-6`, `space-y-7`
- **Max-width contenu :** `max-w-[420px]`

### 10.4 Effets visuels
- **Ombre cards :** `shadow-[0_10px_25px_rgba(0,0,0,0.18)]`
- **Ombre glasscard :** `shadow-[0_22px_60px_rgba(0,0,0,0.75)]`
- **Texture grain :** SVG inline avec opacity 0.03

---

## 11. Contraintes & règles respectées

### 11.1 Mobile-first
- Toutes les pages optimisées pour mobile
- Largeur max : `420px` (format smartphone)
- Touch targets : minimum 44px
- Espacements adaptés au tactile

### 11.2 Performance
- Images optimisées avec Next.js `Image`
- Lazy loading automatique
- Fonts locales (pas de Google Fonts)
- Build statique pour la plupart des pages

### 11.3 Accessibilité
- `aria-label` sur les boutons
- Contraste suffisant (texte blanc sur fond sombre)
- Focus visible sur les éléments interactifs
- Structure sémantique HTML

### 11.4 Code quality
- TypeScript strict
- ESLint respecté (règles `react/no-unescaped-entities`)
- Pas de duplication inutile
- Composants réutilisables
- Configuration centralisée

### 11.5 SEO
- Métadonnées Open Graph
- Twitter Cards
- Sitemap généré automatiquement
- Robots.txt configuré

---

## 12. État final du projet

### 12.1 Déploiement
- **Plateforme :** Vercel
- **Build :** Validé sans erreur
- **Status :** Production ready

### 12.2 Fonctionnalités validées
- ✅ Navigation entre toutes les pages
- ✅ Boutons téléphone fonctionnels
- ✅ Galeries photos affichées correctement
- ✅ Responsive mobile
- ✅ Bouton flottant conditionnel
- ✅ Bloc PUBLOX uniquement sur Home
- ✅ Widget avis Google intégré

### 12.3 Points d'attention
- Images servies depuis `/public/media/`
- Numéro de téléphone centralisé dans `site.telLink`
- Route `/og` génère l'image Open Graph dynamiquement
- Toutes les pages utilisent le même logo de service (`/media/services/logo.png`)

---

## 13. Maintenance & évolution

### 13.1 Ajout d'un nouveau service
1. Ajouter l'entrée dans `src/config/site.ts` (array `links`)
2. Créer la page dans `src/app/[service-name]/page.tsx`
3. Suivre la structure standardisée des pages services
4. Ajouter les images dans `/public/media/services/`

### 13.2 Modification du numéro de téléphone
- Modifier uniquement `src/config/site.ts` → `phoneNumber` et `telLink`
- Tous les boutons utilisent `site.telLink` automatiquement

### 13.3 Modification du design
- Couleurs : Variables CSS dans `globals.css`
- Composants : Modifier les composants dans `src/components/`
- Styles : Tailwind classes dans les composants

---

**Fin du cahier des charges**






