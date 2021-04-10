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
    alert('HTTP-Error: ' + request.status);
  }

  // successful request, create Object for data
  const diningHalls = await request.json();
  const diningArr = diningHalls.data;
  console.log('diningArr: ' , diningArr);

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

async function getMeals() {
  console.log('enter getMeals');
  const diningRequest = await fetch('/api/meals/');
  const diningData = await diningRequest.json();
  return diningData;
}

async function windowActions() {
  console.log('enter windowActions');
  // Lab 7 function
  const meals = await getMeals();
  console.table(meals);
  
  // Lab 6 function
  await dataHandler();
}

window.onload = windowActions;