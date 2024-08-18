// import React from 'react'
import axios from "axios"
import { useState } from "react"


function App() {
  const [city, setCity] = useState('')

  const [weather, setWeather] = useState(null)

  const [error, setError] = useState(null)

  const apikey = '7c4ffd36a7d5abab153eaaa898d0f704'
  const getWeather= async(city)=>{
    try{
     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
     setWeather(response.data)
    
    } catch(error){
      setError('City not found')
      setWeather(null)
    }
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
   getWeather(city)

  }
  return (
    <div style={styles.container}>
      <h1>Weather Application</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input 
        type="text" 
        placeholder='Enter Your City Name'
         value={city}
          onChange={(e)=>setCity(e.target.value)}
          
          style={styles.input}
          />
          <button type='submit' style={styles.button}>Get Weather </button>
      </form>
      {error && <p style={styles.error}>{error}</p>}
      {weather && <div style={styles.weather}>
        <h2>{weather.name}</h2>
        <p>{weather.weather[0].description}</p>
        <p>{Math.floor(weather.main.temp-273.15)} °C</p>
        <img src={`https:/openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt="weather icon" />
      </div>}
    </div>
  )
}
const styles={
  container:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans, serif',
    marginTop: '-20px'
  },
  form:{
    display: 'flex',
    flexDirection:'column',
    alignItems: "center",
    fontSize: '16px',
    marginBottom: '10px',
  },
  input:{
    padding: '10px',
    fontSize:'16px',
    marginBottom:'10px',
  },
  button:{
    padding: '10px 20px',
    fontSize: '15px',
    cursor: 'pointer'

  },
  error:{
    color: 'red'
  },
  weather:{
    textAlign:'center'
  }
}

export default App
