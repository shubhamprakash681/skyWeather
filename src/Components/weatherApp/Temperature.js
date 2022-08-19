import React, { useState, useEffect } from 'react'
import env from 'react-dotenv'
import WeatherCard from './WeatherCard';

const Temperature = () => {

  const [searchValue, setsearchValue] = useState('kochi');
  const [tempInfo, setTempInfo] = useState('')


  const getWeatherData = async () => {
    try {
      let API_URL = env.REACT_APP_TEMP_API_URL
      // console.log('API_URL: ', API_URL)
      
      let MOD_URL = API_URL.replace('kochi', searchValue)
      // console.log('MOD_URL: ', MOD_URL)

      const res = await fetch(MOD_URL);
      const data = await res.json();
      console.log(data);
      
      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      console.log(temp);

      const newWeatherData = {
        temp, humidity, pressure, weathermood, name, country, speed, sunset
      }
      setTempInfo(newWeatherData);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWeatherData()
  }, [])
  

  return (
    <>
        <div className="wrap">
            <div className="search">
                <input type="search" placeholder='Enter your city' 
                autoFocus
                id='search'
                className='searchTerm'
                value={ searchValue }
                onChange={ (event) => setsearchValue(event.target.value) }
                />

                <button className='searchButton' onClick={getWeatherData}>Search</button>
            </div>
        </div>

        <WeatherCard tempInfo={tempInfo}/>
    </>
  )
}

export default Temperature