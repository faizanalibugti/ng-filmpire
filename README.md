<div id="top"></div>

![CI Status](https://github.com/faizanalibugti/ng-filmpire/actions/workflows/ci.yml/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/b3ecf05e-cea9-4231-bdef-4ac0af998980/deploy-status)](https://app.netlify.com/sites/ng-filmpire/deploys)

<div align="center">
  <img src="apps\filmpire\src\assets\darkLogo.png" align="center">
</div>

<p align="center">
  Filmpire - An Angualar Movies & TV Shows App
  <br />
  [Angular, Angular Material, Tailwind CSS, NgRx]
  <br />
  <br />
  <a href="https://ng-filmpire.netlify.app/">View Demo Site</a>
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
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#tech-stack">Tech Stack</a>
    </li>
    <li>
      <a href="#principles">Principles</a>
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

## Features

📱 **Mobile Responsive UI** Enjoy a seamless and user-friendly experience on any device with our mobile responsive interface, ensuring you can access and explore your favorite movies, TV shows & actors on the go.

🌞🌙 **Light & Dark Modes** Customize your viewing experience with both light and dark modes. Whether you prefer a bright, daytime-friendly interface or a sleek, nighttime-friendly design, our app provides the flexibility to suit your preferences at any time of day.

🔍 **Search & Discover** Explore a vast library of movies and TV shows effortlessly.

📋 **Details & Recommendations** Dive deep into your favorite titles with comprehensive information, recommendations & cast information.

📅 **Upcoming & Trending** Stay up-to-date with the latest releases and trending content.

📡 **Real-time Updates** Get real-time updates on your favorite shows and movies.

📺 **Seamless Streaming** Watch trailers and stream content seamlessly.

### Upcoming Features

🔐 **User Profiles** Create and manage personalized user profiles.

🎥 **Watchlist** Curate your own watchlist for easy access to saved content.

<p align="right">(<a href="#top">back to top</a>)</p>

## Tech Stack

This is an implementation of a Filmpire App using [The TMDB API](https://developer.themoviedb.org/docs) using:

- Nx Workspace
- Angular v15
- Angular Material
- NgRx
- Tailwind CSS

<p align="right">(<a href="#top">back to top</a>)</p>

## Principles

- **OnPush Change Detection and async pipes:** routing and other components utilizing Observables use async pipe for rendering data without a single manual subscribe. The change detection strategy is set to OnPush where appropriate
- **Strong typing:** Efforts have been made to strongly type the entire app by using TypeScript in strict mode. You can find all relevant types for the app in the `api_interfaces` lib. The templates are also strongly typed using type guards and structural directives. In my experience, the Angular team can improve type checking in the template.
- **Virtual Scroll Performance Optimization:** Traditional rendering of a large list would force the browser to render all items at once, causing a bottleneck in terms of CPU and memory usage. Users might experience slow loading times and unresponsive scrolling when navigating through the filmography list. Hence, Angular's Virtual Scroll has been utilized to render filmography items dynamically, ensuring smooth and efficient rendering of even large datasets.
- **Dev Tooling:** The repo uses dev tooling which Nx provides out of the box - primarily ESLint & Prettier. I have also added a Prettier plugin for Tailwind CSS
- **Readable & Maintainable code:** By following best practices & design patterns - efforts have been made to make the code easily readable & maintainable. JSDoc comments will be included in future to make the code approachable for junior developers.
- **Handling empty states in the UI:** When there is no data available to display in a particular section or component, the UI provides clear and user-friendly feedback to inform the user about the absence of content. This approach contributes to the overall usability and user satisfaction of the application.
- **Reusable components & libraries:** Majority of the UI components, custom pipes & directives, http services etc are located in the libs. You may notice that the `media-card-item` component (located in the ui lib) is heavily (re)used in almost every page to render Movie or TV show card item.
- **Minimal number of API calls:**

  - The typical number of API calls per page is **1**. This was achieved by utilizing TMDB's `append_to_response` query parameter. Refer to the TMDB docs [Append to Response](https://developer.themoviedb.org/docs/append-to-response). This makes it possible to make sub requests within the same namespace in a single HTTP request (i.e fetching movie details, cast info & recommendations in a single request). Each request will get appended to the response as a new JSON object.
  - Each GET request gets cached in a Caching interceptor `libs\core-data\src\lib\interceptors\caching\caching.interceptor.ts` so whenever a user views the same content again - the Http Response is retrieved and rendered from the cache instead of fetching the same data again
  - The API calls made when typing a query in the autocomplete search bar is optimized using RxJS by:

    - Debouncing Input (debounceTime): Debouncing helps reduce the number of requests to the server by delaying the search request until the user has finished typing.
    - Cancel Previous Requests (switchMap): If the user types quickly, previous search requests are cancelled to avoid getting outdated results.
    - Preventing requests (filter - distinctUnilChanged) if query is an empty string or unchanged
    - The caching mechanism mentioned above also applies to the autocomplete search box

_Note: If you flag any code in this repo not adhering to these principles - you may file an issue or open a pull request_

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

## Acknowledgments

- [The Movie DB API](https://developers.themoviedb.org/3/getting-started/introduction)
- [JavaScript Mastery's React Implementation](https://www.jsmastery.pro/ultimate-react-course)
- [Nx Workspace](https://nx.dev)
- [Angular](https://angular.io)
- [Angular Material](https://material.angular.io/)
- [NgRx](https://ngrx.io)

<p align="right">(<a href="#top">back to top</a>)</p>
