import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../consts/consts";

interface IFavoritesProps{
   updateAvailableCities: (cities:any) => void;

 }

export const Favorites = (props:IFavoritesProps)=>{


  useEffect(() => {
    (async ()=>{
      const response = await axios.get(`${BASE_URL}/favorites`)
      props.updateAvailableCities(response.data)
    })()
  }, []);


  return (<h1>Favorites</h1>)
}