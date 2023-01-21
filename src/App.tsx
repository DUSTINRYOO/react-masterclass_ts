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

const Svg = styled(motion.svg)`
  width: 150px;
  height: 150px;
`;

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
        BOX
      </Box>
      <Box
        style={{ translateX }}
        variants={myVars}
        initial="start"
        animate="end"
      >
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <motion.path
            initial={{ pathLength: 0, fill: "rgb(255, 217, 0,0)" }}
            animate={{ pathLength: 1, fill: "rgb(255, 217, 0,1)" }}
            transition={{
              default: { delay: 2, duration: 3 },
              fill: { delay: 2, duration: 2 },
            }}
            stroke="rgb(255, 217, 0,1)"
            strokeWidth={10}
            d="M224 373.12c-25.24-31.67-40.08-59.43-45-83.18-22.55-88 112.61-88 90.06 0-5.45 24.25-20.29 52-45 83.18zm138.15 73.23c-42.06 18.31-83.67-10.88-119.3-50.47 103.9-130.07 46.11-200-18.85-200-54.92 0-85.16 46.51-73.28 100.5 6.93 29.19 25.23 62.39 54.43 99.5-32.53 36.05-60.55 52.69-85.15 54.92-50 7.43-89.11-41.06-71.3-91.09 15.1-39.16 111.72-231.18 115.87-241.56 15.75-30.07 25.56-57.4 59.38-57.4 32.34 0 43.4 25.94 60.37 59.87 36 70.62 89.35 177.48 114.84 239.09 13.17 33.07-1.37 71.29-37.01 86.64zm47-136.12C280.27 35.93 273.13 32 224 32c-45.52 0-64.87 31.67-84.66 72.79C33.18 317.1 22.89 347.19 22 349.81-3.22 419.14 48.74 480 111.63 480c21.71 0 60.61-6.06 112.37-62.4 58.68 63.78 101.26 62.4 112.37 62.4 62.89.05 114.85-60.86 89.61-130.19.02-3.89-16.82-38.9-16.82-39.58z"
          />
        </Svg>
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
