import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import { getSearchTv, getTvAiring, getUpComing, IGetTvsResult } from "../api";
import { makeImagePath } from "../utils";
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duaration: 0.1,
      type: "tween",
    },
  },
};
function Search() {
  const location = useLocation();
  const keyword: string | null = new URLSearchParams(location.search).get(
    "keyword"
  );
  const { data } = useQuery<IGetTvsResult>(["search", keyword], () =>
    getSearchTv(keyword || "")
  );

  return (
    <>
      {data?.results.map((tv) => (
        <Box
          layoutId={tv.id + ""}
          key={tv.id}
          whileHover="hover"
          initial="normal"
          variants={boxVariants}
          transition={{ type: "tween" }}
          bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
        >
          <Info variants={infoVariants}>
            <h4>{tv.name}</h4>
          </Info>
        </Box>
      ))}
    </>
  );
}
export default Search;
