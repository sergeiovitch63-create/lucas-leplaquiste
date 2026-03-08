# Configuration Upstash Redis pour Fincas Canarias

## Problème
Sur Vercel (et les plateformes serverless), le système de fichiers est en lecture seule. Il est impossible d'écrire des fichiers JSON localement en production.

## Solution : Upstash Redis

Le code a été migré pour utiliser **Upstash Redis** qui fonctionne parfaitement avec Vercel.

## Étapes de configuration

### 1. Créer un compte Upstash Redis via Vercel

1. Va sur https://vercel.com/dashboard
2. Sélectionne ton projet `lucas-leplaquiste`
3. Va dans l'onglet **Storage** ou **Integrations**
4. Clique sur **Browse Marketplace** ou **Add Integration**
5. Cherche **"Upstash Redis"** et installe-le
6. Crée une nouvelle base de données Redis (gratuite jusqu'à 10K commandes/jour)
7. Choisis une région proche (ex: `eu-west-1` pour l'Europe)

### 2. Variables d'environnement

Une fois la base créée, Vercel ajoute automatiquement ces variables d'environnement :
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

**Pas besoin de les configurer manuellement !** Vercel le fait automatiquement.

### 3. Redéployer

Après avoir créé la base Redis, redéploie ton projet sur Vercel :
- Soit via un nouveau push Git
- Soit via le bouton "Redeploy" dans le dashboard Vercel

### 4. Migration des données existantes

**IMPORTANT** : Si tu as déjà des produits/catégories/carrousel dans les fichiers JSON locaux (`/data`), tu dois les migrer vers Redis :

1. **Installe tsx** (si pas déjà fait) :
   ```bash
   npm install -D tsx
   ```

2. **Configure les variables d'environnement localement** :
   Crée un fichier `.env.local` avec :
   ```env
   UPSTASH_REDIS_REST_URL=https://ton-url-redis.upstash.io
   UPSTASH_REDIS_REST_TOKEN=ton-token-redis
   ```
   (Tu peux trouver ces valeurs dans Vercel Dashboard > Storage > Upstash Redis > .env)

3. **Exécute le script de migration** :
   ```bash
   npm run migrate:redis
   ```

   Ou directement :
   ```bash
   npx tsx scripts/migrate-to-redis.ts
   ```

4. **Vérifie** que les données sont bien dans Redis en visitant ton site Vercel.

## Fonctionnement

- **En développement local** : Le code utilise les fichiers JSON dans `/data` (fallback)
- **En production (Vercel)** : Le code utilise Upstash Redis automatiquement

## Vérification

Une fois configuré, tu devrais pouvoir :
- ✅ Ajouter des produits dans l'admin
- ✅ Ajouter des catégories
- ✅ Gérer le carrousel
- ✅ Uploader des images

Tout fonctionne maintenant en production ! 🎉

## Problème : "0 productos encontrados" sur Vercel

Si tu vois "0 productos encontrados" après le déploiement, c'est que :

1. **Les variables d'environnement Redis ne sont pas configurées** sur Vercel
   - Solution : Configure Upstash Redis dans Vercel Dashboard (voir étape 1)

2. **Les données n'ont pas été migrées vers Redis**
   - Solution : Exécute le script de migration (voir étape 4)

3. **Vérifie les logs Vercel** pour voir les erreurs :
   - Va dans Vercel Dashboard > Ton projet > Deployments > Clique sur le dernier déploiement > Logs
   - Cherche les messages d'erreur liés à Redis

