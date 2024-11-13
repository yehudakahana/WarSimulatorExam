import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetStatus, registerUser } from "../../store/userSlice"; 
import { RootState } from "../../store/store"; 
import { Link , } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state: RootState) => state.user); 
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [organization, setOrganization] = useState("");
  const [area, setArea] = useState("");

  useEffect(() => {
    dispatch(resetStatus());
    
    if (organization && organization.startsWith("IDF")) {
      switch (organization) {
        case "IDF - North":
          setArea("North");
          break;
        case "IDF - South":
          setArea("South");
          break;
        case "IDF - Center":
          setArea("Center");
          break;
        case "IDF - West Bank":
          setArea("West Bank");
          break;
        default:
          setArea("Area not found"); 
      }
    } else {
      setArea("none choosen"); 
    }
  }, [dispatch, organization]); 


  // פונקציה של התחברות
  const SignupFunc = () => {
    if (username && password && organization) {
      //@ts-ignore
      dispatch(registerUser({ username, password, organization, area }));
    } else {
      alert("Please fill in all the fields");}
  };

  return (
    <div className="signup-container">
      <h1>Signup Page</h1>

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="organization">Organization</label>
        <select
          id="organization"
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="IDF - North">IDF - North</option>
          <option value="IDF - South">IDF - South</option>
          <option value="IDF - Center">IDF - Center</option>
          <option value="IDF - West Bank">IDF - West Bank</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
        </select>
      </div>

     

      <button onClick={SignupFunc} disabled={status === "loading"}>
        {status === "loading" ? "Loading..." : "Signup"}
      </button>

      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}

      {status === "succeeded" && <p style={{ color: "green" }}>Signup successful</p>}

      <div>
        <Link to="/" className="link-container">Back to Login</Link>
      </div>
    </div>
  );
};

export default Signup;






