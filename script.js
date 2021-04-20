const formsDiv = document.getElementById("formsDiv");
const userInput = document.querySelector('#input input');
const goButton = document.querySelector('#input p');

goButton.addEventListener('click', () => {
  const city = userInput.value;
  userInput.value = '';
  getWeather(city);
})

//Function to add Weather Data to document
const setWeather = (city, country, weather, temperature, humidity, time) => {
  //Create form element
  const form = document.createElement('div')
  form.className = 'form';

  //Create img element
  const img = document.createElement('img');
  setSrc(img, city);
  //Add img to form
  form.appendChild(img);

  //Create h2 element
  const h2 = document.createElement('h2');

  //Create span tags in h2
  const cityP = document.createElement('span');
  cityP.innerHTML = city + ", ";
  const countryP = document.createElement('span');
  countryP.innerHTML = country;
  //Add span tags to h2
  h2.appendChild(cityP);
  h2.appendChild(countryP);
  //Add h2 to form
  form.appendChild(h2);

  //Create weather element
  const weatherP = document.createElement('p');
  weatherP.innerHTML = "Weather: " + weather;
  form.appendChild(weatherP)
  //Create temperature element
  const tempP = document.createElement('p');
  tempP.innerHTML = "Temp: " + temperature + "°C";
  form.appendChild(tempP)
  //Create time element
  const timeP = document.createElement('p');
  time = String(time);
  if (parseInt(time.substring(0,2)) >= 12) {
    time = (parseInt(time.substring(0,2))-12) + String(time).substring(2,5);
    timeP.innerHTML = "Time: " + time + "pm";
  } else {
    time = String(time).substring(0,5);
    timeP.innerHTML = "Time: " + time + "am";
  }
  form.appendChild(timeP)

  //Add form to forms
  formsDiv.insertBefore(form, formsDiv.childNodes[0]);
}

//Function to get Weather in a City
const getWeather = async city => {
  //Set Url
  const url = `https://community-open-weather-map.p.rapidapi.com/weather?q=${city}&units=%22metric%22`;
  //Run the GET Request
  try {
    const body = {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "5eb605618fmsh5c6fab184dcef06p18f8adjsne2de367e6f93",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
      }
    }
    const response = await fetch(url, body);
    if (response.ok) {
      const jsonResponse = await response.json();
      city = jsonResponse.name;
      const country = jsonResponse.sys.country;
      const weather = jsonResponse.weather[0].description;
      //Temperature
      let temperature = jsonResponse.main.temp;
      temperature -= 273.15;
      temperature = temperature.toFixed(2);
      const humidity = jsonResponse.main.humidity;
      //Time
      let time = new Date().getTime();
      const timezone = jsonResponse.timezone * 1000;
      time = time + timezone - 7200000;
      new Date().getTime();
      const date = new Date(time);
      time = date.toLocaleTimeString();
      //Sets weather
      setWeather(city, country, weather, temperature, humidity, time)
      return jsonResponse;
    }
    alert("Invalid City!");
  } catch (error) {
    alert(error);
  }
}

//Function to get image searches
const setSrc = async (element, search) => {
  try {
    const body = {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "5eb605618fmsh5c6fab184dcef06p18f8adjsne2de367e6f93",
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com"
      }
    }
    const response = await fetch("https://bing-image-search1.p.rapidapi.com/images/search?q="+search, body)
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse.value)
      const image = await jsonResponse.value[0].thumbnailUrl;
      element.src = image;
      return image;
    }
  } catch (error) {
    alert(error);
  }
}


