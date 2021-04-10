async function dataHandler() {
  console.log('enter dataHandler');

  // const variable declarations
  const endpoint = '/api/dining';
  const request = await fetch(endpoint);
  const results = document.querySelector('.result-list');

  // check succesful request
  if (request.ok) {
    console.log('endpoint fetched');
  } else {
    alert(`HTTP-Error: ${request.status}`);
  }

  // successful request, create Object for data
  const diningHalls = await request.json();
  const diningArr = diningHalls.data;
  console.log('diningArr: ', diningArr);

  // iterate through data array, adding new row for each hall
  // using inner HTML
  diningArr.forEach((hall) => {
    const newRow = document.createElement('tr');
    newRow.innerHTML = `<td>${hall.hall_id}</td>
          <td>${hall.hall_name}</td>
          <td>${hall.hall_address}</td>`;

    results.append(newRow);
  });
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

async function getMeals() {
  console.log('enter getMeals');
  const diningRequest = await fetch('/api/wholeMeal');
  const diningData = await diningRequest.json();
  return diningData;
}

async function windowActions() {
  console.log('enter windowActions');
  // Lab 7 function
  const results = await getMeals();
  const meals = results.data;

  const mealArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selectedMeals = mealArr.map((elem) => {
    const random = getRandomIntInclusive(0, meals.length - 1);
    return meals[random];
  });

  console.table(selectedMeals);

  // Lab 6 function
  await dataHandler();
}

window.onload = windowActions;