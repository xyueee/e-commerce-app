import React from "react";
import { useEffect, useRef, useState, useContext } from "react";
import AuthContext from "../Context/AuthProvider";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("kminchelle");
  const [password, setPassword] = useState("0lelplR");
  const [errMessage, setErrMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {}, []);
  useEffect(() => {
    setErrMessage("");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
        // expiresInMins: 60, // optional
      }),
    })
      .then((res) => res.json())
      .then(console.log);
    setUsername("");
    setPassword("");
    setSuccess();
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Succesful Logged In</h1>
          <br />
        </section>
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
