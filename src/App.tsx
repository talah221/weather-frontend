import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route, NavLink
} from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Favorites } from "./pages/Favorites";
import { Cities } from "./components/Cities";
import { IGetCities, IGetWeather } from "./interfaces/interfaces";
import { Button, Grid } from "@mui/material";
import { BASE_URL } from "./consts/consts";
import axios from "axios";
import { SelectedCity } from "./components/SelectedCity";
import {Favorite as FavoritesIcon} from '@mui/icons-material';
function App() {
  const [availableCities, setAvailableCities] = useState<IGetCities[]>([]);
  const [city, setCity] = useState({ name: null, key: null });
  const [weather, setWeather] = useState<IGetWeather>({weatherText:null,temperature:null});

  useEffect(() => {
    (async () => {
      if(!city.key) return;
      try {
        const response = await axios.get(`${BASE_URL}/get-weather?cityKey=${city.key}&cityName=${city.name}`);
        setWeather(response.data)
      } catch (err) {
        console.log(`Got error Fetching, err is ${err}`);
      }
    })();

  }, [city]);


  return (
    <BrowserRouter>
      <main>
        <nav style={{display:'flex',gap:'10px'  }}>
          <NavLink to={"/home"}>Home</NavLink>
          <NavLink to={"/favorites"}>Favorites</NavLink>
        </nav>
        <Grid container>
          <Grid item lg={9}>

            <Routes>
              <Route path="/" element={<Homepage updateAvailableCities={(cities) => setAvailableCities(cities)} />} />
              <Route path="*" element={<Homepage updateAvailableCities={(cities) => setAvailableCities(cities)} />} />
              <Route path="favorites" element={<Favorites updateAvailableCities={(cities) => setAvailableCities(cities)} />} />
            </Routes>
            <SelectedCity updateWeather={(weather)=>setWeather(weather)} city={city} weather={weather} />
          </Grid>
          <Grid item lg={3} style={{ borderLeft: "1px solid black", height: "100vh", padding: "5px" }}>
            <Cities cities={availableCities} setCity={(city) => setCity(city)} />
          </Grid>
        </Grid>

      </main>
    </BrowserRouter>
  );
}

export default App;
