import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import Register from "./Register/Register";
import { Route, Routes, useNavigate } from "react-router-dom";
import Movies from "./Movies/Movies";
import Notfound from "./Notfound/Notfound";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Profile from "./Profile/Profile";
import Tv from "./Tv/Tv";
import People from "./People/People";
import MovieDetails from "./MovieDetalies/MovieDetails";
import TvDetails from "./TvDetails/TvDetails";
import PeopleDetails from "./PeopleDetails/PeopleDetails";
import { Offline, Online } from "react-detect-offline";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

function App() {
  const [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  // عشان لما اعمل ريفريش للصفحه متخرجش منها وتروح للوجين
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getUserData();
    }
  }, []);

  function getUserData() {
    let decodedToken = jwtDecode(localStorage.getItem("userToken"));
    setUserData(decodedToken);
  }

  function logOut() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <>
      <Online>
        <div className="App container ">
          <Navbar userData={userData} logOut={logOut} />
          <div className="">
            <Routes>
              <Route
                path="login"
                element={<Login getUserData={getUserData} />}
              />
              <Route path="register" element={<Register />} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Movies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="movies"
                element={
                  <ProtectedRoute>
                    <Movies />
                  </ProtectedRoute>
                }
              />
              <Route
                path="moviedetailes"
                element={
                  <ProtectedRoute>
                    <MovieDetails />
                  </ProtectedRoute>
                }
              >
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <MovieDetails />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="tv"
                element={
                  <ProtectedRoute>
                    <Tv />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tvdetailes"
                element={
                  <ProtectedRoute>
                    <TvDetails />
                  </ProtectedRoute>
                }
              >
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <TvDetails />
                    </ProtectedRoute>
                  }
                />
              </Route>
              <Route
                path="people"
                element={
                  <ProtectedRoute>
                    <People />
                  </ProtectedRoute>
                }
              />
              <Route
                path="peopledetails"
                element={
                  <ProtectedRoute>
                    <PeopleDetails />
                  </ProtectedRoute>
                }
              >
                <Route
                  path=":id"
                  element={
                    <ProtectedRoute>
                      <PeopleDetails />
                    </ProtectedRoute>
                  }
                />
              </Route>

              <Route path="profile" element={<Profile userData={userData} />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
          </div>

          {/* <Footer /> */}
        </div>
      </Online>

      <Offline>
        <div className="container d-flex justify-content-center align-items-center">
          <h1>You are Offline</h1>
        </div>
      </Offline>
    </>
  );
}

export default App;
