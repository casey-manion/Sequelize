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

// random int function for whole meal selection
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

  const calories = [];
  const servingSize = [];
  const cholesterol = [];
  const sodium = [];
  const carbs = [];
  const protein = [];
  const fat = [];

  selectedMeals.forEach((meal) => {
    console.log(meal.meal_name);
    console.log(meal.calories);
    calories.push({y: meal.calories, label: meal.meal_name});
    servingSize.push({y: meal.serving_size, label: meal.meal_name});
    cholesterol.push({y: meal.cholesterol, label: meal.meal_name});
    sodium.push({y: meal.sodium, label: meal.meal_name});
    carbs.push({y: meal.carbs, label: meal.meal_name});
    protein.push({y: meal.protein, label: meal.meal_name});
    fat.push({y: meal.fat, label: meal.meal_name});
  });

  console.log('Calories: ', calories);
  console.log('Serv Size: ', servingSize);
  console.log('Cholesterol: ', cholesterol);
  console.log('Sodium: ', sodium);
  console.log('Carbs: ', carbs);
  console.log('Protein: ', protein);
  console.log('Fat: ', fat);

  // build stacked bar chart
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Meal Macros'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },
    data: [
      {
        type: 'stackedBar',
        name: 'Calories',
        color: '#3D3D3D',
        showInLegend: 'true',
        dataPoints: calories
      },
      {
        type: 'stackedBar',
        name: 'Serving Size',
        color: '#BDAA00',
        showInLegend: 'true',
        dataPoints: servingSize
      },
      {
        type: 'stackedBar',
        name: 'Cholesterol',
        color: '#6A008A',
        showInLegend: 'true',
        dataPoints: cholesterol
      },
      {
        type: 'stackedBar',
        name: 'Sodium',
        color: '#2B7E28',
        showInLegend: 'true',
        dataPoints: sodium
      },
      {
        type: 'stackedBar',
        name: 'Carbs',
        color: '#B96900',
        showInLegend: 'true',
        dataPoints: carbs
      },
      {
        type: 'stackedBar',
        name: 'Protein',
        color: '#0067C7',
        showInLegend: 'true',
        dataPoints: protein
      },
      {
        type: 'stackedBar',
        name: 'Fat',
        color: '#B80099',
        showInLegend: 'true',
        dataPoints: fat
      }
    ]
  });
  chart.render();

  // toggle data series for stacked bar chart
  function toggleDataSeries(e) {
    if (typeof (e.dataSeries.visible) === 'undefined' || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    } else {
      e.dataSeries.visible = true;
    }
    chart.render();
  }

  // Lab 6 function
  await dataHandler();
}

window.onload = windowActions;