import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function TvDetails() {
  const [tv, setTv] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getTvDetails() {
      setIsLoading(true);
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/tv/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
      );
      setTv(data);
      setIsLoading(false);
      console.log(data);
    }
    getTvDetails();
  }, [params.id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TvDetails</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container row mt-3">
          <div className="col-md-4">
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500/` + tv.poster_path}
              alt={tv.name}
            />
          </div>
          <div className="col-md-6">
            <h2 className="my-2">{tv.name}</h2>
            <p className="mt-4">
              <span className="imdb">Imdb : </span>{" "}
              {tv.vote_average?.toFixed(1)}
            </p>
            <p className="mt-4">
              <span className="text-muted">genres : </span>
              {tv.genres?.map((y) => {
                return y.name + ", ";
              })}
            </p>
            <p>
              <span className="text-muted">Spoken Language :</span>{" "}
              {tv.spoken_languages?.map((y) => {
                return y.name + ", ";
              })}
            </p>
            <p className="mt-4">{tv.overview}</p>
            <p>
              <span className="text-muted">Production Company: </span>
              {tv.production_companies?.map((y) => {
                return y.name + ", ";
              })}
            </p>
            <p>
              <span className="text-muted">Production Country: </span>
              {tv.production_countries?.map((y) => {
                return y.name + ", ";
              })}
            </p>

            <p className="datecima">
              <span className="text-muted">Start shown in TV :</span>{" "}
              {tv.first_air_date}
            </p>
            <a className="text-muted link" href={tv.homepage}>
              Show details about show
            </a>
          </div>
        </div>
      )}
    </>
  );
}
