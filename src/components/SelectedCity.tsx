import { Grid } from "@mui/material";
import { IGetWeather } from "../interfaces/interfaces";

interface ISelectedCityProps {
  city: { name: string, key: string };
  weather:IGetWeather
}

export const SelectedCity = (props: ISelectedCityProps) => {
  const {city,weather} = props;
  return (
    <>
      {city.name && <Grid mt={5} container justifyContent={"center"}>
      <Grid item>
        <b>City Name:</b> {city.name}, {weather?.temperature} , {weather?.weatherText}
      </Grid>
    </Grid>}
    </>
  );
};