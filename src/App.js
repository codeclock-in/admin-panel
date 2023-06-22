import logo from "./logo.svg";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";

function App() {
  const [jwt, setJwt] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      authDomain: process.env.REACT_APP_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_DATABASE_URL,
      projectId: process.env.REACT_APP_PROJECT_ID,
      storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_APP_ID,
      measurementId: process.env.REACT_APP_MEASUREMENT_ID,
    };

    initializeApp(firebaseConfig);
  }, []);

  const generateJWT = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        setJwt(credential.idToken);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var username = event.target[0].value;
    var password = event.target[1].value;

    console.log(process.env.REACT_APP_ADMIN_USERNAME, password);

    if (
      username == process.env.REACT_APP_ADMIN_USERNAME &&
      password == process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      setIsLoggedIn(true);
    }
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <h1>Generate JWT for testing</h1>
          <textarea
            onChange={() => {}}
            disabled={true}
            rows={15}
            cols={100}
            value={jwt}
          />
          <button className="button-5" onClick={generateJWT}>
            {" "}
            Generate JWT
          </button>
        </div>
      ) : (
        <div id="login-page">
          <form name="login" onSubmit={handleSubmit} method="post">
            <center>Username:</center>
            <center>
              <input name="username" />
            </center>
            <center>Password:</center>
            <center>
              <input name="password" type="password" />
            </center>
            <center>
              <input type="submit" name="submit" value="login" />
            </center>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
