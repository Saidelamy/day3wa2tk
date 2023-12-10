import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  const navigate = useNavigate();
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUSer] = useState({
    password: "",
    email: "",
  });

  function getUser(e) {
    let myUser = { ...user };
    myUser[e.target.name] = e.target.value;
    setUSer(myUser);
    console.log(myUser);
  }

  async function submitLogin(e) {
    e.preventDefault();
    setIsLoading(true);
    let validateResult = validateLoginForm(user);
    if (validateResult.error) {
      setIsLoading(false);
      setErrorList(validateResult.error.details);
      ///////
    } else {
      let { data } = await axios.post(
        "https://coursesystsem.onrender.com/api/users/login",
        user
      );
      if (data.status === "success") {
        localStorage.setItem("userToken", data.data.userToken);
        props.getUserData();
        setIsLoading(false);
        navigate("/");
        ////login
      } else {
        setError(data.message);
        setIsLoading(false);
      }
    }
  }

  function validateLoginForm() {
    let schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["net", "com"] } })
        .required(),
      password: Joi.string().min(4).alphanum().required(),
    });
    return schema.validate(user, { abortEarly: false });
  }
  return (
    <>
      <div className="p-5">
        <h2 className="my-3">Login Now</h2>
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
        <form onSubmit={submitLogin}>
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
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}
