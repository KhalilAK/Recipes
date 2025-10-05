const button = document.querySelector(".submit-btn");
const foodInput = document.querySelector(".food-input");
const serverName = "";
const recipeOverlay = document.querySelector(".recipe-overlay");
const recipeOverlayDetails = document.querySelector(".recipe-overlay-details");
const recipeOverlayIngredients = document.querySelector(".recipe-overlay-ingredients");
const exitOverlayBtn = recipeOverlayDetails.children[0];
const recipeTitle = document.querySelector(".recipe-title");
const recipeInstructions = document.querySelector(".recipe-instructions");

const mainContainer = document.querySelector(".container");


const barcode = '3017624010701';
const apiUrl = 'www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata';

let showDetails = false;
let currentTitle = "";

async function getRecipes(){
    try{
        const response = await fetch(`${serverName}/auth/get-recipes`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        if(response.ok){
            if(!showDetails){
                mainContainer.innerHTML='';
                addRecipeUI(data.recipes);
            }
            console.log("Showing recipe");


            let currentRecipe = showRecipe(data.recipes, currentTitle);
            console.log(currentRecipe);
            createIngredientsUI(currentRecipe.ingredients);
            const sentences = currentRecipe.instructions.split(".").map(s => s.trim()).filter(s => s.length > 0);
            recipeInstructions.innerHTML = sentences.join('.<br>');
            console.log
            recipeTitle.textContent = currentRecipe.title;
        }
    }
    catch(err){

    }
}


function addRecipeUI(recipes){
    recipes.forEach(r => {
        let box = createRecipeBox(r.title, r.ingredients.length);
        mainContainer.appendChild(box);
    });
}


function createIngredientsUI(ingredients){
    while(recipeOverlayIngredients.children.length > 1){
        recipeOverlayIngredients.removeChild(recipeOverlayIngredients.lastChild);
    }
    ingredients.forEach(ingredient => {
        if(ingredient.name === "INGREDIENTS:"){
            return;
        }
        let ingredientUI = document.createElement("p");
        ingredientUI.classList = "ingredient-text";
        ingredientUI.textContent = ingredient.name;
        recipeOverlayIngredients.appendChild(ingredientUI);
    })
}

function createRecipeBox(title, ingredientCount){
    /*
        <div class="recipe-box">
            <div class="recipe-info">
                <div class="recipe-title">
                    <h3 class="box-title">name</h3>
                </div>
                <div class="recipe-details">
                    <p>12 Ingredients</p>
                    <p class="box-link">Click me!</p>
                </div>
            </div>
        </div>
    */
    let recipeBoxContainer = document.createElement("div");
    recipeBoxContainer.addEventListener('click', (e) => {
        recipeOverlay.style.display = 'flex';
        showDetails=true;
        currentTitle = title;
        console.log("Num");
        getRecipes();
    })
    recipeBoxContainer.classList = "recipe-box";

    let recipeInfoContainer = document.createElement("div");
    recipeInfoContainer.classList = "recipe-info";

    let recipeTitleContainer = document.createElement("div");
    recipeTitleContainer.classList = "recipe-title";
    let boxTitle = document.createElement("h3");
    boxTitle.textContent = title;
    boxTitle.classList = "box-title";
    recipeTitleContainer.appendChild(boxTitle);


    let recipeDetailsContainer = document.createElement("div");

    let ingredientNumText = document.createElement("p");
    ingredientNumText.textContent = ingredientCount + " Ingredients";

    let boxLink = document.createElement("p");
    boxLink.classList = "box-link";
    boxLink.textContent = "Click me!";
    appendChildren(2, recipeDetailsContainer, [ingredientNumText, boxLink])


    appendChildren(2, recipeInfoContainer, [recipeTitleContainer, recipeDetailsContainer]);

    recipeBoxContainer.appendChild(recipeInfoContainer);

    return recipeBoxContainer;

}

function showRecipe(recipes, title){
    return recipes.filter(r => r.title === title)[0];
}

function appendChildren(num, parent, children){
    for(let i = 0; i < num; i++){
        parent.appendChild(children[i]);
    }
}

async function checkRecipe(){
    try{
        const response = await fetch(`${serverName}/auth/check-recipe`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: (foodInput.value).trim()})
        })

        const data = await response.json();
        console.log(data);
        return data.found;
    }
    catch(err){
        return false;
    }
}


async function sendRecipe(){
    const foundRecipe = await checkRecipe();
    console.log(foundRecipe);
    if(foundRecipe){
        return;
    }
    try{
        const response = await fetch(`${serverName}/auth/add-recipe`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({query: foodInput.value})
        });
        const data = await response.json();
        if(response.ok){
            getRecipes();
        }
        else{
            console.log(data.error);
            alert(data.error);
        }
    }
    catch(err){
        console.error(err);
    }
}

function closeRecipeOverlay(){
    recipeOverlay.style.display = 'none';
}

getRecipes();

button.addEventListener('click', (e) => {
    e.preventDefault();
    sendRecipe();
})


exitOverlayBtn.addEventListener('click', closeRecipeOverlay);
recipeOverlay.addEventListener('click', closeRecipeOverlay);


recipeOverlayDetails.addEventListener('click', (e) => {
    e.stopPropagation();
});
