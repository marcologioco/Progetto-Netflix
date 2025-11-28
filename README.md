# 🎬 CineVerse - React Movie App

CineVerse è una Single Page Application (SPA) moderna sviluppata con
React che permette agli utenti di esplorare il mondo del cinema e delle
serie TV. L'applicazione sfrutta le API di TMDB (The Movie Database) per
offrire dati aggiornati in tempo reale, trailer e informazioni
dettagliate.

## ✨ Funzionalità Principali

### 1. 🏠 Home Page Immersiva

-   **Hero Section Dinamica**: Un film in evidenza (il più popolare del
    momento) con sfondo full-screen e sfumatura cinematografica.
-   **Navigazione Intelligente**: Navbar che cambia aspetto durante lo
    scroll.
-   **Categorie Orizzontali**: Slider per *Popolari*, *Più Votati* e *In
    Tendenza*.

### 2. 📺 Cataloghi Dedicati (Film & Serie TV)

-   Pagine separate per `/movies` e `/tvshows`.
-   **Filtri per Genere** tramite `GenreSelector` con immagini
    evocative.

### 3. 🔍 Ricerca Avanzata "Multi-Search"

-   Barra di ricerca espandibile nella Navbar.
-   Ricerca unificata per Film e Serie TV.

### 4. ⚡ Pagina Dettaglio "Smart" (Zero-Delay)

-   **Caricamento Istantaneo** tramite state passing nel Router.
-   **Sistema Auto-Healing (Anti-404)** per distinguere automaticamente
    Film/Serie TV.
-   **Contenuti Extra**: Trailer YouTube, Cast, Simili.

### 5. ❤️ Gestione Preferiti

-   Sistema di Like con salvataggio persistente in `localStorage`.

## 🛠️ Stack Tecnologico

-   **React 18 (Vite)**
-   **React Router Dom v6**
-   **TMDB API v3**
-   **React Context API**
-   **CSS3**, Flexbox, Grid, Animazioni
-   **SVG nativi**
-   **boostrap 5**

## 📂 Struttura del Progetto

    src/
    ├── api/
    │   └── tmdb.js
    ├── components/
    │   ├── MovieCard.jsx
    │   ├── FavoriteButton.jsx
    │   ├── GenreSelector.jsx
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    ├── context/
    │   └── FavoritesContext.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── MovieDetail.jsx
    │   ├── MoviesPage.jsx
    │   ├── SerieTvPage.jsx
    │   └── SearchResults.jsx
    └── utils/
        └── genres.js

## 💡 Scelte Progettuali

### 1. Gestione Ibrida Film/Serie TV

-   Logica difensiva in `MovieDetail.jsx` per evitare errori 404
    caricando prima come film, poi come serie.

### 2. Navigazione Ottimizzata 

-   Passaggio dell'intero oggetto `movie` alla pagina dettaglio per
    render istantaneo.

## 🚀 Installazione

``` bash
git clone <tua-url-repository>
cd cine-verse
npm install
npm run dev
```

## 👤 Autori

Marco Lo Gioco 
Mattia Fiore 

