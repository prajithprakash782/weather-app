function displayImageBasedOnWeather(desc) {
  const weatherImages = {
    'clear sky': 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/clear-day.svg',
    'few clouds': 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/partly-cloudy-day.svg',
    'broken clouds' :'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg',
    'scattered clouds': 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg',
    'overcast clouds' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/overcast.svg',
    'few clouds' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/cloudy.svg',
    'rain': 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg',
    'light rain' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/rain.svg',
    'mist' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/fog-day.svg',
    'smoke' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/smoke.svg',
    'snow' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/snow.svg',
    'haze' : 'https://bmcdn.nl/assets/weather-icons/v3.0/fill/svg/haze.svg'
    
  };

  const imageElement = document.getElementById('weather-image');
  if (weatherImages[desc]) {
    imageElement.src = weatherImages[desc];
    im=imageElement.src
  } else {
    imageElement.src = 'https://cdn-icons-png.flaticon.com/512/3222/3222800.png';
  }
}





function search() {
  let name = city.value
  if (name) {
    const search = new XMLHttpRequest()

    search.open('get', `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=621754389f5e74faf5a9f799772d7adc`)
    search.send()
    console.log(search.readyState);
    search.onreadystatechange = () => {
      console.log(search.readyState);

      if (search.readyState == 4) {
        if (search.status >= 200 && search.status < 300) {
          console.log(search.responseText);
          let data = JSON.parse(search.responseText)
          console.log(data);

          let nm = data.name
          console.log(nm);

          let ctry = data.sys.country
          console.log(ctry);

          let tp = data.main.temp
          let cal = eval(tp - 273.15)
          let cel = cal.toFixed(1)
          console.log(cel);

          let desc = data.weather[0].description
          console.log(desc);

          let feel = data.main.feels_like
          let calc = eval(feel - 273.15)
          let c = calc.toFixed(1)
          console.log(c);

          let hum = data.main.humidity
          console.log(hum);

          let wind = data.wind.speed
          console.log(wind);

          let pr = data.main.pressure
          console.log(pr);

          let vis = data.visibility
          console.log(vis);

          let time = new Date()
          console.log(time);

          document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${nm})`
          displayImageBasedOnWeather(desc);

          result.innerHTML =

            `
            <div class="row">
              <p class="name">${nm},${ctry}</p>
            </div>
            <div class="d-flex justify-content-center align-items-top">
            <img id="weather-image" src=${im} alt="icon">
              <h2 class="head">${cel}</h2>
              <p style="font-size: 33px;"><span style="font-size: 26px;">&#xb0;</span>C</p>
            </div>
    
            <div class="row mt-3">
              <p style="font-size: 23px;">${desc}</p>
              <p style="font-size: 15px;">Feels like ${c} &#xb0;C </p>
            </div>
    
            <div class="row mt-3">
              <div class="col-lg-3 col-md-4 col">
                <div class="box">
                  <i class="fa-solid fa-droplet logo"></i>
                  
                </div>
                <p class="fs">Humidity:</p>
                <p class="fb">${hum}%</p>
              </div>
              <div class="col-lg-3 col-md-4 col">
                <div class="box">
                  <i class="fa-solid fa-wind logo"></i>
                </div>
                <p class="fs">Wind:</p>
                <p class="fb">${wind} km/hr</p>
              </div>
              <div class="col-lg-3 col-md-4 col">
                <div class="box">
                  <i class="fa-solid fa-gauge logo"></i>
                </div>
                <p class="fs">Pressure:</p>
                <p class="fb">${pr} Pa</p>
              </div>
              <div class="col-lg-3">
                <div class="box">
                  <i class="fa-solid fa-eye logo"></i>
                </div>
                <p class="fs">Visibility:</p>
                <p class="fb">${vis} m</p>
              </div>
            </div>
            <div class="row mt-3">
                
                <p>${time}</p>
                <p id="invalid"></p>
              
            </div>
            `

        }


        else {
          console.log('No data');
        }

      }
      else {
        console.log('No data');
      }
    }
  }
  else {
    invalid.style.fontWeight="bold"
    invalid.style.color="red"
    invalid.innerHTML="* Enter valid input"
  }

}

function refresh(){
  window.location="weather.html"
}


