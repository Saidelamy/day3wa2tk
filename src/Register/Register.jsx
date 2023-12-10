import axios from "axios";
import Joi from "joi";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUSer] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUSer(myUser);
    console.log(myUser);
  }

  async function submitRegister(e) {
    e.preventDefault();
    setIsLoading(true);
    let validateResult = validateRegisterForm(user);
    if (validateResult.error) {
      setIsLoading(false);
      setErrorList(validateResult.error.details);
      console.log(validateResult.error);
    } else {
      let { data } = await axios.post(
        "https://coursesystsem.onrender.com/api/users/register",
        user
      );
      if (data.status === "success") {
        setIsLoading(false);
        navigate("/login");
        ////login
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }

  function validateRegisterForm() {
    let schema = Joi.object({
      firstName: Joi.string().alphanum().min(3).max(10).required(),
      lastName: Joi.string().alphanum().min(3).max(10).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["net", "com"] } })
        .required(),
      password: Joi.string().min(4).alphanum().required(),
    });
    return schema.validate(user, {
      abortEarly: false,
    }); /* aborty تستخدم لارجاع كل الايرور لان ال joi بترجع اول ايرور بس */
  }
  return (
    <>
      <div>
        <h2 className="my-3">Register Now</h2>
        {errorList.map((error, index) => {
          if (index === 4) {
            return (
              <div key={index} className="alert alert-danger">
                Password invalid
              </div>
            );
          } else {
            return (
              <div key={index} className="alert alert-danger">
                {error.message}
              </div>
            );
          }
        })}
        {error ? <div className="alert alert-danger">{error}</div> : ""}
        <form onSubmit={submitRegister}>
          <label htmlFor="firstName">firstName :</label>
          <input
            onChange={getUser}
            type="text"
            className="form-control my-3"
            name="firstName"
            id="firstName"
          />

          <label htmlFor="lastName">lastName :</label>
          <input
            onChange={getUser}
            type="text"
            className="form-control my-3"
            name="lastName"
            id="lastName"
          />

          <label htmlFor="email">email :</label>
          <input
            onChange={getUser}
            type="email"
            className="form-control my-3"
            name="email"
            id="email"
          />

          <label htmlFor="password">password :</label>
          <input
            onChange={getUser}
            type="password"
            className="form-control my-3"
            name="password"
            id="password"
          />

          <button type="submit" className="btn btn-outline-info">
            {isLoading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
