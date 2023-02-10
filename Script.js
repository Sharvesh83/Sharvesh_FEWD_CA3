const mealInfoDiv = document.getElementById("meal-info");

  fetch("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const mealName = meal.strMeal;
      const mealImage = meal.strMealThumb;

      mealInfoDiv.innerHTML = `
        <h3>${mealName}</h3>
        <img id="random_image" src="${mealImage}" alt="${mealName}">
      `;
    })
    .catch(error => {
      console.error(error);
      mealInfoDiv.innerHTML = "An error occurred while fetching the meal information.";
    });
    const form = document.getElementById("search-form");
form.addEventListener("submit", event => {
  event.preventDefault();

  const mealName = form.elements["meal-name"].value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => {
      if (data.meals) {
        const meal = data.meals[0];
        const mealName = meal.strMeal;
        const mealImage = meal.strMealThumb;

        mealInfoDiv.innerHTML = `
          <h3>${mealName}</h3>
          <img src="${mealImage}" alt="${mealName}">
        `;
      } else {
        mealInfoDiv.innerHTML = "No meal was found with that name.";
      }
    })
    .catch(error => {
      console.error(error);
      mealInfoDiv.innerHTML = "An error occurred while fetching the meal information.";
    });
});
const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", event => {
  event.preventDefault();

  const searchTerm = document.getElementById("search-term").value;

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
    .then(response => response.json())
    .then(data => {
      const meals = data.meals;

      if (meals === null) {
        mealInfoDiv.innerHTML = "No results found for the search term.";
      } else {
        mealInfoDiv.innerHTML = "";
        meals.forEach(meal => {
          const mealName = meal.strMeal;
          const mealImage = meal.strMealThumb;

          const mealDiv = document.createElement("div");
          mealDiv.innerHTML = `
            <div  >
            <h3>${mealName}</h3>
            <img id="random_image" src="${mealImage}" alt="${mealName}">
            </div>
            `;

          mealInfoDiv.appendChild(mealDiv);
        });
      }
    })
    .catch(error => {
      console.error(error);
      mealInfoDiv.innerHTML = "An error occurred while fetching the meal information.";
    });
});

const fetchMealDetails = mealName => {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      const mealName = meal.strMeal;
      const mealImage = meal.strMealThumb;
      const mealInstructions = meal.strInstructions;
      const mealIngredients = [];

      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          mealIngredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        }
      }

      mealInfoDiv.innerHTML = `
        <div id="meal-card">
          <img src="${mealImage}" alt="${mealName}" id="meal-image">
          <div id="meal-details">
            <h3 id="meal-name">${mealName}</h3>
            <p id="meal-instructions">${mealInstructions}</p>
            <h4>Ingredients:</h4>
            <ul id="meal-ingredients">
              ${mealIngredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
            </ul>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      mealInfoDiv.innerHTML = "An error occurred while fetching the meal information.";
    });
};

document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  const mealName = document.getElementById("meal-name-input").value;
  fetchMealDetails(mealName);
});
const mealImage = document.getElementById("meal-image");
const mealModal = document.getElementById("meal-modal");
const modalContent = document.getElementById("modal-content");
const closeModalBtn = document.getElementById("close-modal-btn");

mealImage.addEventListener("click", function() {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      let ingredients = [];
      for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
          ingredients.push(
            `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
          );
        }
      }
      modalContent.innerHTML = `
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join("")}
        </ul>
      `;
      mealModal.style.display = "block";
    });
});

closeModalBtn.addEventListener("click", function() {
  mealModal.style.display = "none";
});

window.addEventListener("click", function(event) {
  if (event.target === mealModal) {
    mealModal.style.display = "none";
  }
});
