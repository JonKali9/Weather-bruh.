const formsDiv = document.getElementById("formsDiv");
const userInput = document.querySelector('#input input');
const goButton = document.querySelector('#input p');

goButton.addEventListener('click', () => {
  const city = userInput.value;
  getWeather(city);
})

//Function to add Weather Data to document
const setWeather = (city, country, weather, temperature, humidity, time) => {
  //Create form element
  const form = document.createElement('div')
  form.className = 'form';

  //Create img element
  const img = document.createElement('img');
  img.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.ESzsUwoj0gC-s7qdLHV7zgHaEK%26pid%3DApi&f=1";
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
  weatherP.innerHTML = weather;
  form.appendChild(weatherP)
  //Create temperature element
  const tempP = document.createElement('p');
  tempP.innerHTML = temperature;
  form.appendChild(tempP)
  //Create time element
  const timeP = document.createElement('p');
  timeP.innerHTML = time;
  form.appendChild(timeP)

  //Add form to forms
  formsDiv.appendChild(form)
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
      const temperature = jsonResponse.main.temp;
      const humidity = jsonResponse.main.humidity;
      const time = jsonResponse.dt;
      const date = new Date(time);
      const datetime = date.toLocaleTimeString();
      setWeather(city, country, weather, temperature, humidity, datetime)
      return jsonResponse;
    }
    alert("Request Failed!");
  } catch (error) {
    alert(error);
  }
}