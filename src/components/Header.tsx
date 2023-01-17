import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";

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
const Toggle = styled.button`
  display: flex;
  color: ${(props) => props.theme.bgColor};
  background-color: whitesmoke;
  padding: 5px 15px;
  font-size: 15px;
  font-weight: 600;
  border-radius: 15px;
`;
function Header() {
  const setterFn = useSetRecoilState(isDarkAtom);
  const toggleMode = () => setterFn((prev) => !prev);
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
      <Toggle onClick={toggleMode}>Toggle Mode</Toggle>
    </HeaderBox>
  );
}

export default Header;
