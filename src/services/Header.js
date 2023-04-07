import Button from "react-bootstrap/Button";

function Header({ userName, user, onLogout }) {
  return (
    <div className="header-main">
      {user.id ? (
        <h1>
          {userName}, welcome to the chat room!
          <Button
            type="submit"
            onClick={onLogout}
            className="logout-button"
            variant="outline-warning"
          >
            Logout
          </Button>
        </h1>
      ) : (
        <h1>Welcome to chat app</h1>
      )}
    </div>
  );
}

export default Header;
