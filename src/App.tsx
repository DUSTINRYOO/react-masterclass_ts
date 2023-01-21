import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const myVars = {
  start: { scale: 0, borderRadius: 0 },
  end: {
    scale: 1,
    rotateZ: 360,
    borderRadius: 40,
    transition: { type: "spring", delay: 1, duration: 1 },
  },
};
const Box2 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  margin: 50px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Circle = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  font-size: 30px;
  font-weight: 600;
  background-color: white;
  border-radius: 35px;
  place-self: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const Box3 = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  margin: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BiggerBox = styled(motion.div)`
  height: 400px;
  width: 400px;
  background-color: #e6e6e6;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const myVars2 = {
  start: { opacity: 0, scale: 0.5 },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      delay: 1,
      duration: 1,
      delayChildren: 1,
      staggerChildren: 0.2,
    },
  },
};

const myVar2_Circle = {
  start: { opacity: 0, y: 100 },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.6,
    },
  },
};
const myVar3 = {
  hover: { scale: 1.2, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
};
function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <Box variants={myVars} initial="start" animate="end">
        Box
      </Box>
      <Box2 variants={myVars2} initial="start" animate="end">
        <Circle variants={myVar2_Circle}>A</Circle>
        <Circle variants={myVar2_Circle}>B</Circle>
        <Circle variants={myVar2_Circle}>C</Circle>
        <Circle variants={myVar2_Circle}>D</Circle>
      </Box2>
      <BiggerBox ref={biggerBoxRef}>
        <Box3
          drag
          dragSnapToOrigin
          dragElastic={0}
          dragConstraints={biggerBoxRef}
          variants={myVar3}
          whileHover="hover"
          whileDrag={{ backgroundColor: "rgb(46,204,113)" }}
          whileTap="click"
        >
          Box
        </Box3>
      </BiggerBox>
    </Wrapper>
  );
}

export default App;
