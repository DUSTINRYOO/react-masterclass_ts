import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import styled from "styled-components";
import {
  getSearchMovie,
  getSearchTv,
  IGetMoviesResult,
  IGetTvsResult,
} from "../api";
import { makeImagePath } from "../utils";
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const MainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px;
  margin-top: 70px;
`;
const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center center;
  height: 300px;
  width: 600px;
  font-size: 66px;
  margin-bottom: 35px;
  position: relative;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;
const ContentName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  position: absolute;
  bottom: -15px;
  background-color: #000000b8;
  border-radius: 10px;
  padding: 10px;
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -20,
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
  const { data: movieData } = useQuery<IGetMoviesResult>(
    ["searchMovie", keyword],
    () => getSearchMovie(keyword || "")
  );
  const { data: tvData } = useQuery<IGetTvsResult>(["searchTv", keyword], () =>
    getSearchTv(keyword || "")
  );
  return (
    <Wrapper>
      <MainBox>
        <Title>Movies</Title>
        {movieData?.results.map((movie) => (
          <Box
            layoutId={movie.id + "movie"}
            key={movie.id}
            whileHover="hover"
            initial="normal"
            variants={boxVariants}
            transition={{ type: "tween" }}
            bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
          >
            <ContentName>{movie.title}</ContentName>
          </Box>
        ))}
      </MainBox>
      <MainBox>
        <Title>Tv Shows</Title>
        {tvData?.results.map((tv) => (
          <Box
            layoutId={tv.id + "tv"}
            key={tv.id}
            whileHover="hover"
            initial="normal"
            variants={boxVariants}
            transition={{ type: "tween" }}
            bgPhoto={makeImagePath(tv.backdrop_path, "w500")}
          >
            <ContentName>{tv.name}</ContentName>
          </Box>
        ))}
      </MainBox>
    </Wrapper>
  );
}
export default Search;
