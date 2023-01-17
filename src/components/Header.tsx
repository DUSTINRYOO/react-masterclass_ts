import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 2px solid gray;
  padding-bottom: 10px;
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

const Box = styled.div`
  display: flex;
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
interface IToggleDark {
  toggleDark: () => void;
}

function Header({ toggleDark }: IToggleDark) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/Coins");
  };
  return (
    <HeaderBox>
      <Box>
        <Link to="/">
          <HomeBtn>Home</HomeBtn>
        </Link>
        <CoinBtn onClick={onClick}>Coins</CoinBtn>
      </Box>
      <button onClick={toggleDark}>Toggle Mode</button>
    </HeaderBox>
  );
}

export default Header;
