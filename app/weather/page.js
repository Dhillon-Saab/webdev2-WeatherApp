"use client"; // This directive indicates that we're using this file in a client-side environment.

import React, { useState, useEffect } from "react";
import { useUserAuth } from "../auth-context"; // Adjust the path as needed
import Link from "next/link";

export default function Weather() {
  const [weather, setWeather] = useState({temp: 0, condition: "as", feels: 0});
  const { user } = useUserAuth(); // Assume no need for firebaseSignOut directly here unless a logout feature on this page is desired

  const lat = 51.0447;
  const long = 114.0719;

  async function fetchWeather(){
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    }catch(error){
      console.log(error);
      return null;
    }
  }

  async function loadWeather(){
    let data = await fetchWeather();

    if(data){
    setWeather({temp: data.main.temp, condition: data.weather[0].main, feels: data.main.feels_like});
    }
  }
  // TODO: Implement fetchWeather function to fetch weather data using the OpenWeatherMap API.
  // Read the documentation of the API provider to understand how to handle the returned JSON object.

  // TODO: Implement loadWeather function that calls fetchWeather and sets the returned data into the weather state.


  useEffect(() => {
    const checkUserLoggedIn = async () => {
      if (user) {
        // If the user is logged in, call loadWeather to fetch weather data
        loadWeather();
      } else {
        // Handle the case where the user is not logged in
        console.log('User is not logged in');
      }
    };

    checkUserLoggedIn(); // Call the function to check user login status
  }, [user]); // Dependency array ensures this effect runs when the user state changes.

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 bg-blue-100">
      <h1 className="text-2xl font-bold mb-4 text-red-800">
        Weather in Calgary
      </h1>
      {user ? (
        <>
          {/* TODO: Display the weather information if available. Include temperature and weather condition. */}
          <p className="text-2x1 mb-3 text-blue-500">Temperature: {Math.round(273 - weather.temp)} C</p>
          <p className="text-2x1 mb-3 text-blue-500">Feels Like: {Math.round(273 - weather.feels)} C</p>
          <p className="text-2x1 mb-3 text-blue-500">Condition: {weather.condition}</p>

          {/* Optional: Display additional weather details as needed. */}
          <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
            {/* TODO: If needed, provide a Logout button here or ensure there's a way to navigate back or log out. */}
            <Link href="/">Home</Link>
          </button>
        </>
      ) : (
        <>
          <p className="text-2xl mb-2 text-blue-500">Please log in to see the weather information.</p>
          <Link className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" href="/">Home
          </Link>
        </>
      )}
    </main>
  );
}
