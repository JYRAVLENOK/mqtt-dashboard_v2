import "./login.scss"
import { Navigate } from "react-router-dom"
import React, {useState} from "react";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // validate username and password
        if (username === "alex" && password === "pass") {
            setRedirectToHome(true);
        } else {
            alert("Invalid username or password");
        }
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    return (
        <div className="container" >
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <label>
                    Password
                    <input
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default Login