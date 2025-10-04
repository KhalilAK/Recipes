# Recipe App

A full-stack recipe management app with a frontend for browsing and adding recipes. Recipes are fetched from the **API Ninjas Recipe API**, with a backend layer to manage existing recipes and prevent duplicates. Designed to deploy on **Vercel** with serverless API functions.

## Screenshots

![Recipe App Screenshot](./screenshots/screenshot.png)

## Features

- Browse recipes with ingredient counts displayed in responsive recipe boxes
- Add new recipes by title; automatically checks if a recipe already exists before calling the API
- Uses **API Ninjas** to fetch recipe details including ingredients and instructions
- Serverless backend API routes: `get-recipes`, `add-recipe`, `check-recipe`
- Responsive grid layout for recipe display — adjusts automatically on mobile and desktop
- Handles long recipe titles gracefully using ellipsis and wrapping

## Technologies

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js + Sequelize ORM (for storing local recipe metadata)
- **External API:** API Ninjas Recipe API


## Deployment

This app is designed to deploy on **Vercel**:

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your `API_NINJAS_KEY` environment variable in Vercel settings
4. Deploy!



## API Routes

- `GET /api/get-recipes` - Fetch all stored recipes
- `POST /api/add-recipe` - Add a new recipe (fetches from API Ninjas)
- `GET /api/check-recipe?title={title}` - Check if recipe exists in database

## Project Structure

```
recipe-app/
├── api/                  # Serverless API functions
│   ├── get-recipes.js
│   ├── add-recipe.js
│   └── check-recipe.js
├── public/               # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── screenshots/          # App screenshots
│   └── app-preview.png
├── .env                  # Environment variables (not committed)
├── package.json
└── README.md
```


## Acknowledgments

- [API Ninjas](https://api-ninjas.com/) for providing the recipe API
