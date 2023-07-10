import React from "react";
import { BrowserRouter as Router, Route, useNavigate } from "react-router-dom";

import { useEffect, useRef, useState, useContext } from "react";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, []);
  useEffect(() => {
    setErrMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      // .then((res) => res.json())
      // .then(console.log);

      if (response) {
        const data = await response.json();

        const token = data.token; // Assuming the token is returned as 'token' in the response data
        console.log("Token", token);
        // Set the token in the header for subsequent requests
        const authHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        console.log("Header", authHeader);
        // Example: Fetch user data using the token
        // const userDataResponse = await fetch("https://dummyjson.com/api/user", {
        //   headers: authHeader,
        // });
        // if (userDataResponse) {
        //   // const userData = await userDataResponse.json();
        //   // // Handle user data
        // } else {
        //   // Handle error when fetching user data
        // }
        setSuccess(true);
      } else {
        setErrMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {success ? (
        // <section>
        //   <h1>Succesful Logged In</h1>
        //   <br />
        // </section>
        navigate("/products")
      ) : (
        <section></section>
      )}
      <div className="login-container">
        <h1>Welcome !</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
            ref={userRef}
          ></input>
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
