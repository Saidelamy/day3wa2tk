import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { MediaContext } from "./../MediaContext";
import Loader from "../Loader/Loader";
export default function Movies() {
  let { trendingMovies, isLoading } = useContext(MediaContext);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Movies</title>
      </Helmet>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h5">
              Trending
              <br />
              Movies
              <br />
              to watch now
            </h2>
            <p className="py-2 text-muted">most watched movies by days</p>
            <div className="brdr w-100` mt-3"></div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          trendingMovies.map((movie, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-lg-2">
              <div className="movie position-relative">
                <Link to={`/moviedetailes/${movie.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500/` + movie.poster_path}
                    alt={movie.title}
                  />
                  <h3 className="h6 my-2">{movie.title}</h3>
                  <div className="vote p-2 text-white position-absolute top-0 end-0">
                    {movie.vote_average.toFixed(1)}
                  </div>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
