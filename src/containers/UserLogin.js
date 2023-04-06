import { useState } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function UserLogin({ onUserLogin }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const onHandleUserLogin = (event) => {
    event.preventDefault();
    if (!username.trim()) {
      setError("Molim upišite svoj username!");
    } else {
      setError("");
      onUserLogin(username);
    }
  };

  return (
    <div>
      <form onSubmit={onHandleUserLogin} className="user-login-container">
        <label htmlFor="name" className="user-login-label">
          Vaš username:
        </label>
        <input
          type="text"
          autoFocus
          className="user-login-input"
          id="name"
          onChange={(e) => setUsername(e.target.value)}
          maxLength="20"
        />
        <Alert className="user-error-message" variant="secondary">
          {error}
        </Alert>
        <Button
          type="submit"
          variant="outline-dark"
          style={{ padding: "20px 20px" }}
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default UserLogin;
