import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  text?: string;
}

const Container = styled.div<ContainerProps>`
  width: 1000px;
  height: 20px;
  background-color: ${(props) => props.bgColor};
  border-radius: 15px;
  border: 2px solid ${(props) => props.borderColor};
`;

function Circle({ bgColor, borderColor, text = "default" }: CircleProps) {
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  );
}

export default Circle;
