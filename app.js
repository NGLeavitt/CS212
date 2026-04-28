let savedRecipes = [];

if (localStorage.getItem("savedRecipes") !== null) {
  savedRecipes = JSON.parse(localStorage.getItem("savedRecipes"));
}

// Navigation Logic
function viewDetails(name) {
  localStorage.setItem("currentRecipeView", name);
  window.location.href = "basic_page.html";
}

function goToEdit() {
  window.location.href = "edit_recipe.html";
}

// Display Logic
function DisplaySavedRecipes() {
  const dashboard = $("#recipes-dashboard");
  dashboard.empty();

  if (savedRecipes.length > 0) {
    savedRecipes.forEach((recipe) => {
      const imageArea = recipe.image_url 
        ? `<img src="${recipe.image_url}" class="card-img-top" style="height: 160px; object-fit: cover; border-bottom: 2px solid var(--text-dark);">`
        : `<div class="d-flex align-items-center justify-content-center text-muted" style="height: 160px; background: #f0f0f0; border-bottom: 2px solid var(--text-dark); font-size: 0.7rem;">[ NO IMAGE PROVIDED ]</div>`;

      dashboard.append(`
        <div class="col-md-4 mb-4">
          <div class="card h-100">
            <div class="card-header-custom">${recipe.name}</div>
            ${imageArea}
            <div class="card-body text-center">
              <p class="small text-uppercase mb-3">${recipe.category} | ${recipe.cook_time}</p>
              <button class="btn btn-outline-custom btn-sm w-100" onclick="viewDetails('${recipe.name}')">View Entry</button>
            </div>
          </div>
        </div>`);
    });
  } else {
    dashboard.append("<p class='mt-5 text-uppercase'>The Archive is empty.</p>");
  }
}

// Data Management
let inputTracker = { ing: 1, ins: 1 };

function addField(type) {
  inputTracker[type]++;
  $(`#${type}-area`).append(`<input type="text" class="form-control mb-2" id="${type}${inputTracker[type]}">`);
}

function SaveRecipe() {
  let recipe = {
    name: $("#f-name").val(),
    category: $("#f-cat").val(),
    cook_time: $("#f-time").val(),
    ingredients: [],
    instructions: [],
    date_added: Date.now()
  };

  $("input[id^='ing']").each(function() { if($(this).val()) recipe.ingredients.push($(this).val()); });
  $("input[id^='ins']").each(function() { if($(this).val()) recipe.instructions.push($(this).val()); });

  savedRecipes.push(recipe);
  localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
  window.location.href = "index.html";
}

$(document).ready(function() {
  if ($("#recipes-dashboard").length) DisplaySavedRecipes();
});