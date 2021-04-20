//Function to add Weather Data to document
const setWeather = (weather, temperature, humidity, time) => {
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
      const weather = jsonResponse.weather[0].description;
      const temperature = jsonResponse.main.temp;
      const humidity = jsonResponse.main.humidity;
      const time = jsonResponse.dt;
      const date = new Date(time);
      const datetime = date.toLocaleTimeString();
      setWeather(weather, temperature, humidity, datetime)
      return jsonResponse;
    }
    alert("Request Failed!");
  } catch (error) {
    alert(error);
  }
}

//Call to get the Weather in New York
const berlinWeather = getWeather('New York');