import { RecipeItem } from "../models/RecipeItem"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { query } = req.body;

  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const recipeFound = await RecipeItem.findOne({ where: { title: query } });

    if (!recipeFound) {
      return res.status(404).json({ found: false, error: "Recipe not found" });
    }

    return res.status(200).json({ found: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Couldn't check recipe" });
  }
}
