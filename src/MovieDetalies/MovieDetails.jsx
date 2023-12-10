import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MovieDetails() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  let params = useParams();

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      let { data } = await axios(
        `https://api.themoviedb.org/3/movie/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
      );
      setMovie(data);
      setIsLoading(false);
      console.log(data);
    }
    getMovieDetails();
  }, [params.id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>MovieDetails</title>
      </Helmet>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="container row mt-3">
          <div className="col-md-4">
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
              alt={movie.title}
            />
          </div>
          <div className="col-md-6">
            <h2 className="my-2">{movie.title}</h2>
            <h2 className="my-2 h4 text-muted">{movie.tagline}</h2>
            <p className="mt-4">
              <span className="imdb">Imdb : </span>{" "}
              {movie.vote_average?.toFixed(1)}
            </p>
            <p className="mt-4">
              <span className="text-muted">genres : </span>
              {movie.genres?.map((name) => {
                return name.name + ", ";
              })}
            </p>
            <p>
              <span className="text-muted">Spoken Language :</span>{" "}
              {movie.spoken_languages?.map((name) => {
                return name.name + ", ";
              })}
            </p>
            <p className="mt-4">{movie.overview}</p>
            <div className="brdr mx-5 my-3 w-50"></div>
            <p>
              <span className="text-muted">Production Company: </span>
              {movie.production_companies?.map((name) => {
                return name.name + ", ";
              })}
            </p>
            <p>
              <span className="text-muted">Production Country: </span>
              {movie.production_countries?.map((name) => {
                return name.name + ", ";
              })}
            </p>
            <p className="h6">
              <span className="text-muted">Total Budget:</span>{" "}
              {movie.budget === 0 ? "undefined yet" : movie.budget + "$"}
            </p>

            <p className="datecima">
              <span className="text-muted">Shown in the cinema :</span>{" "}
              {movie.release_date}
            </p>
            <a className="text-muted link" href={movie.homepage}>
              Book your ticket now
            </a>
          </div>
        </div>
      )}
    </>
  );
}
