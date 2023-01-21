import styled from "styled-components";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-top: 300px;
  align-items: flex-start;
  background-color: linear-gradient
    (135deg, rgb(238, 0, 153), rgb(255, 171, 225));
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
  width: 120px;
  height: 120px;
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
  flex-direction: column;
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
  hover: { scale: 1.2, rotateZ: 360 },
  click: { scale: 1, borderRadius: "100px" },
};

function App() {
  const x = useMotionValue(0);
  /*   useEffect(() => {
    x.onChange(() => console.log(x));
  }, [x]); */

  const rotateZ = useTransform(x, [-200, 0, 200], [-360, 0, 360]);
  const gradient = useTransform(
    x,
    [-200, 0, 200],
    [
      "linear-gradient(90deg, rgb(255, 255, 255), rgb(0, 13, 255))",
      "linear-gradient(0deg, rgb(255, 255, 255), rgb(229, 255, 0))",
      "linear-gradient(-90deg, rgb(255, 255, 255), rgb(255, 0, 0))",
    ]
  );
  const { scrollYProgress } = useScroll();
  const translateX = useTransform(scrollYProgress, [0, 1], [0, -720]);
  const biggerBoxRef = useRef<HTMLDivElement>(null);

  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{ translateX }}
        variants={myVars}
        initial="start"
        animate="end"
      >
        Box
      </Box>
      <Box2 variants={myVars2} initial="start" animate="end">
        <Circle variants={myVar2_Circle}>A</Circle>
        <Circle variants={myVar2_Circle}>B</Circle>
        <Circle variants={myVar2_Circle}>C</Circle>
        <Circle variants={myVar2_Circle}>D</Circle>
      </Box2>
      <BiggerBox ref={biggerBoxRef}>
        <button onClick={() => x.set(100)}>Click</button>
        <Box3
          style={{ x, rotateZ }}
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          variants={myVar3}
          whileHover="hover"
          whileDrag={{ backgroundColor: "#000000", color: "white" }}
          whileTap="click"
        >
          Drag
        </Box3>
      </BiggerBox>
    </Wrapper>
  );
}

export default App;
