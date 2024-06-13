import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { WeatherData, WeatherDisplayProps } from "./WeatherDisplay.interface";
import { Box, Card, CardContent, Typography } from "@mui/material";

const WeatherDisplay: FC<WeatherDisplayProps> = ({ latitude, longitude }) => {
  const [weatherData, setWeatherData] = useState<WeatherData>();

  useEffect(() => {
    console.log({ latitude, longitude });
    if (latitude && longitude) {
      const fetchWeather = async () => {
        const API_KEY = process.env.REACT_APP_MAP_API_KEY;
        //Fetching weather Data using openweathermap
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;
        const response = await axios.get(url);
        console.log("response", response);
        setWeatherData(response.data);
      };
      fetchWeather();
    }
  }, [latitude, longitude]);

  const { temp, humidity } = weatherData?.main ?? {};
  const { description, icon } = weatherData?.weather[0] ?? {};
  const { speed } = weatherData?.wind ?? {};

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Weather Information
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <Box>
            <Typography variant="body1">Temperature: {temp}°C</Typography>
            <Typography variant="body1">Condition: {description}</Typography>
            <Typography variant="body1">Humidity: {humidity}%</Typography>
            <Typography variant="body1">Wind Speed: {speed} m/s</Typography>
            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="Weather icon" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherDisplay;
