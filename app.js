const apiKey = '299d02fde49f4339990153753232302';

// Get current weather data
fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Opole`)
  .then(response => response.json())
  .then(data => {
    const currentWeatherData = document.getElementById('current-weather-data');
    const temperature = data.current.temp_c;
    const weatherDescription = data.current.condition.text;
    const weatherIcon = data.current.condition.icon;
    const weatherCard = `
      <div class="weather-card">
        <h3>${temperature}°C</h3>
        <img src="${weatherIcon}" alt="${weatherDescription}">
        <p>${weatherDescription}</p>
      </div>
    `;
    currentWeatherData.innerHTML = weatherCard;
  })
  .catch(error => console.error(error));

// Get forecast data
fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Opole&days=5`)
  .then(response => response.json())
  .then(data => {
    const forecastData = document.getElementById('forecast-data');
    const forecastList = data.forecast.forecastday;
    let forecastCards = '';
    for (let i = 0; i < forecastList.length; i++) {
      const forecast = forecastList[i];
      const temperature = forecast.day.avgtemp_c;
      const weatherDescription = forecast.day.condition.text;
      const weatherIcon = forecast.day.condition.icon;
      const forecastCard = `
        <div class="weather-card">
          <h3>${temperature}°C</h3>
          <img src="${weatherIcon}" alt="${weatherDescription}">
          <p>${weatherDescription}</p>
          <div class="details" style="display:none;"></div> <!-- Add details element for each card -->
        </div>
      `;
      forecastCards += forecastCard;
    }
    forecastData.innerHTML = forecastCards;

    const cards = document.querySelectorAll('.weather-card'); // Get all weather cards
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        const details = card.querySelector('.details'); // Get the details element of the clicked card
        if (details.style.display === 'none') {
          // If details are not displayed, show them
          const forecast = forecastList[index];
          const maxTemperature = forecast.day.maxtemp_c;
          const minTemperature = forecast.day.mintemp_c;
          const precipitation = forecast.day.totalprecip_mm;
          const windSpeed = forecast.day.maxwind_kph;
          const humidity = forecast.day.avghumidity;
          const detailsHTML = `
            <p>Max temperature: ${maxTemperature}°C</p>
            <p>Min temperature: ${minTemperature}°C</p>
            <p>Precipitation: ${precipitation} mm</p>
            <p>Wind speed: ${windSpeed} kph</p>
            <p>Humidity: ${humidity}%</p>
          `;
          details.innerHTML = detailsHTML;
          details.style.display = 'block';
        } else
        {
            // If details are displayed, hide them
            details.style.display = 'none';
            }
            });
            });
            })
            .catch(error => console.error(error));