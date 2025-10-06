const {RecipeItem, Ingredient}= require("../models/RecipeItem");
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const router = express.Router();


router.post("/get-recipes", async(req, res) => {
    try{
        const allRecipes = await RecipeItem.findAll({
            include: [{model: Ingredient}]
        });

        res.json({recipes: allRecipes});


    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Couldn't connect"});
    }
})

router.post("/check-recipe", async(req, res) => {
    const {query} = req.body;
    try{
        const recipeFound = await RecipeItem.findOne({where: {title: query}})
        if(!recipeFound){
            return res.status(404).json({error: "Not found", found: false});
        }
        return res.status(200).json({found: true});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Couldn't connect"});
    }
})

router.post("/add-recipe", async(req, res) => {
    const {query} = req.body;
    console.log(query);
    try{
        const response = await fetch(`https://api.api-ninjas.com/v2/recipe?title=${query}`, {
            method: "GET",
            headers: {
                "X-Api-Key": 'm/IQ0skeyd7ecrBceBttFQ==B4IgO1JZwF6U8GiV'
            }
        })

        const data = await response.json();
        if(!response.ok){
            return res.status(404).json({error: "Recipe not found"});
        }
        if(!data.length){
            return res.status(404).json({error: "Recipe not found"});
        }

        const recipeData = data[0];
        const newRecipe = await RecipeItem.create({
            title: recipeData.title,
            instructions: recipeData.instructions
        })
        for(const ingredientname of recipeData.ingredients){
            const ingredient = await Ingredient.create({
                name: ingredientname,
                recipe_id: newRecipe.id
            })
        }

        res.json({message: "Recipe added succesfully", recipe: newRecipe});

    }
    catch(err){
        console.error(err);
        res.status(500).json({error: "Recipe in system already"});
    }
});

/*
    id INT AUTO_INCREMENT PRIMARY KEY,
    sugar_g DECIMAL(10,2) NOT NULL,
    fiber_g DECIMAL(10,2) NOT NULL,
    serving_size_g DECIMAL(10,2) NOT NULL,
    sodium_mg DECIMAL(10,2) NOT NULL,
    name VARCHAR(255) NOT NULL,
    potassium_mg DECIMAL(10,2) NOT NULL,
    fat_saturated_g DECIMAL(10,2) NOT NULL,
    fat_total_g DECIMAL(10,2) NOT NULL,
    calories DECIMAL(10,2) NOT NULL,
    cholesterol_mg DECIMAL(10,2) NOT NULL,
    protein_g DECIMAL(10,2) NOT NULL,
    carbohydrates_total_g
*/





module.exports = router;
