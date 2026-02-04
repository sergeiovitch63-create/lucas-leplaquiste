## Lucas Le Plaquiste – Linktree premium (Next.js 14)

Mini-site type Linktree construit avec **Next.js 14 App Router**, **TypeScript strict** et **TailwindCSS**, optimisé mobile-first pour une carte de liens premium.

### Démarrage local

- **Installer les dépendances**:

```bash
npm install
```

- **Lancer le serveur de dev**:

```bash
npm run dev
```

Ouvre `http://localhost:3000` dans ton navigateur.

### Déploiement sur Vercel (rapide)

1. Pousser ce repo sur GitHub / GitLab.
2. Aller sur Vercel et **importer le projet**.
3. Dans les variables d’environnement Vercel, définir:
   - `NEXT_PUBLIC_SITE_URL=https://ton-domaine.vercel.app` (ou ton domaine custom)
4. Lancer le déploiement.  
   Vercel détecte automatiquement Next.js 14 et configure le build.

### Configuration du contenu (`src/config/site.ts`)

Tout le contenu métier est centralisé dans `src/config/site.ts`:

- **Identité**:
  - `brandName`
  - `tagline`
  - `locationText`
  - numéros / liens: `phoneNumber`, `telLink`, `whatsAppNumber`, `waLink`
  - liens externes: `facebookUrl?`, `googleMapsUrl`
- **SEO / preview**:
  - `seo.title`, `seo.description`
  - `og.image` (utilisé pour fallback, l’OG principal vient de la route `/og`)
- **Liens Linktree**:
  - `links: SiteLink[]` – ordre et icônes de chaque bouton.

Pour ajouter / modifier un lien:

1. Éditer `site.links` dans `src/config/site.ts`.
2. Définir `id`, `title`, `href`, `type` (`"internal" | "external" | "action"`), et `iconKey` si besoin.

### Images à remplacer

Dans `/public`, tu peux remplacer les placeholders par de vrais visuels:

- **Background**: `public/bg.jpg`  
  - Image de fond plein écran (fond chantier, texture mur, etc.).
  - Utilisée par `BackgroundShell` comme image de background.
- **Avatar**: `public/avatar.jpg`  
  - Portrait ou logo de Lucas.
  - Utilisé par `ProfileHeader`. Si absent ou en erreur, un fallback avec initiales est affiché.
- **Favicon / icône**:
  - `public/icon.png` – favicon minimal référencé dans `layout.tsx`.
  - Optionnellement, tu peux ajouter un vrai `favicon.ico` si tu le souhaites.

### Variables d’environnement

Le projet utilise:

- `NEXT_PUBLIC_SITE_URL`  
  - Utilisé par `robots.ts` et `sitemap.ts` pour générer les URLs complètes.
  - **En production (Vercel)**, définis-le sur `https://ton-domaine.vercel.app` ou ton domaine custom.
  - **En local**, si non défini, un fallback `http://localhost:3000` est utilisé automatiquement.

Un exemple de fichier `.env.example` doit contenir au minimum:

```env
NEXT_PUBLIC_SITE_URL=
```

Copie ce fichier en `.env.local` et renseigne l’URL adaptée à ton environnement.

