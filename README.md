 Liascope Astrology ‑React 🌟

A modern astrology chart viewer built with React.js and Next.js—showing a significant evolution from my earlier vanilla‑JS MVC-based Liascope project. This application demonstrates a solid understanding of frontend development, state management, data fetching, animations, form handling, and interactive UI design.

🚀 Key Features

Multi-chart generation
  Generate and view six distinct charts:

  * Natal
  * Transit or Partner Natal
  * Natal & Transit or Synastry
  * Draconic
  * Progression
  * Annual Perfection

Comparison mode selection  
Flexible form-based selection between:

* Natal & Transit comparison
* Synastry chart mode

Copy chart feature  
* Copy structured chart data for external use (e.g. AI analysis or sharing)

Save & Load

  * Store up to 5 charts locally via `localStorage`.
  * Session persistence: Calculated charts remain available after a page refresh using `sessionStorage`.

Aspect and filter tools

  * Interactive aspect table
  * Planet & house position lists
  * Flexible filtering of chart aspects

  AI Astrology Assistant

* Integrated Gemini AI chat available throughout the application
* The AI automatically uses the currently displayed chart as context (Natal, Synastry, Transit, etc.)
* Ask natural-language questions about placements, aspects, houses, or chart interpretation
* Context-aware responses without manually copying chart data

Transit & Horary tools

  * Auto-complete of “today’s transits”
  * Select dates easily for transit charts
* Horary mood is available when viewing Transit charts
* Switch between interpreting the currently opened Transit chart or a Horary reading
* In Horary mode, the AI ignores the displayed chart and instead generates a reading based on the current date and time, following traditional horary astrology principles

  Reactivity & animations
  Smooth transitions powered by Framer Motion, and responsive UI behaviors.



🧩 Tech Stack

* Next.js + React.js – fullstack React framework
* Context API – global state management
* React Query – efficient data fetching with reusable custom hooks
* React Hook Form – performant form handling and validation
*  Custom Loader, Error & Loading Pages – implemented using Next.js conventions
*  Modal Window – provides additional information in a focused view
* Custom SVG Icons – handcrafted UI elements
* Framer Motion – UI animations and transitions
* Tailwind CSS – utility-first styling
* SVG – custom icons, handcrafted for the UI
* Astrology libraries – @astrodraw/astrochart, js_astro (extended for custom logic)
* APIs – Timezone (timezonedb), Location (Nominatim), Gemini AI
* Utilities – Moment.js, Lodash, Cookies-next
* Tooling – ESLint, Prettier, React Query Devtools

🧠 What I've Learned & Demonstrated

* Refactored a vanilla JavaScript MVC application into a scalable React/Next.js architecture
* Implemented persistent state using localStorage and sessionStorage
* Built reusable custom React Query hooks with proper loading and error handling
* Managed complex forms with React Hook Form
* Applied Next.js App Router conventions, including custom loading and error pages
* Rendered astrology charts with precise planetary and house calculations
* Extended third-party astrology libraries by adapting their internal logic and adding custom functionality (e.g. retrograde highlighting)
* Integrated multiple external APIs, including timezone, geolocation, and Google's Gemini API
* Designed a context-aware AI assistant that dynamically adapts its prompts to the active chart type and supports a dedicated Horary interpretation mode
* Built a responsive, interactive UI using Tailwind CSS, Framer Motion, custom SVG icons, and reusable UI components


🔧 Running the Project

1. Clone the repo
2. Install dependencies

   ```bash
   npm install
   ```
3. Add the required API keys (Gemini API, TimeZoneDB if applicable)
4. Run locally

   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000` in your browser

---

🛠️ Project Structure

```
/hooks            – React Query and form-handling hooks  
/components       – Chart, list, filter, and UI components  
/context          – Context API provider for global state  
/lib              – Astrology logic and helpers (wrapping js_astro lib)  
/pages            – Next.js pages & API routes  
/styles           – Tailwind setup & global styles  
```

📜 Licenses & Credits 
* @astrodraw/astrochart – MIT License
* js_astro – MIT License
* Moment.js + Moment Timezone – MIT License, TimeZoneDB Terms of Service
* Nominatim – Data Policy
* Google Gemini API – AI-powered astrology assistant
* Other libraries – Open source under MIT or compatible licenses

Thanks for exploring Liascope-React.
Beyond standard frontend practices, this project highlights my ability to extend and adapt third-party libraries, integrate complex APIs, and build an interactive, user-focused application with React and Next.js.

©2026 Zeliha A. (liascope). All rights reserved. Open for personal use; redistribution or modification requires explicit permission.
