import { IGetCities } from "../interfaces/interfaces";
import { Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

interface ICitiesProps {
  cities: IGetCities[] | [];
  setCity: (cityKey: any) => void;
}

export const Cities = (props: ICitiesProps) => {
  const { cities,setCity } = props;
  const location = useLocation()
  const isFavoritesPage = location.pathname==='/favorites'
  return (
    <Grid container direction={"column"} gap={"10px"} justifyContent={"center"} alignItems={"center"}>
      {isFavoritesPage ? <h1>Favorite Cities</h1> : <h1>Searched Cities</h1>}
      {Boolean(cities.length) && cities.map(city => <Grid key={city.key} style={{ cursor: "pointer" }}
                                item
                                onClick={()=>setCity(city)}
      >{city.name} - {city.key}</Grid>)}
    </Grid>
  );
};