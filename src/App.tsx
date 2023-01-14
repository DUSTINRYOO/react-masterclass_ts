import styled, { keyframes } from "styled-components";
const Father = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
`;
const Anima = keyframes`
0% {
 transform: rotate(0deg);
 border-radius: 0px;
}
50% {
  transform: rotate(360deg);
  border-radius: 50px;
}
100% {
  transform: rotate(0deg);
  border-radius: 0px;
}
`;
const Box = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.boxColor};
  height: 100px;
  width: 100px;
  margin: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: ${Anima} 3s linear infinite;
`;

const Emoji = styled.p`
  font-size: 30px;
  margin: 0;
`;

const Text = styled.h3`
  color: ${(props) => props.theme.textColor};
  span {
    font-size: 50px;
    margin: 0;
    &:hover {
      font-size: 100px;
      transition: 2s;
    }
  }
  ${Emoji} {
    font-size: 60px;
  }
  span {
    font-size: 50px;
    &:hover {
      font-size: 100px;
      transition: 2s;
    }
  }
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Input = styled.input.attrs({ required: true })`
  background-color: ${(props) => props.theme.boxColor};
  width: 100px;
  margin: 20px;
`;

const Btn = styled.button`
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.boxColor};
  border: none;
  border-radius: 15px;
  width: 100px;
  margin: 20px;
  font-size: 20px;
  text-align: center;
`;

function App() {
  return (
    <Father>
      <Box>
        <Text>
          <span>😍</span>
          <Emoji>😎</Emoji>
        </Text>
      </Box>
      <Circle>
        <Text>BRIZONS</Text>
      </Circle>
      <Btn>Let's</Btn>
      <Btn as="a" href="/">
        Go
      </Btn>
      <Emoji>😎</Emoji>
      <Input />
    </Father>
  );
}

export default App;
