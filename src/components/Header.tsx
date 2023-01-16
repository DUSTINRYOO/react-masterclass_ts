import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid gray;
`;

const HomeBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  height: 50px;
  width: 120px;
  margin: 15px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
`;

const CoinBtn = styled.button`
  display: block;
  font-size: 30px;
  font-weight: 600;
  height: 50px;
  width: 120px;
  margin: 10px;
  margin-left: 50px;
  border: none;
  border-radius: 15px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
`;

function Header() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/Coins");
  };
  return (
    <HeaderBox>
      <Link to="/">
        <HomeBtn>Home</HomeBtn>
      </Link>
      <CoinBtn onClick={onClick}>Coins</CoinBtn>
    </HeaderBox>
  );
}

export default Header;
