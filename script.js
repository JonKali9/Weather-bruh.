//Function to add Weather Data to document
const setWeather = (city, country, weather, temperature, humidity, time) => {
  console.log("City:", city);
  console.log("Country:", country);
  console.log("Weather:", weather);
  console.log("Temperature:", temperature);
  console.log("Humidity:", humidity);
  console.log("Time:", time);
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

/*
//Call to get the Weather in New York
getWeather('New York');
//Call to get the Weather in London
getWeather('London');
//Call to get the Weather in Paris
getWeather('Paris');
*/