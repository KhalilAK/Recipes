import { RecipeItem, Ingredient } from "../models/RecipeItem";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const allRecipes = await RecipeItem.findAll({
      include: [{ model: Ingredient }],
    });

    res.status(200).json({ recipes: allRecipes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Couldn't fetch recipes" });
  }
}
