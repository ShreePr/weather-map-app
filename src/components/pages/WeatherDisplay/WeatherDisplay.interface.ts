export interface WeatherDisplayProps {
  latitude: number;
  longitude: number;
}

export interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  wind: {
    speed: number;
  };
}
