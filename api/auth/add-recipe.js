import { RecipeItem, Ingredient } from "../models/RecipeItem";
import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await fetch(
      `https://api.api-ninjas.com/v2/recipe?title=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "m/IQ0skeyd7ecrBceBttFQ==B4IgO1JZwF6U8GiV",
        },
      }
    );

    const data = await response.json();

    if (!response.ok || !data.length) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipeData = data[0];

    const newRecipe = await RecipeItem.create({
      title: recipeData.title,
      instructions: recipeData.instructions,
    });

    for (const ingredientName of recipeData.ingredients) {
      await Ingredient.create({
        name: ingredientName,
        recipe_id: newRecipe.id,
      });
    }

    res.status(200).json({ message: "Recipe added successfully", recipe: newRecipe });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Couldn't connect to recipe API" });
  }
}
