import Button from "react-bootstrap/Button";

function Header({ userName, user, onLogout }) {
  return (
    <div className="header-main">
      {user.id ? (
        <h1>
          {userName}, dobrodošli u chat sobu!
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
        <h1>Dobrodošli u chat aplikaciju!</h1>
      )}
    </div>
  );
}

export default Header;
