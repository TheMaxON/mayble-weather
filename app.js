const apiKey = '7839e41c5fb34272ba4180938212612'
var search = document.querySelector('.search')
var currLocation = 'dnipropetrovsk'


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
    console.log('working')
  } else {
    console.log('not working')
  }
};

function showPosition(position) {
  console.log(position.coords.latitude + ','+ position.coords.longitude)
  currLocation = position.coords.latitude + ','+ position.coords.longitude
};
  
  //QUICK SEARCH
  
fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${currLocation}&days=7`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);

    document.querySelector('.temp').innerHTML = Math.round(data.current.temp_c) + '°C';

    document.querySelector('.city-name').innerHTML = (data.location.name);

    if (document.querySelector('.city-name').innerHTML === 'Katerynoslav' || document.querySelector('.city-name').innerHTML === 'Iekaterinoslav') {
      document.querySelector('.city-name').innerHTML = 'Dnipro'
    }

    document.querySelector('.realfeel').innerHTML = 'RealFeel: ' + Math.round(data.current.feelslike_c) + '°C';
    
    document.querySelector('.current-high').innerHTML = 'Max: ' + Math.round(data.forecast.forecastday[0].day.maxtemp_c) + '°C |';

    document.querySelector('.current-low').innerHTML = 'Min: ' + Math.round(data.forecast.forecastday[0].day.mintemp_c) + '°C';

    document.querySelector('.current-info').innerHTML = 'Condition: ' + (data.current.condition.text);

    document.querySelector('.current-humidity').innerHTML = 'Humidity: ' + (data.current.humidity) + '%';
    
    document.querySelector('.current-precipitation').innerHTML = 'Precipitation: ' + (data.current.precip_mm) + 'mm';

    document.querySelector('.rain-chance').innerHTML = 'Chance of Rain: ' + (data.forecast.forecastday[0].day.daily_chance_of_rain) + '%';
    
    document.querySelector('.snow-chance').innerHTML = 'Chance of Snow: ' + (data.forecast.forecastday[0].day.daily_chance_of_snow) + '%';

    document.querySelector('.current-wind').innerHTML = 'Wind: ' + (data.current.wind_kph) + 'kph';

    document.querySelector('.visibility').innerHTML = 'Visibility: ' + (data.current.vis_km) + 'km';

    document.querySelector('.update-time').innerHTML = 'Last Updated: ' + (data.current.last_updated);

    //HOURLY
    for (let i = 0; i < 24; i++) {
      var num = i;
      
      document.querySelector(`.hourly-temp-${num}`).innerHTML = Math.round(data.forecast.forecastday[0].hour[i].feelslike_c) + '°C';
      document.querySelector(`.hourly-rain-chance-${num}`).innerHTML = 'Rain: ' + (data.forecast.forecastday[0].hour[i].will_it_rain) + '%';
    }

    //DAYS
    document.querySelector('.tomorrow-temp').innerHTML = Math.round(data.forecast.forecastday[1].day.avgtemp_c) + '°C';
    document.querySelector('.future-rain-prob').innerHTML = (data.forecast.forecastday[1].day.daily_chance_of_rain) + '%';
    document.querySelector('.future-snow-prob').innerHTML = (data.forecast.forecastday[1].day.daily_chance_of_snow) + '%';
    document.querySelector('.tomorrow-max').innerHTML = 'Max: ' + Math.round(data.forecast.forecastday[1].day.maxtemp_c) + '°C';
    document.querySelector('.tomorrow-low').innerHTML = 'Min: ' + Math.round(data.forecast.forecastday[1].day.mintemp_c) + '°C';

    document.querySelector('.following-temp').innerHTML = Math.round(data.forecast.forecastday[2].day.avgtemp_c) + '°C';
    document.querySelector('.following-rain-prob').innerHTML = (data.forecast.forecastday[2].day.daily_chance_of_rain) + '%';
    document.querySelector('.following-snow-prob').innerHTML = (data.forecast.forecastday[2].day.daily_chance_of_snow) + '%';
    document.querySelector('.following-max').innerHTML = 'Max: ' + Math.round(data.forecast.forecastday[2].day.maxtemp_c) + '°C';
    document.querySelector('.following-low').innerHTML = 'Min: ' + Math.round(data.forecast.forecastday[2].day.mintemp_c) + '°C';

    document.querySelector('.sunrise-time').innerHTML = (data.forecast.forecastday[0].astro.sunrise);
    document.querySelector('.sunset-time').innerHTML = (data.forecast.forecastday[0].astro.sunset);
    document.querySelector('.moonrise-time').innerHTML = (data.forecast.forecastday[0].astro.moonrise);
    document.querySelector('.moonset-time').innerHTML = (data.forecast.forecastday[0].astro.moonset);
    document.querySelector('.moon-phase').innerHTML = 'Moon Phase: ' + (data.forecast.forecastday[0].astro.moon_phase);
  });

