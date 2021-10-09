




const search=document.getElementById('search'),
submit=document.getElementById('submit'),
shuffle=document.getElementById('random'),
meals=document.getElementById('meals'),
singleMeal=document.getElementById('single-meal'),
resultHeading=document.getElementById('result-heading');

function searchMeal(e) {
    e.preventDefault();

    //get search term
    let theSearchvalue=search.value;

    //searcher
    if (theSearchvalue.trim()) {
        resultHeading.innerHTML=`Search results for '${theSearchvalue}' : `
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${theSearchvalue}`)
        .then(item=>item.json())
        .then(data=>{
            if (data.meals==null){
                meals.classList.add('nothing')
                meals.innerHTML='Nothing Found!'
            }else{
            meals.classList.remove('nothing')
            meals.innerHTML= data.meals.map(meal=>
                `<div class="meal">
                <div class="meal-info" data-id="${meal.idMeal}"></div>
                <div class="hovered"><h3>${meal.strMeal}</h3></div>
                <img class="meal-img" src="${meal.strMealThumb}"/>
                </div>`

            ).join('');


            //clear search
            search.value=''
            }
        })

    } else {
        alert('Enter a meal name!')
    }
} 
function getMealById(id) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(item=>item.json())
    .then(data=> {
        const theMeal=data.meals[0];
    addMealtoDom(theMeal)

})
}
function addMealtoDom(meal) {
    let ingredients=[];

    for (let i=1;i<=20;i++){
        if (`${meal[`strIngredient${i}`]}`) {
        ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
    } else {
        break;
    }
}
    singleMeal.innerHTML=`
    <div class="single-meal">
    <h2>${meal.strMeal}</h2>
    <img src="${meal.strMealThumb}" />

    <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
    </div>

    <div class="main">
    <p class="meal-description">${meal.strInstructions}</p>
    <ul class="ingredient">
    ${ingredients.map(ing=>`<li>${ing}</li>`).join('')}
    </ul>
    </div>

    </div>
    `
}
function getRandomMeal() {
    search.value=''
    singleMeal.innerHTML='';
    resultHeading.innerHTML='';
    meals.innerHTML='';
    fetch("https://www.themealdb.com/api/json/v1/1/random.php").then(res=>res.json()).then(item=>{
    const theMeal=item.meals[0];
    addMealtoDom(theMeal)
})
}

submit.addEventListener('submit', searchMeal);
shuffle.addEventListener('click',getRandomMeal)
meals.addEventListener('click',e=>{
    const thepath=e.path[1];
    const selectedmeal_info=thepath.children[0];
    const theTargetId= selectedmeal_info.getAttribute('data-id')
    if (theTargetId!= null){
        getMealById(theTargetId)
    }
})
