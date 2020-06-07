const key = 'mkub80fT7hQBA2X8GGXEhlGv5Ga9BIql';

//get weather information
const getWeather = async(id) => {

    const base ='http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${id}?apikey=${key}`;
    
    const response = await fetch(base+query);
    const data = await response.json();

   return (data[0]);

};

//get city information
const getCity = async (city) => {

    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base+query);
    const data = await response.json();

    return (data[0]);

};

//get weather for 5 days

const getFiveDays = async (id) => {

    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${id}?apikey=${key}&metric=true`;
    
    const response = await fetch(base+query);
    const data = await response.json();

   return data["DailyForecasts"];
}




