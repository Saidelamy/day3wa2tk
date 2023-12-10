import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { MediaContext } from "../MediaContext";
import Loader from "../Loader/Loader";

export default function People() {
  let { trendingPeople, isLoading } = useContext(MediaContext);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Actors</title>
      </Helmet>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brdr w-25 mb-3"></div>
            <h2 className="h5">
              Trending
              <br />
              People
              <br />
              to watch now
            </h2>
            <p className="py-2 text-muted">most watched People by days</p>
            <div className="brdr w-100 mt-3"></div>
          </div>
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          trendingPeople.map((person, index) => (
            <div key={index} className="col-md-4 col-sm-6 col-lg-2">
              <div className="movie position-relative">
                <Link to={`/peopledetails/${person.id}`}>
                  <img
                    className="w-100"
                    src={
                      `https://image.tmdb.org/t/p/w500/` + person.profile_path
                    }
                    alt={person.title}
                  />
                  <h3 className="h6 my-2">{person.name}</h3>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
