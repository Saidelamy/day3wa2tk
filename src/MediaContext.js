import axios from "axios";
import { useEffect, useState } from "react";
import { createContext } from "react";

export let MediaContext = createContext([]);

export function MediaContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPeople, setTrendingPeople] = useState([]);
  async function getTrending(mediaType, callback) {
    setIsLoading(true);
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=f1aca93e54807386df3f6972a5c33b50`
    );
    callback(data.results.slice(0, 16));
    setIsLoading(false);
  }
  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPeople);
  }, []);

  return (
    <MediaContext.Provider
      value={{ trendingMovies, trendingPeople, trendingTv, isLoading }}
    >
      {props.children}
    </MediaContext.Provider>
  );
}
