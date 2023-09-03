<div id="top"></div>

![CI Status](https://github.com/faizanalibugti/ng-filmpire/actions/workflows/ci.yml/badge.svg)

<div align="center">
  <img src="apps\filmpire\src\assets\darkLogo.png" align="center">
</div>

<p align="center">
  Filmpire - An Angualar Movies & TV Shows App
  <br />
  [Angular, Angular Material, Tailwind CSS, NgRx]
  <br />
  <br />
  <a href="https://ng-filmpire.netlify.app/">View Demo Site (TBD)</a>
  ·
  <a href="https://github.com/faizanalibugti/ng-filmpire/issues">Report Bug</a>
  ·
  <a href="https://github.com/faizanalibugti/ng-filmpire/issues">Request Feature</a>
</p>

<br />

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#🚀-features">Features</a>
    </li>
    <li>
      <a href="#🛠️-tech-stack">Tech Stack</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
    <li><a href="#contributing">Contributing</a></li>
     <li><a href="#attribution">Attribution</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

 <br />

## 🚀 Features

🔍 **Search & Discover** Explore a vast library of movies and TV shows effortlessly.

📋 **Details & Reviews** Dive deep into your favorite titles with comprehensive information and recommendations.

📅 **Upcoming & Trending** Stay up-to-date with the latest releases and trending content.

🔐 **User Profiles** Create and manage personalized user profiles.

🎥 **Watchlist** Curate your own watchlist for easy access to saved content.

📺 **Seamless Streaming** Watch trailers and stream content seamlessly.

📡 **Real-time Updates** Get real-time updates on your favorite shows and movies.

<p align="right">(<a href="#top">back to top</a>)</p>

## 🛠️ Tech Stack

This is an implementation of a Filmpire App using [The TMDB API](https://developer.themoviedb.org/docs) using:

- Nx Workspace (Angular Config)
- Angular v15
- Angular Material
- NgRx
- Tailwind CSS

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

1. Get a free TMDB API Key at [https://www.themoviedb.org/](https://www.themoviedb.org/).
2. Clone the repo:

   ```sh
   git clone https://github.com/faizanalibugti/ng-filmpire.git
   ```

3. Install NPM packages:

   ```sh
   npm install
   ```

4. Enter your TMDB API key in your `libs\core-data\src\lib\services\environments`.

   ```ts
   export const environment = {
     production: true,
     apiEnpoint: 'https://api.themoviedb.org/3',
     apiKey: '<put your key here>',
   };
   ```

## Development server

Run `npx nx serve filmpire` for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Understand this workspace

Run `npx nx graph` to see a diagram of the dependencies of the projects.

## Remote caching

Run `npx nx connect-to-nx-cloud` to enable [remote caching](https://nx.app) and make CI faster.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any and all contributions are **welcome** and **appreciated**

If you have a suggestion that would make this app better, you can either:

1. Fork the repo and create a pull request (further details below).
2. Or simply open an issue with the appropriate tag such as "enhancement" or "bug".

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/[feature-name]`)
3. Commit your Changes (`git commit -m 'Add some [feature-name]'`)
4. Push to the Branch (`git push origin feature/[feature-name]`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## Attribution

<br/>
<div align="left">
  <img src="apps\filmpire\src\assets\tmdb_logo.svg" align="center" width=200>
</div>
<br/>

This product uses the TMDB API but is not endorsed or certified by TMDB.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [The Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction)
- [JavaScript Mastery's React Implementation](https://www.jsmastery.pro/ultimate-react-course)
- [Nx Workspace](https://nx.dev)
- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io/)
- [NgRx](https://ngrx.io)

<p align="right">(<a href="#top">back to top</a>)</p>
