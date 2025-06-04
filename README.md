# BloomBuddy

## Project Scope

**BloomBuddy** is a web-based platform designed to help users generate personalized flower bouquet recommendations based on simple text input (and optionally, image inspiration). The project emphasizes intuitive design, expressive personalization, and smart suggestions without requiring users to be flower experts. The MVP focuses on mood/color-driven bouquets with the option to explore local florist availability in future iterations.

## Target Users

- Thoughtful gift-givers looking for inspiration.
- People unfamiliar with floral arrangement but seeking meaningful combinations.
- Last-minute gifters wanting curated options without browsing endless catalogs.
- Users who value aesthetic coherence and emotionally aligned gifts.


## Features

### Core Features
- Find bouquet:
  - Option and text input: describe the recipient, mood, or occasion to generate suggestions.
  - Generate bouquet options based on keyword matching, each with a visual.
- Gallery function: view, save and download inspiration
- Map function: find the florists nearby

### Out of Scope for MVP
- Checkout or order placement flow.
- User profiles, login, or order history features. (Maybe implement user profile/account for view or save history)


## Contact Information

**Team BloomBuddy**  
**Client:** Hannah Xiao, hx2313@uw.edu <br>
**Developer:** Laura Tan, xtan0611@uw.edu

---

## Using Your Own Google Maps API Key (for Florist Map Feature)

If you want to use the map feature to find local florists, you need a Google Maps API key with Places API enabled.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Enable the **Maps JavaScript API** and **Places API** for your project.
4. Go to **APIs & Services > Credentials** and create an API key.
5. Restrict your API key to HTTP referrers for security.
6. In the root of your project, create a file named `.env.local` and add this line:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

7. Save the file. Restart the development server if it was running.

Now, when you visit the "Find Nearest Florist" page, the map will load using your API key.

---

## Dependencies

This project uses:
- [Next.js](https://nextjs.org/) (v14+)
- [React](https://react.dev/) (v18+)
- [@react-google-maps/api](https://github.com/JustFly1984/react-google-maps-api)
- [Tailwind CSS](https://tailwindcss.com/) (for utility styles)

All dependencies are listed in `package.json` and will be installed with `npm install`.


## To view the results locally
**1. Clone/Pull from the github**
- git clone https://github.com/url <br>
- cd your-repo-name

**2. Install Dependencies** <br>
Make sure you have Node.js installed (preferably version 16 or higher).
- npm install

**3. Run the Development Server** <br>
Start the local development server:
- npm run dev

**4. Open the Website** <br>
Once the server is running, open your browser and go to the url link: http://localhost:3000 (It may be different depending on local ports.)