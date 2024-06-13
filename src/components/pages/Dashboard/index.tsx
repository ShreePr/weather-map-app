import React, { useState, useEffect } from "react";
import WeatherDisplay from "../WeatherDisplay";
import MapDisplay from "../MapDisplay";
import { TextField, Button, Container, Typography, List, ListItem, ListItemText, Box, Paper, Grid } from "@mui/material";
import { Coordinates } from "./Dashboard.interface";
import axios from "axios";

const App: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Coordinates>({ latitude: 51.505, longitude: -0.09 });
  const [zoom] = useState<number>(12);
  const [recentSearches, setRecentSearches] = useState<Coordinates[]>([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { latitude, longitude, location } = e.currentTarget.elements as typeof e.currentTarget.elements & {
      latitude: { value: string };
      longitude: { value: string };
      location: { value: string };
    };
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?q=${location?.value}&format=json&limit=5`);

    const newCoordinates = {
      latitude: response?.data?.length > 0 ? parseFloat(response?.data?.[0]?.lat) : parseFloat(latitude.value),
      longitude: response?.data?.length > 0 ? parseFloat(response?.data?.[0]?.lon) : parseFloat(longitude.value)
    };
    setCoordinates(newCoordinates);
    const newRecentSearches = [...recentSearches, newCoordinates].slice(-5);
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
  };

  const handleRecentSearchClick = (coords: Coordinates) => {
    setCoordinates(coords);
  };

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h3" align="center" gutterBottom>
          Weather Information Details
        </Typography>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <form onSubmit={handleFormSubmit}>
            <TextField placeholder="Search for a location" type="string" label="Search Place" name="location" fullWidth margin="normal" />
            <Box mt={2}>
              <TextField label="Latitude" type="number" value={coordinates.latitude} name="latitude" fullWidth margin="normal" />
            </Box>
            <Box mt={2}>
              <TextField label="Longitude" type="number" value={coordinates.longitude} name="longitude" fullWidth margin="normal" />
            </Box>
            <Box mt={2}>
              <Button type="submit" variant="contained" color="primary">
                Get Weather
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
      <Box my={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <MapDisplay latitude={coordinates.latitude} longitude={coordinates.longitude} zoom={zoom} setCoordinates={setCoordinates} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <WeatherDisplay latitude={coordinates.latitude} longitude={coordinates.longitude} />
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          Recent Searches
        </Typography>
        <List component={Paper} elevation={3}>
          {recentSearches.map((search, index) => (
            <ListItem button key={index} onClick={() => handleRecentSearchClick(search)}>
              <ListItemText primary={`Lat: ${search.latitude}, Lon: ${search.longitude}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default App;
