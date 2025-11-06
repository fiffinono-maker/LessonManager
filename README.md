# TSPark - Plateforme de Gestion de Salles de Sport

Une plateforme complète de gestion de salles de sport avec système de défis, badges et gamification pour motiver les utilisateurs.

## Table des Matières

- [Vue d'Ensemble](#vue-densemble)
- [Fonctionnalités par Rôle](#fonctionnalités-par-rôle)
  - [Super Administrateur](#super-administrateur)
  - [Propriétaire de Salle](#propriétaire-de-salle)
  - [Client](#client)
- [Architecture Technique](#architecture-technique)
- [Installation et Démarrage](#installation-et-démarrage)
- [Structure de la Base de Données](#structure-de-la-base-de-données)

## Vue d'Ensemble

TSPark est une application full-stack permettant la gestion de salles de sport avec trois niveaux d'utilisateurs :
- **Super Administrateur** : Gestion globale du système
- **Propriétaire de Salle** : Gestion de leur(s) salle(s) de sport
- **Client** : Enregistrement des séances et participation aux défis

## Fonctionnalités par Rôle

### Super Administrateur

Le super administrateur a un contrôle complet sur l'ensemble du système et peut effectuer toutes les opérations suivantes :

#### 1. Gestion des Salles d'Entraînement
- **Création, modification et suppression** de salles d'entraînement
- **Approbation des demandes** de salles soumises par les propriétaires
- Définition des caractéristiques de chaque salle :
  - Nom de la salle
  - Capacité d'accueil
  - Adresse et coordonnées
  - Équipements disponibles
  - Description et image
- Attribution de salles à des types d'exercices ou niveaux de difficulté
- Changement de statut des salles (pending, approved, rejected)

#### 2. Gestion des Types d'Exercices
- **Ajout, modification et suppression** des types d'exercices
- Définition pour chaque exercice :
  - Nom de l'exercice
  - Description détaillée
  - Muscles ciblés
- Les exercices créés sont disponibles pour tous les utilisateurs du système

#### 3. Gestion des Équipements
- **Création d'équipements globaux** disponibles dans le système
- Modification et suppression d'équipements
- Les propriétaires de salles peuvent sélectionner parmi ces équipements lors de la création/modification de leur salle
- Possibilité d'ajouter de nouveaux équipements spécifiques non listés

#### 4. Création de Badges et Récompenses
- **Création dynamique de badges** via une interface
- Définition de règles personnalisées pour l'attribution des badges (format JSON)
- Chaque badge comprend :
  - Nom
  - Description
  - Icône
  - Règles d'obtention
- Attribution automatique ou manuelle de badges aux utilisateurs

#### 5. Gestion des Utilisateurs
- **Visualisation de tous les utilisateurs** du système
- **Désactivation/réactivation** de comptes utilisateurs
- **Suppression** de comptes (clients ou propriétaires de salle)
- Filtrage par rôle et statut
- Modification du statut actif/inactif

### Propriétaire de Salle

Les propriétaires de salle peuvent gérer leur(s) propre(s) salle(s) de sport et proposer du contenu spécifique.

#### 1. Gestion des Informations de la Salle
- **Création et modification** des informations de base :
  - Nom de la salle
  - Adresse complète
  - Coordonnées de contact (téléphone)
  - Description des installations
  - Capacité d'accueil
  - Image de la salle
- **Sélection des équipements** :
  - Choix parmi les équipements créés par le super admin
  - Ajout d'équipements personnalisés non listés
  - Gestion des quantités d'équipements
- Statut de la salle (en attente d'approbation/approuvée/rejetée)

#### 2. Proposition de Défis Spécifiques à la Salle
- **Création de défis d'entraînement** associés uniquement à leur salle
- Les défis sont **visibles uniquement par les clients affiliés à cette salle**
- Configuration des défis :
  - Titre et description
  - Niveau de difficulté (facile, moyen, difficile)
  - Durée en jours
  - Objectifs spécifiques (format JSON)
  - Exercices recommandés (sélection parmi les exercices système)
  - Date de début
  - Image du défi
- **Gestion du statut** des défis (brouillon, actif, terminé, annulé)
- Les défis permettent d'augmenter l'engagement et le score des participants

#### 3. Avantages du Système de Défis
- Augmentation de l'attractivité de la salle
- Fidélisation des clients
- Création d'une communauté autour de la salle
- Différenciation par rapport aux autres salles

### Client

Les clients peuvent s'entraîner, suivre leur progression et participer à des défis communautaires.

#### 1. Inscription et Affiliation à une Salle
- **Inscription** avec sélection obligatoire d'une salle de sport
- Les clients sont **affiliés à une seule salle** lors de l'inscription
- Accès uniquement aux défis et contenus de leur salle affiliée
- Données personnelles : nom, prénom, email, mot de passe

#### 2. Enregistrement des Séances d'Entraînement
Les clients peuvent enregistrer leurs séances en détail :

##### Informations de Séance
- **Durée de la séance** (en minutes)
- **Calories brûlées** (optionnel)
- **Notes personnelles**
- **Association à un défi** (optionnel)

##### Enregistrement des Exercices
Pour chaque exercice effectué durant la séance :
- **Sélection de l'exercice** parmi ceux créés par le super admin
- **Nombre de répétitions** (facultatif)
- **Temps de repos** entre séries (en secondes, facultatif)

##### Système de Points
- Les clients gagnent des points automatiquement basés sur leurs séances
- 1 point = 10 calories brûlées
- Accumulation de points pour le classement

#### 3. Exploration et Participation aux Défis

##### Découverte des Défis
- **Exploration des défis** créés par d'autres clients et par le propriétaire de leur salle
- Affichage uniquement des défis de la salle affiliée
- **Filtrage** par :
  - Difficulté (facile, moyen, difficile)
  - Type d'exercice
  - Durée
  - Statut (actif, terminé)

##### Participation aux Défis
- **Rejoindre des défis** individuellement
- **Inviter des amis** à participer
- Défis collaboratifs avec d'autres membres
- Suivi de la progression dans chaque défi

#### 4. Création et Partage de Défis
- **Création de défis personnalisés** par les clients
- Définition des objectifs spécifiques
- Recommandation d'exercices
- Partage avec la communauté de leur salle
- Durée définie du défi

#### 5. Suivi de l'Entraînement et Progression
- **Historique complet** de toutes les séances
- **Statistiques détaillées** :
  - Nombre total de séances
  - Calories brûlées totales
  - Temps d'entraînement total
  - Progression dans les défis
- **Classement (Leaderboard)** :
  - Visualisation du top des utilisateurs les plus actifs
  - Système de points basé sur les calories
  - Rang personnel

#### 6. Récompenses et Badges
- **Collection de badges** obtenus
- Déblocage de badges en fonction des accomplissements :
  - Complétion de défis
  - Nombre de séances
  - Calories brûlées
  - Participation régulière
- Affichage public des badges sur le profil

#### 7. Fonctionnalités Sociales
- **Défis sociaux** : participation en groupe
- **Invitation d'amis** à rejoindre des défis
- **Compétition amicale** via le classement
- Partage de réalisations

## Architecture Technique

### Stack Technologique

#### Backend
- **Framework** : Express.js (Node.js)
- **Base de données** : PostgreSQL (Neon)
- **ORM** : Drizzle ORM
- **Validation** : Zod
- **Architecture** : Services/Controllers pattern
- **TypeScript** pour la sécurité des types

#### Frontend
- **Framework** : React 18
- **Bundler** : Vite
- **Routing** : Wouter
- **UI Components** : shadcn/ui + Radix UI
- **Styling** : Tailwind CSS
- **State Management** : TanStack Query (React Query)
- **Forms** : React Hook Form + Zod validation
- **Icons** : Lucide React

### Structure du Projet

```
├── client/                 # Code frontend
│   └── src/
│       ├── components/     # Composants React réutilisables
│       │   ├── ui/        # Composants shadcn/ui
│       │   └── ...        # Composants métier
│       ├── hooks/         # Hooks React personnalisés
│       ├── lib/           # Utilitaires et configuration
│       ├── pages/         # Pages de l'application
│       │   ├── admin/     # Pages administrateur
│       │   ├── auth.tsx   # Authentification
│       │   ├── admin-dashboard.tsx
│       │   ├── gym-owner-dashboard.tsx
│       │   └── client-dashboard.tsx
│       └── App.tsx        # Composant racine et routing
│
├── server/                # Code backend
│   ├── controllers/       # Contrôleurs API
│   ├── services/         # Logique métier
│   ├── db.ts             # Configuration base de données
│   ├── storage.ts        # Interface de stockage
│   └── routes.ts         # Définition des routes API
│
└── shared/               # Code partagé
    └── schema.ts         # Schémas de données (Drizzle + Zod)
```

## Installation et Démarrage

### Prérequis
- Node.js 20+
- PostgreSQL (Neon database recommandé)

### Installation

```bash
# Installer les dépendances
npm install

# Configuration de la base de données
# Créer un fichier .env avec DATABASE_URL pointant vers votre base PostgreSQL

# Synchroniser le schéma de base de données
npm run db:push

# Démarrer l'application en mode développement
npm run dev
```

L'application sera accessible sur `http://localhost:5000`

### Déploiement

```bash
# Build de production
npm run build

# Démarrer en production
npm run start
```

## Structure de la Base de Données

### Tables Principales

#### Users (Utilisateurs)
- `id` : Identifiant unique (UUID)
- `email` : Email unique
- `password` : Mot de passe hashé
- `firstName`, `lastName` : Nom et prénom
- `role` : Rôle (super_admin, gym_owner, client)
- `gymId` : ID de la salle affiliée (pour les clients)
- `isActive` : Statut actif/inactif

#### Gyms (Salles de Sport)
- `id` : Identifiant unique
- `ownerId` : Référence au propriétaire
- `name` : Nom de la salle
- `address`, `phone` : Coordonnées
- `description` : Description
- `capacity` : Capacité d'accueil
- `status` : Statut (pending, approved, rejected)

#### Equipment (Équipements)
- `id` : Identifiant unique
- `name` : Nom de l'équipement
- `description` : Description

#### GymEquipment (Équipements par Salle)
- Relation many-to-many entre Gyms et Equipment
- `gymId`, `equipmentId` : Clés étrangères
- `quantity` : Quantité disponible

#### Exercises (Exercices)
- `id` : Identifiant unique
- `name` : Nom de l'exercice
- `description` : Description
- `targetMuscles` : Muscles ciblés (array)

#### Challenges (Défis)
- `id` : Identifiant unique
- `creatorId` : Créateur du défi
- `gymId` : Salle associée (null pour défis globaux)
- `title`, `description` : Titre et description
- `difficulty` : Niveau de difficulté
- `durationDays` : Durée en jours
- `objectives` : Objectifs (JSON)
- `exerciseIds` : Exercices recommandés (array)
- `status` : Statut du défi

#### ChallengeParticipants (Participants aux Défis)
- `challengeId`, `userId` : Clés étrangères
- `progress` : Progression (%)
- `joinedAt`, `completedAt` : Dates

#### TrainingSessions (Séances d'Entraînement)
- `id` : Identifiant unique
- `userId` : Utilisateur
- `challengeId` : Défi associé (optionnel)
- `caloriesBurned` : Calories brûlées
- `durationMinutes` : Durée
- `notes` : Notes personnelles

#### SessionExercises (Exercices par Séance)
- `sessionId`, `exerciseId` : Clés étrangères
- `repetitions` : Nombre de répétitions
- `restTimeSeconds` : Temps de repos

#### Badges (Badges)
- `id` : Identifiant unique
- `name`, `description` : Nom et description
- `icon` : Icône
- `rules` : Règles d'attribution (JSON)

#### UserBadges (Badges des Utilisateurs)
- `userId`, `badgeId` : Clés étrangères
- `earnedAt` : Date d'obtention
- `progress` : Progression vers le badge

#### UserPoints (Points des Utilisateurs)
- `userId` : Référence utilisateur
- `totalPoints` : Points totaux
- Utilisé pour le classement

## API Endpoints

### Authentification
- `POST /api/auth/register` - Inscription
- `POST /api/auth/login` - Connexion
- `POST /api/auth/logout` - Déconnexion

### Salles de Sport
- `GET /api/gyms` - Liste des salles
- `GET /api/gyms/:id` - Détails d'une salle
- `POST /api/gyms` - Créer une salle
- `PATCH /api/gyms/:id` - Modifier une salle
- `PATCH /api/gyms/:id/approve` - Approuver une salle (admin)
- `DELETE /api/gyms/:id` - Supprimer une salle

### Exercices
- `GET /api/exercises` - Liste des exercices
- `POST /api/exercises` - Créer un exercice (admin)
- `PATCH /api/exercises/:id` - Modifier un exercice (admin)
- `DELETE /api/exercises/:id` - Supprimer un exercice (admin)

### Équipements
- `GET /api/equipment` - Liste des équipements
- `POST /api/equipment` - Créer un équipement (admin)
- `PATCH /api/equipment/:id` - Modifier un équipement (admin)
- `DELETE /api/equipment/:id` - Supprimer un équipement (admin)
- `POST /api/equipment/gym` - Ajouter équipement à une salle
- `GET /api/equipment/gym/:gymId` - Équipements d'une salle
- `DELETE /api/equipment/gym/:gymId/:equipmentId` - Retirer équipement

### Défis
- `GET /api/challenges` - Liste des défis (filtres: status, gymId)
- `GET /api/challenges/:id` - Détails d'un défi
- `POST /api/challenges` - Créer un défi
- `PATCH /api/challenges/:id` - Modifier un défi
- `POST /api/challenges/:id/join` - Rejoindre un défi
- `GET /api/challenges/:id/participants` - Nombre de participants

### Badges
- `GET /api/badges` - Liste des badges
- `POST /api/badges` - Créer un badge (admin)
- `DELETE /api/badges/:id` - Supprimer un badge (admin)

### Utilisateurs
- `GET /api/users` - Liste des utilisateurs (admin)
- `GET /api/users/:id` - Détails utilisateur
- `PATCH /api/users/:id/status` - Changer statut (admin)
- `DELETE /api/users/:id` - Supprimer utilisateur (admin)

### Entraînement
- `POST /api/training/sessions` - Créer une séance
- `POST /api/training/sessions/:sessionId/exercises` - Ajouter exercice à séance
- `GET /api/training/sessions/:sessionId/exercises` - Exercices d'une séance
- `GET /api/training/leaderboard` - Classement global

## Sécurité et Bonnes Pratiques

- **Authentification** : Mots de passe hashés avec bcrypt
- **Validation** : Validation des données avec Zod côté client et serveur
- **TypeScript** : Typage fort pour éviter les erreurs
- **Séparation des rôles** : Contrôles d'accès basés sur les rôles
- **Transactions** : Opérations atomiques pour la cohérence des données

## Licence

Ce projet est sous licence propriétaire.

---

Développé avec ❤️ pour la communauté fitness
