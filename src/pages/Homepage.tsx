import { Button, Grid, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import { IGetCities } from "../interfaces/interfaces";
import { BASE_URL } from "../consts/consts";

interface IHomepageProps {
  updateAvailableCities: (cities:any) => void;
}

export const Homepage = (props:IHomepageProps) => {

  const [cityQuery, setCityQuery] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setCityQuery(value);
  };
  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-city?query=${cityQuery}`);
      props.updateAvailableCities(response.data)
    } catch (err) {
      console.log(`Got Error Fetching CITY: ${err}`);
    } finally {
      setCityQuery("");
      setIsLoading(false);
    }


  };

  return (
    <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
      <Grid item>
        <h1>Homepage</h1>
      </Grid>

      <Grid item alignItems={"center"}>
        <form onSubmit={handleSubmit}>
          <Grid container gap={"10px"} alignItems={"center"}>
            <Grid item>

              <Button type={"submit"} variant={"contained"} disabled={isLoading}>SEARCH</Button>
            </Grid>
            <Grid item>
              <TextField disabled={isLoading} value={cityQuery} variant={"outlined"} onChange={handleChange}/>
            </Grid>
          </Grid>

        </form>
      </Grid>

    </Grid>
  );
};