
import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [loading, setloading] = useState(false);
  const [weather, setWeather] = useState({})
  const fetchweather = async (cityname) => {
    const API_KEY = '79e7a77c4f754354b5942032242902';
    setloading(true);
    let url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityname}`
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log(data.current);
      setWeather({
        'Temp': data.current.temp_c,
        'Humidity': data.current.humidity,
        'Condition': data.current.condition.text,
        'Windspeed': data.current.wind_kph,
      })
    } catch (e) {
      alert('Failed to fetch weather data')
      console.log(e);
    }
    setloading(false);
  }
  const checkweather = () => {
    fetchweather(city);
  }


  function showcards(){
    if(weather.Temp){
      return(
        
          <div className="weather-cards">
           <div className="weather-card">
             <h3>Temperature</h3>
             <p>{weather.Temp}</p>
           </div>
           <div className="weather-card">
             <h3>Humidity</h3>
             <p>{weather.Humidity}</p>
 
           </div>
           <div className="weather-card">
             <h3>Condition</h3>
             <p>{weather.Condition}</p>
 
           </div>
           <div className="weather-card">
             <h3>Wind Speed</h3>
             <p>{weather.Windspeed} kph</p>
           </div>
         </div>)
      
    }else{
      return ''
    }
  }
  return (
    <div className="App">
      <div className="inputdiv">

        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        <button type="button" onClick={checkweather}>Search</button>
      </div>
      {loading ? (<p>Loading data…</p>) :showcards() }

    </div>
  );
}

export default App;
