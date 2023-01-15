import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/about");
  };
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button onClick={onClick}>About</button>
        </li>
      </ul>
    </header>
  );
}

export default Header;
