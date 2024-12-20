
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice"; 
import { RootState } from "../../store/store"; 
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { status, error } = useSelector((state: RootState) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // פונקציה של התחברות
  const loginFunc = async () => {
    if (username && password) {
        // @ts-ignore: 
      const response =  await dispatch(loginUser({ username, password }));
      
      if (response.error) {
        alert(response.error);
        return;
      }

      // @ts-ignore
      if (response.payload.user.area ==="none choosen") {
        navigate("/attack");
        // @ts-ignore
        localStorage.setItem("user", JSON.stringify(response.payload.user));
    }
    else {
      navigate("/defence");
       // @ts-ignore
       localStorage.setItem("user", JSON.stringify(response.payload.user));
    }
    }
  };


  
  return (
    <div className="login-container">
      <h1>Login Page</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button onClick={loginFunc} disabled={status === "loading"}>
        {status === "loading" ? "Logging in..." : "Login"}
      </button>

      {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
      {status === "succeeded" && <p style={{ color: "green" }}>Login successful</p>}

      <div>
        <Link className="link-container" to="/signup">Don't have an account? Sign up here!</Link>
      </div>
    </div>
  );
};

export default Login;

































// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser } from "../../store/userSlice"; 
// import { RootState } from "../../store/store"; 
// import { Link, useNavigate } from "react-router-dom";
// import "./login.css";

// const Login = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate(); 
//   const { status, error } = useSelector((state: RootState) => state.user);

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   // פונקציה של התחברות
//   const loginFunc = async () => {
//     if (username && password) {
//         // @ts-ignore: 
//       const response =  await dispatch(loginUser({ username, password }));
      
//       if (response.error) {
//         alert(response.error);
//         return;
//       }

//       // @ts-ignore: 
//       if (response.payload.token) {
//         // שמירה של שם המשתמש ב-localStorage אם התחברות הצליחה
//         // @ts-ignore:
//         localStorage.setItem("username", response.payload.username); // הוספת שם המשתמש ל-localStorage
//       }

//       // ניווט לאזורים שונים על פי נתוני המשתמש
//       // @ts-ignore
//       if (response.payload.user.area === "none choosen") {
//         navigate("/attack");
//       } else {
//         navigate("/defence");
//       }
//     }
//   };

//   return (
//     <div className="login-container">
//       <h1>Login Page</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </div>

//       <div>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>

//       <button onClick={loginFunc} disabled={status === "loading"}>
//         {status === "loading" ? "Logging in..." : "Login"}
//       </button>

//       {status === "failed" && <p style={{ color: "red" }}>{error}</p>}
//       {status === "succeeded" && <p style={{ color: "green" }}>Login successful</p>}

//       <div>
//         <Link className="link-container" to="/signup">Don't have an account? Sign up here!</Link>
//       </div>
//     </div>
//   );
// };

// export default Login;







