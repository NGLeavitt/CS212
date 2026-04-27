let savedRecipes = [
  {
    name = "example recipe",
    category = "food",
    cook_time = "10 minutes",
    servings = "1",
    allergens = "aquaphobia",
    ingredients = ["3 cups water", "2 teaspoons salt"],
    instructions = ["Pour the salt into the water"],
    favorite = "true"
  }
];

function FindRecipeByName(recipeName) {
  savedRecipes.forEach((recipe) => {
    if (recipe.name === recipeName) {
      return recipe;
    }
  });
}

let NewRecipeIngredientsCount = 2;
let NewRecipeInstructionsCount = 2;

function DisplaySavedRecipes(){
  // this requires the html and css of the recipes, but right now the retrieval of the recipes from local storage can be coded
  if (localStorage.getItem("savedRecipes") != null) {
    savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
    savedRecipes.forEach((recipe) => {
      $("#recipe-dashboard").append(
        `<div class="col-md-4 mb-3">
          <div class="card shadow-sm">
            <div class="recipe-title-bar">${recipe.name}</div>
            <img src="https://via.placeholder.com/300x150" class="card-img-top">
            <div class="card-body">
              <p class="card-text">${recipe.category} • ${recipe.cook_time}</p>
            </div>
          </div>
        </div>`)
    })
  }
  else {
    $("#recipe-dashboard").append("<p>You have no saved recipes yet</p>");
  }
}

let currentRecipe;

function DisplayCurrentRecipe(){
  $("#recipe-name-text").html(currentRecipe.name);
  $("#recipe-category-text").html(currentRecipe.category);
  $("#recipe-cook-time-text").html(currentRecipe.cook_time);
  $("#recipe-allergens-text").html(currentRecipe.allergens);
  let ingredients_string = "";
  currentRecipe.ingredients.forEach((ingredient) => {
    ingredients_string += ingredient + "\n";
  });
  $("#recipe-ingredients-text").html(ingredients_string);
  currentRecipe.instructions.forEach((instruction) => {
    $("#instructions-card").append(`<p>${instruction}</p>`);
  });

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
  const NewRecipeAllergens = document.getElementById("add-recipe-form-allergens").value;
  let NewRecipeIngredients = [];
  for (i = 1; i <= NewRecipeIngredientsCount; i++){
    NewRecipeIngredients.push(document.getElementByID(`add-recipe-form-ingredient${i}`);
  }
  let NewRecipeInstructions = [];
  for (i = 1; i <= NewRecipeInstructionsCount; i++){
    NewRecipeInstructions.push(document.getElementByID(`add-recipe-form-instruction${i}`);
  }
  let newRecipe = {
    name: NewRecipeName,
    category: NewRecipeCategory,
    cook_time: NewRecipeCookTime,
    servings: NewRecipeServings,
    allergens: NewRecipeAllergens,
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

function searchAndFilter() {
  let query    = $("#search-input").val().toLowerCase().trim();
  let category = $("#filter-category").val().toLowerCase();
  let favOnly  = $("#filter-favorites").is(":checked");
  let sortVal  = $("#filter-sort").val();

  let results = [];
  for (let i = 0; i < savedRecipes.length; i++) {
    let recipe = savedRecipes[i];

    let searchable = recipe.name + " " + recipe.category + " " + recipe.ingredients.join(" ");
    searchable = searchable.toLowerCase();

    let matchSearch   = query === ""    || searchable.includes(query);
    let matchCategory = category === "" || recipe.category.toLowerCase() === category;
    let matchFav      = !favOnly        || recipe.favorite === "true";

    if (matchSearch && matchCategory && matchFav) {
      results.push(recipe);
    }
  }

  if (sortVal === "name-asc") {
    results.sort(function(a, b) { return a.name.localeCompare(b.name); });
  } else if (sortVal === "name-desc") {
    results.sort(function(a, b) { return b.name.localeCompare(a.name); });
  } else if (sortVal === "time-asc") {
    results.sort(function(a, b) { return parseInt(a.cook_time) - parseInt(b.cook_time); });
  } else if (sortVal === "time-desc") {
    results.sort(function(a, b) { return parseInt(b.cook_time) - parseInt(a.cook_time); });
  } else if (sortVal === "date-asc") {
    results.sort(function(a, b) { return a.date_added - b.date_added; });
  } else if (sortVal === "date-desc") {
    results.sort(function(a, b) { return b.date_added - a.date_added; });
  }

  renderRecipes(results);

  if (results.length === savedRecipes.length) {
    $("#filter-hint").text("");
  } else {
    $("#filter-hint").text("Showing " + results.length + " of " + savedRecipes.length);
  }
}

function clearFilters() {
  $("#search-input").val("");
  $("#filter-category").val("");
  $("#filter-favorites").prop("checked", false);
  $("#filter-sort").val("");
  $("#filter-hint").text("");
  renderRecipes(savedRecipes);
}

$(document).ready(function() {
  DisplaySavedRecipes();

  $("#search-input").on("input", searchAndFilter);
  $("#filter-category").on("change", searchAndFilter);
  $("#filter-favorites").on("change", searchAndFilter);
  $("#filter-sort").on("change", searchAndFilter);
  $("#clear-filters-btn").on("click", clearFilters);
});
