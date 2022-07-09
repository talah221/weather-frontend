import { IGetCities } from "../interfaces/interfaces";
import { Grid } from "@mui/material";

interface ICitiesProps {
  cities: IGetCities[] | [];
  setCity: (cityKey: any) => void;
}

export const Cities = (props: ICitiesProps) => {
  const { cities,setCity } = props;
  console.log(cities)
  return (
    <Grid container direction={"column"} gap={"10px"} justifyContent={"center"} alignItems={"center"}>
      {Boolean(cities.length) && cities.map(city => <Grid style={{ cursor: "pointer" }}
                                item key={city.key}
                                onClick={()=>setCity(city)}
      >{city.name}</Grid>)}
    </Grid>
  );
};