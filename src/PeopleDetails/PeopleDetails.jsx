import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function PeopleDetails() {
  const [person, setPerson] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getPeopleDetails() {
      setIsLoading(true);
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${params.id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
      );
      setPerson(data);
      setIsLoading(false);
    }
    getPeopleDetails();
  }, [params.id]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>ActorDetails</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container row mt-3">
          <div className="col-md-4">
            <img
              className="w-100"
              src={`https://image.tmdb.org/t/p/w500/` + person.profile_path}
              alt={person.name}
            />
          </div>
          <div className="col-md-6">
            <h2 className="my-2">{person.name}</h2>
            <h3 className="h5 my-2">{person.birthday}</h3>
            <p className="mt-4">
              <span className="text-muted">Place Of Birth :</span>{" "}
              {person.place_of_birth}
            </p>
            <p>{person.biography?.slice(1, 800)}</p>
            <a className="text-muted link" href={person.homepage}>
              Show details about {person.gender === 2 ? "him" : "her"}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
