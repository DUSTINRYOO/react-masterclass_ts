import { Helmet } from "react-helmet";
import styled from "styled-components";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.span`
  font-size: 50px;
  font-weight: 600;
  margin: 30px;
`;

const Img = styled.img`
  height: 400px;
  width: 400px;
  border-radius: 60px;
  opacity: 0.8;
`;

function Home() {
  return (
    <Main>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Title>Coin Chart</Title>
      <Img src="https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3346&q=80" />
    </Main>
  );
}

export default Home;
