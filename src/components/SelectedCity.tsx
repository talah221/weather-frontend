import { Button, Grid } from "@mui/material";
import { IGetWeather } from "../interfaces/interfaces";
import { Favorite as FavoritesIcon,FavoriteBorder as RemoveFromFavIcon } from "@mui/icons-material";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../consts/consts";

interface ISelectedCityProps {
  city: { name: string, key: string };
  weather: IGetWeather;
  updateWeather:(weather:IGetWeather)=>void
}


export const SelectedCity = (props: ISelectedCityProps) => {
  const { city, weather,updateWeather } = props;

  const addToFavorites = async () => {
    const body = {cityKey:city.key,...weather}
    try{
     await axios.post(`${BASE_URL}/favorite-city`,body);
     updateWeather({...weather,isFavorite:true})
    }catch(err){
      console.log(`Got Error Saving ${body} to Favorites err: ${err}`)
    }

  };
  const removeFromFavorites = async ()=>{
    const body = {cityKey:city.key}
    try{
      await axios.post(`${BASE_URL}/unfavorite-city`,body);
      updateWeather({...weather,isFavorite:false})
    }catch(err){
      console.log(`Got Error Removing ${body} to Favorites, err: ${err}`)
    }

  }
  return (
    <>
      {city.name && <Grid mt={5} container justifyContent={"center"}>
        <Grid item>
          <b>City Name:</b> {city.name}, {weather?.temperature} , {weather?.weatherText}
          {!weather.isFavorite?<Button color={"success"} sx={{ ml: 2 }} variant={"outlined"} startIcon={<FavoritesIcon />} onClick={addToFavorites}>ADD TO
            FAVORITES</Button>: <Button color={"error"} sx={{ ml: 2 }}  variant={"outlined"} startIcon={<RemoveFromFavIcon />} onClick={removeFromFavorites}>REMOVE FROM FAVORITES</Button>
          }

        </Grid>
      </Grid>}
    </>
  );
};