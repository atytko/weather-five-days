const cityForm = document.querySelector('form');
const futureWeather = document.querySelector('.futureWeather');
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const updateUI = (data) => {

    // const cityDets = data.cityDets;
    // const weather = data.weather;

    // destructure properties
    const { cityDets, weather } = data;

    let weatherFiveDays = "";
    weather.map(day => {
        const timeSrc = day.Day  ? 'img/day.svg' : 'img/night.svg';
        const d = new Date(day.Date);
        const dayName = weekDays[d.getDay()];
        
        weatherFiveDays += `
            <div class="card shadow-lg rounded d-none">
                <img src="${timeSrc}" class="time card-img-top">
                <div class="icon bg-light mx-auto text-center">
                    <img src="img/icons/${day.Day.Icon}.svg" alt="">
                </div>
                <div class="text-muted text-uppercase text-center details">
                    <h4 class="my-3">${cityDets.EnglishName}</h4>
                    <h5 class="my-3">${dayName}</h5>
                    <div class="my-3 weatherConditions">${day.Day.IconPhrase}</div>
                    <div class="display-4 my-4">
                        <span>${day.Temperature.Maximum.Value}</span>
                        <span>&deg;C</span>
                    </div>
                </div>
        </div>`;
    });
    
    // update details template
    futureWeather.innerHTML = weatherFiveDays;

    // const details = document.querySelector('.details');
    // const time = document.querySelector('img.time');
    // const icon = document.querySelector('.icon img');

    // Update the night/day & icon images
    // const iconSrc = `img/icons/${day.Day.Icon}.svg`;
    // icon.setAttribute('src', iconSrc);
    
    // const timeSrc = day.Day  ? 'img/day.svg' : 'img/night.svg';
    // time.setAttribute('src', timeSrc);

    // Remove the d-none class if present
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
    }); 
    
    // details.innerHTML = `
    //     <h5 class="my-3">${cityDets.EnglishName}</h5>
    //     <div class="my-3">${weather.WeatherText}</div>
    //     <div class="display-4 my-4">
    //         <span>${weather.Temperature.Metric.Value}</span>
    //         <span>&deg;C</span>
    //     </div>`;
};

const updateCity = async (city) => {
    const cityDets = await getCity(city);
    // const weather = await getWeather(cityDets.Key);
    
    const weather = await getFiveDays(cityDets.Key);
    return { cityDets, weather };
};

cityForm.addEventListener('submit', e => {
    //prevent default action
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();
    
    //update the UI with the new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});

