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
  
  const mealName = [];
  const calories = [];
  const servingSize = [];
  const cholesterol = [];
  const sodium = [];
  const carbs = [];
  const protein = [];

  selectedMeals.forEach((meal) => {
    mealName.push(meal['meal_name']);
    calories.push({key: meal['meal_name'], value: meal['calories']});
    servingSize.push({key: meal['meal_name'], value: meal['serving_size']});
    cholesterol.push({key: meal['meal_name'], value: meal['cholesterol']});
    sodium.push({key: meal['meal_name'], value: meal['sodium']});
    carbs.push({key: meal['meal_name'], value: meal['carbs']});
    protein.push({key: meal['meal_name'], value: meal['protein']});
  });

  console.log('Calories: ', calories);
  console.log('Serv Size: ', servingSize);
  console.log('Cholesterol: ', cholesterol);
  console.log('Sodium: ', sodium);
  console.log('Carbs: ', carbs);
  console.log('Protein: ', protein);
  
  // build stacked bar chart
  const chart = new CanvasJS.Chart('chartContainer', {
    animationEnabled: true,
    title: {
      text: 'Meal Macros'
    },
    axisX: {
      // valueFormatString: 'DDD'
    },
    axisY: {
      // prefix: '$'
    },
    toolTip: {
      shared: true
    },
    legend: {
      cursor: 'pointer',
      itemclick: toggleDataSeries
    },
    data: [{
      type: 'stackedBar',
      name: 'Meals',
      showInLegend: 'true',
      xValueFormatString: 'DD, MMM',
      yValueFormatString: '$#,##0',
      dataPoints: [
        { x: new Date(2017, 0, 30), y: 56 },
        { x: new Date(2017, 0, 31), y: 45 },
        { x: new Date(2017, 1, 1), y: 71 },
        { x: new Date(2017, 1, 2), y: 41 },
        { x: new Date(2017, 1, 3), y: 60 },
        { x: new Date(2017, 1, 4), y: 75 },
        { x: new Date(2017, 1, 5), y: 98 }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Snacks',
      showInLegend: 'true',
      xValueFormatString: 'DD, MMM',
      yValueFormatString: '$#,##0',
      dataPoints: [
        { x: new Date(2017, 0, 30), y: 86 },
        { x: new Date(2017, 0, 31), y: 95 },
        { x: new Date(2017, 1, 1), y: 71 },
        { x: new Date(2017, 1, 2), y: 58 },
        { x: new Date(2017, 1, 3), y: 60 },
        { x: new Date(2017, 1, 4), y: 65 },
        { x: new Date(2017, 1, 5), y: 89 }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Drinks',
      showInLegend: 'true',
      xValueFormatString: 'DD, MMM',
      yValueFormatString: '$#,##0',
      dataPoints: [
        { x: new Date(2017, 0, 30), y: 48 },
        { x: new Date(2017, 0, 31), y: 45 },
        { x: new Date(2017, 1, 1), y: 41 },
        { x: new Date(2017, 1, 2), y: 55 },
        { x: new Date(2017, 1, 3), y: 80 },
        { x: new Date(2017, 1, 4), y: 85 },
        { x: new Date(2017, 1, 5), y: 83 }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Dessert',
      showInLegend: 'true',
      xValueFormatString: 'DD, MMM',
      yValueFormatString: '$#,##0',
      dataPoints: [
        { x: new Date(2017, 0, 30), y: 61 },
        { x: new Date(2017, 0, 31), y: 55 },
        { x: new Date(2017, 1, 1), y: 61 },
        { x: new Date(2017, 1, 2), y: 75 },
        { x: new Date(2017, 1, 3), y: 80 },
        { x: new Date(2017, 1, 4), y: 85 },
        { x: new Date(2017, 1, 5), y: 105 }
      ]
    },
    {
      type: 'stackedBar',
      name: 'Takeaway',
      showInLegend: 'true',
      xValueFormatString: 'DD, MMM',
      yValueFormatString: '$#,##0',
      dataPoints: [
        { x: new Date(2017, 0, 30), y: 52 },
        { x: new Date(2017, 0, 31), y: 55 },
        { x: new Date(2017, 1, 1), y: 20 },
        { x: new Date(2017, 1, 2), y: 35 },
        { x: new Date(2017, 1, 3), y: 30 },
        { x: new Date(2017, 1, 4), y: 45 },
        { x: new Date(2017, 1, 5), y: 25 }
      ]
    }]
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