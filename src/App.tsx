import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import Circle from "./\bCircle";

const Father = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
`;
const Anima = keyframes`
from {
 transform: rotate(0deg);
}
to {
  transform: rotate(360deg);
}
`;
const Box = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.boxColor};
  height: 200px;
  width: 200px;
  margin: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  animation: ${Anima} 20s linear infinite;
`;

const Emoji = styled.p`
  font-size: 30px;
  margin: 0;
`;

const Text = styled.h2`
  color: ${(props) => props.theme.textColor};
  ${Emoji} {
    font-size: 60px;
  }
`;

const CircleOri = styled(Box)`
  border-radius: 50px;
`;

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setValue(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("hello", value);
  };

  const onCheck = (event: React.FormEvent<HTMLInputElement>) => {
    return;
  };

  return (
    <Father>
      <div>
        <label htmlFor="switch1"> Square Switch </label>
        <input onChange={onCheck} type="checkbox" id="switch1" />
      </div>
      <CircleOri>
        <Emoji>😍</Emoji>
        <Text>BRIZONS</Text>
        <Emoji>😍</Emoji>
      </CircleOri>
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="username"
        />
        <button>Sign in</button>
      </form>
    </Father>
  );
}

export default App;
