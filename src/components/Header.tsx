import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/Coins");
  };
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={onClick}>Coins</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
