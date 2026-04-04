let savedRecipes = [
  {
    name = "example recipe",
    category = "food",
    cook_time = "10 minutes",
    servings = "1",
    ingredients = ["3 cups water", "2 teaspoons salt"],
    instructions = ["Pour the salt into the water"],
    favorite = "true"
  }
];

let NewRecipeIngredientsCount = 2;
let NewRecipeInstructionsCount = 2;

function DisplaySavedRecipes(){
  // this requires the html and css of the recipes, but right now the retrieval of the recipes from local storage can be coded
  if (localStorage.getItem("savedRecipes") != null) {
    savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
  }
}

function AddIngredientInput(){
  NewRecipeIngredientsCount++;
  const NewRecipeIngredientsDiv = $("#add-recipe-form-ingredients-div);
  NewRecipeIngredientsDiv.append(`<input type="text" id="add-recipe-form-ingredient${NewRecipeIngredientsCount}">`);
}

function AddInstructionInput(){
  NewRecipeInstructionsCount++;
  const NewRecipeInstructionsDiv = $("#add-recipe-form-instructions-div);
  NewRecipeInstructionsDiv.append(`<input type="text" id="add-recipe-form-instruction${NewRecipeInstructionsCount}">`);
}

function AddRecipe() {
  const NewRecipeName = document.getElementById("add-recipe-form-name").value;
  const NewRecipeCategory = document.getElementById("add-recipe-form-category").value;
  const NewRecipeCookTime = document.getElementById("add-recipe-form-cook-time").value;
  const NewRecipeServings = document.getElementById("add-recipe-form-servings").value;
  let NewRecipeIngredients = [];
  for (i = 1; i <= NewRecipeIngredientsCount; i++){
    NewRecipeIngredients.push(document.getElementByID(`add-recipe-form-ingredient$(i)`);
  }
  let NewRecipeInstructions = [];
  for (i = 1; i <= NewRecipeInstructionsCount; i++){
    NewRecipeInstructions.push(document.getElementByID(`add-recipe-form-instruction$(i)`);
  }
  let newRecipe = {
    name: NewRecipeName,
    category: NewRecipeCategory,
    cook_time: NewRecipeCookTime,
    servings: NewRecipeServings,
    ingredients: NewRecipeIngredients,
    instructions: NewRecipeInstructions,
    favorite: "false"
  };
  savedRecipes.push(newRecipe);
  if (localStorage.getItem("savedRecipes") != null) {
    localStorage.removeItem("savedRecipes");
  }
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes);
  NewRecipeIngredients = 2;
  NewRecipeInstructions = 2;
}
