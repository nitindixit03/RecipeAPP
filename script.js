const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

//function to get recipes
const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML = "<h2>Fetching Recipes...<h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        console.log(response);

        recipeContainer.innerHTML = "";
        response.meals.forEach(meal =>{
            const recipeDiv = document.createElement(`div`);
            recipeDiv.classList.add('recipe');
            recipeDiv.innerHTML = `<img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Belongs to <span>${meal.strCategory}</span> category</p>
            `
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding eventlistener to recipe button!!
            button.addEventListener('click',() =>{
                openRecipePopup(meal);
            });

            recipeContainer.appendChild(recipeDiv);
        });
    }catch(error){
        recipeContainer.innerHTML = `<h2>Sorry,<br><br>no results matched your search.
            <br><br>Please try searching with different meal....😢!</h2>
            <br><br><br><br><img src="food.gif"  style="width: 400px; height: 500px;">`;
    }    
};

// Function to fetch Intgredients ans measurements
const fetchIngredients = (meal) =>{
    let ingredientsList ="";
    for(let i=1; i<20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredents:</h3>
        <ul class="ingredientName">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions: </h3>
            <p>${meal.strInstructions}</p>
        </div>
     `
     

    recipeDetailsContent.parentElement.style.display = "block";
}

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML =`<h2>🤦‍♀️I know you are trying to searching empty box..😂😂
            <br><br>please type the 😋meal in the search Box😉😎</h2>
            <br><br><br><br><img src="virat.gif"  style="width: 400px; height: 500px;">`
            return;
    }
    fetchRecipes(searchInput);
    console.log("clicked");
})

recipeCloseBtn.addEventListener('click',(e)=>{
    recipeDetailsContent.parentElement.style.display = "none";
})