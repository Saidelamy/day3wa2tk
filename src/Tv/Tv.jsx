import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MediaContext } from "./../MediaContext";
import { Helmet } from "react-helmet";
import Loader from "./../Loader/Loader";
export default function Tv() {
  let { trendingTv, isLoading } = useContext(MediaContext);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>TV</title>
      </Helmet>
      <div className="row py-5 ">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h5">
              Trending
              <br />
              tv
              <br />
              to watch now
            </h2>
            <p className="py-2 text-muted">most watched movies by days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          trendingTv.map((tv, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-lg-2">
              <div className="movie position-relative">
                <Link to={`/tvdetailes/${tv.id}`}>
                  <img
                    className="w-100"
                    src={`https://image.tmdb.org/t/p/w500/` + tv.poster_path}
                    alt={tv.title}
                  />
                  <h3 className="h6 my-2">{tv.name}</h3>
                  <div className="vote p-2 text-white position-absolute top-0 end-0">
                    {tv.vote_average.toFixed(1)}
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
